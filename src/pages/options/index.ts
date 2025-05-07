import { mount } from "svelte";
import Options from "../../components/Options.svelte";

// Initialize the Svelte app
mount(Options, {
    target: document.getElementById("app") as HTMLElement
});
