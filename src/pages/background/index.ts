import browser from "webextension-polyfill";

// This file runs as a background script in the extension
console.log("Background script loaded");

// Example: Listen for installation event
browser.runtime.onInstalled.addListener((details) => {
	console.log("Extension installed:", details);
});

// Example: Listen for messages from content scripts or popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("Received message:", message, "from:", sender);

	// Example: Send a response back
	sendResponse({ received: true });

	// Return true to indicate you wish to send a response asynchronously
	return true;
});
