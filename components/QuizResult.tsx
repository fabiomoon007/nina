import React, { useState } from 'react';
import type { QuizResultData, Question, SearchResult } from '../types';
import { getAIExplanation, getAISearchResult } from '../services/gemini';
import { Icon } from './Icon';
import { Modal } from './Modal';

interface QuizResultProps {
  result: QuizResultData;
  backToStart: () => void;
}

type LoadingStates = {
    explanation?: boolean;
    search?: boolean;
};

type SearchResultWithTitle = SearchResult & { title: string };

export const QuizResult: React.FC<QuizResultProps> = ({ result, backToStart }) => {
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);
    const [aiExplanation, setAiExplanation] = useState<Record<string, string>>({});
    const [loadingStates, setLoadingStates] = useState<Record<string, LoadingStates>>({});
    const [searchResult, setSearchResult] = useState<SearchResultWithTitle | null>(null);

    const handleToggleQuestion = (id: string) => {
        setOpenQuestion(prev => (prev === id ? null : id));
    };

    const handleGetExplanation = async (e: React.MouseEvent, question: Question) => {
        e.stopPropagation();
        if (loadingStates[question.id]?.explanation) return;
        
        if (aiExplanation[question.id]) {
            const temp = {...aiExplanation};
            delete temp[question.id];
            setAiExplanation(temp);
            return;
        }

        setLoadingStates(prev => ({ ...prev, [question.id]: { ...prev[question.id], explanation: true } }));
        const explanation = await getAIExplanation(question);
        setAiExplanation(prev => ({...prev, [question.id]: explanation}));
        setLoadingStates(prev => ({ ...prev, [question.id]: { ...prev[question.id], explanation: false } }));
    };
    
    const handleGetSearchResult = async (e: React.MouseEvent, question: Question) => {
        e.stopPropagation();
        if (loadingStates[question.id]?.search) return;
        
        setLoadingStates(prev => ({ ...prev, [question.id]: { ...prev[question.id], search: true } }));
        const result = await getAISearchResult(question);
        
        setSearchResult({
            title: `Pesquisa sobre: ${question.tags[0] || 'Tópico da Questão'}`,
            summary: result.summary,
            sources: result.sources,
        });

        setLoadingStates(prev => ({ ...prev, [question.id]: { ...prev[question.id], search: false } }));
    };

    return (
        <div className="results-container">
             <header className="header">
                 <h1 className="header-title">Resultado do Simulado</h1>
            </header>

            <div className="card summary-card">
                <h2 className="summary-title">Seu Desempenho</h2>
                <div className="summary-stats">
                    <div>
                        <span className="summary-label">Acertos</span>
                        <span className="summary-value" style={{color: 'var(--success-color)'}}>{result.score}</span>
                    </div>
                     <div>
                        <span className="summary-label">Erros</span>
                        <span className="summary-value" style={{color: 'var(--error-color)'}}>{result.total - result.score}</span>
                    </div>
                     <div>
                        <span className="summary-label">Total</span>
                        <span className="summary-value">{result.total}</span>
                    </div>
                     <div>
                        <span className="summary-label">Aproveitamento</span>
                        <span className="summary-value" style={{color: 'var(--primary-color)'}}>{(result.score / result.total * 100).toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            <h2 className="section-title">Análise das Questões</h2>
            <div className="accordion">
                {result.questions.map((q, index) => {
                    const userAnswer = result.answers[q.id];
                    const isCorrect = userAnswer === q.gabarito;
                    const isExpanded = openQuestion === q.id;

                    return (
                        <div key={q.id} className="accordion-item">
                            <button className="accordion-header" onClick={() => handleToggleQuestion(q.id)}>
                                <span className="question-number">Questão {index + 1}</span>
                                {isCorrect ? <Icon name="check" className="icon-correct" /> : <Icon name="xmark" className="icon-incorrect" />}
                                <Icon name="chevronDown" className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} />
                            </button>
                            {isExpanded && (
                                <div className="accordion-content">
                                    <p className="question-enunciado" dangerouslySetInnerHTML={{ __html: q.enunciado.replace(/\n/g, '<br />') }} />
                                    <div className="alternatives-result">
                                        {Object.entries(q.alternativas).map(([key, value]) => {
                                            const isUserAnswer = userAnswer === key;
                                            const isCorrectAnswer = q.gabarito === key;
                                            
                                            let itemClass = "alternative-result-item";
                                            if(isCorrectAnswer) itemClass += " correct";
                                            if(isUserAnswer && !isCorrectAnswer) itemClass += " incorrect";

                                            return (
                                                <div key={key} className={itemClass}>
                                                    <strong>{key})</strong> {value}
                                                    {isUserAnswer && ' (Sua resposta)'}
                                                    {isCorrectAnswer && !isUserAnswer && ' (Resposta correta)'}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="result-actions">
                                        <button
                                            className="ai-button"
                                            onClick={(e) => handleGetExplanation(e, q)}
                                            disabled={loadingStates[q.id]?.explanation}
                                        >
                                            <Icon name="ai" />
                                            {loadingStates[q.id]?.explanation ? 'Analisando...' : (aiExplanation[q.id] ? 'Ocultar Explicação' : 'Explicar com IA')}
                                        </button>
                                        <button
                                            className="ai-button search"
                                            onClick={(e) => handleGetSearchResult(e, q)}
                                            disabled={loadingStates[q.id]?.search}
                                        >
                                            <Icon name="search" />
                                            {loadingStates[q.id]?.search ? 'Pesquisando...' : 'Pesquisar sobre o tema'}
                                        </button>
                                    </div>
                                     {aiExplanation[q.id] && (
                                        <div className="ai-explanation" dangerouslySetInnerHTML={{ __html: aiExplanation[q.id].replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}/>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button onClick={backToStart} className="back-button">Voltar ao Início</button>
            <Modal
                isOpen={!!searchResult}
                onClose={() => setSearchResult(null)}
                title={searchResult?.title || 'Resultado da Pesquisa'}
            >
                {searchResult && (
                    <div className="search-result-content">
                        <div className="search-result-summary" dangerouslySetInnerHTML={{ __html: searchResult.summary.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                        {searchResult.sources.length > 0 && (
                            <div className="search-result-sources">
                                <h4 className="sources-title">Fontes:</h4>
                                <ul>
                                    {searchResult.sources.map((source, index) => (
                                        <li key={index}>
                                            <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="source-link">
                                                {source.web.title || source.web.uri}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};
