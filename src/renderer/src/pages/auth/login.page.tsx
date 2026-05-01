import { FormEvent, useState } from 'react'
import appIcon from '@renderer/assets/icon.png'
import { useAuthStore } from '@renderer/stores/auth-store'
import { useNavigate } from 'react-router'

function LoginPage(): React.JSX.Element {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    login(
      {
        id: 'local-user',
        name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@flowdesk.local`
      },
      'local-session'
    )
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#15151C] px-5 py-8 text-[#F0EFF8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(123,110,246,0.20),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(52,211,153,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent)]" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-xl border border-[#2A2A38] bg-[#1A1A22]/95 shadow-2xl shadow-black/35 md:grid-cols-[1fr_420px]">
        <section className="hidden border-r border-[#2A2A38] p-8 md:flex md:flex-col">
          <div className="flex items-center gap-3">
            <img src={appIcon} alt="" className="h-10 w-10 rounded-xl object-cover" />
            <div>
              <div className="text-[15px] font-semibold tracking-tight">FlowDesk</div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[#5A5975]">Workspace Control</div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { label: 'Projects', value: '12', color: '#7B6EF6' },
                { label: 'Active', value: '08', color: '#A99EFA' },
                { label: 'Done', value: '34', color: '#34D399' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-[#2A2A38] bg-[#1E1E26] p-4">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#5A5975]">
                    {stat.label}
                  </div>
                  <div className="text-[26px] font-semibold tracking-tight" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-[#2A2A38] bg-[#1E1E26] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7B6EF620] text-[#A99EFA]">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M5.25 9.75l2.25 2.25 5.25-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 8.45V9a6 6 0 11-3.56-5.48" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[#5A5975]">Workspace Control</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7B6EF6]">Welcome back</div>
            <h1 className="text-[28px] font-semibold tracking-tight">Sign in to FlowDesk</h1>
            <p className="mt-2 text-[13px] leading-5 text-[#9A99B0]">Continue where your work left off.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-[#5A5975]">
                Username or email
              </span>
              <input
                className="h-12 w-full rounded-lg border border-[#2A2A38] bg-[#15151C] px-4 text-[14px] text-[#F0EFF8] outline-none transition placeholder:text-[#5A5975] focus:border-[#7B6EF6] focus:ring-2 focus:ring-[#7B6EF6]/20"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="name@company.com"
                autoComplete="username"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-[#5A5975]">
                Password
              </span>
              <input
                className="h-12 w-full rounded-lg border border-[#2A2A38] bg-[#15151C] px-4 text-[14px] text-[#F0EFF8] outline-none transition placeholder:text-[#5A5975] focus:border-[#7B6EF6] focus:ring-2 focus:ring-[#7B6EF6]/20"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>

            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#9A99B0]">
                <input
                  className="h-4 w-4 accent-[#7B6EF6]"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  type="checkbox"
                />
                Remember me
              </label>
              <button className="text-[12px] font-semibold text-[#A99EFA] transition hover:text-[#F0EFF8]" type="button">
                Forgot password?
              </button>
            </div>

            <button className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-[#7B6EF6] text-[14px] font-semibold text-white transition hover:bg-[#9288FA] focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/30" type="submit">
              Sign in
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default LoginPage
