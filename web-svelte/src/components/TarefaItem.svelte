<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let tarefa;

  let emEdicao = false;
  let descricaoTemp = tarefa.descricao;

  function toggleConcluida() {
    dispatch('atualizar', { ...tarefa, concluida: !tarefa.concluida });
  }

  function iniciarEdicao() {
    descricaoTemp = tarefa.descricao;
    emEdicao = true;
  }

  function salvarEdicao() {
    const textoLimpo = descricaoTemp.trim();
    if (textoLimpo && textoLimpo !== tarefa.descricao) {
      dispatch('atualizar', { ...tarefa, descricao: textoLimpo });
    }
    emEdicao = false;
  }

  function cancelarEdicao() {
    descricaoTemp = tarefa.descricao;
    emEdicao = false;
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') salvarEdicao();
    if (e.key === 'Escape') cancelarEdicao();
  }

  function confirmarExclusao() {
    if (confirm(`Deseja realmente excluir a tarefa "${tarefa.descricao}"?`)) {
      dispatch('excluir', tarefa.id);
    }
  }
</script>

<li class="tarefa-item" class:concluida={tarefa.concluida}>
  <label class="checkbox-container">
    <input
      type="checkbox"
      checked={tarefa.concluida}
      on:change={toggleConcluida}
    />
    <span class="checkmark"></span>
  </label>

  <div class="conteudo">
    {#if emEdicao}
      <input
        type="text"
        class="input-edicao"
        bind:value={descricaoTemp}
        on:blur={salvarEdicao}
        on:keydown={handleKeyDown}
        autofocus
      />
    {:else}
      <span
        class="texto-tarefa"
        on:dblclick={iniciarEdicao}
        title="Dê duplo clique para editar"
      >
        {tarefa.descricao}
      </span>
      <span class="badge-id">#{tarefa.id}</span>
    {/if}
  </div>

  <div class="acoes">
    <button class="btn-icone btn-excluir" on:click={confirmarExclusao} title="Excluir tarefa">
      🗑️
    </button>
  </div>
</li>

<style>
  .tarefa-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.85rem 1rem;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 0.5rem;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .tarefa-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .conteudo {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: default;
  }
  .texto-tarefa {
    font-size: 1rem;
    word-break: break-word;
  }
  .concluida .texto-tarefa {
    text-decoration: line-through;
    color: var(--text-muted);
  }
  .badge-id {
    font-size: 0.75rem;
    background: var(--bg-tag);
    color: var(--text-muted);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
  }
  .input-edicao {
    width: 100%;
    padding: 0.4rem 0.6rem;
    font-size: 0.95rem;
    border: 1px solid var(--primary);
    border-radius: 4px;
    background: var(--bg-main);
    color: var(--text-main);
  }
  .btn-icone {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.3rem;
    opacity: 0.6;
    transition: opacity 0.2s;
  }
  .btn-icone:hover {
    opacity: 1;
  }
</style>