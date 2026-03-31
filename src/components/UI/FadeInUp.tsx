import { useEffect, useRef, useState } from 'react';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInUp({ children, delay = 0, className = "" }: FadeInUpProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the element crosses into the screen (even on initial load)
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current!); // Stop observing once it appears
        }
      },
      { 
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      // Add ${className} right at the start of your classes!
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
