'use client';
import { useFormStatus } from 'react-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type SubmitButtonProps = {
  children: React.ReactNode;
} & ButtonProps;


export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full rounded-2xl text-lg font-bold py-6" {...props}>
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
