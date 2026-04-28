'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FloatingInput from '@/components/ui/floating-input';
import Modal from '../Modal';
import { useToast } from '@/hooks/use-toast';

interface LoginPasswordScreenProps {
  identifier: string;
  onContinue: (_password: string) => Promise<void>;

  onBack: () => void;
  onClose?: () => void;
  isOpen: boolean;
}

export function LoginPasswordScreen({
  identifier,
  onContinue,
  onBack,
  onClose,
  isOpen,
}: LoginPasswordScreenProps) {

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleContinue = async () => {
    if (!password) return;
    setLoading(true);
    try {
      await onContinue(password);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose || onBack}
      showBackButton
      title="Log in"
    >

      <div className="mb-8">
        <h2 className="text-[22px] font-semibold text-neutral-900 mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-neutral-600">
          Enter your password for {identifier}
        </p>
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
        className="space-y-4"
      >
        <div className="space-y-4 mb-8">
          <div className="relative">
            <FloatingInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold underline text-neutral-900"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || !password}
          className={`w-full h-12 text-base font-semibold rounded-lg mb-4 ${
            loading || !password
              ? 'bg-neutral-400 text-white cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
            </div>
          ) : (
            'Log in'
          )}
        </Button>
      </form>


      <div className="text-center">
        <button className="text-sm font-semibold underline text-neutral-900">
          Forgot password?
        </button>
      </div>
    </Modal>
  );
}
