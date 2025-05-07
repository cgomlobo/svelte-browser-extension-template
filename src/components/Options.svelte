<script lang="ts">
  // Options component for the extension settings page
  let extensionName = "Svelte Extension";
  let enableFeature = true;
</script>

<main>
  <h1>Options for {extensionName}</h1>
  
  <section class="options-container">
    <div class="option-item">
      <label for="enable-feature">
        <input 
          type="checkbox" 
          id="enable-feature" 
          bind:checked={enableFeature}
        />
        Enable feature
      </label>
    </div>
    
    <div class="option-item">
      <button on:click={() => alert("Settings saved!")}>Save Settings</button>
    </div>
  </section>
  
  <footer>
    <p>You can customize these options to configure your extension.</p>
  </footer>
</main>

<style>
  main {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    color: #333;
    margin-bottom: 2rem;
  }
  
  .options-container {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .option-item {
    margin-bottom: 1rem;
    padding: 0.5rem 0;
  }
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
  
  button {
    background-color: #4a5568;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  button:hover {
    background-color: #2d3748;
  }
  
  footer {
    margin-top: 2rem;
    color: #666;
    font-size: 0.9rem;
  }
</style>
