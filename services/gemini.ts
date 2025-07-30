import type { Question, SearchResult } from '../types';

const callApi = async (body: object): Promise<any> => {
    try {
        const response = await fetch('/.netlify/functions/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error calling the Netlify function:", error);
        throw error;
    }
}

export const getAIExplanation = async (question: Question): Promise<string> => {
    const prompt = `
        **Análise de Questão de Concurso**

        **Questão:**
        **Enunciado:** ${question.enunciado}
        **Alternativas:**
        ${Object.entries(question.alternativas).map(([key, value]) => `${key}) ${value}`).join('\n')}

        **Gabarito Correto:** ${question.gabarito}

        **Tarefa:**
        Explique de forma clara e didática por que a alternativa **${question.gabarito}** é a correta. Se possível, comente brevemente por que as outras alternativas estão incorretas. A explicação deve ser útil para um estudante de concurso público.
    `;

    try {
        const response = await callApi({ prompt, tools: [] });
        return response.text;
    } catch (error) {
        return "Ocorreu um erro ao buscar a explicação. Verifique o console para mais detalhes.";
    }
};

export const getAISearchResult = async (question: Question): Promise<SearchResult> => {
    const prompt = `
        Com base na seguinte questão de concurso, identifique o tópico principal e forneça um resumo conciso sobre ele, utilizando informações da web.
        **Questão:** ${question.enunciado}
        **Tópico sugerido:** ${(question.tags || []).join(', ')}
        Retorne apenas o resumo.
    `;

    try {
        const response = await callApi({
            prompt,
            tools: [{googleSearch: {}}],
        });
        
        const summary = response.text;
        const sources = response.sources || [];
        
        return { summary, sources };
    } catch (error) {
        return { summary: "Ocorreu um erro ao pesquisar na web. Verifique o console para mais detalhes.", sources: [] };
    }
};