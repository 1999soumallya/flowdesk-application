import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

type UpdateStatusPayload = {
  status: 'idle' | 'checking' | 'available' | 'not-available' | 'downloading' | 'downloaded' | 'error'
  version?: string
  releaseDate?: string
  releaseName?: string
  percent?: number
  transferred?: number
  total?: number
  bytesPerSecond?: number
  message?: string
}

// Custom APIs for renderer
const api = {
  updater: {
    getStatus: (): Promise<UpdateStatusPayload> => ipcRenderer.invoke('updater:get-status'),
    checkForUpdates: (): Promise<void> => ipcRenderer.invoke('updater:check-for-updates'),
    downloadUpdate: (): Promise<void> => ipcRenderer.invoke('updater:download-update'),
    quitAndInstall: (): Promise<void> => ipcRenderer.invoke('updater:quit-and-install'),
    onStatus: (callback: (payload: UpdateStatusPayload) => void): (() => void) => {
      const listener = (_event: Electron.IpcRendererEvent, payload: UpdateStatusPayload): void => {
        callback(payload)
      }

      ipcRenderer.on('updater:status', listener)

      return () => {
        ipcRenderer.removeListener('updater:status', listener)
      }
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
