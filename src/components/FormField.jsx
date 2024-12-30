import React, { useEffect, useState } from 'react';
import { fetchLookupData } from '../services/api';

const FormField = ({ field }) => {
  const { title, fieldType, helperText, lookUpSourcePath, required } = field;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (lookUpSourcePath) {
      fetchLookupData(lookUpSourcePath).then((data) => {
        if (data.success) setOptions(data.result);
      });
    }
  }, [lookUpSourcePath]);

  const renderField = () => {
    switch (fieldType) {
      case 'dropdown':
        return (
          <select className="form-select" required={required}>
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div>
            {options.map((opt) => (
              <div key={opt.id} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={field.code}
                  value={opt.value}
                  id={`radio-${opt.id}`}
                />
                <label className="form-check-label" htmlFor={`radio-${opt.id}`}>
                  {opt.value}
                </label>
              </div>
            ))}
          </div>
        );
      case 'file':
        return <input type="file" className="form-control" />;
      default:
        return <input type="text" className="form-control" />;
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">
        {title} {required && '*'}
      </label>
      {renderField()}
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
};

export default FormField;
