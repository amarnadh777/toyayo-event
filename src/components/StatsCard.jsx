import React from 'react';

const StatCard = ({ number, label }) => {
  return (
    // OUTER WRAPPER: Handles the Gradient Border and Drop Shadow
    // We use p-[1px] to simulate a 1px border because CSS borders don't support gradients well with rounded corners
    <div className="w-[168px] h-[129px] rounded-[10px] p-[1px] bg-gradient-to-b from-[#2E5AA8] to-[#8FADE0] shadow-xl relative">
      
      {/* INNER CONTAINER: Handles the Background Gradient and Inner Shadow */}
      <div className="w-full h-full rounded-[9px] bg-gradient-to-b from-[#2F5DAC] to-[#19315B] shadow-[inset_0_4px_4px_#3466BC] flex flex-col items-center justify-center text-white">
        
        {/* Number */}
        <span className="text-4xl font-normal tracking-wide drop-shadow-sm">
          {number}
        </span>
        
        {/* Label */}
        <span className="text-sm font-medium mt-1 tracking-wide opacity-90">
          {label}
        </span>
        
      </div>
    </div>
  );
};

export default StatCard
