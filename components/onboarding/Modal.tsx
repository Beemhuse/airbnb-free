"use client";

import { ReactNode } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  onBack?: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  showBackButton = false,
  showCloseButton = false,
  onBack,
  children,
  className = "",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-2xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto relative ${className}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center  justify-between w-2/3 gap-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-foreground hover:bg-neutral-100 p-0 h-auto w-auto"
              >
                <ChevronLeft />{" "}
              </Button>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-foreground hover:bg-neutral-100 p-0 h-auto w-auto"
              >
                <X className="w-6 h-6" />
              </Button>
            )}
            {title && (
              <h2 className="text-md  mr-6 font-semibold text-foreground">
                {title}
              </h2>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
