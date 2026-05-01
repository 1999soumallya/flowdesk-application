import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  type UpdateStatus =
    | 'idle'
    | 'checking'
    | 'available'
    | 'not-available'
    | 'downloading'
    | 'downloaded'
    | 'error'

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

  type FlowDeskAPI = {
    updater: {
      getStatus: () => Promise<UpdateStatusPayload>
      checkForUpdates: () => Promise<void>
      downloadUpdate: () => Promise<void>
      quitAndInstall: () => Promise<void>
      onStatus: (callback: (payload: UpdateStatusPayload) => void) => () => void
    }
  }

  interface Window {
    electron: ElectronAPI
    api: FlowDeskAPI
  }
}
