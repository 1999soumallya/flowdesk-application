import appIcon from '@renderer/assets/icon.png'
import { Outlet, useMatches } from 'react-router'

export type AuthRouteHandle = {
  eyebrow: string
  title: string
  description: string
}

const defaultHandle: AuthRouteHandle = {
  eyebrow: 'Welcome',
  title: 'FlowDesk',
  description: 'Sign in to continue.'
}

function isAuthRouteHandle(value: unknown): value is AuthRouteHandle {
  if (!value || typeof value !== 'object') return false

  const handle = value as Partial<AuthRouteHandle>

  return typeof handle.eyebrow == 'string' && typeof handle.title == 'string' && typeof handle.description == 'string'
}

function AuthLayout(): React.JSX.Element {
  const matches = useMatches()
  const handle = [...matches].reverse().find((match) => isAuthRouteHandle(match.handle))?.handle
  const { eyebrow, title, description } = isAuthRouteHandle(handle) ? handle : defaultHandle

  const demoDetails = [
    {
      label: 'Projects',
      value: '12', color: '#7B6EF6'
    },
    {
      label: 'Active',
      value: '08', color: '#A99EFA'
    },
    {
      label: 'Done',
      value: '34', color: '#34D399'
    }
  ]

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#15151C] px-5 py-8 text-[#F0EFF8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(123,110,246,0.20),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(52,211,153,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent)]" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-xl border border-[#2A2A38] bg-[#1A1A22]/95 shadow-2xl shadow-black/35 md:grid-cols-[1fr_420px]">
        <section className="hidden border-r border-[#2A2A38] p-8 md:flex md:flex-col">
          <div className="flex items-center gap-3">
            <img src={appIcon} alt="" className="h-10 w-10 rounded-xl object-cover" />
            <div>
              <div className="text-[15px] font-semibold tracking-tight">FlowDesk</div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[#5A5975]">
                Workspace Control
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="mb-5 grid grid-cols-3 gap-3">
              {
                demoDetails.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-[#2A2A38] bg-[#1E1E26] p-4">
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#5A5975]">
                      {stat.label}
                    </div>
                    <div className="text-[26px] font-semibold tracking-tight" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="rounded-lg border border-[#2A2A38] bg-[#1E1E26] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7B6EF620] text-[#A99EFA]">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M5.25 9.75l2.25 2.25 5.25-6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 8.45V9a6 6 0 11-3.56-5.48"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold tracking-tight">Plan, track, finish</div>
                  <div className="mt-1 text-[12px] leading-5 text-[#9A99B0]">
                    Keep projects, tasks, and focused work sessions organized in one calm dashboard.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="p-6 sm:p-8">
          <div className="mb-8 flex items-center gap-3 md:hidden">
            <img src={appIcon} alt="" className="h-10 w-10 rounded-xl object-cover" />
            <div>
              <div className="text-[15px] font-semibold tracking-tight">FlowDesk</div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[#5A5975]">
                Workspace Control
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7B6EF6]">
              {eyebrow}
            </div>
            <h1 className="text-[28px] font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-[13px] leading-5 text-[#9A99B0]">{description}</p>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AuthLayout
