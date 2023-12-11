
function showSalesComponent(employee){
  const RoleTab = document.getElementById("RoleTab");
	const SalesTab = document.createElement("div");
	SalesTab.className = "SalesTab";
	SalesTab.innerHTML = `
    <div id="Screen">
      <div id="EmployeeOrdersData" class="EmployeeContainers"></div>
      <div id="EmployeeCustomersData" class="EmployeeContainers"></div>
      <div id="TreatmentOrdersData" class="EmployeeContainers"></div>
      <div id="OrderDisplayBox"></div>
      <div id="OrderDisplayItems"></div>
    </div>
  `;

	RoleTab.appendChild(SalesTab);
  processSalesAgentData(employee);
}

async function processSalesAgentData(employee){
    createOrderDisplayInsert(employee);
    const orders = await getOrders();
    const employeeDataOrders = [];

    if (employee.order_IDs) {
    const orderIDs = employee.order_IDs.split(',').map(Number);
    const employeeOrders = orders.filter(order => orderIDs.includes(order.order_ID));

    employeeDataOrders.push({
        employee,
        orders: employeeOrders
    });
    } else {
        employeeDataOrders.push({
        employee,
        orders: []
    });
    }
    createEmployeeOrdersData(employeeDataOrders);

    const customers = await getCustomers();
    const employeeDataCustomers = [];

    if (employee.customer_IDs) {
    const customerIDs = employee.customer_IDs.split(',').map(Number);
    const employeeCustomers = customers.filter(customer => customerIDs.includes(customer.customer_ID));

    employeeDataCustomers.push({
        employee,
        customers: employeeCustomers
    });
    } else {
    employeeDataCustomers.push({
        employee,
        customers: []
    });
    }
    createEmployeeCustomersData(employeeDataCustomers);

    const unregisteredOrders = orders.filter(order => order.employee_ID === null);

    const unplacedOrders = employeeDataOrders[0].orders.filter(order => order.placement_date === null);
    const employee_ID = employee.employee_ID;
    createTreatmentOrdersData(unregisteredOrders,unplacedOrders, employee_ID);

    const items = await getItems();
    createOrderDisplayItems(items);
}

function createEmployeeOrdersData(employeeDataOrders) {
    const employee_ID = employeeDataOrders[0].employee.employee_ID;
  const orders = employeeDataOrders[0].orders;

  const EmployeeOrdersData = document.getElementById("EmployeeOrdersData");
  EmployeeOrdersData.innerHTML = '';
  EmployeeOrdersData.innerHTML = `<h4>הזמנות שלי</h4>`;

  const EmployeeOrdersDataSearch = document.createElement("div");
  EmployeeOrdersData.appendChild(EmployeeOrdersDataSearch);

  const searchInput = document.createElement("input");
  searchInput.id = "searchInput";
  searchInput.placeholder = "חיפוש";
  EmployeeOrdersDataSearch.appendChild(searchInput);

  const EmployeeOrdersList = document.createElement("div");
  EmployeeOrdersList. className = "EmployeeListContainer";
  EmployeeOrdersData.appendChild(EmployeeOrdersList);

  const updateOrders = () => {
    orders.forEach(order => {
      const entryDate = new Date(order.entry_date).toLocaleDateString();
      const Order = document.createElement("li");
      Order.className = "OrdersDataCard";
      Order.innerHTML = `${order.customerFirstName} ${order.customerLastName}<br>${order.number}<br>${entryDate}`;
      const isEmployeeOrder = true;
      Order.addEventListener("click", () => {
        createOrderDisplayUpdate(order, employee_ID, isEmployeeOrder);
      });
      EmployeeOrdersList.appendChild(Order);
    });
  }
  updateOrders();

  searchInput.addEventListener("input", async function() {
    const searchString = searchInput.value.toLowerCase();
    const Order = document.querySelectorAll(".OrdersDataCard");
    let isSearching = true;

    Order.forEach(order => {
      if (!isSearching) {
        return;
      }

      const orderName = order.textContent.toLowerCase();
      if (orderName.includes(searchString)) {
        order.style.backgroundColor = "#ccffcc";
        EmployeeOrdersList.prepend(order);
      } else {
        order.style.backgroundColor = "";
        EmployeeOrdersList.appendChild(order);
      }
    });

    if (searchString === "") {
      isSearching = false;
      Order.forEach(order => {
        const originalBackgroundColor = order.getAttribute("data-original-bg");
        order.style.backgroundColor = originalBackgroundColor;
      });
    }
  });
}

