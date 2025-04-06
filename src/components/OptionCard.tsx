import React from 'react'
import { OptionCardProps } from '../types/types';

const OptionCard: React.FC<OptionCardProps> = ({ 
  title, 
  imageSrc, 
  isSelected = false, 
  onClick, 
  subtitle, 
  showSelectedIndicator = true 
}) => {
  return (
    <div
      className={`border rounded-md overflow-hidden cursor-pointer transition-colors ${
        isSelected ? 'border-lulu-light-blue ring-1 ring-lulu-light-blue' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full h-32 object-cover" />
        {isSelected && showSelectedIndicator && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center justify-center w-5 h-5 bg-lulu-light-blue rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center p-3">
        <div className="relative flex items-center justify-center w-4 h-4 border border-gray-300 rounded-full">
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-lulu-light-blue rounded-full"></div>
            </div>
          )}
        </div>
        <span className="ml-2 text-sm font-medium text-lulu-blue">{title}</span>
      </div>
      {subtitle && (
        <div className="px-3 pb-2 -mt-2 text-xs text-gray-500">{subtitle}</div>
      )}
    </div>
  );
};

export default OptionCard