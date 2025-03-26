'use client';

import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color, className = '' }) => {
  return (
    <i
      className={`fas fa-${name} ${className}`}
      style={{
        fontSize: size,
        color: color,
      }}
    />
  );
};

export default Icon; 