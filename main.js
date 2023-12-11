const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const {getOrders,getCustomers,getItems,getEmployees} = require('./database');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1690,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile('index.html');

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click() {
            mainWindow.reload();
          }
        },
        {
          label: 'Developer Tools',
          accelerator: 'CmdOrCtrl+Shift+I',
          click() {
            mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

require('electron-reload')(__dirname);

app.allowRendererProcessReuse = true;
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

const openOrderWindows = {};
ipcMain.on('orderTab', async (_event, order_ID) => {
  if (openOrderWindows[order_ID]) {
    openOrderWindows[order_ID].show();
  } else {
    const orderWindow = new BrowserWindow({
      width: 750,
      minHeight: 740,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });
    await getOrders(order_ID).then(order => {
      orderWindow.loadFile('components/orderTab/orderTab.html');
      orderWindow.webContents.on('did-finish-load', () => {
        orderWindow.webContents.send('order-data', order);
      });
    })
    openOrderWindows[order_ID] = orderWindow;
    orderWindow.on('closed', () => {
      delete openOrderWindows[order_ID];
    });
  }
});

const openEmployeeWindows = {};
ipcMain.on('employeeTab', async (_event, employee_ID) => {
  if (openEmployeeWindows[employee_ID]) {
    openEmployeeWindows[employee_ID].show();
  } else {
    const employeeWindow = new BrowserWindow({
      width: 430,
      minHeight: 600,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    await getEmployees(employee_ID).then(employee => {
      employeeWindow.loadFile('components/employeeTab/employeeTab.html');
      employeeWindow.webContents.on('did-finish-load', () => {
        employeeWindow.webContents.send('employee-data', employee); 
      });
    })
    openEmployeeWindows[employee_ID] = employeeWindow; 
    employeeWindow.on('closed', () => {
      delete openEmployeeWindows[employee_ID];
    });
  }
});

const openCustomerWindows = {};
ipcMain.on('customerTab', async (_event, customer_ID) => {
  if (openCustomerWindows[customer_ID]) {
    openCustomerWindows[customer_ID].show();
  } else {
    const customerWindow = new BrowserWindow({
      width: 430,
      minHeight: 600,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    await getCustomers(customer_ID).then(customer => {
      customerWindow.loadFile('components/customerTab/customerTab.html');
      customerWindow.webContents.on('did-finish-load', () => {
        customerWindow.webContents.send('customer-data', customer); 
      });
    })
    openCustomerWindows[customer_ID] = customerWindow; 
    customerWindow.on('closed', () => {
      delete openCustomerWindows[customer_ID];
    });
  }
});

const openItemWindows = {};
ipcMain.on('itemTab', async (_event, item_ID) => {
  if (openItemWindows[item_ID]) {
    openItemWindows[item_ID].show();
  } else {
    const itemWindow = new BrowserWindow({
      width: 430,
      minHeight: 600,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    await getItems(item_ID).then(item => {
      itemWindow.loadFile('components/itemTab/itemTab.html');
      itemWindow.webContents.on('did-finish-load', () => {
        itemWindow.webContents.send('item-data', item); 
      });
    })
    openItemWindows[item_ID] = itemWindow; 
    itemWindow.on('closed', () => {
      delete openItemWindows[item_ID];
    });
  }
});

const openNoteWindows = {};
ipcMain.on('NoteTab', (event, note) => {
  const note_ID = note.note_ID;
  if (openNoteWindows[note_ID]) {openNoteWindows[note_ID].show();} 
  else {
    const noteWindow = new BrowserWindow({
      width: 400,
      height: 300,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });
    noteWindow.loadFile('components/NoteTab/NoteTab.html');
    noteWindow.webContents.on('did-finish-load', () => {
      noteWindow.webContents.send('note-data', note);
    });
    openNoteWindows[note_ID] = noteWindow;
    noteWindow.on('closed', () => {
      delete openNoteWindows[note_ID];
    });
  }
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