function createEmployeeCustomersData(employeeDataCustomers){
  const employee_ID = employeeDataCustomers[0].employee.employee_ID;
  const customers = employeeDataCustomers[0].customers;

  const EmployeeCustomersData = document.getElementById("EmployeeCustomersData");
  EmployeeCustomersData.innerHTML = '';
  EmployeeCustomersData.innerHTML = `<h4>לקוחות שלי</h4>`;

  const EmployeeCustomerDataSearch = document.createElement("div");
  EmployeeCustomersData.appendChild(EmployeeCustomerDataSearch);

  const searchInput = document.createElement("input");
  searchInput.id = "searchInput";
  searchInput.placeholder = "חיפוש";
  EmployeeCustomerDataSearch.appendChild(searchInput);

  const EmployeeCustomerList = document.createElement("div");
  EmployeeCustomerList.className = "EmployeeListContainer";
  EmployeeCustomersData.appendChild(EmployeeCustomerList);

  const updateCustomers = () => {
    customers.forEach(customer => {
      const customerOrderIDs = customer.order_IDs.split(',');
      const uniqueOrderIDs = [...new Set(customerOrderIDs)];
      const customerOrderNumbers = customer.orderNumbers.split(',');
      const uniqueOrderNumbers = [...new Set(customerOrderNumbers)];
  
      const Customer = document.createElement("ul");
      Customer.className = "CustomersDataCard";
      Customer.innerHTML = `${customer.first_name} ${customer.last_name}`;
  
      uniqueOrderIDs.forEach((orderID, index) => {
        const OrderItem = document.createElement("li");
        const orderNumber = uniqueOrderNumbers[index];
        OrderItem.innerHTML = `<a href="#" data-orderid="${orderID}">הזמנה ${orderNumber}</a>`;
        OrderItem.addEventListener("click", async () => {
          try {
            const order = await getOrders(orderID);
            if (order) {
              const isEmployeeOrder = true;
              createOrderDisplayUpdate(order[0], employee_ID, isEmployeeOrder);
            } else {
              console.log(`Order with ID ${orderID} not found.`);
            }
          } catch (error) {
            console.error(`Error fetching order with ID ${orderID}:`, error);
          }
        });
        Customer.appendChild(OrderItem);
      });
  
      EmployeeCustomerList.appendChild(Customer);
    });
  };
  updateCustomers();


  searchInput.addEventListener("input", async function() {
    const searchString = searchInput.value.toLowerCase();
    const Customer = document.querySelectorAll(".CustomersDataCard");
    let isSearching = true;

    Customer.forEach(customer => {
      if (!isSearching) {
        return;
      }

      const customerName = customer.textContent.toLowerCase();
      if (customerName.includes(searchString)) {
        customer.style.backgroundColor = "#ccffcc";
        EmployeeCustomerList.prepend(customer);
      } else {
        customer.style.backgroundColor = "";
        EmployeeCustomerList.appendChild(customer);
      }
    });

    if (searchString === "") {
      isSearching = false;
      Customer.forEach(customer => {
        const originalBackgroundColor = customer.getAttribute("data-original-bg");
        customer.style.backgroundColor = originalBackgroundColor;
      });
    }
  });
}

