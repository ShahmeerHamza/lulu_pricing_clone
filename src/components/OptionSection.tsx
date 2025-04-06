import React from 'react'
import { OptionSectionProps } from '../types/types';

const OptionSection: React.FC<OptionSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-lulu-blue mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default OptionSection