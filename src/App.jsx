import React, { useState } from 'react';
import DynamicForm from './pages/DynamicForm';

const App = () => {
  const [language, setLanguage] = useState('ar'); // Default language

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="d-flex justify-content-end p-3">
        <select
          className="form-select w-auto"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="ar">Arabic</option>
          <option value="en">English</option>
        </select>
      </div>
      <DynamicForm language={language} />
    </div>
  );
};

export default App;
