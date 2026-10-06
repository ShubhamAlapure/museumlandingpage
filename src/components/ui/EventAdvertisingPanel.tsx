import { useState } from 'react'
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  X,
  Landmark,
  ShieldCheck,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Compass,
  Eye,
  Share2,
} from 'lucide-react'

// ── 1. Pass Registration Modal Component ─────────────────────────────────────
function ExhibitionPassModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [patronName, setPatronName] = useState('')
  const [patronEmail, setPatronEmail] = useState('')
  const [selectedDate, setSelectedDate] = useState('Immediate Access (Today)')
  const [isClaimed, setIsClaimed] = useState(false)
  const [passNumber] = useState(() => Math.floor(100000 + Math.random() * 900000))
  const [isCopied, setIsCopied] = useState(false)

  if (!isOpen) return null

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    if (patronName.trim()) {
      setIsClaimed(true)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(`EMFA-PASS-#${passNumber}-${patronName}`)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-2xl border border-[#E3DDD3] shadow-[0_24px_64px_rgba(0,0,0,0.35)] p-6 sm:p-7 text-[#16221B] overflow-hidden max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#55635C] hover:text-[#16221B] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={17} />
        </button>

        {!isClaimed ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C2613D]" />
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#1E362A] font-bold">
                Complimentary Pass
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-serif text-[#16221B] mb-1.5 leading-tight"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
            >
              Claim Exhibition Pass
            </h2>

            <p className="text-xs text-[#55635C] mb-5 leading-relaxed">
              Full honorary access to the 3D Master Hall, interactive painting inspection, and curated European fine art collections.
            </p>

            <form onSubmit={handleClaim} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-semibold text-[#66776F] uppercase tracking-wider mb-1">
                  Patron Name *
                </label>
                <input
                  type="text"
                  required
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  placeholder="e.g. Lady Catherine Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DDD3] text-xs text-[#16221B] placeholder-[#9CA3AF] focus:border-[#1E362A] focus:ring-1 focus:ring-[#1E362A] focus:outline-none transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#66776F] uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={patronEmail}
                  onChange={(e) => setPatronEmail(e.target.value)}
                  placeholder="catherine.vance@fineart.org"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DDD3] text-xs text-[#16221B] placeholder-[#9CA3AF] focus:border-[#1E362A] focus:ring-1 focus:ring-[#1E362A] focus:outline-none transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#66776F] uppercase tracking-wider mb-1">
                  Visiting Season
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DDD3] text-xs text-[#16221B] focus:border-[#1E362A] focus:ring-1 focus:ring-[#1E362A] focus:outline-none transition-all shadow-xs cursor-pointer"
                >
                  <option value="Immediate Access (Today)">Immediate Access (Today)</option>
                  <option value="15 OCT — 30 NOV 2026">15 OCT — 30 NOV 2026 (Exhibition Season)</option>
                  <option value="Winter Gala 2026">Winter Gala 2026</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1E362A] hover:bg-[#16281F] text-white py-3.5 rounded-xl font-semibold text-xs uppercase tracking-widest cursor-pointer shadow-[0_4px_16px_rgba(30,54,42,0.25)] hover:shadow-[0_6px_22px_rgba(30,54,42,0.35)] transition-all flex items-center justify-center gap-2 group"
                >
                  <Ticket size={15} className="group-hover:rotate-12 transition-transform duration-200" />
                  Issue Exhibition Pass
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300 text-center">
            <div className="w-12 h-12 rounded-full bg-[#7E9D8B]/20 border border-[#7E9D8B]/50 flex items-center justify-center mx-auto text-[#1E362A]">
              <CheckCircle2 size={24} />
            </div>

            <div>
              <span className="text-[9.5px] tracking-[0.25em] uppercase text-[#1E362A] font-bold">
                Pass Confirmed · Verified
              </span>
              <h2
                className="text-2xl font-serif text-[#16221B] mt-1"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
              >
                Welcome, {patronName}
              </h2>
            </div>

            {/* Commemorative Pass Card */}
            <div className="rounded-xl border border-[#E3DDD3] bg-white p-4 text-left shadow-xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#EBE5DB] pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Landmark size={14} className="text-[#1E362A]" />
                  <span className="text-[9px] uppercase tracking-wider text-[#1E362A] font-bold">
                    The European Museum of Fine Art
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#55635C]">
                  № {passNumber}
                </span>
              </div>

              <div className="space-y-1">
                <h3
                  className="text-lg font-serif text-[#16221B] font-semibold"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                >
                  The Living Gallery
                </h3>
                <p className="text-[11px] text-[#1E362A] font-medium">
                  Grand Master Hall · Complimentary Admission
                </p>
                <div className="flex items-center gap-2 text-[10px] text-[#66776F] pt-0.5">
                  <Calendar size={11} className="text-[#C2613D]" />
                  <span>15 OCT — 30 NOV 2026</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-[#EBE5DB] text-[10px] text-[#55635C]">
                <span>
                  Holder: <strong className="text-[#16221B] font-semibold">{patronName}</strong>
                </span>
                <span className="text-[#1E362A] flex items-center gap-1 font-semibold">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onClose}
                className="flex-1 bg-[#1E362A] hover:bg-[#16281F] text-white py-3 rounded-xl font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-xs"
              >
                Enter Museum Hall
              </button>
              <button
                onClick={handleCopyCode}
                className="px-3.5 py-3 rounded-xl border border-[#E3DDD3] hover:bg-black/5 text-xs font-medium text-[#55635C] hover:text-[#16221B] transition-colors cursor-pointer flex items-center gap-1.5"
                title="Copy Pass Reference"
              >
                {isCopied ? <CheckCircle2 size={13} className="text-[#1E362A]" /> : <Share2 size={13} />}
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
      <ExhibitionPassModal
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
