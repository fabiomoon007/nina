import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import type { Question, QuizResultData } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { QuizSetup } from './components/QuizSetup';
import { Quiz } from './components/Quiz';
import { QuizResult } from './components/QuizResult';
import { EditalDegase } from './components/EditalDegase';
import { Icon } from './components/Icon';

const transformData = (rawData: any[]): Question[] => {
  return rawData
    .filter(q => !q.anulada && q.alternativas && Object.keys(q.alternativas).length > 0)
    .map(q => {
        // Sanitize alternatives to ensure they are strings and prevent React render errors.
        const sanitizedAlternativas: Record<string, string> = {};
        if (q.alternativas) {
            for (const key of Object.keys(q.alternativas)) {
                const value = q.alternativas[key];
                sanitizedAlternativas[key] = String(value || '');
            }
        }
        return {
            ...q,
            alternativas: sanitizedAlternativas,
        };
    });
};


const App = () => {
    const [view, setView] = useState('dashboard');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
    const [quizResult, setQuizResult] = useState<QuizResultData | null>(null);
    const [quizHistory, setQuizHistory] = useLocalStorage<QuizResultData[]>('quizHistory', []);
    const [isQuizSetupOpen, setIsQuizSetupOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('./data/questions.json');
                const rawData = await response.json();
                setQuestions(transformData(rawData));
            } catch (error) {
                console.error("Failed to load questions:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleStartQuiz = (filteredQuestions: Question[]) => {
        if (filteredQuestions.length > 0) {
            setQuizQuestions(filteredQuestions);
            setView('quiz');
        } else {
            alert("Nenhuma questão encontrada com os filtros selecionados. Por favor, ajuste os critérios.");
        }
    };

    const handleFinishQuiz = (answers: Record<string, string>) => {
        let score = 0;
        quizQuestions.forEach(q => {
            if (answers[q.id] === q.gabarito) {
                score++;
            }
        });

        const newResult: QuizResultData = {
            id: new Date().toISOString(),
            score,
            total: quizQuestions.length,
            date: new Date().toISOString(),
            answers,
            questions: quizQuestions
        };

        setQuizResult(newResult);
        setQuizHistory(prev => [newResult, ...prev]);
        setView('quizResult');
    };

    const handleCancelQuiz = () => {
        setQuizQuestions([]);
        setView('dashboard');
    };

    const handleBackToStart = () => {
        setQuizResult(null);
        setQuizQuestions([]);
        setView('dashboard');
    };
    
    const openQuizSetup = () => setIsQuizSetupOpen(true);

    const renderView = () => {
        if (isLoading) {
            return <div className="loading-state"><div className="spinner"></div>Carregando questões...</div>;
        }

        switch (view) {
            case 'quiz':
                return <Quiz questions={quizQuestions} onFinish={handleFinishQuiz} onCancel={handleCancelQuiz} />;
            case 'quizResult':
                return quizResult && <QuizResult result={quizResult} backToStart={handleBackToStart} />;
            case 'editalDegase':
                return <EditalDegase />;
            case 'dashboard':
            default:
                return <Dashboard 
                            quizHistory={quizHistory} 
                            openQuizSetup={openQuizSetup} 
                            questions={questions} 
                        />;
        }
    };

    return (
        <div className="app-container">
            <Sidebar 
                currentView={view} 
                setView={setView} 
                openQuizSetup={openQuizSetup}
                isSidebarOpen={isSidebarOpen} 
                setSidebarOpen={setSidebarOpen}
            />
            <button className="menu-button" onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button>
            <main className="main-content" style={{ marginLeft: isSidebarOpen && window.innerWidth >= 768 ? 'var(--sidebar-width)' : '0' }}>
                {renderView()}
            </main>
            <QuizSetup
                questions={questions}
                startQuiz={handleStartQuiz}
                isOpen={isQuizSetupOpen}
                onClose={() => setIsQuizSetupOpen(false)}
            />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);