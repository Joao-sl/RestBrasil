import clsx from 'clsx';
import { useId } from 'react';

type InputProps = React.ComponentPropsWithRef<'input'> & {
  fullWidth?: boolean;
  label?: string;
  inputSize?: 'sm' | 'md' | 'lg';
  error?: string;
  ariaLabel: string;
};

export function Input({
  fullWidth,
  label,
  inputSize = 'md',
  error,
  ariaLabel,

  ...props
}: InputProps) {
  // TODO: Apply styles to the component

  const genId = useId();
  const id = props.id ?? genId;

  const inputSizeMap = {
    sm: 'text-sm h-8',
    md: 'text-md h-9',
    lg: 'text-lg h-10',
  };

  return (
    <div className={clsx('flex flex-col', fullWidth ? 'w-full' : undefined)}>
      {label && (
        <label htmlFor={id} className='text-sm font-semibold mb-1'>
          {label}
        </label>
      )}

      <input
        {...props}
        id={id}
        aria-describedby={`error-${id}`}
        aria-label={ariaLabel}
        className={clsx(
          inputSizeMap[inputSize],
          'px-3 py-1 rounded-lg border border-muted/50',
          'transition duration-400 focus-visible:ring-2 outline-none',
          'disabled:bg-muted disabled:border-transparent',
        )}
      />
      {error && (
        <p id={`error-${id}`} className='text-sm text-red-500' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
}
