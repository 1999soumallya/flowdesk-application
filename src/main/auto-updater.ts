import { BrowserWindow, app, ipcMain } from 'electron'
import { autoUpdater, type ProgressInfo, type UpdateInfo } from 'electron-updater'
import { is } from '@electron-toolkit/utils'

type UpdateStatus = 'idle' | 'checking' | 'available' | 'not-available' | 'downloading' | 'downloaded' | 'error'

type UpdateStatusPayload = {
  status: UpdateStatus
  version?: string
  releaseDate?: string
  releaseName?: string
  percent?: number
  transferred?: number
  total?: number
  bytesPerSecond?: number
  message?: string
}

let currentStatus: UpdateStatusPayload = { status: 'idle' }
let updaterReady = false
let windowRef: BrowserWindow | null = null

function sendStatus(payload: UpdateStatusPayload): void {
  currentStatus = payload

  if (!windowRef || windowRef.isDestroyed()) return

  windowRef.webContents.send('updater:status', payload)
}

function toInfoPayload(status: UpdateStatus, info: UpdateInfo): UpdateStatusPayload {
  return {
    status,
    version: info.version,
    releaseDate: info.releaseDate,
    releaseName: info.releaseName ?? undefined
  }
}

function toProgressPayload(progress: ProgressInfo): UpdateStatusPayload {
  return {
    status: 'downloading',
    percent: progress.percent,
    transferred: progress.transferred,
    total: progress.total,
    bytesPerSecond: progress.bytesPerSecond
  }
}

async function checkForUpdates(): Promise<void> {
  if (!updaterReady) {
    sendStatus({ status: 'error', message: 'Updater is not ready yet.' })
    return
  }

  try {
    sendStatus({ status: 'checking' })
    await autoUpdater.checkForUpdates()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to check for updates.'
    sendStatus({ status: 'error', message })
  }
}

async function downloadUpdate(): Promise<void> {
  try {
    sendStatus({ status: 'downloading', percent: 0 })
    await autoUpdater.downloadUpdate()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to download the update.'
    sendStatus({ status: 'error', message })
  }
}

function quitAndInstall(): void {
  autoUpdater.quitAndInstall(false, true)
}

export function setupAutoUpdater(window: BrowserWindow): void {
  windowRef = window

  if (updaterReady) {
    sendStatus(currentStatus)
    return
  }

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.allowPrerelease = false

  if (is.dev) {
    autoUpdater.forceDevUpdateConfig = true
  }

  autoUpdater.on('checking-for-update', () => sendStatus({ status: 'checking' }))
  autoUpdater.on('update-available', (info) => sendStatus(toInfoPayload('available', info)))
  autoUpdater.on('update-not-available', (info) => sendStatus(toInfoPayload('not-available', info)))
  autoUpdater.on('download-progress', (progress) => sendStatus(toProgressPayload(progress)))
  autoUpdater.on('update-downloaded', (info) => sendStatus(toInfoPayload('downloaded', info)))
  autoUpdater.on('error', (error) => sendStatus({ status: 'error', message: error.message }))

  ipcMain.handle('updater:get-status', () => currentStatus)
  ipcMain.handle('updater:check-for-updates', checkForUpdates)
  ipcMain.handle('updater:download-update', downloadUpdate)
  ipcMain.handle('updater:quit-and-install', quitAndInstall)

  updaterReady = true

  if (app.isPackaged) {
    setTimeout(() => {
      void checkForUpdates()
    }, 3000)
  }
}
