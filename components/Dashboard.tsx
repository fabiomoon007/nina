import React, { useMemo } from 'react';
import type { QuizResultData, Question } from '../types';

interface DashboardProps {
  quizHistory: QuizResultData[];
  openQuizSetup: () => void;
  questions: Question[];
}

export const Dashboard: React.FC<DashboardProps> = ({ quizHistory, openQuizSetup, questions }) => {
    const stats = useMemo(() => {
        if (quizHistory.length === 0) return {
            totalSimulados: 0,
            avgScore: 0,
            mostFrequentSubject: "N/A",
            coverage: 0,
        };

        const totalSimulados = quizHistory.length;
        const totalScore = quizHistory.reduce((acc, h) => acc + (h.score / h.total), 0);
        const avgScore = totalSimulados > 0 ? (totalScore / totalSimulados) * 100 : 0;

        const tagCounts = quizHistory
            .flatMap(h => h.questions.flatMap(q => q.tags || []))
            .reduce((acc, tag) => {
                if (tag) acc[tag] = (acc[tag] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);
        
        const answeredQuestions = new Set(quizHistory.flatMap(h => h.questions.map(q => q.id)));
        const coverage = questions.length > 0 ? (answeredQuestions.size / questions.length) * 100 : 0;

        const mostFrequentSubject = Object.keys(tagCounts).length > 0 ? Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0][0] : "N/A";

        return { totalSimulados, avgScore, mostFrequentSubject, coverage };
    }, [quizHistory, questions]);

    return (
        <div className="dashboard-container">
            <header className="header">
                <h1 className="header-title">Dashboard</h1>
            </header>
            <div className="grid">
                <div className="card highlight-card" onClick={openQuizSetup}>
                    <h2 className="highlight-card-title">Criar Novo Simulado</h2>
                    <p className="highlight-card-text">Personalize e inicie uma nova sessão de estudos.</p>
                    <button className="highlight-card-button">Começar Agora</button>
                </div>

                <div className="card">
                    <h3 className="card-title">Simulados Realizados</h3>
                    <p className="card-value">{stats.totalSimulados}</p>
                </div>
                <div className="card">
                    <h3 className="card-title">Desempenho Médio</h3>
                    <p className="card-value">{stats.avgScore.toFixed(1)}%</p>
                </div>
                <div className="card">
                    <h3 className="card-title">Cobertura de Conteúdo</h3>
                    <p className="card-value">{stats.coverage.toFixed(1)}%</p>
                </div>
                 <div className="card">
                    <h3 className="card-title">Assunto Mais Frequente</h3>
                    <p className="card-value">{stats.mostFrequentSubject}</p>
                </div>
            </div>

            <div className="history-section">
                <h2 className="section-title">Histórico Recente</h2>
                {quizHistory.length > 0 ? (
                    <div className="history-list">
                        {quizHistory.slice(0, 5).map(h => (
                             <div key={h.id} className="card history-item">
                                 <span className="history-date">{new Date(h.date).toLocaleDateString('pt-BR')}</span>
                                 <span className="history-score">
                                    Acertos: {h.score}/{h.total} ({(h.score / h.total * 100).toFixed(1)}%)
                                 </span>
                             </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">Nenhum simulado realizado ainda. Comece um agora!</p>
                )}
            </div>
        </div>
    );
};