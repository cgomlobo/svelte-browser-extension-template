import browser from "webextension-polyfill";

// This script runs in the context of web pages
console.log("Content script loaded");

// Example: Listen for messages from the background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("Content script received message:", message);

	// Example: Send a response back
	sendResponse({ received: true, from: "content-script" });

	// Return true to indicate you wish to send a response asynchronously
	return true;
});

// Example: Send a message to the background script
browser.runtime
	.sendMessage({ from: "content-script", action: "init" })
	.then((response) => {
		console.log("Response from background:", response);
	})
	.catch((error) => {
		console.error("Error sending message:", error);
	});

// Example: Manipulate the DOM
function injectElement() {
	const div = document.createElement("div");
	div.id = "svelte-extension-injected";
	div.style.display = "none";
	document.body.appendChild(div);
}

// Run when the DOM is fully loaded
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", injectElement);
} else {
	injectElement();
}
