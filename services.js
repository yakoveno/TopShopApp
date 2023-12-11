const { 
    getItems, 
    getItemsTech,
    insertItemTech,
    updateItemTech,
  
    getOrdersTech,
    insertOrderTech,
    updateOrderTech,
    getOrders,
    insertOrder,
    updateOrder,
  
    getOrderItemsTech,
    deleteOrderItemsTech,
    deleteOrderItemsTechAll,

    getCustomers,
    getCustomersTech,
    insertCustomerTech,
    updateCustomerTech,
  
    getCustomerOrdersTech,
    deleteCustomerOrdersTech,
  
    getEmployees,
    getEmployeesTech,
    insertEmployeeTech,
    updateEmployeeTech,
  
    getEmployeeOrderTech,
    deleteEmployeeOrderTech,
    
    getLinkingTables,
  
    getMessagesEmployee,
    insertMessage,
    updateMessageState,
    updateMessageStatus,
  
    getNotes,
    insertNote,
    deleteNote,
} = require('./database');
const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');

function logErrorDetails(error, stackTrace) {
    const stackLines = stackTrace.split("\n");
    const callerFunctionName = stackLines[1].trim();
    const location = stackLines[2].trim();
    const timestamp = new Date().toLocaleString();
    const eventType = 'Failure';
  
    const logMessage = `
      Event Name: ${callerFunctionName}
      Location: ${location}
      Timestamp: ${timestamp}
      Event Type: ${eventType}
      Event: ${error.name}
      Error: ${error.message}
    `;
  
    const logFilePath = './error.log';
  
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      } else {
        console.log('Error logged to', logFilePath);
      }
    });
}

function showLoginScreen() {
    const LoginContainer = document.getElementById('LoginContainer');


    const emailInput = document.createElement('input');
    emailInput.id = 'email';
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    LoginContainer.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.id = 'password';
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    LoginContainer.appendChild(passwordInput);

    const loginButton = document.createElement('button');
    loginButton.id = `login`;
    loginButton.textContent = 'Login';
    LoginContainer.appendChild(loginButton);

    const loginMessage = document.createElement('p');
    loginMessage.id = 'loginMessage';
    LoginContainer.appendChild(loginMessage);

    loginButton.addEventListener('click', async () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        const employees = await getEmployees();
        const matchedEmployee = employees.find(employee => employee.email === email && employee.password === password);

        if (matchedEmployee) {
            if (matchedEmployee.active !== 0) {
                const employee_ID = matchedEmployee.employee_ID;
                showMainScreen(employee_ID); 
            } else {
                loginMessage.textContent = 'גישה לא מורשית: העובד אינו פעיל';
            }
        } else {
            loginMessage.textContent = 'דוא"ל או סיסמה שגויים';
        }
    });
}

showLoginScreen();

function showMainScreen(employee_ID) {
    LoginContainer.remove();
    const mainScreen = document.getElementById('MainScreen');
    mainScreen.style.display = 'block';

    getEmployees(employee_ID).then(employees => {
        const employee = employees[0]; 
        createSchedule(employee);
        createProfile(employee);
        if (employee.role === "מנכל") {showManagerComponent();}
        else if (employee.role === "מכירות") {showSalesComponent(employee);}
        else if (employee.role === "תמיכה") {showTechnicianComponent();} 
    });
}


