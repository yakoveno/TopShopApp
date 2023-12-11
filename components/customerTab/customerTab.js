const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('customer-data', (event, customer) => {
    console.log(customer);
    const customerDetails = customer[0];
    document.getElementById('customerName').textContent = `שם: ${customerDetails.first_name} ${customerDetails.last_name}`;
    document.getElementById('customerEmail').textContent = `דואר: ${customerDetails.email}`;
    document.getElementById('customerPhone1').textContent = `טלפון-1: ${customerDetails.phone_1}`;
    document.getElementById('customerPhone2').textContent = `טלפון-2: ${customerDetails.phone_2}`;
    document.getElementById('customerCity').textContent = `עיר: ${customerDetails.city}`;
    document.getElementById('customerStreet').textContent = `רחוב: ${customerDetails.street}`;
    document.getElementById('customerStreetNumber').textContent = `מספר: ${customerDetails.street_number}`;
        
    const customerOrders = document.getElementById("customerOrders");
    const orderIDs = customerDetails.order_IDs.split(',');
    const orderStatuses = customerDetails.orderStatuses.split(',');
    const orderNumbers = customerDetails.orderNumbers.split(',');
    const orderUniqueIDs = {};
    const orderUniqueNames = {};
    const orderUniqueNumbers = {};

    for (let i = 0; i < orderStatuses.length; i++) {
      const id = orderIDs[i];
      const status = orderStatuses[i];
      const number = orderNumbers[i];
    
      if (!orderUniqueIDs[id]) {
        orderUniqueIDs[id] = true;
        orderUniqueNames[status] = true;
        orderUniqueNumbers[number] = true;
  
        const orderLink = document.createElement("li");
        orderLink.className = "link";
        orderLink.innerHTML = `${number}<br>${status}`;
        customerOrders.appendChild(orderLink);
        orderLink.addEventListener("click", () => {
          ipcRenderer.send('orderTab', id);
        });
      }
    }

    const customerItems = document.getElementById("customerItems");
    const itemIDs = customerDetails.item_IDs.split(',');
    const itemName = customerDetails.itemNames.split(',');
    
    const itemUniqueIDs = {};
    const itemUniqueNames = {};

    for (let i = 0; i < itemName.length; i++) {
      const id = itemIDs[i];
      const name = itemName[i];
  
      if (!itemUniqueIDs[id]) {
        itemUniqueIDs[id] = true;
        itemUniqueNames[name] = true;

        const itemLink = document.createElement("li");
        itemLink.className = "link";
        itemLink.innerHTML = `${name}`;
        customerItems.appendChild(itemLink);

        itemLink.addEventListener("click", () => {
          ipcRenderer.send('itemTab', id);
        });
      }
    }

    const customerEmployees = document.getElementById("customerEmployees");
    const employeeIDs = customerDetails.employee_IDs.split(',');
    const employeeName = customerDetails.EmployeeNames.split(',');
    
    const employeeUniqueIDs = {};
    const employeeUniqueNames = {};

    for (let i = 0; i < employeeName.length; i++) {
      const id = employeeIDs[i];
      const name = employeeName[i];
      if (!employeeUniqueIDs[id]) {
        employeeUniqueIDs[id] = true;
        employeeUniqueNames[name] = true;
  
        const employeeLink = document.createElement("li");
        employeeLink.className = "link";
        employeeLink.innerHTML = `${name}`;
        customerEmployees.appendChild(employeeLink);
  
        employeeLink.addEventListener("click", () => {
          ipcRenderer.send('employeeTab', id);
        });
      }
    }

  });

});