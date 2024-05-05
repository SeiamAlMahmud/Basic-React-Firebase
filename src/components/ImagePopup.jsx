// src/ImagePopup.jsx
import React, { useState, useRef } from 'react';

const ImagePopup = ({ src, alt, initialZoom = 1 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(initialZoom);
  const imageRef = useRef(null); // Ref to hold image element

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setZoom(initialZoom); // Reset zoom on close
  };

  const handleMouseWheel = (event) => {
    const delta = event.deltaY / 100; // Adjust sensitivity as needed
    const newZoom = Math.max(0.5, Math.min(zoom + delta, 2)); // Set zoom limits
    setZoom(newZoom);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="cursor-pointer h-10 w-10 rounded-full object-cover"
        onClick={handleClick}
      />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="w-full max-w-xl  bg-transparent rounded-lg shadow-md">
            <img
              src={src}
              alt={alt}
              ref={imageRef} // Assign ref to image
              onWheel={handleMouseWheel} // Attach mouse wheel event handler
              style={{ transform: `scale(${zoom})` }} // Apply zoom
              className="w-full h-auto object-contain"
            />
            <button onClick={handleClose} className="absolute top-2 right-2 text-white p-2 rounded-full hover:bg-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePopup;
