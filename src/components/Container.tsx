import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="my-12 md:px-16 xl:px-24">
      {children}
    </div>
  );
};

export default Container;