function createTreatmentOrdersData(unregisteredOrders,unplacedOrders, employee_ID){
  const TreatmentOrdersData = document.getElementById("TreatmentOrdersData");
  TreatmentOrdersData.innerHTML = '';
  TreatmentOrdersData.innerHTML = `<h4>הזמנות לטיפול</h4>`;

  const TreatmentOrdersDataSearch = document.createElement("div");
  TreatmentOrdersData.appendChild(TreatmentOrdersDataSearch);


  const searchInput = document.createElement("input");
  searchInput.id = "searchInput";
  searchInput.placeholder = "חיפוש";
  TreatmentOrdersDataSearch.appendChild(searchInput);

  const TreatmentOrdersList = document.createElement("div");
  TreatmentOrdersList. className = "EmployeeListContainer";
  TreatmentOrdersData.appendChild(TreatmentOrdersList);

  const updateUnregisteredOrders = () => {
      unregisteredOrders.forEach(order => {
          const entryDate = new Date(order.entry_date).toLocaleDateString();
          const Order = document.createElement("li");
          Order.className = "TreatmentOrderCard";
          Order.innerHTML = `<u>הזמנה פנויה</u><br>${order.number}<br>${order.customerFirstName} ${order.customerLastName}<br>${entryDate}`;
          const isEmployeeOrder = false;
          Order.addEventListener("click", () => {
              createOrderDisplayUpdate(order, employee_ID, isEmployeeOrder);
          });
          TreatmentOrdersList.appendChild(Order);
      });
  }
  updateUnregisteredOrders();

  const updateUnplacedOrders = () => {
      unplacedOrders.forEach(order => {
          const entryDate = new Date(order.entry_date).toLocaleDateString();
          const Order = document.createElement("li");
          Order.className = "TreatmentOrderCard";
          Order.innerHTML = `<u>הזמנה לא משובצת</u><br>${order.number}<br>${order.customerFirstName} ${order.customerLastName}<br>${entryDate}`;
          const isEmployeeOrder = true;
          Order.addEventListener("click", () => {
              createOrderDisplayUpdate(order, employee_ID, isEmployeeOrder);
          });
          TreatmentOrdersList.appendChild(Order);
      });
  }
  updateUnplacedOrders();

  searchInput.addEventListener("input", async function() {
    const searchString = searchInput.value.toLowerCase();
    const Order = document.querySelectorAll(".TreatmentOrderCard");
    let isSearching = true;

    Order.forEach(order => {
      if (!isSearching) {
        return;
      }

      const orderName = order.textContent.toLowerCase();
      if (orderName.includes(searchString)) {
        order.style.backgroundColor = "#ccffcc";
        TreatmentOrdersList.prepend(order);
      } else {
        order.style.backgroundColor = "";
        TreatmentOrdersList.appendChild(order);
      }
    });

    if (searchString === "") {
      isSearching = false;
      Order.forEach(order => {
        const originalBackgroundColor = order.getAttribute("data-original-bg");
        order.style.backgroundColor = originalBackgroundColor;
      });
    }
  });
}

