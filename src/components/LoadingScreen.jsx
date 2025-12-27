import { FiLoader } from "react-icons/fi";

export function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizes[size]} animate-spin`}>
      <FiLoader className="w-full h-full text-amber-600" />
    </div>
  );
}