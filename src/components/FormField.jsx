import React, { useEffect, useState } from "react";
import { fetchLookupData } from "../services/api";

const FormField = ({ field, language }) => {
  const {
    title,
    fieldType,
    helperText,
    lookUpSourcePath,
    required,
    extendedFields,
    regex,
    validationMessage,
  } = field;

  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (lookUpSourcePath) {
      fetchLookupData(lookUpSourcePath, language).then((data) => {
        if (data.success) setOptions(data.result);
      });
    }
  }, [lookUpSourcePath, language]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (regex) {
      const regexPattern = new RegExp(regex);
      if (regexPattern.test(value) || value === "") {
        setError(""); // Clear error if valid or empty
      } else {
        setError(validationMessage || "Invalid input");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const renderField = () => {
    switch (fieldType) {
      case "dropdown":
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

        case "radio":
          return (
            <div className="custom-radio-group">
              {options.map((opt) => (
                <label
                  key={opt.id}
                  htmlFor={`radio-${opt.id}`}
                  className="custom-radio-label"
                >
                  <input
                    type="radio"
                    className="custom-radio-input"
                    name={field.code}
                    value={opt.value}
                    id={`radio-${opt.id}`}
                    required={required}
                  />
                  <span className="custom-radio-circle"></span>
                  {opt.value}
                </label>
              ))}
            </div>
          );
        

      case "date":
        return <input type="date" className="form-control" required={required} />;

      case "text":
        return (
          <div>
            <input
              type="text"
              className={`form-control ${error ? "is-invalid" : ""}`}
              onChange={handleInputChange}
              required={required}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
        );

      case "file-round":
        return (
          <div className="text-center">
            <label htmlFor={`file-upload-${field.code}`} style={{ cursor: "pointer" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#e0e0e0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <i className="fa fa-user" style={{ fontSize: "40px", color: "#757575" }}></i>
                )}
              </div>
              <div style={{ marginTop: "10px", color: "#757575" }}>{title}</div>
            </label>
            <input
              type="file"
              id={`file-upload-${field.code}`}
              className="d-none"
              onChange={handleFileChange}
              required={required}
            />
          </div>
        );

      case "file-box":
        return <input type="file" className="form-control" required={required} />;

      case "toggle":
        return (
          <div>
            <label className="form-label">
              {title} {required && "*"}
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id={`toggle-${field.code}`}
                required={required}
              />
            </div>
          </div>
        );

      default:
        return (
          <input
            type="text"
            className="form-control"
            placeholder="Unsupported field type"
            disabled
          />
        );
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">
        {fieldType !== "toggle" && title} {required && "*"}
      </label>
      {renderField()}
      {helperText && <div className="form-text">{helperText}</div>}
      <br />

      {extendedFields?.length > 0 && (
        <div className="row">
          {extendedFields.map((nestedField) => (
            <div key={nestedField.globalId} className="col-md-6">
              <FormField field={nestedField} language={language} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormField;