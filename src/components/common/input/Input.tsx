import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helperText?: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, helperText, label, ...props }, ref) => (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        aria-describedby={
          error
            ? `${props.id}-error`
            : helperText
              ? `${props.id}-helper`
              : undefined
        }
        aria-invalid={error ? 'true' : 'false'}
        className={`input ${error ? 'input-error' : ''} ${className}`}
        ref={ref}
        {...props}
      />
      {error && (
        <span
          className="input-error-text"
          id={`${props.id}-error`}
          role="alert"
        >
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="input-helper-text" id={`${props.id}-helper`}>
          {helperText}
        </span>
      )}
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
