import React from 'react';
import FormField from './FormField';

const FormSection = ({ section }) => {
  const { title, extendedFields } = section.parent;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {extendedFields?.map((field) => (
          <FormField key={field.globalId} field={field} />
        ))}
      </div>
    </div>
  );
};

export default FormSection;
