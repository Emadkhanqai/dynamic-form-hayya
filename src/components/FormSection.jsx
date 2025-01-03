import React, { useState } from 'react';
import FormField from './FormField';

const FormSection = ({ section, language }) => {
  const { title, extendedFields } = section.parent;

  // State to hold form data for the section
  const [formData, setFormData] = useState({});

  // Function to handle form data changes
  const handleFormDataChange = (code, value) => {
    setFormData((prev) => ({
      ...prev,
      [code]: value,
    }));
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {extendedFields?.map((field) => (
          <FormField
            key={field.globalId}
            field={field}
            language={language}
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FormSection;
