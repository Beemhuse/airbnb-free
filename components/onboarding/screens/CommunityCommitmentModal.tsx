'use client'

import { Button } from '@/components/ui/button'
import Modal from '../Modal'

interface CommunityCommitmentModalProps {
  onAgree: () => void
  onDecline: () => void
  isOpen: boolean
}

export function CommunityCommitmentModal({
  onAgree,
  onDecline,
  isOpen,
}: CommunityCommitmentModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onDecline}
      showBackButton={false}
      className="max-w-md"
    >
      <div className="mb-6">
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>

      <p className="text-sm text-neutral-600 font-medium mb-2">Our community commitment</p>

      <h2 className="text-2xl font-bold text-neutral-900 mb-4">
        Airbnb is a community where anyone can belong
      </h2>

      <p className="text-neutral-700 mb-4">
        To ensure this, we&apos;re asking you to commit to the following:
      </p>

      <p className="text-neutral-700 mb-6 leading-relaxed">
        I agree to treat everyone in the Airbnb community—regardless of their race, religion, national origin, ethnicity, skin color, disability, sex, gender identity, sexual orientation or age—with respect, and without judgment or bias.
      </p>

      <a href="#" className="text-blue-600 hover:underline text-sm font-medium mb-6 inline-flex items-center gap-1">
        Learn more
        <span>›</span>
      </a>

      <div className="space-y-3">
        <Button
          onClick={onAgree}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold rounded-lg"
        >
          Agree and continue
        </Button>

        <Button
          onClick={onDecline}
          variant="outline"
          className="w-full h-12 border border-neutral-300 hover:bg-neutral-50 text-neutral-900 text-base font-semibold rounded-lg"
        >
          Decline
        </Button>
      </div>
    </Modal>
  )
}
