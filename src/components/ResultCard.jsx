import React from 'react'

function ResultCard({ result }) {
    const isHigh = result.prediction === 1
    const variant = isHigh ? 'high' : 'low'

    return (
        <div className="results">
            <div className={`result-card result-card--${variant}`}>
                <div className="result-card__icon">
                    {isHigh ? '⚠️' : '✅'}
                </div>
                <div className="result-card__content">
                    <h3 className="result-card__title">
                        {isHigh ? 'High Risk of Heart Disease' : 'Low Risk of Heart Disease'}
                    </h3>
                    <p className="result-card__probability">
                        Predicted probability: <strong>{result.probability}%</strong>
                    </p>
                    <div className="probability-bar">
                        <div
                            className="probability-bar__fill"
                            style={{ width: `${result.probability}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultCard
