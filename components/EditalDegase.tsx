import React, { useState } from 'react';

const contentData = {
    info: {
        title: "Informações Gerais do Concurso DEGASE",
        grid: [
            { label: "Órgão", value: "Departamento Geral de Ações Socioeducativas (DEGASE)" },
            { label: "Banca", value: "IDECAN" },
            { label: "Edital", value: "Publicado em 21/07/2025" },
            { label: "Vagas", value: "564 + Cadastro de Reserva" },
        ],
        dates: {
            title: "Principais Datas",
            items: [
                "<strong>Inscrição:</strong> 22/07/2025 a 05/08/2025",
                "<strong>Pagamento da Taxa:</strong> até 05/08/2025",
                "<strong>Aplicação das Provas (Psicólogo):</strong> 14/09/2025",
                "<strong>Resultado Final Previsto:</strong> 01/04/2026",
            ],
        },
        stages: {
            title: "Etapas do Concurso",
            items: [
                "<strong>1ª Fase:</strong> Prova Objetiva, Redação, Prova de Títulos, Avaliação Biopsicossocial (PCD), Procedimento de Heteroidentificação.",
                "<strong>2ª Fase:</strong> Curso de Formação.",
            ],
        }
    },
    cargo: {
        title: "Informações Específicas para o Cargo de Psicólogo",
        grid: [
            { label: "Vagas Imediatas", value: "8" },
            { label: "Cadastro de Reserva", value: "100" },
            { label: "Vencimento", value: "R$ 4.441,89" },
            { label: "Carga Horária", value: "24h/semana" },
        ],
        duties: {
            title: "Atribuições do Cargo",
            text: "Realizar atendimento psicológico; elaborar laudos e relatórios; participar de equipes multidisciplinares; orientar adolescentes e familiares; realizar escuta qualificada; desenvolver planos de intervenção; acolher e orientar servidores; supervisionar estagiários; desenvolver estudos e pesquisas; e executar outras atividades correlatas."
        }
    },
    estrutura: {
        title: "Estrutura da Prova Objetiva para Psicólogo",
        description: "A prova terá 75 questões de múltipla escolha. Para ser aprovado, o candidato deve obter no mínimo 50% do total de pontos e não zerar em nenhuma disciplina.",
        table: {
            headers: ["Área de Conhecimento", "Disciplina", "Nº de Questões", "Peso", "Pontuação"],
            body: [
                { area: { text: "Conhecimentos Comuns", rowSpan: 5 }, discipline: "Língua Portuguesa", questions: "10", weight: "1,0", score: "10,0" },
                { discipline: "Noções de Direito Constitucional", questions: "5", weight: "1,0", score: "5,0" },
                { discipline: "Noções de Direito Administrativo", questions: "5", weight: "1,0", score: "5,0" },
                { discipline: "Noções de Direitos Humanos", questions: "5", weight: "1,0", score: "5,0" },
                { discipline: "Leis Especiais", questions: "10", weight: "1,0", score: "10,0" },
                { area: "Conhecimentos Específicos", isHighlight: true, discipline: "Conhecimentos de Psicologia", questions: "40", weight: "<strong>1,5</strong>", score: "<strong>60,0</strong>" },
            ],
            footer: {
                total: "TOTAL",
                questions: "75",
                score: "90,0"
            }
        }
    },
    conteudo: {
        title: "Conteúdo Programático (Ementa)",
        comuns: {
            title: "A) Disciplinas Comuns",
            items: [
                "<strong>LÍNGUA PORTUGUESA:</strong> Leitura e interpretação, sintaxe, pontuação, morfologia, concordância, regência e ortografia.",
                "<strong>RACIOCÍNIO LÓGICO MATEMÁTICO:</strong> Lógica, sequências, geometria, álgebra, análise combinatória, probabilidade, conjuntos.",
                "<strong>NOÇÕES DE DIREITOS HUMANOS:</strong> Conceitos, DUDH, Pactos Internacionais, Convenção sobre Direitos da Criança, medidas socioeducativas.",
                "<strong>NOÇÕES DE DIREITO PENAL:</strong> Princípios, aplicação da lei, tipos de crime, crimes contra Adm. Pública, Tortura, Lei de Drogas.",
                "<strong>NOÇÕES DE DIREITO CONSTITUCIONAL:</strong> Princípios, direitos e garantias, organização do Estado, Adm. Pública, Poderes.",
                "<strong>NOÇÕES DE DIREITO ADMINISTRATIVO:</strong> Conceitos, organização, poderes, ato administrativo, agentes públicos, Estatuto dos Servidores RJ.",
                "<strong>NOÇÕES DE DIREITO CIVIL:</strong> Princípios do Direito de Família, Filiação, Guarda, Tutela e Curatela.",
                "<strong>LEIS ESPECIAIS:</strong> Plano Nacional de Convivência Familiar, Regras da ONU (Beijing, Riad, Havana), ECA, SINASE.",
            ]
        },
        especificos: {
            title: "B) Conhecimentos Específicos para PSICÓLOGO",
            items: [
                "<strong>Psicologia Geral:</strong> Código de Ética, teorias da personalidade, psicopatologia, desenvolvimento, aconselhamento.",
                "<strong>Psicologia e Saúde do Adolescente:</strong> Adolescência, sexualidade, prevenção a drogas, transtornos alimentares.",
                "<strong>Avaliação Psicológica:</strong> CID e DSM, testes psicológicos, entrevista e anamnese.",
                "<strong>Psicologia Jurídica e Socioeducativa:</strong> Interface Psicologia/Direito, papel do psicólogo na justiça, ECA e SINASE, violência, trabalho com famílias.",
                "<strong>Técnicas e Teorias Psicoterápicas:</strong> Psicanálise, TCC, Humanismo, Sistêmica, intervenção em crise.",
                "<strong>Saúde Mental e do Trabalhador:</strong> Psicologia Institucional, sofrimento psíquico no trabalho, promoção da saúde mental.",
                "<strong>Políticas Públicas:</strong> Legislação de saúde mental, SUS e RAPS, papel do psicólogo nas políticas públicas.",
            ]
        }
    },
    plano: {
        title: "Plano de Estudos Estratégico",
        distribuicao: {
            title: "Distribuição Semanal de Blocos",
            items: [
                "<strong>Psicologia (Conhecimentos Específicos):</strong> 5 blocos (Foco máximo)",
                "<strong>Língua Portuguesa:</strong> 2 blocos",
                "<strong>Leis Especiais:</strong> 2 blocos",
                "<strong>Direitos (Grupo Rotativo):</strong> 1 bloco",
                "<strong>Redação e Revisão:</strong> 2 blocos (Fim de semana)",
            ]
        },
        detalhado: {
            title: "Conteúdo Detalhado por Bloco de Psicologia",
            items: [
                "<strong>Grupo 1 - Fundamentos e Ética:</strong> Código de Ética, Resoluções CFP, Teorias da Personalidade, Desenvolvimento.",
                "<strong>Grupo 2 - Psicopatologia e Avaliação:</strong> DSM-5/CID-11, Entrevista, Testes, Elaboração de Documentos.",
                "<strong>Grupo 3 - Psicologia Jurídica (CORAÇÃO DO CONCURSO):</strong> Interface com Direito, ECA e SINASE, Adolescente em conflito com a lei.",
                "<strong>Grupo 4 - Políticas Públicas e Saúde Mental:</strong> Rede de Proteção (CRAS, CREAS), SUS, RAPS, Técnicas de Intervenção.",
                "<strong>Grupo 5 - Temas Aplicados:</strong> Violência, Drogas, Saúde do Trabalhador, Direitos Humanos.",
            ]
        },
        metodologia: {
            title: "Metodologia TQR",
            text: "<strong>T - Teoria (40%):</strong> Estude o conteúdo por PDFs, videoaulas. <strong>Q - Questões (50%):</strong> Resolva o máximo de questões da banca IDECAN. <strong>R - Revisão (10%):</strong> Revise rapidamente ao final do bloco e aprofunde no fim de semana."
        }
    }
};


