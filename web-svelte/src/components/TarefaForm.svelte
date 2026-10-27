<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let descricao = '';
  let erro = '';

  function handleSubmit() {
    const textoLimpo = descricao.trim();
    if (!textoLimpo) {
      erro = 'A descrição da tarefa não pode estar vazia.';
      return;
    }
    erro = '';
    dispatch('adicionar', { descricao: textoLimpo });
    descricao = '';
  }
</script>

<form class="card-form" on:submit|preventDefault={handleSubmit}>
  <div class="input-group">
    <input
      type="text"
      placeholder="O que você precisa fazer hoje?"
      bind:value={descricao}
      class:input-error={erro}
    />
    <button type="submit" class="btn btn-primary">
      <span class="icon">➕</span> Adicionar
    </button>
  </div>
  {#if erro}
    <p class="msg-erro">{erro}</p>
  {/if}
</form>

<style>
  .card-form {
    margin-bottom: 1.5rem;
  }
  .input-group {
    display: flex;
    gap: 0.5rem;
  }
  input {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-card);
    color: var(--text-main);
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus {
    border-color: var(--primary);
  }
  input.input-error {
    border-color: var(--danger);
  }
  .msg-erro {
    color: var(--danger);
    font-size: 0.85rem;
    margin-top: 0.4rem;
  }
</style>