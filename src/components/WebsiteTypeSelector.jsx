import React from 'react';
import { websiteTypes } from '../data/websiteTypes';

function WebsiteTypeSelector({ selectedType, onTypeSelect }) {
  return (
    <div className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-center text-zinc-50">Selecciona el Tipo de Proyecto</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(websiteTypes).map(([key, type]) => (
          <button
            key={key}
            onClick={() => onTypeSelect(key)}
            className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${selectedType === key
              ? 'border-white bg-neutral-800 shadow-lg'
              : 'border-zinc-500 hover:border-zinc-300 hover:shadow-md'
              }`}
          >
            <div className="mb-3 text-4xl">{type.icon}</div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-200">{type.name}</h3>
            <p className="mb-3 text-sm text-zinc-400">{type.description}</p>
            <p className="font-medium text-zinc-300">
              Desde {type.baseHours} horas
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WebsiteTypeSelector;