export const EditalDegase: React.FC = () => {
    const [activeTab, setActiveTab] = useState('info');

    const renderContent = () => {
        switch(activeTab) {
            case 'info': {
                const { title, grid, dates, stages } = contentData.info;
                return (
                    <div>
                        <h3 className="content-section-title">{title}</h3>
                        <div className="info-grid">
                            {grid.map(item => <div key={item.label} className="card info-card"><strong>{item.label}:</strong> {item.value}</div>)}
                        </div>
                        <h4 className="content-subtitle">{dates.title}</h4>
                        <ul className="content-list">
                            {dates.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                        <h4 className="content-subtitle">{stages.title}</h4>
                        {stages.items.map((item, i) => <p key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                    </div>
                );
            }
            case 'cargo': {
                const { title, grid, duties } = contentData.cargo;
                return (
                    <div>
                        <h3 className="content-section-title">{title}</h3>
                        <div className="info-grid">
                            {grid.map(item => <div key={item.label} className="card info-card"><strong>{item.label}:</strong> {item.value}</div>)}
                        </div>
                        <h4 className="content-subtitle">{duties.title}</h4>
                        <p className="content-paragraph">{duties.text}</p>
                    </div>
                );
            }
            case 'estrutura': {
                const { title, description, table } = contentData.estrutura;
                return (
                    <div>
                        <h3 className="content-section-title">{title}</h3>
                        <p className="content-paragraph">{description}</p>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    {table.headers.map(h => <th key={h}>{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {table.body.map((row, i) => (
                                    <tr key={i} className={row.isHighlight ? 'highlight-row' : ''}>
                                        {row.area && (typeof row.area === 'object' 
                                            ? <td rowSpan={row.area.rowSpan} style={{fontWeight: 'bold'}}>{row.area.text}</td> 
                                            : <td style={{fontWeight: 'bold'}}>{row.area}</td>)}
                                        <td>{row.discipline}</td>
                                        <td>{row.questions}</td>
                                        <td dangerouslySetInnerHTML={{ __html: row.weight }}/>
                                        <td dangerouslySetInnerHTML={{ __html: row.score }}/>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2} style={{fontWeight: 'bold', textAlign: 'right'}}>{table.footer.total}</td>
                                    <td style={{fontWeight: 'bold'}}>{table.footer.questions}</td>
                                    <td style={{fontWeight: 'bold'}}>-</td>
                                    <td style={{fontWeight: 'bold'}}>{table.footer.score}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            }
            case 'conteudo': {
                const { title, comuns, especificos } = contentData.conteudo;
                return (
                     <div>
                        <h3 className="content-section-title">{title}</h3>
                        <h4 className="content-subtitle">{comuns.title}</h4>
                        <ul className="content-list">
                            {comuns.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                        <h4 className="content-subtitle">{especificos.title}</h4>
                        <ul className="content-list">
                            {especificos.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                    </div>
                );
            }
            case 'plano': {
                const { title, distribuicao, detalhado, metodologia } = contentData.plano;
                return (
                     <div>
                        <h3 className="content-section-title">{title}</h3>
                         <h4 className="content-subtitle">{distribuicao.title}</h4>
                        <ul className="content-list">
                            {distribuicao.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                        <h4 className="content-subtitle">{detalhado.title}</h4>
                         <ul className="content-list">
                            {detalhado.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                         <h4 className="content-subtitle">{metodologia.title}</h4>
                          <p className="content-paragraph" dangerouslySetInnerHTML={{ __html: metodologia.text }}/>
                    </div>
                );
            }
            default: return null;
        }
    }
    
    return (
        <div className="edital-container">
            <header className="header">
                 <h1 className="header-title">Concurso DEGASE-RJ 2025</h1>
            </header>
            <div className="tab-container">
                <button onClick={() => setActiveTab('info')} className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}>Info Gerais</button>
                <button onClick={() => setActiveTab('cargo')} className={`tab-button ${activeTab === 'cargo' ? 'active' : ''}`}>Cargo</button>
                <button onClick={() => setActiveTab('estrutura')} className={`tab-button ${activeTab === 'estrutura' ? 'active' : ''}`}>Estrutura</button>
                <button onClick={() => setActiveTab('conteudo')} className={`tab-button ${activeTab === 'conteudo' ? 'active' : ''}`}>Conteúdo</button>
                <button onClick={() => setActiveTab('plano')} className={`tab-button ${activeTab === 'plano' ? 'active' : ''}`}>Plano de Estudos</button>
            </div>
            <div className="card" style={{ marginTop: '20px'}}>
                <div className="tab-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}