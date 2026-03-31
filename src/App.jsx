import React, { useState } from 'react'
import Header from './components/Header'
import PredictionForm from './components/PredictionForm'
import ResultCard from './components/ResultCard'
import Footer from './components/Footer'

function App() {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handlePredict = async (formData) => {
        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const API_URL = import.meta.env.VITE_API_URL || ''
            const response = await fetch(`${API_URL}/api/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errData = await response.json()
                throw new Error(errData.error || 'Prediction failed')
            }

            const data = await response.json()
            setResult(data)
        } catch (err) {
            setError(err.message || 'Something went wrong. Is the backend running?')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-container">
            <Header />
            <PredictionForm onSubmit={handlePredict} loading={loading} />
            {error && (
                <div className="error-banner">
                    <span>⚠️</span> {error}
                </div>
            )}
            {result && <ResultCard result={result} />}
            <Footer />
        </div>
    )
}

export default App
