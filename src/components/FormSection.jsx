import React from 'react';
import FormField from './FormField';

const FormSection = ({ section, language }) => {
  const { title, extendedFields } = section.parent;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {extendedFields?.map((field) => (
          <FormField key={field.globalId} field={field} language={language} />
        ))}
      </div>
    </div>
  );
};

export default FormSection;
