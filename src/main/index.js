const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  MenuItem,
} = require("electron");
const path = require("path");

let win;

let template = [
  {
    label: "編集",
    submenu: [
      {
        label: "元に戻す",
        accelerator: "Cmd+Z",
        role: "undo",
      },
      {
        label: "やり直し",
        accelerator: "Shift+Cmd+Z",
        role: "redo",
      },
      {
        type: "separator",
      },
      {
        label: "コピー",
        accelerator: "Cmd+C",
        role: "copy",
      },
      {
        label: "ペースト",
        accelerator: "Cmd+V",
        role: "paste",
      },
      {
        label: "カット",
        accelerator: "Cmd+X",
        role: "cut",
      },
      {
        label: "すべて選択",
        accelerator: "Cmd+A",
        role: "selectall",
      },
      {
        type: "separator",
      },
      {
        label: "KeyBrowserを終了",
        accelerator: "Cmd+Q",
        role: "quit",
      },
    ],
  },
  {
    label: "コマンド",
    submenu: [
      {
        label: "検索",
        accelerator: "Cmd+K",
        click: () => {
          win.webContents.send("search", "Cmd+K");
        },
      },
    ],
  },
  {
    label: "表示",
    submenu: [
      {
        label: "最小化",
        accelerator: "Cmd+M",
        role: "minimize",
      },
      {
        label: "全画面表示切り替え",
        accelerator: "Cmd+Ctrl+F",
        role: "togglefullscreen	",
      },
      {
        label: "再読込",
        accelerator: "Cmd+R",
        role: "reload",
      },
      {
        type: "separator",
      },
      {
        label: "開発者ツール表示切り替え",
        accelerator: "Cmd+D",
        role: "toggledevtools",
      },
    ],
  },
];

const createWindow = () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
  });

  win.loadURL(`file://${__dirname}/../../dist/index.html`);

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", createWindow);

// app.on("ready", () => {
//   globalShortcut.register("Command+K", () => {
//     win.webContents.send("scKey", "Command + K");
//   });
// });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
