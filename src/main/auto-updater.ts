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

const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000

let currentStatus: UpdateStatusPayload = { status: 'idle' }
let updaterReady = false, silentCheck = false, checkInProgress = false
let updateCheckTimer: NodeJS.Timeout | null = null, windowRef: BrowserWindow | null = null

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

function shouldSkipUpdateCheck(): boolean {
  return checkInProgress || currentStatus.status == 'available' || currentStatus.status == 'downloading' || currentStatus.status == 'downloaded'
}

async function checkForUpdates(options: { silent?: boolean } = {}): Promise<void> {
  if (!updaterReady) {
    sendStatus({ status: 'error', message: 'Updater is not ready yet.' })
    return
  }

  if (shouldSkipUpdateCheck()) return

  silentCheck = options.silent ?? false
  checkInProgress = true

  try {
    if (!silentCheck) sendStatus({ status: 'checking' })
    await autoUpdater.checkForUpdates()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to check for updates.'
    sendStatus(silentCheck ? { status: 'idle' } : { status: 'error', message })
  } finally {
    checkInProgress = false
    silentCheck = false
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

function startUpdateCheckSchedule(): void {
  if (!app.isPackaged || updateCheckTimer) return

  setTimeout(() => {
    void checkForUpdates()
  }, 3000)

  updateCheckTimer = setInterval(() => {
    void checkForUpdates({ silent: true })
  }, UPDATE_CHECK_INTERVAL_MS)
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

  autoUpdater.on('checking-for-update', () => {
    if (!silentCheck) sendStatus({ status: 'checking' })
  })
  autoUpdater.on('update-available', (info) => sendStatus(toInfoPayload('available', info)))
  autoUpdater.on('update-not-available', (info) => {
    sendStatus(silentCheck ? { status: 'idle' } : toInfoPayload('not-available', info))
  })
  autoUpdater.on('download-progress', (progress) => sendStatus(toProgressPayload(progress)))
  autoUpdater.on('update-downloaded', (info) => sendStatus(toInfoPayload('downloaded', info)))
  autoUpdater.on('error', (error) => {
    sendStatus(silentCheck ? { status: 'idle' } : { status: 'error', message: error.message })
  })

  ipcMain.handle('updater:get-status', () => currentStatus)
  ipcMain.handle('updater:check-for-updates', () => checkForUpdates())
  ipcMain.handle('updater:download-update', downloadUpdate)
  ipcMain.handle('updater:quit-and-install', quitAndInstall)

  updaterReady = true

  startUpdateCheckSchedule()
}
