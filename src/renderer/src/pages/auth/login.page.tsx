import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '@renderer/stores/auth-store'

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
        <Link className="text-[12px] font-semibold text-[#A99EFA] transition hover:text-[#F0EFF8]" to="/forgot-password">
          Forgot password?
        </Link>
      </div>

      <button
        className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-[#7B6EF6] text-[14px] font-semibold text-white transition hover:bg-[#9288FA] focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/30"
        type="submit"
      >
        Sign in
      </button>
    </form>
  )
}

export default LoginPage