function createOrderDisplayUpdate(order, employee,isEmployeeOrder) {
  const OrderDisplayBox = document.getElementById("OrderDisplayBox");
  OrderDisplayBox.innerHTML = '';

  const OrderInfoData = document.createElement("div");
  OrderInfoData.id = 'OrderInfoData';
  OrderInfoData.innerHTML = '';
  OrderDisplayBox.appendChild(OrderInfoData);

  const OrderDetailData = document.createElement("div");
  OrderDetailData.className = "OrderInfoDataSection";
  OrderDetailData.id = "OrderDetailData";
  OrderDetailData.innerHTML = `
      מספר הזמנה: <label id="orderNumber">${order.number}</label><br>
      תאריך כניסה: <label id="entryDate" type="date">${formatDate(order.entry_date)}</label><br>
      תאריך שיבוץ: <input id="placementDate" type="date" value="${formatDate(order.placement_date)}">
      <button id="clearPlacementDateButton">איפוס תאריך</button><br>
      תאריך משלוח: <input id="deliveryDate" type="date" value="${formatDate(order.delivery_date)}">
      <button id="clearDeliveryDateButton">איפוס תאריך</button><br>
      <label for="statusSelect">סטאטוס:</label>
      <select id="statusSelect" name="status">
          <option value="ממתין" ${order.status === "ממתין" ? 'selected' : ''}>ממתין</option>
          <option value="באריזה" ${order.status === "באריזה" ? 'selected' : ''}>באריזה</option>
          <option value="באספקה" ${order.status === "באספקה" ? 'selected' : ''}>באספקה</option>
          <option value="סופק" ${order.status === "סופק" ? 'selected' : ''}>סופק</option>
          <option value="הוחזר" ${order.status === "הוחזר" ? 'selected' : ''}>הוחזר</option>
          <option value="בוטל" ${order.status === "בוטל" ? 'selected' : ''}>בוטל</option>
      </select><br>
      <span><button id="updateOrderButton">עדכן</button> <button id="cancelOrderButton">לבטל</button></span>
  `;
  OrderInfoData.appendChild(OrderDetailData);

  clearPlacementDateButton.addEventListener("click", () => {
    document.getElementById("placementDate").value = '';
  });

  clearDeliveryDateButton.addEventListener("click", () => {
      document.getElementById("deliveryDate").value = '';
  });

  const cancelOrderButton = document.getElementById("cancelOrderButton");
  cancelOrderButton.addEventListener("click", async () => {
    await getEmployees(employee.employee_ID).then((empl) => {
      createOrderDisplayInsert(empl[0]);
    })
  });

  updateOrderButton.addEventListener("click", () => {
      updateOrderFromDisplay(event, order, employee, isEmployeeOrder);
  });

  const CustomerInfoData = document.createElement("div");
  CustomerInfoData.className = "OrderInfoDataSection";
  CustomerInfoData.id = "CustomerInfoData";
  CustomerInfoData.innerHTML = `
      שם פרטי: <input id="customerFirstName" value="${order.customerFirstName || ''}"><br>
      שם משפחה: <input id="customerLastName" value="${order.customerLastName || ''}"><br>
      טלפון 1: <input id="customerPhone1" value="${order.customerPhone1 || ''}"><br>
      טלפון 2: <input id="customerPhone2" value="${order.customerPhone2 || ''}"><br>
      אימייל: <input id="customerEmail" value="${order.customerEmail || ''}"><br>
      עיר: <input id="customerCity" value="${order.customerCity || ''}"><br>
      רחוב: <input id="customerStreet" value="${order.customerStreet || ''}"><br>
      מספר בית: <input id="customerStreetNumber" value="${order.customerStreetNumber || ''}"><br>
      מספר דירה: <input id="customerApartment" value="${order.customerApartment || ''}"><br>
  `;  
  
  OrderInfoData.appendChild(CustomerInfoData);

  function formatDate(dateString) {
      if (!dateString) {
          return '0';
      }
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
  const OrderItemsInfo = document.createElement("div");
  OrderItemsInfo.id = 'OrderItemsInfo';
  OrderItemsInfo.className = 'OrderInfoDataSection';
  OrderItemsInfo.innerHTML = '';
  OrderDisplayBox.appendChild(OrderItemsInfo);

  if (order.item_ID) {
      const itemID = order.item_ID.split(',');
      const itemNames = order.itemName.split(',');
      const itemSerial = order.itemSerial.split(',');
      const itemQuantities = order.itemQuantity.split(',');
      const itemTotalPrices = order.itemTotalPrice.split(',');
      const itemPrices = order.itemPrice.split(',');
      createOrderItemDataCard(itemID, itemNames,itemSerial, itemQuantities,itemTotalPrices, itemPrices);
  }
}

function createOrderDisplayInsert(employee) {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const orderNumber = `${month}${day}T${hours}${minutes}`;
  const entryDate = `${year}-${month}-${day}`;
  const OrderDisplayBox = document.getElementById("OrderDisplayBox");
  OrderDisplayBox.innerHTML = '';

  const OrderInfoData = document.createElement("div");
  OrderInfoData.id = 'OrderInfoData';
  OrderInfoData.innerHTML = '';
  OrderDisplayBox.appendChild(OrderInfoData);

  const OrderDetailData = document.createElement("div");
  OrderDetailData.className = "OrderInfoDataSection";
  OrderDetailData.id = "OrderDetailData";
  OrderDetailData.innerHTML = `
    מספר הזמנה: <label id="orderNumber">${orderNumber}</label><br>
    תאריך כניסה: <label id="entryDate" type="date">${entryDate}</label><br>
    תאריך שיבוץ: <input id="placementDate" type="date">
    <button id="clearPlacementDateButton">איפוס תאריך</button><br>
    תאריך משלוח: <input id="deliveryDate" type="date">
    <button id="clearDeliveryDateButton">איפוס תאריך</button><br>
    <label for="statusSelect">סטאטוס:</label>
    <select id="statusSelect" name="status">
        <option value="ממתין">ממתין</option>
        <option value="באריזה">באריזה</option>
        <option value="באספקה">באספקה</option>
        <option value="סופק">סופק</option>
        <option value="הוחזר">הוחזר</option>   
        <option value="בוטל">בוטל</option>
    </select><br>
    <span><button id="insertOrderButton">לאשר</button> <button id="cancelOrderButton">לבטל</button></span> 
  `;
  OrderInfoData.appendChild(OrderDetailData);

  clearPlacementDateButton.addEventListener("click", () => {
    document.getElementById("placementDate").value = '';
  });

  clearDeliveryDateButton.addEventListener("click", () => {
    document.getElementById("deliveryDate").value = '';
  });

  const cancelOrderButton = document.getElementById("cancelOrderButton");
  cancelOrderButton.addEventListener("click", async () => {
    await getEmployees(employee.employee_ID).then((empl) => {
      console.log(empl[0]);
      createOrderDisplayInsert(empl[0]);
    })
  });
  const insertOrderButton = document.getElementById("insertOrderButton");
  insertOrderButton.addEventListener("click", () => {
    insertOrderFromDisplay(employee);
  });

  const CustomerInfoData = document.createElement("div");
  CustomerInfoData.className = "OrderInfoDataSection";
  CustomerInfoData.id = "CustomerInfoData";
  CustomerInfoData.innerHTML = `
      <span>שם פרטי: <span id="customerFirstNameError"></span></span><input id="customerFirstName"><br>
      <span>שם משפחה:<span id="customerLastNameError"></span></span><input id="customerLastName"><br>
      <span>טלפון 1: <span id="customerPhone1Error"></span></span><input id="customerPhone1"><br>
      טלפון 2: <input id="customerPhone2"><br>
      <span>אימייל: <span id="customerEmailError"></span></span><input id="customerEmail"><br>
      <span>עיר: <span id="customerCityError"></span></span><input id="customerCity"><br>
      רחוב: <input id="customerStreet"><br>
      מספר בית: <input id="customerStreetNumber"><br>
      מספר דירה: <input id="customerApartment"><br>
  `;

  OrderInfoData.appendChild(CustomerInfoData);

  const OrderItemsInfo = document.createElement("div");
  OrderItemsInfo.id = 'OrderItemsInfo';
  OrderItemsInfo.className = 'OrderInfoDataSection';
  OrderItemsInfo.innerHTML = '';
  const customerItemError = document.createElement("span");
  customerItemError.id = 'customerItemError';
  OrderItemsInfo.appendChild(customerItemError);
  OrderDisplayBox.appendChild(OrderItemsInfo);
}

function createOrderItemDataCard(itemID, itemNames, itemSerial, itemQuantities, itemTotalPrices, itemPrices) {
  if (!Array.isArray(itemID)) {
    itemID = [itemID];
    itemNames = [itemNames];
    itemSerial = [itemSerial];
    itemQuantities = [itemQuantities];
    itemTotalPrices = [itemTotalPrices];
    itemPrices = [itemTotalPrices];
  }

  for (let i = 0; i < itemID.length; i++) {
    const OrderItemDataCard = document.createElement('div');
    OrderItemDataCard.id = `itemCard-${itemID[i]}`;
    OrderItemDataCard.className = "OrderItemDataCard";
    OrderItemDataCard.innerHTML = `
      מוצר: <label id="itemName">${itemNames[i]}</label><br>
      מזהה: <label id="itemSerial">${itemSerial[i]}</label><br>
      כמות: <input id="itemQuantity-${itemID[i]}" value="${itemQuantities[i]}"></input><br>
      מחיר: <label id="itemTotalPrice-${itemID[i]}">${itemTotalPrices[i]} ₪</label><br>
      <button class="removeAllButton">הסר מוצר</button>
    `;

    const itemQuantityInput = OrderItemDataCard.querySelector(`#itemQuantity-${itemID[i]}`);
    const itemTotalPriceLabel = OrderItemDataCard.querySelector(`#itemTotalPrice-${itemID[i]}`);
        
    itemQuantityInput.addEventListener("change", () => {
      const newQuantity = parseInt(itemQuantityInput.value, 10);
      if (!isNaN(newQuantity) && newQuantity >= 0) {
        const singleItemPrice = itemPrices[i];
        const newTotalPrice = singleItemPrice * newQuantity;
        itemTotalPriceLabel.textContent = `${newTotalPrice} ₪`;
      }
    });

    const removeAllButton = OrderItemDataCard.querySelector('.removeAllButton');
    removeAllButton.addEventListener("click", () => {
      const itemCardId = `itemCard-${itemID[i]}`;
      const itemCard = document.getElementById(itemCardId);
      if (itemCard) {
        itemCard.remove();
      }
    });
    document.getElementById("OrderItemsInfo").appendChild(OrderItemDataCard);
  }
}

async function insertOrderFromDisplay(employee) {
  const employee_ID = employee.employee_ID;

  const number = document.getElementById("orderNumber").textContent;
  const entry_date = document.getElementById("entryDate").textContent;
  const placement_date = document.getElementById("placementDate").value || null;
  const delivery_date = document.getElementById("deliveryDate").value || null;
  const status = document.getElementById("statusSelect").value || null;

  const orderData = {
    number,
    entry_date,
    placement_date,
    delivery_date,
    status
  };

  const customerData = {
    first_name: document.getElementById("customerFirstName").value,
    last_name: document.getElementById("customerLastName").value,
    phone_1: document.getElementById("customerPhone1").value,
    phone_2: document.getElementById("customerPhone2").value,
    email: document.getElementById("customerEmail").value,
    city: document.getElementById("customerCity").value,
    street: document.getElementById("customerStreet").value,
    street_number: document.getElementById("customerStreetNumber").value,
    apartment: document.getElementById("customerApartment").value,
    lon: null,
    lat: null,
  };

  if (customerData.first_name === null) {
    const errorSpan = document.getElementById(`customerFirstNameError`);
    if (errorSpan) {
      errorSpan.textContent =  `* שדה חובה *`;
      errorSpan.style.color = "rgb(40 0 255)";
      errorSpan.style.fontSize = "medium";
      errorSpan.style.margin = "0";
      errorSpan.style.paddingTop = "3px";
      return;
    }
  } else {
    const errorSpan = document.getElementById(`customerFirstNameError`);
    if (errorSpan) {
      errorSpan.innerHTML = '';
    }
  }
  
  if (customerData.last_name === null) {
    const errorSpan = document.getElementById(`customerLastNameError`);
    if (errorSpan) {
      errorSpan.textContent =  `* שדה חובה *`;
      errorSpan.style.color = "rgb(40 0 255)";
      errorSpan.style.fontSize = "medium";
      errorSpan.style.margin = "0";
      errorSpan.style.paddingTop = "3px";
      return;
    }
  } else {
    const errorSpan = document.getElementById(`customerLastNameError`);
    if (errorSpan) {
      errorSpan.innerHTML = '';
    }
  }

  if (customerData.phone_1 === null) {
    const errorSpan = document.getElementById(`customerPhone1Error`);
    if (errorSpan) {
      errorSpan.textContent =  `* שדה חובה *`;
      errorSpan.style.color = "rgb(40 0 255)";
      errorSpan.style.fontSize = "medium";
      errorSpan.style.margin = "0";
      errorSpan.style.paddingTop = "3px";
      return;
    }
  } else {
    const errorSpan = document.getElementById(`customerPhone1Error`);
    if (errorSpan) {
      errorSpan.innerHTML = '';
    }
  }

  if (customerData.email === null) {
    const errorSpan = document.getElementById(`customerEmailError`);
    if (errorSpan) {
      errorSpan.textContent = `* שדה חובה *`;
      errorSpan.style.color = "rgb(40 0 255)";
      errorSpan.style.fontSize = "medium";
      errorSpan.style.margin = "0";
      errorSpan.style.paddingTop = "3px";
      return;
    }
  } else {
    const errorSpan = document.getElementById(`customerEmailError`);
    if (errorSpan) {
      errorSpan.innerHTML = '';
    }
  }
  
  if (customerData.city === null) {
    const errorSpan = document.getElementById(`customerCityError`);
    if (errorSpan) {
      errorSpan.textContent = `* שדה חובה *`;
      errorSpan.style.color = "rgb(40 0 255)";
      errorSpan.style.fontSize = "medium";
      errorSpan.style.margin = "0";
      errorSpan.style.paddingTop = "3px";
      return;
    }
  } else {
    const errorSpan = document.getElementById(`customerCityError`);
    if (errorSpan) {
      errorSpan.innerHTML = '';
    }
  }

  const city = customerData.city;
  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Response status is not OK (${response.status})`);
    }
    const data = await response.json();

    if (data.length === 0) {
      throw new Error('Data is empty');
    }

    const CityLon = parseFloat(data[0].lon);
    const CityLat = parseFloat(data[0].lat);

    if (isNaN(CityLon) || isNaN(CityLat)) {
      throw new Error(`Invalid CityLon or CityLat. Data: ${JSON.stringify(data)}`);
    }
    
    customerData.lon = CityLon;
    customerData.lat = CityLat;
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    throw error;
  }

  const orderItemsInfo = document.getElementById("OrderItemsInfo");
  const itemCards = orderItemsInfo.getElementsByClassName("OrderItemDataCard");

  if (itemCards.length === 0) {
    const errorSpan = document.getElementById(`customerItemError`);
    if (errorSpan) {
      errorSpan.textContent = `* שדה חובה *`;
      errorSpan.style.color = "rgb(40 0 255)";
      errorSpan.style.fontSize = "medium";
      errorSpan.style.margin = "0";
      errorSpan.style.paddingTop = "3px";
      return;
    }
  } else {
    const errorSpan = document.getElementById(`customerItemError`);
    if (errorSpan) {
      errorSpan.innerHTML = '';
    }
  }

  const itemInserts = [];
  for (const itemCard of itemCards) {
    const item_ID = itemCard.id.split("-")[1];
    const itemQuantityInput = itemCard.querySelector(`#itemQuantity-${item_ID}`);
    const quantity = parseInt(itemQuantityInput.value, 10);
  
    if (!isNaN(quantity) && quantity >= 0) {
      itemInserts.push({
        item_ID,
        quantity,
      });
    }
  }

  try {
    const insertResult = await insertOrder(employee_ID, orderData, customerData, itemInserts);
    if (insertResult) {
      const employees = await getEmployees(employee_ID);
      if (employees.length > 0) {
        const employee = employees[0];
        processSalesAgentData(employee);
        createSchedule(employee);
      }   
      const notification = new window.Notification("בוצעה הרשמת הזמנה");
      setTimeout(() => { notification.close(); }, 16000);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    const logMessage = `An error occurred: ${error}\n`;
    const logFilePath = './error.log';

    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      } else {
        console.log('Error logged to', logFilePath);
      }
    });
  }
}  

