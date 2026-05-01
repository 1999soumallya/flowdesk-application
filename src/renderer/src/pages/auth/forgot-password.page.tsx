import { FormEvent, useState } from 'react'
import { Link } from 'react-router'

function ForgotPasswordPage(): React.JSX.Element {
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setIsSent(true)
  }

  if (isSent) {
    return (
      <div className="space-y-5">
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#34D399]">
            Check your inbox
          </div>
          <p className="text-[13px] leading-5 text-[#9A99B0]">
            We sent password reset instructions to your email address.
          </p>
        </div>

        <div className="rounded-lg border border-[#2A2A38] bg-[#1E1E26] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#34D39920] text-[#34D399]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 5.25l6 4.5 6-4.5M4 4.5h10a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 12V6A1.5 1.5 0 014 4.5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold tracking-tight">Recovery email sent</div>
              <div className="mt-1 text-[12px] leading-5 text-[#9A99B0]">
                If an account exists for <span className="text-[#F0EFF8]">{email}</span>, you will receive a reset link shortly.
              </div>
            </div>
          </div>
        </div>

        <button
          className="flex h-12 w-full items-center justify-center rounded-lg border border-[#2A2A38] text-[14px] font-semibold text-[#D6D3EA] transition hover:border-[#55536B] hover:text-white"
          type="button"
          onClick={() => setIsSent(false)}
        >
          Send again
        </button>

        <Link
          className="flex h-12 w-full items-center justify-center rounded-lg bg-[#7B6EF6] text-[14px] font-semibold text-white transition hover:bg-[#9288FA]"
          to="/"
        >
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-[#5A5975]">
          Username or email
        </span>
        <input
          className="h-12 w-full rounded-lg border border-[#2A2A38] bg-[#15151C] px-4 text-[14px] text-[#F0EFF8] outline-none transition placeholder:text-[#5A5975] focus:border-[#7B6EF6] focus:ring-2 focus:ring-[#7B6EF6]/20"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@company.com"
          autoComplete="username"
          required
        />
      </label>

      <button
        className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-[#7B6EF6] text-[14px] font-semibold text-white transition hover:bg-[#9288FA] focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/30"
        type="submit"
      >
        Send reset link
      </button>

      <Link
        className="flex h-12 w-full items-center justify-center rounded-lg border border-[#2A2A38] text-[14px] font-semibold text-[#D6D3EA] transition hover:border-[#55536B] hover:text-white"
        to="/"
      >
        Back to sign in
      </Link>
    </form>
  )
}

export default ForgotPasswordPage
