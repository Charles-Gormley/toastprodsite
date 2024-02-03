import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      {children}
    </div>
  );
};

export default Container;
