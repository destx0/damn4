import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
	? path.join(process.env.APP_ROOT, "public")
	: RENDERER_DIST;

let mainWindow = null;
let addWindow = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			preload: path.join(__dirname, "preload.mjs"),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
	}
}

function createAddWindow() {
	addWindow = new BrowserWindow({
		width: 400,
		height: 300,
		parent: mainWindow,
		modal: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.mjs"),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (VITE_DEV_SERVER_URL) {
		addWindow.loadURL(`${VITE_DEV_SERVER_URL}#/add`);
	} else {
		addWindow.loadFile(path.join(RENDERER_DIST, "index.html"), {
			hash: "add",
		});
	}

	addWindow.on("closed", () => {
		addWindow = null;
	});
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		mainWindow = null;
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(() => {
	createWindow();

	ipcMain.on("open-add-window", () => {
		if (!addWindow) {
			createAddWindow();
		}
	});
});
