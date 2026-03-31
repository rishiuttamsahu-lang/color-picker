import { useEffect, useRef, useState } from 'react';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string; // Add ID prop
}

export function FadeInUp({ children, delay = 0, className = "", id }: FadeInUpProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hash Link Check (For clicking anchor links like #features)
    const currentHash = window.location.hash;
    if (id && currentHash === `#${id}`) {
      setIsVisible(true);
      return; 
    }

    // 2. NEW FIX: Browser "Back" Button Scroll Restoration Check
    // If the element is already inside or above the viewport the moment it mounts,
    // force it to be visible instantly to prevent blank gaps.
    if (domRef.current) {
      const rect = domRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setIsVisible(true);
        return; // Skip the observer entirely!
      }
    }

    // 3. Normal Observer Logic (For regular scrolling down the page)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current!);
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1 
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, [id]);

  return (
    <div
      id={id} // Apply the ID to the wrapper
      ref={domRef}
      className={`${className} transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10' 
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
