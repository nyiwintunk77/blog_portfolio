import { useEffect, useState } from 'react';

export const useMenu = (ref1, ref2) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside({ target }) {
      if (
        ref1.current &&
        !ref1.current.contains(target) &&
        !ref2.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref1, ref2]);

  return [isMenuOpen, setIsMenuOpen];
};
