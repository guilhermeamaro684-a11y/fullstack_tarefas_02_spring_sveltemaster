/**
 * Serviço de comunicação com a API REST Spring Boot (Fonte Única da Verdade).
 * Utiliza exclusivamente a Fetch API nativa em JavaScript puro (ES2022).
 */
const API_URL = 'http://localhost:8080/api/tarefas';

export async function listarTarefas() {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) {
        throw new Error(`Falha ao carregar tarefas: HTTP ${resposta.status}`);
    }
    return await resposta.json();
}

export async function criarTarefa(descricao) {
    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descricao, concluida: false })
    });
    if (!resposta.ok) {
        throw new Error(`Falha ao criar tarefa: HTTP ${resposta.status}`);
    }
    return await resposta.json();
}

export async function atualizarTarefa(tarefa) {
    const resposta = await fetch(`${API_URL}/${tarefa.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
    });
    if (!resposta.ok) {
        throw new Error(`Falha ao atualizar tarefa #${tarefa.id}: HTTP ${resposta.status}`);
    }
    return await resposta.json();
}

export async function excluirTarefa(id) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!resposta.ok) {
        throw new Error(`Falha ao excluir tarefa #${id}: HTTP ${resposta.status}`);
    }
    return true;
}