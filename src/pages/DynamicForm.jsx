import React, { useEffect, useState } from 'react';
import { fetchForm } from '../services/api';
import FormSection from '../components/FormSection';
import Loader from '../components/Loader';

const DynamicForm = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForm().then((data) => {
      if (data.success) setFormData(data.result);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container py-4">
      <h1 className="mb-4">{formData.formName}</h1>
      {formData.sections.map((section) => (
        <FormSection key={section.parent.globalId} section={section} />
      ))}
    </div>
  );
};

export default DynamicForm;
