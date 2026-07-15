<script>
  let { choice, onresolve } = $props();

  function handleResolve(value) {
    if (onresolve) onresolve(value);
  }
</script>

{#if choice}
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>{choice.title}</h2>
      <div class="options">
        {#each choice.options as option}
          <button class="btn-option" onclick={() => handleResolve(option.value)}>
            {option.text}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-content {
    background: var(--emi-bg-panel, #1e293b);
    padding: 24px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--emi-text-main, #f8fafc);
  }

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    font-family: var(--emi-font-heading, 'Marvin Round', 'Public Sans', sans-serif);
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 60vh;
    overflow-y: auto;
  }

  .btn-option {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-size: 1rem;
    transition: all 0.2s ease;
    font-family: var(--emi-font-ui, 'Public Sans', sans-serif);
  }

  .btn-option:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--emi-color-accent, #55b7b0);
    transform: translateY(-1px);
  }
</style>
