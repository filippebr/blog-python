// ToastWrapper.tsx
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

export default function ToastWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Dynamically import the Toastify CSS on mount
    import('react-toastify/dist/ReactToastify.css').then(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) return null;

  return <ToastContainer position="bottom-right" />;
}