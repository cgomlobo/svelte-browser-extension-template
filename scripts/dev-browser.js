#!/usr/bin/env node

/**
 * This script handles the development workflow for browser extensions:
 * 1. Starts the watch process
 * 2. Waits for the initial build to complete
 * 3. Starts the web-ext command to run the extension in the browser
 */

import { spawn } from "child_process";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// Colors for console output
const colors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
};

// Start the watch process
function startWatcher() {
	console.log(`${colors.bright}${colors.blue}Starting watch process...${colors.reset}`);

	const watcher = spawn("npm", ["run", "watch"], {
		cwd: rootDir,
		stdio: "pipe", // We need to capture the output
		shell: true,
		env: {
			...process.env,
			FORCE_COLOR: "true", // Force color output even when piping
		},
	});

	let buildComplete = false;
	const buildCompletePromise = new Promise((resolve) => {
		watcher.stdout.on("data", (data) => {
			process.stdout.write(data);
			const output = data.toString();

			// Check if the build is complete
			if (output.includes("built in") && !buildComplete) {
				buildComplete = true;
				console.log(`${colors.bright}${colors.green}Watch build complete!${colors.reset}`);
				resolve();
			}
		});

		watcher.stderr.on("data", (data) => {
			process.stderr.write(data.toString());
		});
	});

	watcher.on("error", (error) => {
		console.error(`${colors.red}Error starting watcher:${colors.reset}`, error);
		process.exit(1);
	});

	return { watcher, buildCompletePromise };
}

// Start the web-ext command
function startWebExt(browser) {
	console.log(`${colors.bright}${colors.blue}Starting ${browser} with web-ext...${colors.reset}`);

	const target = browser === "chrome" ? "chromium" : "firefox-desktop";

	const webExt = spawn("web-ext", ["run", "--source-dir=dist", `--target=${target}`], {
		cwd: rootDir,
		stdio: "inherit",
		shell: true,
	});

	webExt.on("error", (error) => {
		console.error(`${colors.red}Error starting web-ext:${colors.reset}`, error);
	});

	return webExt;
}

// Handle process termination
function cleanup(processes) {
	processes.forEach((process) => {
		if (process && !process.killed) {
			process.kill();
		}
	});
	process.exit(0);
}

function setupCleanup(watcher, webExt) {
	const processes = [watcher, webExt];
	const handleSignals = (target) =>
		["SIGINT", "SIGTERM", "exit"].map((signal) => target.on(signal, () => cleanup(processes)));

	// For signals directly sent to the process, e.g. using kill command
	handleSignals(process);

	// For both signals sent to the process or user Ctrl-C input
	handleSignals(webExt);
}

// Main function
async function main() {
	// Get the browser from command line arguments
	const args = process.argv.slice(2);
	const browser = args[0] || "chrome";

	if (!["chrome", "firefox"].includes(browser)) {
		console.error(`${colors.red}Invalid browser: ${browser}. Use "chrome" or "firefox".${colors.reset}`);
		process.exit(1);
	}

	// Start the watcher
	const { watcher, buildCompletePromise } = startWatcher();

	// Wait for the first watch build to complete
	await buildCompletePromise;

	// Start the web-ext command
	const webExt = startWebExt(browser);

	// Setup cleanup
	setupCleanup(watcher, webExt);
}

main().catch((error) => {
	console.error(`${colors.red}Unhandled error:${colors.reset}`, error);
	process.exit(1);
});
