import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

function formatPercent(percent?: number): string {
  if (typeof percent != 'number') return '0%'

  return `${Math.round(percent)}%`
}

function UpdateBanner(): React.JSX.Element | null {
  const [update, setUpdate] = useState<UpdateStatusPayload>({ status: 'idle' })
  const [dismissedMessage, setDismissedMessage] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    window.api.updater.getStatus().then((status) => {
      if (mounted) setUpdate(status)
    })

    const unsubscribe = window.api.updater.onStatus((status) => {
      setDismissedMessage(null)
      setUpdate(status)
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  const message = useMemo(() => {
    if (update.status == 'checking') return 'Checking for updates'
    if (update.status == 'available') return `FlowDesk ${update.version} is available`
    if (update.status == 'downloading') return `Downloading update ${formatPercent(update.percent)}`
    if (update.status == 'downloaded') return 'Update ready to install'
    if (update.status == 'error') return update.message ?? 'Update check failed'

    return ''
  }, [update])

  if (update.status == 'idle' || update.status == 'not-available') return null
  if (dismissedMessage == message) return null

  const showProgress = update.status == 'downloading'
  const progress = typeof update.percent == 'number' ? Math.min(Math.max(update.percent, 0), 100) : 0

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#101015]/96 px-5 text-[#F0EFF8] backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(123,110,246,0.26),transparent_34%),radial-gradient(circle_at_80%_24%,rgba(72,187,168,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent)]" />
        <motion.div className="relative w-[min(520px,100%)] overflow-hidden rounded-lg border border-[#2A2A38] bg-[#171720]/92 shadow-2xl shadow-black/40" initial={{ y: 22, scale: 0.96 }} animate={{ y: 0, scale: 1 }} transition={{ duration: 0.36, ease: 'easeOut' }}>
          {
            showProgress && (
              <div className="relative h-2 overflow-hidden bg-[#252530]">
                <motion.div
                  className="h-full rounded-r-full bg-linear-to-r from-[#48BBA8] via-[#7B6EF6] to-[#F3B562]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-y-0 w-28 bg-linear-to-r from-transparent via-white/45 to-transparent"
                  animate={{ x: ['-7rem', '34rem'] }}
                  transition={{ duration: 1.25, ease: 'easeInOut', repeat: Infinity }}
                />
              </div>
            )
          }
          <div className="flex flex-col items-center px-6 py-8 text-center sm:px-10">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full bg-[#7B6EF6]/20"
                animate={{ scale: [0.9, 1.14, 0.9], opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-3 rounded-full border border-[#353547]"
                animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
              />
              <motion.div
                className="relative h-16 w-16 rounded-full border-[5px] border-[#353547] border-t-[#7B6EF6] border-r-[#48BBA8]"
                animate={{ rotate: showProgress || update.status == 'checking' ? 360 : 0 }}
                transition={{
                  duration: 1,
                  ease: 'linear',
                  repeat: showProgress || update.status == 'checking' ? Infinity : 0
                }}
              />
              {showProgress && (
                <div className="absolute text-sm font-bold tabular-nums text-white">{Math.round(progress)}%</div>
              )}
            </div>
            <div className="mt-6 text-xl font-semibold tracking-tight">{message}</div>
            {
              showProgress && (
                <div className="mt-2 flex items-center gap-2 text-sm text-[#A6A4BC]">
                  <span className="tabular-nums">{formatPercent(progress)}</span>
                  <span className="h-1 w-1 rounded-full bg-[#56546E]" />
                  <span>Preparing the new build</span>
                </div>
              )
            }
            {update.status === 'checking' && (
              <div className="mt-2 text-sm text-[#A6A4BC]">FlowDesk is checking the latest release.</div>
            )}
            {update.status === 'available' && (
              <div className="mt-2 text-sm text-[#A6A4BC]">Download the update before continuing.</div>
            )}
            {update.status === 'downloaded' && (
              <div className="mt-2 text-sm text-[#A6A4BC]">Restart FlowDesk to finish installing.</div>
            )}
            {update.status === 'error' && (
              <div className="mt-2 text-sm text-[#A6A4BC]">You can dismiss this and continue working.</div>
            )}
            <div className="mt-7 flex justify-center">
              {
                update.status == 'available' && (
                  <button className="rounded-md bg-[#7B6EF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9288FA]" type="button" onClick={() => void window.api.updater.downloadUpdate()}>
                    Download update
                  </button>
                )
              }
              {
                update.status == 'downloaded' && (
                  <button className="rounded-md bg-[#7B6EF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9288FA]" type="button" onClick={() => void window.api.updater.quitAndInstall()}>
                    Restart now
                  </button>
                )
              }
              {
                update.status == 'error' && (
                  <button className="rounded-md border border-[#353547] px-5 py-3 text-sm font-semibold text-[#D6D3EA] transition hover:border-[#55536B]" type="button" onClick={() => setDismissedMessage(message)}>
                    Dismiss
                  </button>
                )
              }
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default UpdateBanner
