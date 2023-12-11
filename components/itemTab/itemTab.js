const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('item-data', (event, item) => {
        const itemDetails = item[0];
        document.getElementById('itemImage').src = itemDetails.img;
        document.getElementById('itemName').textContent = `שם המוצר: ${itemDetails.name}`;
        document.getElementById('itemDescription').textContent = `תיאור המוצר: ${itemDetails.description}`;
        document.getElementById('itemPrice').textContent = `מחיר לפריט: ₪${itemDetails.price}`;
        document.getElementById('itemStock').textContent = `כמות במלאי: ${itemDetails.stock}`;
        document.getElementById('itemBrand').textContent = `מותג: ${itemDetails.brand}`;
        document.getElementById('itemCategory').textContent = `קטגוריה: ${itemDetails.category}`;
        document.getElementById('itemSerial').textContent = `מזהה: ${itemDetails.serial}`;
        document.getElementById('itemActive').textContent = `פריט פעיל: ${itemDetails.active === 1 ? 'כן' : 'לא'}`;
        
        const itemsCustomers = document.getElementById("itemsCustomers");
        const customerIDs = itemDetails.customer_IDs.split(',');
        const customerName = itemDetails.CustomerName.split(',');
        
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
                itemsCustomers.appendChild(customerLink);
        
                customerLink.addEventListener("click", () => {
                    ipcRenderer.send('customerTab', id);
                });
            }
        }

        const itemsEmployees = document.getElementById("itemsEmployees");
        const employeeIDs = itemDetails.employee_IDs.split(',');
        const employeeName = itemDetails.EmployeeName.split(',');
        
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
                itemsEmployees.appendChild(employeeLink);
        
                employeeLink.addEventListener("click", () => {
                    ipcRenderer.send('employeeTab', id);
                });
            }
        }
        
        const itemsOrders = document.getElementById("itemsOrders");
        const orderIDs = itemDetails.order_IDs.split(',');
        const orderStatuses = itemDetails.orderStatuses.split(',');
        const orderNumbers = itemDetails.orderNumbers.split(',');
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
                itemsOrders.appendChild(orderLink);
                console.log(id);
                orderLink.addEventListener("click", () => {
                    ipcRenderer.send('orderTab', id);
                });
            }
        }

    });
});
