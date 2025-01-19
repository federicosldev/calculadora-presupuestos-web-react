import { useState, useMemo } from 'react'
import { websiteTypes } from './data/websiteTypes'
import WebsiteTypeSelector from './components/WebsiteTypeSelector'
import OptionsSelector from './components/OptionsSelector'
import BudgetSummary from './components/BudgetSummary'
import './App.css'

function App() {
  const [selectedType, setSelectedType] = useState(null)
  const [selections, setSelections] = useState({})
  const [customFields, setCustomFields] = useState([])
  const [hourlyRate, setHourlyRate] = useState(50)

  const websiteType = selectedType ? websiteTypes[selectedType] : null

  const totalHours = useMemo(() => {
    if (!websiteType) return 0

    let total = websiteType.options.reduce((sum, option) => {
      const value = selections[option.id]
      if (!value) return sum
      return sum + (option.type === 'boolean' ?
        option.hours :
        option.hours * value)
    }, websiteType.baseHours)

    // Añadir horas de campos personalizados
    Object.entries(selections).forEach(([id, value]) => {
      if (id.startsWith('custom-') && value === true) {
        const customField = websiteType.options.find(opt => opt.id === id) ||
          customFields.find(field => field.id === id)
        if (customField) {
          total += customField.hours
        }
      }
    })

    return total
  }, [websiteType, selections, customFields])

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setSelections({})
  }

  const handleOptionChange = (optionId, value) => {
    setSelections(prev => ({
      ...prev,
      [optionId]: value
    }))
  }

  const handleCustomFieldAdd = (field) => {
    setCustomFields(prev => [...prev, field])
  }

  return (
    <div className="min-h-screen px-4 py-28 bg-neutral-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-6xl font-bold text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text">
            Calculadora para Presupuestos Web
          </h1>
          <p className="text-lg text-zinc-400">
            Esta es una herramienta para ayudarte a estimar el numero de horas que serían necesarias para desarrollar el proyecto.
          </p>
        </header>

        <div className="space-y-12">
          <WebsiteTypeSelector
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
          />

          {websiteType && (
            <>
              <div className="p-6 mb-8 border rounded-lg shadow-sm bg-neutral-800">
                <label className="block mb-2 text-sm font-medium text-zinc-300">
                  Precio por hora (€)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-32 p-2 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  step="1"
                />
              </div>

              <OptionsSelector
                options={websiteType.options}
                selections={selections}
                onOptionChange={handleOptionChange}
                onCustomFieldAdd={handleCustomFieldAdd}
                customFields={customFields}
              />

              <BudgetSummary
                websiteType={websiteType}
                selections={selections}
                totalHours={totalHours}
                customFields={customFields}
                hourlyRate={hourlyRate}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App