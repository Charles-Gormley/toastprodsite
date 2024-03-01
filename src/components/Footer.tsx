import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32"> {/* Increased vertical padding */}
        <div className="pt-4 mt-4 text-center border-t border-gray-200">
          <p className="text-sm text-gray-500">
            TokenizedToast
          </p>
          <p>Contact us at contact@tokenizedtoast.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
