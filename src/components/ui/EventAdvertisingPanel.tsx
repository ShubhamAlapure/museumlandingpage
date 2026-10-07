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
    }, 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) {
      alert('Please accept the Terms & Conditions and Privacy Policy.')
      return
    }
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-text overflow-y-auto"
    >
      <div className="relative w-full max-w-[520px] min-h-[84vh] sm:min-h-[86vh] max-h-[96vh] my-auto bg-[#FAF8F5] rounded-[32px] sm:rounded-[36px] shadow-[0_30px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(204,160,48,0.25)] border border-[#E5DDD0] px-7 sm:px-12 py-10 sm:py-12 text-[#16221B] overflow-y-auto custom-scrollbar flex flex-col justify-between">
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
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-black/5 text-[#66776F] hover:text-[#16221B] transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isRegistered ? (
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            {/* Museum Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCA030]" />
                <span
                  className="text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase font-bold text-[#C59A27]"
                  style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                >
                  THE LIVING GALLERY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCA030]" />
              </div>

              <h2
                className="text-[36px] sm:text-[42px] font-serif font-bold tracking-tight text-[#16221B] uppercase leading-none"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                JOIN US
              </h2>

              <p
                className="text-[13.5px] sm:text-[14px] text-[#64748B] mt-2.5 font-normal"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Enter your details to get access
              </p>

              {/* Decorative Subtle Line */}
              <div className="flex items-center justify-center gap-2.5 mt-4">
                <div className="h-px bg-[#E5DDD0] w-14" />
                <span className="text-[9px] text-[#CCA030]">◆</span>
                <div className="h-px bg-[#E5DDD0] w-14" />
              </div>
            </div>

            {/* Registration Form with Explicit Vertical Spacing */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
              <div>
                {/* 1. Full Name Group */}
                <div className="mb-5 sm:mb-5.5">
                  <label
                    className="block text-[12px] sm:text-[12.5px] uppercase tracking-[0.08em] font-semibold text-[#4B5563] mb-2 text-left"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    className="w-full px-4 sm:px-4.5 py-3 rounded-xl border border-[#DDD5C7] bg-white text-[14px] text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#C59A27] focus:ring-2 focus:ring-[#C59A27]/25 outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>

                {/* 2. Email Address Group (18-22px gap above) */}
                <div className="mb-5 sm:mb-5.5">
                  <label
                    className="block text-[12px] sm:text-[12.5px] uppercase tracking-[0.08em] font-semibold text-[#4B5563] mb-2 text-left"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    className="w-full px-4 sm:px-4.5 py-3 rounded-xl border border-[#DDD5C7] bg-white text-[14px] text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#C59A27] focus:ring-2 focus:ring-[#C59A27]/25 outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>

                {/* 3. Password Group (18-22px gap above) */}
                <div className="mb-5.5 sm:mb-6">
                  <label
                    className="block text-[12px] sm:text-[12.5px] uppercase tracking-[0.08em] font-semibold text-[#4B5563] mb-2 text-left"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="w-full px-4 sm:px-4.5 py-3 pr-12 rounded-xl border border-[#DDD5C7] bg-white text-[14px] text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#C59A27] focus:ring-2 focus:ring-[#C59A27]/25 outline-none transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-[#6B7280] hover:text-[#111827] cursor-pointer p-1 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                {/* 4. Role Radio Buttons (20-24px gap above) */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-6 mb-5.5 sm:mb-6 text-[13.5px] text-[#374151]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="userType"
                      value="collector"
                      checked={userType === 'collector'}
                      onChange={() => setUserType('collector')}
                      className="w-4 h-4 text-[#2563EB] accent-[#2563EB] cursor-pointer"
                    />
                    <span className="font-medium">I am an art lover, a collector</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="userType"
                      value="artist"
                      checked={userType === 'artist'}
                      onChange={() => setUserType('artist')}
                      className="w-4 h-4 text-[#2563EB] accent-[#2563EB] cursor-pointer"
                    />
                    <span className="font-medium">I am an artist</span>
                  </label>
                </div>

                {/* 5. reCAPTCHA Component (20-24px gap above) */}
                <div className="mb-5 sm:mb-5.5">
                  <div className="flex items-center justify-between bg-white border border-[#DDD5C7] rounded-xl px-4 py-3 w-full sm:w-[280px] shadow-2xs select-none">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={handleCaptchaClick}
                    >
                      <div
                        className={`w-6 h-6 rounded-[4px] border-2 transition-all flex items-center justify-center ${
                          captchaVerified
                            ? 'bg-[#10B981] border-[#10B981] text-white'
                            : isCaptchaChecking
                            ? 'border-[#3B82F6] animate-pulse'
                            : 'bg-white border-[#C1C7CD] hover:border-[#9CA3AF]'
                        }`}
                      >
                        {captchaVerified && (
                          <Check size={16} strokeWidth={3} className="text-white" />
                        )}
                        {isCaptchaChecking && (
                          <div className="w-3.5 h-3.5 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                      <span
                        className="text-[13px] sm:text-[13.5px] font-semibold text-[#111827]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        I'm not a robot
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center pl-2">
                      <svg className="w-6.5 h-6.5 text-[#1A73E8]" viewBox="0 0 48 48" fill="none">
                        <path
                          d="M24 8V2L16 10L24 18V12C30.63 12 36 17.37 36 24C36 26.04 35.48 27.96 34.58 29.64L37.52 32.58C39.08 30.06 40 27.14 40 24C40 15.16 32.84 8 24 8ZM24 36C17.37 36 12 30.63 12 24C12 21.96 12.52 20.04 13.42 18.36L10.48 15.42C8.92 17.94 8 20.86 8 24C8 32.84 15.16 40 24 40V46L32 38L24 30V36Z"
                          fill="#1A73E8"
                        />
                      </svg>
                      <span className="text-[7.5px] text-[#555555] tracking-tight font-sans mt-0.5 font-medium">
                        reCAPTCHA
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6. Terms & Privacy (18-22px gap above) */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <div
                      onClick={() => setAcceptedTerms(!acceptedTerms)}
                      className={`w-[19px] h-[19px] rounded-[4px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        acceptedTerms
                          ? 'bg-[#CCA030] text-white'
                          : 'border border-[#DDD5C7] bg-white text-transparent'
                      }`}
                    >
                      <Check size={13} strokeWidth={3.5} />
                    </div>
                    <span
                      className="text-[12px] sm:text-[12.5px] text-[#6B7280] font-normal leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      By Registering, I Accept The Terms & Conditions & Privacy Policy.
                    </span>
                  </label>
                </div>
              </div>

              {/* 7. Action Buttons (30-35px gap above) */}
              <div className="space-y-3.5 pt-7 sm:pt-8">
                <button
                  type="submit"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  className="w-full bg-gradient-to-r from-[#D4A838] via-[#CCA030] to-[#B88F28] hover:from-[#CCA030] hover:to-[#A68020] text-white py-3.5 px-6 rounded-full font-bold text-[14px] uppercase tracking-[0.14em] cursor-pointer shadow-[0_4px_18px_rgba(204,160,48,0.35)] hover:shadow-[0_6px_24px_rgba(204,160,48,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-center"
                >
                  JOIN US
                </button>

                {/* Elegant OR Divider with Fine Lines */}
                <div className="flex items-center gap-3.5 py-0.5">
                  <div className="h-px bg-[#E3DDD3] flex-1" />
                  <span
                    className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    OR
                  </span>
                  <div className="h-px bg-[#E3DDD3] flex-1" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleJoin}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  className="w-full bg-white hover:bg-[#F3EFEA] border border-[#DDD5C7] text-[#374151] py-3 px-6 rounded-full text-[13.5px] sm:text-[14px] font-medium flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all shadow-2xs"
                >
                  {/* Google Multicolor 'G' Icon */}
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Join Using Google</span>
                </button>
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
