import React, { useState, useEffect } from 'react';

export default function InteractiveClock() {
  const [time, setTime] = useState(new Date());
  const [use24Hour, setUse24Hour] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    let hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, '0');
    let ampm = '';

    if (!use24Hour) {
      ampm = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
    }

    const hoursStr = String(hours).padStart(2, '0');
    return `${hoursStr}:${minutes}${ampm}`;
  };

  return (
    <div 
      onClick={() => setUse24Hour(!use24Hour)}
      className="group relative cursor-none select-none flex flex-col items-center justify-center border-2 border-cafe-brown bg-cafe-light px-4 py-2.5 rounded-xl transition-all duration-300 hover:bg-cafe-brown hover:text-cafe-light"
      title="Click to toggle 12h/24h format"
    >
      {/* Outline clock casing */}
      <span className="font-space text-xs font-bold uppercase tracking-wider text-cafe-brown group-hover:text-cafe-light mb-1 text-[8px]">
        LOCAL TIME
      </span>
      
      <span className="font-space font-semibold text-sm md:text-base tracking-widest text-cafe-brown group-hover:text-cafe-light">
        {formatTime()}
      </span>
      
      {/* Decorative dots representing alarm pegs */}
      <div className="absolute -bottom-[6px] left-3 w-1.5 h-1.5 rounded-full border border-cafe-brown bg-cafe-light group-hover:bg-cafe-brown transition-colors duration-300" />
      <div className="absolute -bottom-[6px] right-3 w-1.5 h-1.5 rounded-full border border-cafe-brown bg-cafe-light group-hover:bg-cafe-brown transition-colors duration-300" />
    </div>
  );
}
