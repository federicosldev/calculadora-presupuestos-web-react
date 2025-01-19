import React from 'react';
import { jsPDF } from 'jspdf';

function BudgetSummary({ websiteType, selections, totalHours, customFields, hourlyRate }) {
  const totalCost = totalHours * hourlyRate;

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(24);
    doc.text('Presupuesto de Proyecto Web', 20, 20);

    // Información del proyecto
    doc.setFontSize(16);
    doc.text(`${websiteType.icon} Tipo: ${websiteType.name}`, 20, 40);
    doc.text(`Horas base: ${websiteType.baseHours}h`, 20, 50);
    doc.text(`Precio por hora: €${hourlyRate}`, 20, 60);

    let y = 80;
    doc.setFontSize(14);

    // Opciones predefinidas
    websiteType.options.forEach(option => {
      if (selections[option.id]) {
        const value = option.type === 'boolean' ? 'Sí' : selections[option.id];
        const hours = option.type === 'boolean' ?
          option.hours :
          option.hours * selections[option.id];
        doc.text(`${option.icon} ${option.name}: ${value} - ${hours}h`, 20, y);
        y += 10;
      }
    });

    // Campos personalizados
    customFields.forEach(field => {
      if (selections[field.id]) {
        doc.text(`${field.icon} ${field.name}: Sí - ${field.hours}h`, 20, y);
        y += 10;
      }
    });

    // Total
    doc.setFontSize(16);
    doc.text(`Total Horas: ${totalHours}h`, 20, y + 20);
    doc.text(`Presupuesto Estimado: €${totalCost}`, 20, y + 30);

    doc.save('presupuesto-web.pdf');
  };

  return (
    <div className="p-8 border shadow-lg rounded-xl bg-zinc-100">
      <h2 className="mb-6 text-2xl font-bold text-center">Resumen del Proyecto</h2>

      <div className="mb-8 space-y-6">
        <div className="flex items-center gap-3 text-xl">
          <span>{websiteType.icon}</span>
          <h3 className="font-semibold">{websiteType.name}</h3>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium">Horas base: {websiteType.baseHours}h</p>
            <p className="font-medium text-purple-600">Precio/hora: €{hourlyRate}</p>
          </div>
          <div className="space-y-2">
            {/* Opciones predefinidas */}
            {websiteType.options.map(option => {
              if (selections[option.id]) {
                const value = option.type === 'boolean' ? 'Sí' : selections[option.id];
                const hours = option.type === 'boolean' ?
                  option.hours :
                  option.hours * selections[option.id];
                return (
                  <div key={option.id} className="flex items-center gap-2 text-gray-700">
                    <span>{option.icon}</span>
                    <span>{option.name}: </span>
                    <span className="font-medium">{value}</span>
                    <span className="ml-auto font-medium text-purple-600">{hours}h</span>
                  </div>
                );
              }
              return null;
            })}

            {/* Campos personalizados */}
            {customFields.map(field => {
              if (selections[field.id]) {
                return (
                  <div key={field.id} className="flex items-center gap-2 text-gray-700">
                    <span>{field.icon}</span>
                    <span>{field.name}: </span>
                    <span className="font-medium">Sí</span>
                    <span className="ml-auto font-medium text-purple-600">{field.hours}h</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="p-6 text-white rounded-lg bg-gradient-to-r from-purple-500 to-purple-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg">Total Horas:</span>
            <span className="text-2xl font-bold">{totalHours}h</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg">Presupuesto Estimado:</span>
            <span className="text-2xl font-bold">€{totalCost}</span>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
      >
        <span>📥</span> Descargar Presupuesto PDF
      </button>
    </div>
  );
}

export default BudgetSummary;