async function updateOrderFromDisplay(event, order, employee_ID, isEmployeeOrder) {
  event.preventDefault();
  const order_ID = order.order_ID;
  const orderData = {
    number: document.getElementById("orderNumber").textContent,
    entry_date: document.getElementById("entryDate").textContent,
    delivery_date: document.getElementById("deliveryDate").value || null,
    status: document.getElementById("statusSelect").value,
    placement_date: document.getElementById("placementDate").value || null,
  };

  const customerData = {
    customer_ID: order.customer_ID,
    first_name: document.getElementById("customerFirstName").value,
    last_name: document.getElementById("customerLastName").value,
    phone_1: document.getElementById("customerPhone1").value,
    phone_2: document.getElementById("customerPhone2").value,
    email: document.getElementById("customerEmail").value,
    city: document.getElementById("customerCity").value,
    street: document.getElementById("customerStreet").value,
    street_number: document.getElementById("customerStreetNumber").value,
    apartment: document.getElementById("customerApartment").value,
    lon: null,
    lat: null, 
  };

  const itemUpdates = [];
  const orderItemsInfo = document.getElementById("OrderItemsInfo");
  
  for (const itemCard of orderItemsInfo.children) {
    const item_ID = itemCard.id.split("-")[1];
    const itemQuantityInput = itemCard.querySelector(`#itemQuantity-${item_ID}`);
    const quantity = parseInt(itemQuantityInput.value, 10);

    if (!isNaN(quantity) && quantity >= 0) {
      itemUpdates.push({
        item_ID,
        quantity,
      });
    }
  }

  const city = customerData.city;
  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Response status is not OK (${response.status})`);
    }
    const data = await response.json();

    if (data.length === 0) {
      throw new Error('Data is empty');
    }

    const CityLon = parseFloat(data[0].lon);
    const CityLat = parseFloat(data[0].lat);

    if (isNaN(CityLon) || isNaN(CityLat)) {
      throw new Error(`Invalid CityLon or CityLat. Data: ${JSON.stringify(data)}`);
    }
    
    customerData.lon = CityLon;
    customerData.lat = CityLat;
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    throw error;
  }

  console.log(orderData, customerData, itemUpdates ,isEmployeeOrder);
  try {
    const updateResult = await updateOrder(order_ID, orderData, employee_ID, customerData, itemUpdates, isEmployeeOrder);
    if (updateResult) {
      const employees = await getEmployees(employee_ID);
      if (employees.length > 0) {
        const employee = employees[0];
        processSalesAgentData(employee);
        createSchedule(employee);
      }
    }    
    const notification = new window.Notification("בוצעה עדכון הזמנה");
    setTimeout(() => {notification.close();}, 16000);
  } catch (error) {
    console.error('An error occurred:', error);
    const logMessage = `An error occurred: ${error}\n`;
    const logFilePath = './error.log';

    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      } else {
        console.log('Error logged to', logFilePath);
      }
    });
  }
}

function createOrderDisplayItems(items) {
    const OrderDisplayItems = document.getElementById("OrderDisplayItems");
    OrderDisplayItems.innerHTML = '';

    const OrderDisplayItemsDataSearch = document.createElement("div");
    OrderDisplayItems.appendChild(OrderDisplayItemsDataSearch);

    const searchInput = document.createElement("input");
    searchInput.id = "searchInput";
    searchInput.placeholder = "חיפוש";
    OrderDisplayItemsDataSearch.appendChild(searchInput);

    const OrderDisplayItemsList = document.createElement("div");
    OrderDisplayItemsList.id = 'OrderDisplayItemsList';
    OrderDisplayItems.appendChild(OrderDisplayItemsList);

    const updateOrderItemsList = () => {
        const OrderDisplayItemsList = document.getElementById("OrderDisplayItemsList");
        OrderDisplayItemsList.innerHTML = '';
        for (const item of items) {
            const itemDiv = document.createElement('div');
            itemDiv.className = "item";
            itemDiv.innerHTML = `
                <img src="${item.img}">
                <p>${item.name}</p>
                <p>₪${item.price}</p>
                <p>${item.brand}</p>
                <p>${item.category}</p>
                <p>${item.serial}</p>
                <u>במלאי ${item.stock > 0 ? 'כן' : 'לא'}</u>
            `;
            OrderDisplayItemsList.appendChild(itemDiv);

            itemDiv.addEventListener("click", () => {
                createOrderItemDataCard(item.item_ID,item.name,item.serial,1,item.price);
            });
        }
    }
    updateOrderItemsList();
    searchInput.addEventListener("input", async function() {
        const searchString = searchInput.value.toLowerCase();
        const Item = document.querySelectorAll(".item");
        let isSearching = true;
    
        Item.forEach(item => {
          if (!isSearching) {return;}
          const itemName = item.textContent.toLowerCase();
          if (itemName.includes(searchString)) {
            item.style.backgroundColor = "#ccffcc";
            OrderDisplayItemsList.prepend(item);
          } else {
            item.style.backgroundColor = "";
            OrderDisplayItemsList.appendChild(item);
          }
        });
        if (searchString === "") {
          isSearching = false;
          Item.forEach(item => {
            const originalBackgroundColor = item.getAttribute("data-original-bg");
            item.style.backgroundColor = originalBackgroundColor;
          });
        }
    });
}

