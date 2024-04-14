import { cn } from '@/lib/utils';

export default function Input({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  className,
  ...props
}) {
  return (
    <>
      <label
        htmlFor={name}
        className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        {...props}
        aria-describedby={`${name}-description`}
        className={cn(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base',
          className,
        )}
        placeholder={placeholder}
      />
    </>
  );
}
