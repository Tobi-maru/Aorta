import React from 'react'

function Footer() {
    return (
        <footer className="footer">
            <p>
                Built with React &amp; scikit-learn ·
                Powered by a Random Forest Classifier ·{' '}
                <a
                    href="https://github.com/Gagan-AIML/HeartDiseasePrediction"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on GitHub
                </a>
            </p>
            <p style={{ marginTop: '0.4rem' }}>
                ⚕️ This tool is for educational purposes only — not medical advice.
            </p>
        </footer>
    )
}

export default Footer
