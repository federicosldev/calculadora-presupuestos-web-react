import React, { useState } from 'react';

function OptionsSelector({ options, selections, onOptionChange, onCustomFieldAdd, customFields }) {
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldHours, setNewFieldHours] = useState('');

  const handleAddCustomField = (e) => {
    e.preventDefault();
    if (newFieldName && newFieldHours) {
      const newField = {
        id: `custom-${Date.now()}`,
        name: newFieldName,
        hours: parseInt(newFieldHours),
        type: 'custom',
        icon: '✨'
      };
      onCustomFieldAdd(newField);
      onOptionChange(newField.id, true);
      setNewFieldName('');
      setNewFieldHours('');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-center text-zinc-50">Personaliza tu Proyecto</h2>

      {/* Campos predefinidos */}
      <div className="grid gap-6 mb-8">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-4 p-4 mb-4 transition-shadow border rounded-lg shadow-sm bg-neutral-800 hover:shadow-md"
          >
            <span className="text-2xl">{option.icon}</span>
            <div className="flex-1">
              <label className="font-medium text-zinc-50">{option.name}</label>
              <p className="text-sm text-zinc-400">
                {option.type === 'boolean' ?
                  `${option.hours} horas de trabajo` :
                  `${option.hours} horas por unidad`}
              </p>
            </div>
            {option.type === 'boolean' ? (
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selections[option.id] || false}
                  onChange={(e) => onOptionChange(option.id, e.target.checked)}
                  className="w-6 h-6 text-blue-500 border-2 border-blue-500 rounded-lg focus:ring-blue-500"
                />
              </div>
            ) : (
              <input
                type="number"
                min="0"
                value={selections[option.id] || 0}
                onChange={(e) => onOptionChange(option.id, parseInt(e.target.value) || 0)}
                className="w-24 p-2 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}
      </div>

      {/* Campos personalizados */}
      {customFields.map((field) => (
        <div
          key={field.id}
          className="flex items-center gap-4 p-4 mb-4 transition-shadow border rounded-lg shadow-sm bg-neutral-800 hover:shadow-md"
        >
          <span className="text-2xl">{field.icon}</span>
          <div className="flex-1">
            <label className="font-medium text-zinc-50">{field.name}</label>
            <p className="text-sm text-zinc-400">{field.hours} horas de trabajo</p>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={selections[field.id] || false}
              onChange={(e) => onOptionChange(field.id, e.target.checked)}
              className="w-6 h-6 text-indigo-500 border-2 border-indigo-500 rounded-lg focus:ring-indigo-500"
            />
          </div>
        </div>
      ))}

      {/* Formulario para añadir campos personalizados */}
      <form onSubmit={handleAddCustomField} className="p-6 border rounded-lg bg-neutral-800">
        <h3 className="mb-4 text-lg font-semibold text-zinc-100">Añadir otro concepto</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-300">
              Nombre del concepto
            </label>
            <input
              type="text"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Diseño personalizado"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-300">
              Horas estimadas
            </label>
            <input
              type="number"
              value={newFieldHours}
              onChange={(e) => setNewFieldHours(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 10"
              min="1"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Añadir Concepto
        </button>
      </form>
    </div>
  );
}

export default OptionsSelector;