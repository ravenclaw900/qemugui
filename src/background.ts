"use strict";

import { app, protocol, BrowserWindow, Menu, shell } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

let win: BrowserWindow;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 400,
    minHeight: 200,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      enableRemoteModule: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL("http://127.0.0.1:8080");
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
  win.maximize();
}

async function createMenu() {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        role: "appMenu"
      },
      {
        role: "fileMenu"
      },
      {
        label: "Machine",
        submenu: [
          {
            label: "New VM",
            accelerator: "CmdOrCtrl+N",
            click() {
              win.webContents.send("newVM");
            }
          },
          {
            label: "Delete VM",
            accelerator: "CmdOrCtrl+Backspace",
            click() {
              win.webContents.send("deleteVM");
            }
          },
          {
            label: "Disk Images",
            accelerator: "CmdOrCtrl+D",
            click() {
              win.webContents.send("diskImages");
            }
          }
        ]
      },
      {
        role: "windowMenu"
      },
      {
        role: "help",
        submenu: [
          {
            label: "Open an Issue on GitHub",
            click: async () => {
              await shell.openExternal(
                "https://github.com/ravenclaw900/qemugui/issues"
              );
            }
          }
        ]
      }
    ])
  );
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension("ljjemllljcmogpfapbkkighbhhppjdbg");
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  createMenu();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
