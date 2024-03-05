import React from 'react';

type SectionHeadProps = {
  title: string;
  description: string;
};

const SectionHead: React.FC<SectionHeadProps> = ({ title, description }) => {
  return (
    <div className="text-center py-8">
      <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-4 text-lg text-gray-600">{description}</p>
    </div>
  );
};

export default SectionHead;
