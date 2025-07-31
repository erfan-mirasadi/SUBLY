import React from 'react'
import PinField from "react-pin-field";

export default function PinInput({
  error,
  length = 4,
  disabled = false,
  value,
  onChange,
  onComplete,
}) {
  const handleChange = (value) => {
    if (typeof onChange === 'function') {
      if (onChange.length === 1) {
        // Simple function that takes a string
        (onChange)(value);
      } else {
        // react-hook-form ChangeHandler
        (onChange)({
          target: {
            name: 'code',
            value
          }
        });
      }
    }
  }

  const handleComplete = (value) => {
    if (typeof onChange === 'function') {
      if (onChange.length === 1) {
        // Simple function that takes a string
        (onChange)(value);
      } else {
        // react-hook-form ChangeHandler
        (onChange)({
          target: {
            name: 'code',
            value
          }
        });
      }
    }
    onComplete?.(value);
  }

  return (
    <div className='relative w-full flex flex-col'>
        <div className='flex relative flex-row-reverse justify-between items-center gap-4 ' dir='ltr'>
          <PinField
            className={`outline-none text-[16px] w-[20%] text-center mx-1 h-[48px] rounded-md border ${error ? 'border-error text-error' : 'border-foreground text-foreground'} focus:shadow-small`}
            inputMode='numeric'
            length={length}
            onChange={handleChange}
            onComplete={handleComplete}
            disabled={disabled}
            value={typeof value === 'string' ? value : ''}
            />
        </div>
        <span className='h-[20px] text-error text-[12px]'>{error}</span>
    </div>
  )
}