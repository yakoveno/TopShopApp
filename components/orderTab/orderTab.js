const { ipcRenderer } = require('electron');

ipcRenderer.on('order-data', (event, data) => {
    const order = data[0];
    if (new Date(order.placement_date) === null){
        document.getElementById('placementDate').textContent = "0";
    }
    else{
        document.getElementById('placementDate').textContent = new Date(order.placement_date).toLocaleDateString();
    }
    document.getElementById('orderNumber').textContent = order.number;
    document.getElementById('entryDate').textContent = new Date(order.entry_date).toLocaleDateString();
    document.getElementById('deliveryDate').textContent = new Date(order.delivery_date).toLocaleDateString();
    document.getElementById('totalItems').textContent = order.totalItems;
    document.getElementById('totalPrice').textContent = order.totalPrice.toFixed(2);
    document.getElementById('status').textContent = order.status;

    document.getElementById('customerInfo').addEventListener("click", () => {ipcRenderer.send('customerTab', order.customer_ID);});
    document.getElementById('customerName').textContent = `${order.customerFirstName} ${order.customerLastName}`;
    document.getElementById('customerPhone1').textContent = order.customerPhone1;
    document.getElementById('customerPhone2').textContent = order.customerPhone2;
    document.getElementById('customerEmail').textContent = order.customerEmail;
    document.getElementById('customerCity').textContent = order.customerCity;
    document.getElementById('customerStreet').textContent = order.customerStreet;
    document.getElementById('customerStreetNumber').textContent = order.customerStreetNumber;


    const itemsInfo = document.querySelector('.itemsInfo');
    const itemIDs = order.item_ID.split(',');
    const itemNames = order.itemName.split(',');
    const itemPrices = order.itemPrice.split(',');
    const itemQuantities = order.itemQuantity.split(',');
    const itemTotalPrices = order.itemTotalPrice.split(',');
    const itemBrands = order.itemBrand.split(',');
    const itemCategories = order.itemCategory.split(',');
    const itemSerials = order.itemSerial.split(',');
    const itemImages = order.itemImg.split(',');

    for (let i = 0; i < itemIDs.length; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="${itemImages[i]}">
            <p>שם: ${itemNames[i]}</p>
            <p>מחיר לפריט: ₪${itemPrices[i]}</p>
            <p>מותג: ${itemBrands[i]}</p>
            <p>קטגוריה: ${itemCategories[i]}</p>
            <p>מזהה: ${itemSerials[i]}</p>
            <p>כמות: ${itemQuantities[i]}</p>
            <p>סה"כ מחיר: ${itemTotalPrices[i]}</p>
        `;
        itemsInfo.appendChild(itemDiv);

        itemDiv.addEventListener("click", () => {ipcRenderer.send('itemTab', itemIDs[i]);});
    }
    const employeeInfo = document.getElementById("employeeInfo");
    document.getElementById('employeeName').textContent = `${order.employeeFirstName} ${order.employeeLastName}`;
    document.getElementById('employeeEmail').textContent = order.employeeEmail;
    document.getElementById('employeeRole').textContent = order.employeeRole;
    document.getElementById('employeePhone').textContent = order.employeePhone;
    employeeInfo.addEventListener("click", () => {ipcRenderer.send('employeeTab', order.employee_ID);});
});
