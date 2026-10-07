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

// ── 1. Clean Premium "JOIN US" Registration Modal (from Reference Design) ─────
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 select-text"
    >
      <div className="relative w-full max-w-[500px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-[#E5E7EB] p-7 sm:p-9 text-[#1E1D2E] overflow-hidden max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={19} />
        </button>

        {!isRegistered ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[#161834] uppercase"
                style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }}
              >
                JOIN US
              </h2>
              <p className="text-sm text-[#4B5563] mt-1 font-normal">
                Enter your details to get access
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#2D3748] mb-1.5 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[#D1D5DB] text-xs sm:text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#2D3748] mb-1.5 text-left">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[#D1D5DB] text-xs sm:text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors"
                />
              </div>

              {/* Password with Show/Hide Toggle */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#2D3748] mb-1.5 text-left">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2.5 sm:py-3 pr-11 rounded-lg border border-[#D1D5DB] text-xs sm:text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-[#6B7280] hover:text-[#111827] cursor-pointer p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* User Type Selection Radio */}
              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs sm:text-[13px] text-[#374151]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="userType"
                    value="collector"
                    checked={userType === 'collector'}
                    onChange={() => setUserType('collector')}
                    className="w-4 h-4 text-[#2563EB] accent-[#2563EB] cursor-pointer"
                  />
                  <span>I am an art lover, a collector</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="userType"
                    value="artist"
                    checked={userType === 'artist'}
                    onChange={() => setUserType('artist')}
                    className="w-4 h-4 text-[#2563EB] accent-[#2563EB] cursor-pointer"
                  />
                  <span>I am an artist</span>
                </label>
              </div>

              {/* reCAPTCHA Verification Component */}
              <div className="pt-1">
                <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3.5 py-2.5 w-full max-w-[270px] shadow-xs select-none">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={handleCaptchaClick}
                  >
                    <div
                      className={`w-6 h-6 rounded border transition-all flex items-center justify-center ${
                        captchaVerified
                          ? 'bg-[#10B981] border-[#10B981] text-white'
                          : isCaptchaChecking
                          ? 'border-[#3B82F6] animate-pulse'
                          : 'bg-white border-[#D1D5DB] hover:border-[#9CA3AF]'
                      }`}
                    >
                      {captchaVerified && (
                        <Check size={16} strokeWidth={3} className="text-white" />
                      )}
                      {isCaptchaChecking && (
                        <div className="w-3.5 h-3.5 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-[#222222]">
                      I'm not a robot
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center pl-2">
                    <svg className="w-6 h-6 text-[#1A73E8]" viewBox="0 0 48 48" fill="none">
                      <path
                        d="M24 8V2L16 10L24 18V12C30.63 12 36 17.37 36 24C36 26.04 35.48 27.96 34.58 29.64L37.52 32.58C39.08 30.06 40 27.14 40 24C40 15.16 32.84 8 24 8ZM24 36C17.37 36 12 30.63 12 24C12 21.96 12.52 20.04 13.42 18.36L10.48 15.42C8.92 17.94 8 20.86 8 24C8 32.84 15.16 40 24 40V46L32 38L24 30V36Z"
                        fill="#1A73E8"
                      />
                    </svg>
                    <span className="text-[7.5px] text-[#9CA3AF] tracking-tight font-sans">
                      reCAPTCHA
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms and Privacy Policy Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37] cursor-pointer"
                  />
                  <span className="text-xs text-[#4B5563] leading-snug">
                    By Registering, I Accept The Terms & Conditions & Privacy Policy Of Zigguratss Artwork LLP.
                  </span>
                </label>
              </div>

              {/* Action Buttons: Gold JOIN US / OR / Join Using Google */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto sm:min-w-[150px] bg-[#D4AF37] hover:bg-[#C29B27] active:bg-[#B08A1E] text-white py-3 px-7 rounded-full font-semibold text-xs sm:text-[13px] uppercase tracking-wider cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 text-center"
                >
                  JOIN US
                </button>

                <span className="text-xs sm:text-sm font-medium text-[#6B7280] uppercase tracking-wide">
                  OR
                </span>

                <button
                  type="button"
                  onClick={handleGoogleJoin}
                  className="w-full sm:w-auto sm:min-w-[185px] bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-[#E5E7EB] text-[#374151] py-2.5 px-4 rounded-full text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-xs"
                >
                  {/* Google Multicolor 'G' Icon */}
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center mx-auto text-[#10B981]">
              <CheckCircle2 size={30} />
            </div>

            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-bold">
                Pass Confirmed · Verified
              </span>
              <h2
                className="text-2xl font-serif text-[#161834] mt-1"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
              >
                Welcome, {fullName || 'Patron'}
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                You have received honorary access as an{' '}
                <strong className="text-[#161834]">
                  {userType === 'artist' ? 'Artist Patron' : 'Art Lover & Collector'}
                </strong>
                .
              </p>
            </div>

            {/* Commemorative Pass Card */}
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-left shadow-xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Landmark size={14} className="text-[#D4AF37]" />
                  <span className="text-[9px] uppercase tracking-wider text-[#161834] font-bold">
                    Zigguratss Artwork · Grand Master Hall
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#6B7280]">
                  № {passNumber}
                </span>
              </div>

              <div className="space-y-1">
                <h3
                  className="text-base font-serif text-[#161834] font-semibold"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                >
                  The Living Gallery Exhibition
                </h3>
                <p className="text-[11px] text-[#4B5563]">
                  Grand Master Hall · 3D Interactive Exhibition
                </p>
                <div className="flex items-center gap-2 text-[10px] text-[#6B7280] pt-0.5">
                  <Calendar size={11} className="text-[#D4AF37]" />
                  <span>15 OCT — 30 NOV 2026</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-[#E5E7EB] text-[10px] text-[#6B7280]">
                <span>
                  Holder: <strong className="text-[#161834] font-semibold">{fullName || 'Patron'}</strong>
                </span>
                <span className="text-[#10B981] flex items-center gap-1 font-semibold">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-[#D4AF37] hover:bg-[#C29B27] text-white py-3 rounded-full font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-xs"
              >
                Enter Museum Hall
              </button>
              <button
                onClick={handleCopyCode}
                className="px-4 py-3 rounded-full border border-[#E5E7EB] hover:bg-black/5 text-xs font-medium text-[#4B5563] hover:text-[#111827] transition-colors cursor-pointer flex items-center gap-1.5"
                title="Copy Pass Reference"
              >
                {isCopied ? <CheckCircle2 size={13} className="text-[#10B981]" /> : <Share2 size={13} />}
                {isCopied ? 'Copied' : 'Share'}
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
