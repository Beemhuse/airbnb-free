'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import FloatingInput from '@/components/ui/floating-input'
import { FloatingCountrySelector } from '../CountrySelector'
import Modal from '../Modal'

interface PhoneEntryScreenProps {
  // eslint-disable-next-line no-unused-vars
  onContinue: (_phone: string, _country: string) => Promise<void>



  onBack: () => void
  isOpen: boolean
  initialData?: {
    phone?: string
    country?: string
  }
}

export function PhoneEntryScreen({
  onContinue,
  onBack,
  isOpen,
  initialData,
}: PhoneEntryScreenProps) {
  const [phone, setPhone] = useState(initialData?.phone || '')
  const [country, setCountry] = useState(
    initialData?.country || 'Nigeria (+234)'
  )
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sendAppLink, setSendAppLink] = useState(false)

  const isButtonDisabled = loading || !phone.trim()

  const handleContinue = async () => {
    setError(null)
    if (!phone.trim()) {
      setError('Please enter a phone number')
      return
    }
    setLoading(true)
    try {
      await onContinue(phone, country)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {

      setLoading(false)
    }
  }


  return (
    <Modal
      isOpen={isOpen}
      onClose={onBack}
      showBackButton
      title="Create your profile"
    >
      {/* HEADER */}
      <div className="mb-6 text-center">
        <p className="text-[11px] font-semibold text-neutral-400 tracking-widest mb-2">
          STEP 1 OF 2
        </p>

        <h2 className="text-[22px] font-semibold text-neutral-900 mb-2">
          Confirm your phone number
        </h2>

        <p className="text-sm text-neutral-600 leading-relaxed">
          This is so your Hosts, guests, or Airbnb can reach you.
        </p>
      </div>

      {/* INPUT GROUP */}
      <div className="mb-4 border border-neutral-300 rounded-xl overflow-hidden">
        <FloatingCountrySelector value={country} onChange={setCountry} />

        <FloatingInput
          label="Phone number"
          type="tel"
          value={phone}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setPhone(val);
          }}
          containerClassName="border-0 border-t border-neutral-300 rounded-none"
          errorMessage={error || undefined}
        />

      </div>

      {/* INFO TEXT */}
      <p className="text-xs text-neutral-500 mb-4">
        We'll call or text you to confirm your number. Standard message and data
        rates apply.
      </p>

      {/* CHECKBOX */}
      <label className="flex items-center gap-2 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={sendAppLink}
          onChange={(e) => setSendAppLink(e.target.checked)}
          className="w-4 h-4 border-neutral-300 rounded"
        />
        <span className="text-sm text-neutral-700">
          Text me a link to the free Airbnb app
        </span>
      </label>

      {/* BUTTON */}
      <Button
        onClick={handleContinue}
        disabled={isButtonDisabled}
        className={`
          w-full h-12 mb-4 text-base font-semibold rounded-lg transition-colors
          ${
            isButtonDisabled
              ? 'bg-neutral-400 text-white cursor-not-allowed opacity-100'
              : 'bg-neutral-900 hover:bg-neutral-800 text-white'
          }
        `}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
          </div>
        ) : (
          'Continue'
        )}
      </Button>


      {/* FOOTER LINK */}
      <p className="text-center">
        <button
          onClick={onBack}
          className="text-sm text-neutral-700 underline hover:text-neutral-900"
        >
          I'll do this later
        </button>
      </p>
    </Modal>
  )
}