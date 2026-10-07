import { useState, useEffect } from 'react'
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  X,
  Landmark,
  ShieldCheck,
  Ticket,
  Calendar,
  Eye,
  EyeOff,
  Check,
  Share2,
} from 'lucide-react'

// ── 1. Vertical Luxury Museum-Style "JOIN US" Registration Modal ──────────────
function JoinUsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<'collector' | 'artist'>('collector')
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [isCaptchaChecking, setIsCaptchaChecking] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)
  const [passNumber] = useState(() => Math.floor(100000 + Math.random() * 900000))
  const [isCopied, setIsCopied] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [pwError, setPwError] = useState('')
  const [termsError, setTermsError] = useState('')

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCaptchaClick = () => {
    if (captchaVerified) return
    setIsCaptchaChecking(true)
    setTimeout(() => {
      setIsCaptchaChecking(false)
      setCaptchaVerified(true)
      setTermsError('')
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let valid = true

    if (fullName.trim().length < 2) {
      setNameError('Enter your full name.')
      valid = false
    } else {
      setNameError('')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setEmailError('Enter a valid email, like you@example.com.')
      valid = false
    } else {
      setEmailError('')
    }

    if (password.length < 8) {
      setPwError('Password needs at least 8 characters.')
      valid = false
    } else if (!/\d/.test(password) || !/[A-Z]/.test(password)) {
      setPwError('Add a number and a capital letter.')
      valid = false
    } else {
      setPwError('')
    }

    if (!captchaVerified) {
      setTermsError("Tick “I'm not a robot” to continue.")
      return
    }

    if (!acceptedTerms) {
      setTermsError('Accept the terms to create your account.')
      return
    }

    if (!valid) return
    setTermsError('')
    setIsRegistered(true)
  }

  const handleGoogleJoin = () => {
    if (!fullName) setFullName('Google Patron')
    setIsRegistered(true)
  }

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(`ZIGGURATSS-PASS-#${passNumber}-${fullName || 'PATRON'}`)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Password strength score (0 to 4)
  let pwStrength = 0
  if (password.length >= 8) pwStrength++
  if (/[A-Z]/.test(password)) pwStrength++
  if (/\d/.test(password)) pwStrength++
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) pwStrength++
  const meterColors = ['#B3261E', '#D9822B', '#CFB04E', '#2E7D4F']

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-text overflow-y-auto"
    >
      <div className="relative w-full max-w-[460px] my-auto bg-[#FAF8F5] rounded-[28px] shadow-[0_30px_80px_rgba(23,18,63,0.28)] border border-[#E5DDD0] px-8 py-9 text-[#17123F] overflow-y-auto custom-scrollbar flex flex-col justify-between">
        {/* Subtle Painterly / Artistic Brushstroke Watermark in Background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-[#CCA030]/15 via-[#BD5E3B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-[#7E9D8B]/18 via-[#1E362A]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Painterly Arc SVG Line */}
        <svg
          className="absolute top-0 right-0 w-48 h-48 text-[#CCA030]/12 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="100" cy="0" r="85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
          <circle cx="100" cy="0" r="65" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 text-[#6B6785] hover:text-[#17123F] transition-colors cursor-pointer z-50 pointer-events-auto text-[16px]"
          aria-label="Close modal"
        >
          &#10005;
        </button>

        {!isRegistered ? (
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            {/* Museum Header from Reference */}
            <div className="text-center mb-7">
              <div
                className="flex items-center justify-center gap-2.5 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#9A7B1F] mb-2.5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="w-[5px] h-[5px] rounded-full bg-[#CFB04E]" />
                <span>The Living Gallery</span>
                <span className="w-[5px] h-[5px] rounded-full bg-[#CFB04E]" />
              </div>

              <h2
                className="text-[42px] sm:text-[46px] font-bold text-[#17123F] tracking-[-0.01em] leading-[1.05] my-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                JOIN US
              </h2>

              <p
                className="text-[14px] sm:text-[15px] text-[#6B6785] m-0 font-normal"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Enter your details to get access
              </p>

              {/* Decorative Subtle Ornament from Reference */}
              <div className="flex items-center justify-center gap-2.5 mt-4">
                <span className="w-14 h-px bg-[#DED9CC]" />
                <b className="w-1.5 h-1.5 bg-[#CFB04E] rotate-45 block" />
                <span className="w-14 h-px bg-[#DED9CC]" />
              </div>
            </div>

            {/* Registration Form replicating ref/joinusref.html */}
            <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col justify-between">
              <div>
                {/* 1. Full Name */}
                <div className="mb-5 sm:mb-5.5">
                  <label
                    htmlFor="join-name"
                    className="block text-[13px] font-medium text-[#17123F] mb-2 text-left"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="join-name"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value)
                        if (nameError) setNameError('')
                      }}
                      placeholder="e.g. Ananya Rao"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className={`w-full px-4 py-3.5 rounded-xl border text-[15px] text-[#17123F] bg-[#FBF8F2] placeholder-[#6B6785]/70 outline-none transition-all ${
                        nameError
                          ? 'border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]/20'
                          : 'border-[#DED9CC] focus:border-[#9A7B1F] focus:ring-3 focus:ring-[#CFB04E]/30'
                      }`}
                    />
                  </div>
                  {nameError && (
                    <div
                      className="text-[12.5px] text-[#B3261E] mt-1.5 text-left"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {nameError}
                    </div>
                  )}
                </div>

                {/* 2. Email Address */}
                <div className="mb-5 sm:mb-5.5">
                  <label
                    htmlFor="join-email"
                    className="block text-[13px] font-medium text-[#17123F] mb-2 text-left"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="join-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) setEmailError('')
                      }}
                      placeholder="you@example.com"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className={`w-full px-4 py-3.5 rounded-xl border text-[15px] text-[#17123F] bg-[#FBF8F2] placeholder-[#6B6785]/70 outline-none transition-all ${
                        emailError
                          ? 'border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]/20'
                          : 'border-[#DED9CC] focus:border-[#9A7B1F] focus:ring-3 focus:ring-[#CFB04E]/30'
                      }`}
                    />
                  </div>
                  {emailError && (
                    <div
                      className="text-[12.5px] text-[#B3261E] mt-1.5 text-left"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {emailError}
                    </div>
                  )}
                </div>

                {/* 3. Password + Meter + Hint */}
                <div className="mb-5.5 sm:mb-6">
                  <label
                    htmlFor="join-pw"
                    className="block text-[13px] font-medium text-[#17123F] mb-2 text-left"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="join-pw"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (pwError) setPwError('')
                      }}
                      placeholder="At least 8 characters"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        paddingRight: '68px',
                      }}
                      className={`w-full px-4 py-3.5 rounded-xl border text-[15px] text-[#17123F] bg-[#FBF8F2] placeholder-[#6B6785]/70 outline-none transition-all ${
                        pwError
                          ? 'border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]/20'
                          : 'border-[#DED9CC] focus:border-[#9A7B1F] focus:ring-3 focus:ring-[#CFB04E]/30'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 text-[#6B6785] hover:text-[#17123F] focus-visible:outline-2 focus-visible:outline-[#9A7B1F] rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium cursor-pointer transition-colors select-none"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  <div className="flex gap-1 mt-2.5" aria-hidden="true">
                    {[0, 1, 2, 3].map((idx) => {
                      const activeColor =
                        password && idx < pwStrength ? meterColors[pwStrength - 1] : '#DED9CC'
                      return (
                        <b
                          key={idx}
                          className="flex-1 h-1 rounded-sm transition-colors duration-200 block"
                          style={{ backgroundColor: activeColor }}
                        />
                      )
                    })}
                  </div>

                  <div
                    className="text-[12.5px] text-[#6B6785] mt-2 text-left"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Use 8+ characters with a number and a capital letter.
                  </div>

                  {pwError && (
                    <div
                      className="text-[12.5px] text-[#B3261E] mt-1.5 text-left"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {pwError}
                    </div>
                  )}
                </div>

                {/* 4. Segmented Role Selector */}
                <div
                  className="grid grid-cols-2 bg-[#FBF8F2] border border-[#DED9CC] rounded-xl p-1 mb-5 sm:mb-5.5"
                  role="radiogroup"
                  aria-label="Account type"
                >
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="collector"
                      checked={userType === 'collector'}
                      onChange={() => setUserType('collector')}
                      className="sr-only"
                    />
                    <span
                      className={`block text-center py-2.5 px-2 rounded-[9px] text-[14px] font-medium transition-all duration-150 ${
                        userType === 'collector'
                          ? 'bg-[#CFB04E] text-[#17123F] shadow-xs font-semibold'
                          : 'text-[#6B6785] hover:text-[#17123F]'
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Art lover / collector
                    </span>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="artist"
                      checked={userType === 'artist'}
                      onChange={() => setUserType('artist')}
                      className="sr-only"
                    />
                    <span
                      className={`block text-center py-2.5 px-2 rounded-[9px] text-[14px] font-medium transition-all duration-150 ${
                        userType === 'artist'
                          ? 'bg-[#CFB04E] text-[#17123F] shadow-xs font-semibold'
                          : 'text-[#6B6785] hover:text-[#17123F]'
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Artist
                    </span>
                  </label>
                </div>

                {/* 5. reCAPTCHA Section */}
                <div
                  onClick={handleCaptchaClick}
                  className="flex items-center gap-3 border border-[#DED9CC] bg-[#FBF8F2] rounded-xl px-4 py-3.5 mb-5 sm:mb-5.5 text-[14px] cursor-pointer select-none hover:border-[#C5BCA8] transition-colors"
                >
                  <input
                    type="checkbox"
                    id="join-recaptcha"
                    checked={captchaVerified}
                    onChange={handleCaptchaClick}
                    className="w-5 h-5 accent-[#9A7B1F] rounded cursor-pointer"
                  />
                  <label
                    htmlFor="join-recaptcha"
                    className="cursor-pointer font-normal text-[#17123F] text-[14px]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {isCaptchaChecking ? 'Verifying…' : "I'm not a robot"}
                  </label>
                  <small
                    className="ml-auto text-[#6B6785] text-[11px] font-normal"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    reCAPTCHA
                  </small>
                </div>

                {/* 6. Terms & Privacy Checkbox */}
                <label className="flex gap-2.5 items-start text-[13px] text-[#6B6785] mb-5 sm:mb-6 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked)
                      if (termsError) setTermsError('')
                    }}
                    className="w-[18px] h-[18px] mt-0.5 accent-[#9A7B1F] rounded flex-none cursor-pointer"
                  />
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="leading-relaxed text-left"
                  >
                    By registering, I accept the{' '}
                    <span className="text-[#9A7B1F] font-medium underline-offset-2 hover:underline">
                      Terms & Conditions
                    </span>{' '}
                    &{' '}
                    <span className="text-[#9A7B1F] font-medium underline-offset-2 hover:underline">
                      Privacy Policy
                    </span>{' '}
                    of Zigguratss Artwork LLP.
                  </span>
                </label>

                {termsError && (
                  <div
                    className="text-[12.5px] text-[#B3261E] mb-4 text-left"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {termsError}
                  </div>
                )}
              </div>

              {/* 7. Action CTA Buttons & Footer */}
              <div className="pt-2">
                <button
                  type="submit"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="w-full py-4 px-4 rounded-xl bg-[#CFB04E] hover:brightness-105 active:scale-[0.99] text-[#17123F] font-semibold text-[15px] cursor-pointer transition-all duration-150 shadow-[0_4px_14px_rgba(207,176,78,0.28)]"
                >
                  Create account
                </button>

                {/* OR Separator */}
                <div
                  className="flex items-center gap-3 text-[#6B6785] text-[13px] my-5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="flex-1 h-px bg-[#DED9CC]" />
                  <span>OR</span>
                  <span className="flex-1 h-px bg-[#DED9CC]" />
                </div>

                {/* Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleJoin}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 border border-[#DED9CC] bg-[#FBF8F2] hover:border-[#9A7B1F] rounded-xl text-[#17123F] font-medium text-[14px] cursor-pointer transition-colors duration-150 shadow-2xs"
                >
                  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" className="flex-shrink-0">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Footer Link */}
                <p
                  className="text-center text-[#6B6785] mt-5 mb-0 text-[14px]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Already a member?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      if (!fullName) setFullName('Returning Patron')
                      setIsRegistered(true)
                    }}
                    className="text-[#9A7B1F] font-semibold hover:underline cursor-pointer bg-transparent border-0 p-0 inline"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Pass Screen */
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center mx-auto text-[#10B981]">
              <CheckCircle2 size={38} />
            </div>

            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-[#D4A838] font-bold">
                Pass Confirmed · Verified
              </span>
              <h2
                className="text-2xl sm:text-3xl font-serif text-[#151336] mt-1.5"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
              >
                Welcome, {fullName || 'Patron'}
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                You have received honorary access as an{' '}
                <strong className="text-[#151336]">
                  {userType === 'artist' ? 'Artist Patron' : 'Art Lover & Collector'}
                </strong>
                .
              </p>
            </div>

            {/* Commemorative Pass Card */}
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 text-left shadow-xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <div className="flex items-center gap-2">
                  <Landmark size={16} className="text-[#D4A838]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#151336] font-bold">
                    Zigguratss Artwork · Grand Master Hall
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-[#6B7280]">
                  № {passNumber}
                </span>
              </div>

              <div className="space-y-1">
                <h3
                  className="text-base font-serif text-[#151336] font-semibold"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                >
                  The Living Gallery Exhibition
                </h3>
                <p className="text-xs text-[#4B5563]">
                  Grand Master Hall · 3D Interactive Exhibition
                </p>
                <div className="flex items-center gap-2 text-xs text-[#6B7280] pt-0.5">
                  <Calendar size={13} className="text-[#D4A838]" />
                  <span>15 OCT — 30 NOV 2026</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
                <span>
                  Holder: <strong className="text-[#151336] font-semibold">{fullName || 'Patron'}</strong>
                </span>
                <span className="text-[#10B981] flex items-center gap-1.5 font-semibold">
                  <ShieldCheck size={14} /> Verified
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto sm:min-w-[180px] bg-[#D4A838] hover:bg-[#C49628] text-white py-3 px-8 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-xs"
              >
                Enter Museum Hall
              </button>
              <button
                onClick={handleCopyCode}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E5E7EB] hover:bg-black/5 text-xs font-medium text-[#4B5563] hover:text-[#111827] transition-colors cursor-pointer flex items-center justify-center gap-2"
                title="Copy Pass Reference"
              >
                {isCopied ? <CheckCircle2 size={15} className="text-[#10B981]" /> : <Share2 size={15} />}
                {isCopied ? 'Copied' : 'Share Pass'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── 2. Curatorial Details Modal Component ────────────────────────────────────
function ExhibitionDetailsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#FAF8F5] rounded-2xl border border-[#E3DDD3] shadow-[0_24px_64px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-[#16221B]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#55635C] hover:text-[#16221B] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={17} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#1E362A] font-bold">
            Curatorial Statement
          </span>
        </div>

        <h2
          className="text-2xl sm:text-3xl font-serif text-[#16221B] mb-1"
          style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
        >
          The Living Gallery
        </h2>

        <p className="text-xs text-[#1E362A] mb-5 italic font-serif">
          European Fine Art Archival Society · Master Hall Wing
        </p>

        <div className="space-y-3.5 text-xs text-[#55635C] leading-relaxed">
          <p>
            The European Museum of Fine Art presents an open exhibition bringing together classical European portraiture, monumental ceiling frescoes, dynamic seascapes, and intricate botanical drawings within the monumental Master Hall.
          </p>
          <p>
            Visitors have complete freedom of movement in the full 3D gallery space: step right up to gilded frames, inspect fine brushstrokes in close-up, and explore detailed provenance for each masterwork.
          </p>
        </div>

        {/* Info Grid */}
        <div className="my-5 p-4 rounded-xl bg-white border border-[#E3DDD3] grid grid-cols-2 gap-3.5 text-xs shadow-xs">
          <div>
            <span className="text-[9px] text-[#1E362A] uppercase tracking-wider block font-bold">Chief Curator</span>
            <span className="text-[#16221B] font-medium">Dr. Helena Sterling, MA Oxon</span>
          </div>
          <div>
            <span className="text-[9px] text-[#1E362A] uppercase tracking-wider block font-bold">Admission Policy</span>
            <span className="text-[#16221B] font-medium">Free Exhibition Pass</span>
          </div>
          <div>
            <span className="text-[9px] text-[#1E362A] uppercase tracking-wider block font-bold">Exhibition Wing</span>
            <span className="text-[#16221B] font-medium">Grand Master Hall</span>
          </div>
          <div>
            <span className="text-[9px] text-[#1E362A] uppercase tracking-wider block font-bold">Dates</span>
            <span className="text-[#16221B] font-medium">15 OCT — 30 NOV 2026</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#1E362A] hover:bg-[#16281F] text-white py-3 rounded-xl font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
        >
          Close Curatorial Notes
        </button>
      </div>
    </div>
  )
}

// ── 3. Completely Rebuilt Right 30% Panel from Scratch ────────────────────────
export function EventAdvertisingPanel() {
  const [isPassModalOpen, setIsPassModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  return (
    <>
      <aside
        className="w-full h-full overflow-y-auto bg-[#FAF8F5] text-[#16221B] px-6 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-7 flex flex-col justify-between select-text custom-scrollbar border-l border-[#E3DDD3] shadow-[-8px_0_32px_rgba(0,0,0,0.04)]"
        aria-label="Exhibition Editorial Sidebar"
      >
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* ── 1. TOP HEADER ────────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#1E362A] flex items-center justify-center text-white">
                  <Landmark size={12} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] sm:text-[10.5px] tracking-[0.22em] uppercase font-bold text-[#16221B] leading-tight font-serif">
                    THE EUROPEAN MUSEUM
                  </span>
                  <span className="text-[8.5px] sm:text-[9px] tracking-[0.2em] uppercase text-[#66776F] font-medium leading-tight">
                    OF FINE ART
                  </span>
                </div>
              </div>

              <span
                className="font-serif text-[13.5px] font-semibold tracking-wider text-[#1E362A]"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
              >
                NO. 001
              </span>
            </div>

            {/* Thin divider */}
            <div className="h-px bg-[#E3DDD3] w-full" />
          </div>

          {/* ── 2. EXACT HERO DESIGN ELEMENT (CENTERED STANDALONE SECTION) ─────── */}
          <section
            aria-label="Exhibition Invitation Hero"
            className="flex flex-col items-start text-left space-y-2.5 sm:space-y-3 py-1"
          >
            {/* AN OPEN INVITATION */}
            <span className="text-[10.5px] sm:text-[11px] tracking-[0.26em] uppercase font-bold text-[#16221B] block">
              AN OPEN INVITATION
            </span>

            {/* Three Overlapping Thin Circular Rings */}
            <div className="py-1">
              <svg
                width="88"
                height="44"
                viewBox="0 0 88 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#7E9D8B]"
                aria-hidden="true"
              >
                <circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="44" cy="22" r="18" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="66" cy="22" r="18" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </div>

            {/* COME A LITTLE CLOSER */}
            <span className="text-[9.5px] sm:text-[10px] tracking-[0.24em] uppercase font-semibold text-[#788880] block">
              COME A LITTLE CLOSER
            </span>

            {/* Main Heading: Not just art. / An experience. */}
            <h1
              className="font-serif text-[36px] sm:text-[40px] xl:text-[44px] leading-[1.04] tracking-[-0.025em] text-[#16221B] pt-0.5"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              <span className="block font-semibold">Not just art.</span>
              <span className="block italic font-normal text-[#213C2D]">
                An experience.
              </span>
            </h1>
          </section>

          {/* ── 3. DESCRIPTION (~3 lines) ────────────────────────────────────── */}
          <div>
            <p className="text-[13px] sm:text-[13.5px] text-[#55635C] leading-[1.65] font-normal">
              Some things are better felt than explained. Step inside, slow down, and discover something that speaks to you.
            </p>
          </div>

          {/* ── 4. FEATURED EXHIBITION ───────────────────────────────────────── */}
          <div className="space-y-2">
            <div className="h-px bg-[#E3DDD3] w-full" />
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C2613D] flex-shrink-0" />
                <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#16221B]">
                  THE LIVING GALLERY
                </h2>
              </div>
              <p className="text-[12px] text-[#6B7870] mt-0.5 pl-4 font-normal">
                Contemporary art, without boundaries.
              </p>
            </div>

            {/* Small Controlled Exhibition Thumbnail */}
            <div className="relative rounded-xl overflow-hidden border border-[#E3DDD3] aspect-[16/8] shadow-xs bg-[#EDE8DF] mt-2 group">
              <img
                src="/artworks/art_1.jpg"
                alt="The Living Gallery Fresco"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 left-2.5 right-2.5 text-white flex items-center justify-between">
                <span
                  className="text-[10.5px] font-serif font-medium text-white/95 truncate"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Grand Rotunda Fresco · c. 1780
                </span>
                <span className="text-[8px] uppercase tracking-wider bg-white/85 text-[#1E362A] px-1.5 py-0.5 rounded font-bold backdrop-blur-xs">
                  Highlight
                </span>
              </div>
            </div>
          </div>

          {/* ── 5. EXHIBITION INFORMATION (2-Column Grid) ────────────────────── */}
          <section
            aria-label="Exhibition Schedule Information"
            className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white border border-[#E3DDD3] shadow-xs"
          >
            {/* DATE */}
            <div className="flex flex-col">
              <span className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-[#788880]">
                DATE
              </span>
              <span className="text-[11.5px] font-semibold text-[#16221B] mt-0.5">
                15 OCT — 30 NOV 2026
              </span>
            </div>

            {/* TIME */}
            <div className="flex flex-col">
              <span className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-[#788880]">
                TIME
              </span>
              <span className="text-[11.5px] font-semibold text-[#16221B] mt-0.5">
                10:00 AM — 7:00 PM
              </span>
            </div>

            {/* LOCATION */}
            <div className="flex flex-col pt-1.5 border-t border-[#F0EBE3]">
              <span className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-[#788880]">
                LOCATION
              </span>
              <span className="text-[11.5px] font-semibold text-[#16221B] mt-0.5">
                Grand Master Hall
              </span>
            </div>

            {/* ENTRY */}
            <div className="flex flex-col pt-1.5 border-t border-[#F0EBE3]">
              <span className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-[#788880]">
                ENTRY
              </span>
              <span className="text-[11.5px] font-semibold text-[#1E362A] mt-0.5">
                Free Exhibition Pass
              </span>
            </div>
          </section>

          {/* ── 6. PRIMARY CTA BUTTON ────────────────────────────────────────── */}
          <div className="space-y-2 pt-0.5">
            <button
              id="btn-join-exhibition"
              onClick={() => setIsPassModalOpen(true)}
              className="w-full bg-[#1E362A] hover:bg-[#16281F] text-white px-5 py-3.5 rounded-xl flex items-center justify-between shadow-[0_4px_16px_rgba(30,54,42,0.22)] hover:shadow-[0_6px_22px_rgba(30,54,42,0.32)] cursor-pointer transition-all duration-300 group"
            >
              <span className="text-[13.5px] font-semibold tracking-wide">
                JOIN THE EXHIBITION
              </span>
              <ArrowRight
                size={16}
                className="text-white/90 group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>

            <p className="text-[11px] text-[#788880] text-center font-normal">
              Everyone is welcome. Curiosity is all you need.
            </p>
          </div>

          {/* ── 7. EXPERIENCE SECTION (3 Compact Rows) ───────────────────────── */}
          <section aria-label="Museum Experience Points" className="space-y-2">
            <div className="h-px bg-[#E3DDD3] w-full" />

            <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-[#788880] block pt-0.5">
              THE EXPERIENCE
            </span>

            <div className="space-y-2 text-xs">
              {/* Row 01 */}
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/70 transition-colors">
                <span className="font-mono text-[11px] font-bold text-[#7E9D8B] w-5">
                  01
                </span>
                <span className="font-semibold text-[#16221B] text-[12px]">
                  Explore the Master Hall
                </span>
              </div>

              {/* Row 02 */}
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/70 transition-colors">
                <span className="font-mono text-[11px] font-bold text-[#7E9D8B] w-5">
                  02
                </span>
                <span className="font-semibold text-[#16221B] text-[12px]">
                  Discover Featured Paintings
                </span>
              </div>

              {/* Row 03 */}
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/70 transition-colors">
                <span className="font-mono text-[11px] font-bold text-[#7E9D8B] w-5">
                  03
                </span>
                <span className="font-semibold text-[#16221B] text-[12px]">
                  Interactive Artwork Viewing
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ── 8. BOTTOM EDITORIAL FOOTER ────────────────────────────────────── */}
        <footer className="pt-4 mt-4 border-t border-[#E3DDD3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Overlapping Monograms (É, M, A) */}
            <div className="flex items-center -space-x-1.5" aria-hidden="true">
              <div
                className="w-6 h-6 rounded-full bg-[#EDE7DD] border border-[#FAF8F5] flex items-center justify-center text-[#16221B] font-serif text-[10px] font-bold shadow-xs"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                É
              </div>
              <div
                className="w-6 h-6 rounded-full bg-[#BD5E3B] border border-[#FAF8F5] flex items-center justify-center text-white font-serif text-[10px] font-bold shadow-xs"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                M
              </div>
              <div
                className="w-6 h-6 rounded-full bg-[#7E9D8B] border border-[#FAF8F5] flex items-center justify-center text-white font-serif text-[10px] font-bold shadow-xs"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                A
              </div>
            </div>

            {/* Editorial Caption */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-[#6B7870] font-normal leading-none">
                Different minds.
              </span>
              <span className="text-[11px] text-[#16221B] font-semibold leading-none mt-1">
                One shared space.
              </span>
            </div>
          </div>

          {/* Downward Arrow Trigger */}
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#55635C] hover:text-[#16221B] transition-colors cursor-pointer"
            title="Exhibition Notes & Overview"
            aria-label="Read curatorial notes"
          >
            <ArrowDown size={16} />
          </button>
        </footer>
      </aside>

      {/* Modal Dialogs */}
      <JoinUsModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />
      <ExhibitionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </>
  )
}
