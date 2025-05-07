import { mount } from "svelte";
import Popup from "../../components/Popup.svelte";

// Initialize the Svelte app
mount(Popup, {
	target: document.getElementById("app") as HTMLElement,
});
