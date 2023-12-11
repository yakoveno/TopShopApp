const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('employee-data', (event, employee) => {
        const employeeDetails = employee[0];
        document.getElementById('employeeAvatar').src = employeeDetails.avatar;
        document.getElementById('employeeName').textContent = `שם: ${employeeDetails.first_name} ${employeeDetails.last_name}`;
        document.getElementById('employeeEmail').textContent = `דואר: ${employeeDetails.email}`;
        document.getElementById('employeePhone').textContent = `טלפון: ${employeeDetails.phone}`;
        document.getElementById('employeeRole').textContent = `תפקיד: ${employeeDetails.role}`;
        document.getElementById('employeeActive').textContent = `עובד פעיל: ${employeeDetails.active === 1 ? 'כן' : 'לא'}`;
        
        const employeeCustomers = document.getElementById("employeeCustomers");
        const customerIDs = employeeDetails.customer_IDs.split(',');
        const customerName = employeeDetails.CustomerNames.split(',');
        
        const customerUniqueIDs = {};
        const customerUniqueNames = {};

        for (let i = 0; i < customerName.length; i++) {
            const id = customerIDs[i];
            const name = customerName[i];
        
            if (!customerUniqueIDs[id]) {
                customerUniqueIDs[id] = true;
                customerUniqueNames[name] = true;
        
                const customerLink = document.createElement("li");
                customerLink.className = "link";
                customerLink.innerHTML = `${name}`;
                employeeCustomers.appendChild(customerLink);
        
                customerLink.addEventListener("click", () => {
                    ipcRenderer.send('customerTab', id);
                });
            }
        }

        const employeeOrders = document.getElementById("employeeOrders");
        const orderIDs = employeeDetails.order_IDs.split(',');
        const orderStatuses = employeeDetails.orderStatuses.split(',');
        const orderNumbers = employeeDetails.orderNumbers.split(',');
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
                employeeOrders.appendChild(orderLink);
                orderLink.addEventListener("click", () => {
                    ipcRenderer.send('orderTab', id);
                });
            }
        }

        const employeeItems = document.getElementById("employeeItems");
        const itemIDs = employeeDetails.item_IDs.split(',');
        const itemName = employeeDetails.itemNames.split(',');
        
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
                employeeItems.appendChild(itemLink);
        
                itemLink.addEventListener("click", () => {
                    ipcRenderer.send('itemTab', id);
                });
            }
        }

    });
});