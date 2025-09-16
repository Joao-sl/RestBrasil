'use client';

import clsx from 'clsx';
import Select from 'react-select';
import type { Props } from 'react-select';
import { useId } from 'react';

function InputSelect({ ...props }: Props) {
  const genId = useId();
  const id = props.inputId || genId;

  return (
    <Select
      inputId={id}
      instanceId={id}
      unstyled
      {...props}
      classNames={{
        control: state =>
          clsx(
            'text-sm p-3 h-[49px] rounded-xl border border-input',
            'shadow-xs transition-[color,box-shadow] dark:bg-input/30',
            state.isFocused ? 'border-ring ring-ring/50 ring-[3px]' : null,
            state.isDisabled ? 'disabled:opacity-50' : null,
          ),
        placeholder: () => 'text-muted-foreground',
        indicatorsContainer: state =>
          clsx(
            '[&_svg]:hover:text-muted-foreground',
            state.isDisabled ? 'text-muted-foreground/50' : null,
          ),
        indicatorSeparator: () => 'hidden',
        menu: () =>
          clsx(
            'mt-2 overflow-y-hidden border border-input shadow-xs',
            'bg-card rounded-xl py-1',
          ),
        menuList: () => 'max-h-60',
        option: state =>
          clsx(
            'py-2 px-3',
            state.isSelected
              ? 'bg-primary/80 text-white'
              : 'hover:bg-primary/20',
          ),
        multiValue: () =>
          clsx(
            'flex gap-1 items-center justify-center pl-2',
            'bg-slate-200 overflow-hidden rounded-xl',
          ),
        multiValueRemove: () =>
          'py-1.5 px-1 rounded-xl hover:bg-red-400 hover:text-white',
        valueContainer: () => 'flex gap-1',
      }}
      styles={{
        control: base => ({
          ...base,
          transition: 'border-ring duration',
          cursor: 'pointer',
        }),
        input: base => ({
          ...base,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          display: 'inline-block',
        }),
      }}
    />
  );
}

export { InputSelect };
