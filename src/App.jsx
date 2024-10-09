import React, { useState } from 'react';

export default function BinaryVisualizer() {
  const [bits, setBits] = useState(Array(32).fill(false));
  
  const toggleBit = (index) => {
    const newBits = [...bits];
    newBits[index] = !newBits[index];
    setBits(newBits);
  };
  
  const getDecimalValue = () => {
    return bits.reduce((acc, bit, index) => {
      return acc + (bit ? Math.pow(2, 31 - index) : 0);
    }, 0);
  };
  
  const BitDisplay = ({ index, value, onClick }) => (
    <div className="flex flex-col items-center w-7">
      <div className="text-xs text-gray-400 h-4">{31 - index}</div>
      <button
        onClick={onClick}
        className={`w-6 h-6 rounded flex items-center justify-center font-mono text-sm
          ${value ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}
          hover:opacity-80 transition-colors`}
      >
        {value ? '1' : '0'}
      </button>
    </div>
  );

  const Divider = () => (
    <div className="flex flex-col items-center w-7">
      <div className="text-xs text-gray-500 h-4"></div>
      <div className="w-6 h-6 flex items-center justify-center text-gray-500">·</div>
    </div>
  );

  const activeBits = bits
    .map((bit, index) => ({ position: 31 - index, value: bit ? Math.pow(2, 31 - index) : 0 }))
    .filter(bit => bit.value > 0)
    .sort((a, b) => b.position - a.position);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 p-4">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Binary to Decimal Converter</h1>
        
        <div className="text-center mb-8">
          <div className="text-5xl font-mono mb-2">{getDecimalValue().toLocaleString()}</div>
          <div className="text-gray-400">Decimal Value</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          <div className="flex flex-wrap justify-center gap-0">
            {bits.map((bit, index) => (
              <React.Fragment key={index}>
                {index > 0 && index % 8 === 0 && <Divider />}
                <BitDisplay
                  index={index}
                  value={bit}
                  onClick={() => toggleBit(index)}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {activeBits.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Active Bits</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400">
                    <th className="text-left py-2">Bit Position</th>
                    <th className="text-left py-2">Power of 2</th>
                    <th className="text-left py-2">Decimal Value</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBits.map(({ position, value }) => (
                    <tr key={position} className="border-t border-gray-700">
                      <td className="py-2">{position}</td>
                      <td className="py-2">2<sup>{position}</sup></td>
                      <td className="py-2 font-mono">{value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}