// src/components/TimelineItem.jsx
import React from 'react';

// Komponen ini menerima data satu kenangan sebagai prop
function TimelineItem({ data }) {
  return (
    <div className="mb-8 flex justify-between items-center w-full">
      <div className="order-1 w-5/12"></div>

      {/* Titik di tengah timeline */}
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white"></h1>
      </div>

      {/* Kartu Konten */}
      <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-gray-800 text-xl">{data.title}</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">{data.description}</p>
        <time className="text-xs text-gray-500 mt-2 block">{data.date}</time>
        {data.image && <img src={data.image} alt={data.title} className="mt-4 rounded-md w-full" />}
      </div>
    </div>
  );
}

export default TimelineItem;