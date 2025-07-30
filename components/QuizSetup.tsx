import React, { useState, useMemo } from 'react';
import type { Question } from '../types';
import { Modal } from './Modal';

interface QuizSetupProps {
  questions: Question[];
  startQuiz: (filteredQuestions: Question[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const QuizSetup: React.FC<QuizSetupProps> = ({ questions, startQuiz, isOpen, onClose }) => {
    const [numQuestions, setNumQuestions] = useState(10);
    const [selectedBanca, setSelectedBanca] = useState('all');
    const [selectedAno, setSelectedAno] = useState('all');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const { bancas, anos, tags } = useMemo(() => {
        const bancas = [...new Set(questions.map(q => q.banca))];
        const anos = [...new Set(questions.map(q => q.ano))].sort((a,b) => Number(b) - Number(a));
        const tags = [...new Set(questions.flatMap(q => q.tags || []))].filter(Boolean).sort();
        return { bancas, anos, tags };
    }, [questions]);

    const handleStart = () => {
        let filtered = [...questions];
        if (selectedBanca !== 'all') {
            filtered = filtered.filter(q => q.banca === selectedBanca);
        }
        if (selectedAno !== 'all') {
            filtered = filtered.filter(q => q.ano === Number(selectedAno));
        }
        if (selectedTags.length > 0) {
            filtered = filtered.filter(q => selectedTags.every(tag => (q.tags || []).includes(tag)));
        }

        if (filtered.length === 0) {
            alert("Nenhuma questão encontrada com os filtros selecionados. Por favor, ajuste os critérios.");
            return;
        }

        const shuffled = filtered.sort(() => 0.5 - Math.random());
        startQuiz(shuffled.slice(0, numQuestions));
        onClose();
    };

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Configurar Simulado">
            <div className="form">
                <div className="form-group">
                    <label htmlFor="num-questions">Número de Questões</label>
                    <input type="number" id="num-questions" value={numQuestions} onChange={e => setNumQuestions(Math.max(1, parseInt(e.target.value) || 1))} />
                </div>
                <div className="form-group">
                    <label htmlFor="banca">Banca</label>
                    <select id="banca" value={selectedBanca} onChange={e => setSelectedBanca(e.target.value)}>
                        <option value="all">Todas</option>
                        {bancas.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ano">Ano</label>
                    <select id="ano" value={selectedAno} onChange={e => setSelectedAno(e.target.value)}>
                        <option value="all">Todos</option>
                        {anos.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Assuntos (Tags)</label>
                    <div className="tag-container">
                        {tags.map(tag => (
                            <button key={tag} onClick={() => handleTagToggle(tag)} className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleStart} className="submit-button">Iniciar Simulado</button>
            </div>
        </Modal>
    );
};