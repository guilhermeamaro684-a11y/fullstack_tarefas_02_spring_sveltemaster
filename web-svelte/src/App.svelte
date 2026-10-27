<script>
  import { onMount } from 'svelte';
  import {
    listarTarefas,
    criarTarefa,
    atualizarTarefa,
    excluirTarefa
  } from './services/tarefaService.js';
  import TarefaForm from './components/TarefaForm.svelte';
  import TarefaList from './components/TarefaList.svelte';

  let tarefas = [];
  let carregando = true;
  let mensagemErro = '';
  let filtroAtual = 'todas'; // 'todas' | 'pendentes' | 'concluidas'

  onMount(async () => {
    await carregarDados();
  });

  async function carregarDados() {
    carregando = true;
    mensagemErro = '';
    try {
      tarefas = await listarTarefas();
    } catch (err) {
      mensagemErro = 'Não foi possível conectar ao servidor Spring Boot na porta 8080.';
    } finally {
      carregando = false;
    }
  }

  async function handleAdicionar(e) {
    try {
      const nova = await criarTarefa(e.detail.descricao);
      tarefas = [nova, ...tarefas];
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleAtualizar(e) {
    const tarefaAtualizada = e.detail;
    try {
      await atualizarTarefa(tarefaAtualizada);
      tarefas = tarefas.map(t => t.id === tarefaAtualizada.id ? tarefaAtualizada : t);
    } catch (err) {
      alert(err.message);
      await carregarDados(); // Reverte para o estado oficial
    }
  }

  async function handleExcluir(e) {
    const id = e.detail;
    try {
      await excluirTarefa(id);
      tarefas = tarefas.filter(t => t.id !== id);
    } catch (err) {
      alert(err.message);
    }
  }
</script>

<div class="container">
  <header class="header">
    <div class="logo-area">
      <span class="badge-svelte">Svelte 5 (JS Puro)</span>
      <h1>📝 Lista de Tarefas</h1>
    </div>
    <p class="subtitulo">Consumindo a Fonte Única da Verdade na porta 8080</p>
  </header>

  {#if mensagemErro}
    <div class="banner-erro">
      <p>⚠️ {mensagemErro}</p>
      <button class="btn btn-secondary" on:click={carregarDados}>Tentar Novamente</button>
    </div>
  {/if}

  <TarefaForm on:adicionar={handleAdicionar} />

  {#if carregando}
    <p class="status-texto">Carregando tarefas do servidor...</p>
  {:else}
    <TarefaList
      {tarefas}
      bind:filtro={filtroAtual}
      on:atualizar={handleAtualizar}
      on:excluir={handleExcluir}
    />
  {/if}
</div>