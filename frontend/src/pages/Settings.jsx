import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdDownload } from 'react-icons/md';

// Dummy inventory for export demo
const dummyInventory = [
  { name: 'Rice', category: 'Dry Goods', quantity: 100, expirationDate: '2025-12-01' },
  { name: 'Milk', category: 'Dairy', quantity: 20, expirationDate: '2025-06-01' }
];

const Settings = () => {
  // State for each setting
  const [theme, setTheme] = useState('light');
  const [defaultView, setDefaultView] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  // Theme effect: update root element class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Export to CSV
  const handleExportCSV = () => {
    const items = dummyInventory; // Replace with real inventory from context or props
    const csvRows = [
      Object.keys(items[0]).join(','), // header
      ...items.map(item => Object.values(item).join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Labels for language support
  const labels = {
    en: {
      settings: 'Settings',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System Default',
      defaultView: 'Default Landing Page',
      dashboard: 'Dashboard',
      inventory: 'Inventory',
      calendar: 'Calendar',
      recent: 'Recent Changes',
      language: 'Language',
      english: 'English',
      spanish: 'Spanish',
      contrast: 'High Contrast',
      fontSize: 'Font Size',
      normal: 'Normal',
      large: 'Large',
      export: 'Export Inventory (CSV)',
      back: 'Back to Dashboard'
    },
    es: {
      settings: 'Configuración',
      theme: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Predeterminado del sistema',
      defaultView: 'Página de inicio predeterminada',
      dashboard: 'Panel',
      inventory: 'Inventario',
      calendar: 'Calendario',
      recent: 'Cambios recientes',
      language: 'Idioma',
      english: 'Inglés',
      spanish: 'Español',
      contrast: 'Alto contraste',
      fontSize: 'Tamaño de fuente',
      normal: 'Normal',
      large: 'Grande',
      export: 'Exportar inventario (CSV)',
      back: 'Volver al panel'
    }
  }[language];

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 via-gray-900 to-gray-800' : 'from-blue-50 via-white to-blue-100'} z-0`} />
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[120vw] h-[90vw] max-w-[1400px] rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-300'} opacity-10 blur-3xl z-0`} />

      <div className={`relative z-10 max-w-4xl mx-auto p-8 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white/80 text-gray-900'} backdrop-blur rounded-3xl shadow-lg mt-10 transition-colors`}>
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-700 text-blue-200' : 'bg-white/80 text-blue-700'} backdrop-blur-sm px-4 py-2 rounded-full shadow hover:bg-white transition font-medium text-sm`}
          >
            <MdArrowBack className="text-lg" />
            {labels.back}
          </Link>
          <h1 className="text-3xl font-bold ml-8 text-blue-600 dark:text-blue-300">{labels.settings}</h1>
        </div>
        
        {/* Theme */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">{labels.theme}</label>
          <select
            className="rounded px-3 py-2 border border-gray-200 :border-gray-700 :bg-gray-900:text-gray-100"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="light">{labels.light}</option>
            <option value="dark">{labels.dark}</option>
          </select>
        </div>

        {/* Default View */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">{labels.defaultView}</label>
          <select
            className="rounded px-3 py-2 border border-gray-200 dark:border-gray-700 :bg-gray-900:text-gray-100"
            value={defaultView}
            onChange={e => setDefaultView(e.target.value)}
          >
            <option value="dashboard">{labels.dashboard}</option>
            <option value="inventory">{labels.inventory}</option>
            <option value="calendar">{labels.calendar}</option>
            <option value="recent">{labels.recent}</option>
          </select>
        </div>

        {/* Language */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">{labels.language}</label>
          <select
            className="rounded px-3 py-2 border border-gray-200:border-gray-700:bg-gray-900:text-gray-100"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            <option value="en">{labels.english}</option>
            <option value="es">{labels.spanish}</option>
          </select>
        </div>

        {/* Accessibility */}
        <div className="mb-6 flex gap-8">
          <div>
            <label className="block font-semibold mb-2">{labels.contrast}</label>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={e => setHighContrast(e.target.checked)}
            />{' '}
            {labels.contrast}
          </div>
          <div>
            <label className="block font-semibold mb-2">{labels.fontSize}</label>
            <select
              className="rounded px-3 py-2 border border-gray-200 :border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              value={fontSize}
              onChange={e => setFontSize(e.target.value)}
            >
              <option value="normal">{labels.normal}</option>
              <option value="large">{labels.large}</option>
            </select>
          </div>
        </div>

        {/* Data Export */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">{labels.export}</label>
          <button
            className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded shadow`}
            onClick={handleExportCSV}
          >
            <MdDownload />
            {labels.export}
          </button>
        </div>
      </div>

      {/* Accessibility Styles */}
      <style>{`
        html, body {
          transition: background 0.3s, color 0.3s;
        }
        ${highContrast ? `
          html, body, .dark, .bg-gray-900, .bg-gray-800, .bg-white\\/80 {
            filter: contrast(1.3) !important;
          }
        ` : ''}
        body, html {
          font-size: ${fontSize === 'large' ? '1.15em' : '1em'};
        }
      `}</style>
    </div>
  );
};

export default Settings;
