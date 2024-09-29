import { useState, useEffect, useRef } from 'react';

interface TruncatedProductNameProps {
    name: string;
}

const TruncatedProductName = ({ name }: TruncatedProductNameProps) => {
  const [truncatedName, setTruncatedName] = useState(name);
  const nameRef = useRef<HTMLElement | null>(null);
  
  // Trims the name one word at a time if it overflows
  const truncateName = () => {
    const element = nameRef.current;
    if (!element) return;

    let words = name.split(" ");
    let newText = name;
    
    while (element.scrollWidth > element.clientWidth && words.length > 1) {
      words.pop();
      newText = words.join(" ");
      setTruncatedName(newText);
    }
  };

  useEffect(() => {
    truncateName();
    window.addEventListener('resize', truncateName);
    return () => window.removeEventListener('resize', truncateName);
  }, [name]);

  return (
    <span ref={nameRef} className="whitespace-nowrap overflow-hidden">
      {truncatedName}
    </span>
  );
};


export default TruncatedProductName;