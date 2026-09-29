import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const control =
  'w-full border-0 border-b border-stone-300 bg-transparent px-0 py-3 text-base text-stone-900 placeholder:text-stone-400 transition-colors duration-300 focus:border-sage-600 focus:outline-none focus:ring-0';

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FieldShell: React.FC<FieldShellProps> = ({ id, label, required, className, children }) => (
  <div className={cn('flex flex-col', className)}>
    <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.16em] text-stone-600">
      {label}
      {required && (
        <span className="text-sage-600" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
    {children}
  </div>
);

type InputFieldProps = { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = ({ label, id, className, ...rest }) => (
  <FieldShell id={id} label={label} required={rest.required} className={className}>
    <input id={id} className={control} {...rest} />
  </FieldShell>
);

type TextareaFieldProps = {
  label: string;
  id: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextareaField: React.FC<TextareaFieldProps> = ({ label, id, className, ...rest }) => (
  <FieldShell id={id} label={label} required={rest.required} className={className}>
    <textarea id={id} className={cn(control, 'resize-none')} {...rest} />
  </FieldShell>
);

type SelectFieldProps = {
  label: string;
  id: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  className,
  children,
  ...rest
}) => (
  <FieldShell id={id} label={label} required={rest.required} className={className}>
    <div className="relative">
      <select id={id} className={cn(control, 'appearance-none pr-8')} {...rest}>
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
        aria-hidden="true"
      />
    </div>
  </FieldShell>
);
