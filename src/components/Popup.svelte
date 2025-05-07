<script lang="ts">
import { onMount } from "svelte";
import browser from "webextension-polyfill";

let count = 0;
let currentUrl = "";
let loading = true;

function increment() {
	count += 1;
}

function sendMessageToBackground() {
	browser.runtime
		.sendMessage({
			from: "popup",
			action: "buttonClicked",
			count,
		})
		.then((response) => {
			console.log("Response from background:", response);
		})
		.catch((error) => {
			console.error("Error sending message:", error);
		});
}

onMount(async () => {
	// Example: Get the current tab URL
	try {
		const tabs = await browser.tabs.query({ active: true, currentWindow: true });
		if (tabs[0]?.url) {
			currentUrl = tabs[0].url;
		}
	} catch (error) {
		console.error("Error getting tab:", error);
	} finally {
		loading = false;
	}
});
</script>

<main>
  <h1>Svelte Extension</h1>
  
  {#if loading}
    <p>Loading...</p>
  {:else}
    <p>Current URL: {currentUrl}</p>
  {/if}
  
  <div class="counter">
    <button on:click={increment}>
      Count: {count}
    </button>
  </div>
  
  <div class="actions">
    <button on:click={sendMessageToBackground}>
      Send Message to Background
    </button>
  </div>
</main>

<style>
  :global(*) {
    /* CSS minimal reset */
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  main {
    padding: 1rem;
    text-align: center;
    width: 320px;
    height: 480px;
  }

  h1 {
    color: #ff3e00;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .counter {
    margin: 1rem 0;
  }

  .actions {
    margin-top: 1rem;
  }

  button {
    background-color: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    margin: 0.5rem;
  }

  button:hover {
    background-color: #ff6b31;
  }
</style>
