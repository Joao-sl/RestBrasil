'use client';

import Select from 'react-select';
import type { Props } from 'react-select';
import { useId } from 'react';
import clsx from 'clsx';

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
            'text-md px-3 rounded-lg border border-input',
            'transition duration-400',
            state.isFocused ? 'border-ring ring-ring/50 ring-[3px]' : null,
            state.isDisabled ? 'bg-muted disabled:border-transparent' : null,
          ),
        placeholder: () => 'text-muted',
        indicatorsContainer: () =>
          '[&_svg]:hover:text-muted border-muted/50 hidden ',
        indicatorSeparator: () => 'hidden',
        menu: () =>
          clsx(
            'mt-2 overflow-y-hidden border border-muted/50',
            'bg-card rounded-lg py-1',
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
            'bg-slate-200 overflow-hidden rounded-lg',
          ),
        multiValueRemove: () =>
          'py-1.5 px-1 rounded-lg hover:bg-red-400 hover:text-white',
        valueContainer: () => 'flex gap-1',
      }}
      styles={{
        control: base => ({
          ...base,
          transition: 'border-ring duration',
          cursor: 'pointer',
          border: 'border-red-500',
        }),
      }}
    />
  );
}

export { InputSelect };
