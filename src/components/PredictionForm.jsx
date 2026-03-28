import React, { useState } from 'react'

const FIELDS = [
    { name: 'age', label: 'Age', type: 'number', min: 1, max: 120, defaultValue: 50, step: 1 },
    {
        name: 'sex',
        label: 'Sex',
        type: 'select',
        options: [
            { value: 0, label: 'Female' },
            { value: 1, label: 'Male' },
        ],
        defaultValue: 0,
    },
    {
        name: 'cp',
        label: 'Chest Pain Type',
        type: 'select',
        options: [
            { value: 0, label: '0 — Typical Angina' },
            { value: 1, label: '1 — Atypical Angina' },
            { value: 2, label: '2 — Non-anginal Pain' },
            { value: 3, label: '3 — Asymptomatic' },
        ],
        defaultValue: 0,
    },
    { name: 'trestbps', label: 'Resting Blood Pressure', type: 'number', min: 50, max: 250, defaultValue: 120, step: 1 },
    { name: 'chol', label: 'Cholesterol Level', type: 'number', min: 100, max: 600, defaultValue: 200, step: 1 },
    {
        name: 'restecg',
        label: 'Resting ECG Results',
        type: 'select',
        options: [
            { value: 0, label: '0 — Normal' },
            { value: 1, label: '1 — ST-T Abnormality' },
            { value: 2, label: '2 — LV Hypertrophy' },
        ],
        defaultValue: 0,
    },
    { name: 'thalach', label: 'Max Heart Rate Achieved', type: 'number', min: 50, max: 250, defaultValue: 150, step: 1 },
    {
        name: 'exang',
        label: 'Exercise Induced Angina',
        type: 'select',
        options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' },
        ],
        defaultValue: 0,
    },
    { name: 'oldpeak', label: 'ST Depression (Oldpeak)', type: 'number', min: 0, max: 10, defaultValue: 1.0, step: 0.1 },
    {
        name: 'slope',
        label: 'ST Segment Slope',
        type: 'select',
        options: [
            { value: 0, label: '0 — Upsloping' },
            { value: 1, label: '1 — Flat' },
            { value: 2, label: '2 — Downsloping' },
        ],
        defaultValue: 0,
    },
    {
        name: 'ca',
        label: 'Major Vessels (0–3)',
        type: 'select',
        options: [
            { value: 0, label: '0' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
        ],
        defaultValue: 0,
    },
    {
        name: 'thal',
        label: 'Thalassemia',
        type: 'select',
        options: [
            { value: 1, label: '1 — Normal' },
            { value: 2, label: '2 — Fixed Defect' },
            { value: 3, label: '3 — Reversible Defect' },
        ],
        defaultValue: 1,
    },
]

function getDefaults() {
    const defaults = {}
    FIELDS.forEach((f) => {
        defaults[f.name] = f.defaultValue
    })
    return defaults
}

function PredictionForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState(getDefaults)

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <h2 className="card__title">
                    <span className="card__title-icon">📋</span>
                    Patient Details
                </h2>
                <div className="form-grid">
                    {FIELDS.map((field) => (
                        <div className="form-group" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    id={field.name}
                                    value={formData[field.name]}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                >
                                    {field.options.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={field.name}
                                    type="number"
                                    min={field.min}
                                    max={field.max}
                                    step={field.step}
                                    value={formData[field.name]}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn-predict" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner" />
                            Analyzing…
                        </>
                    ) : (
                        <>🔬 Predict Risk</>
                    )}
                </button>
            </div>
        </form>
    )
}

export default PredictionForm
