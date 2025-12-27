import { FiLoader } from "react-icons/fi";

export function LoadingSpinner({ size = 'md', message }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizes[size]} animate-spin`}>
        <FiLoader className="w-full h-full text-amber-600" />
      </div>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
}
