import React, { useState } from 'react';
import type { Question } from '../types';

interface QuizProps {
  questions: Question[];
  onFinish: (answers: Record<string, string>) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const progress = (currentQuestionIndex / questions.length) * 100;
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (alternative: string) => {
        const newAnswers = { ...answers, [currentQuestion.id]: alternative };
        setAnswers(newAnswers);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onFinish(newAnswers);
        }
    };

    return (
        <div className="quiz-container">
            <header className="header">
                 <h1 className="header-title">Simulado em Andamento</h1>
            </header>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="question-counter">Questão {currentQuestionIndex + 1} de {questions.length}</p>

            <div className="card" style={{ marginTop: '20px' }}>
                <div className="question-content">
                    <p className="question-prova">{currentQuestion.prova} - {currentQuestion.ano}</p>
                    <p className="question-enunciado" dangerouslySetInnerHTML={{ __html: currentQuestion.enunciado.replace(/\n/g, '<br />') }} />
                </div>

                <div className="alternatives">
                    {Object.entries(currentQuestion.alternativas).map(([key, value]) => (
                        <button key={key} onClick={() => handleAnswer(key)} className="alternative-button">
                            <span className="alternative-key">{key}</span>
                            <span className="alternative-value">{value}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};