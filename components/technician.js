function showTechnicianComponent(employee) {
    const RoleTab = document.getElementById("RoleTab");
    const TechnicianTab = document.createElement("div");
    TechnicianTab.id = 'TechnicianTab';

    TechnicianTab.innerHTML = `
        <div id="HolderScreens">
            <div id="HolderScreensNavigation">
                <li id="NavigationControllerPanel" class="ScreensNavigationLink">לוח בקרה</li>
                <li id="NavigationItems" class="ScreensNavigationLink">מוצרים</li>
                <li id="NavigationOrders" class="ScreensNavigationLink">הזמנות</li>
                <li id="NavigationCustomers" class="ScreensNavigationLink">לקוחות</li>
                <li id="NavigationEmployees" class="ScreensNavigationLink">עובדים</li>
            </div>
            <div id="ChosenScreenDisplay"></div>
        </div>
    `;
    RoleTab.appendChild(TechnicianTab);

    NavigationItems.addEventListener("click", async () => {
        const ChosenScreenDisplay = document.getElementById("ChosenScreenDisplay");
        ChosenScreenDisplay.innerHTML = `
            <div id="ScreensSections" class="ScreensSections">
                <table id="TechnicianTableleList"></table>
                <table id="TechnicianTableData" ></table>
            </div>
        `;
        EngineProcessDisplayHolderScreens('מוצרים');
    })
    NavigationOrders.addEventListener("click", async () => {
        const ChosenScreenDisplay = document.getElementById("ChosenScreenDisplay");
        ChosenScreenDisplay.innerHTML = `
            <div id="ScreensSections" class="ScreensSections">
                <div id="TechnicianTableleList"></div>
                <table id="TechnicianTableData"></table>
            </div>
        `;

        EngineProcessDisplayHolderScreens('הזמנות');
    })
    NavigationCustomers.addEventListener("click", async () => {
        const ChosenScreenDisplay = document.getElementById("ChosenScreenDisplay");
        ChosenScreenDisplay.innerHTML = `
            <div id="ScreensSections" class="ScreensSections">
                <div id="TechnicianTableleList"></div>
                <table id="TechnicianTableData"></table>
            </div>
        `;

        EngineProcessDisplayHolderScreens('לקוחות');
    })
    NavigationEmployees.addEventListener("click", async () => {
        const ChosenScreenDisplay = document.getElementById("ChosenScreenDisplay");
        ChosenScreenDisplay.innerHTML = `
            <div id="ScreensSections" class="ScreensSections">
                <div id="TechnicianTableleList"></div>
                <table id="TechnicianTableData"></table>
            </div>
        `;

        EngineProcessDisplayHolderScreens('עובדים');
    })
    NavigationControllerPanel.addEventListener("click", async () => {
        const ChosenScreenDisplay = document.getElementById("ChosenScreenDisplay");
        ChosenScreenDisplay.innerHTML = `
        <div id="ControllerPanelTech">
            <div id="LogFileDisplayTech"></div>
            <div id="DataTablesDisplayTech">
                <div id="DataValueTech"></div>
                <div id="DataCombinationTables">
                    <div id="SelectedDataCombination">
                        <div id="OrderItemsTechTable" class="CombinationTechTable"></div>
                        <div id="CustomerOrdersTechTable" class="CombinationTechTable"></div>
                        <div id="EmployeeOrderTechTable" class="CombinationTechTable"></div>
                    </div>
                    <div id="SelectedDataTable"></div>
                </div>
            </div>
        </div>
        `;
        EngineControllerPanel();
        createLogFileDisplayTech();
    })
    NavigationControllerPanel.click();
}

async function EngineControllerPanel(){

    try {
        const DataValueTech = await getLinkingTables();
        createDataValueTech(DataValueTech);
    } catch (error) {
        
    }
}

function createDataValueTech(data) {
    const DataValueTech = document.getElementById("DataValueTech");
    DataValueTech.innerHTML = '';

    const table = document.createElement("table");
    table.classList.add("dataValueTable");

    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = Object.keys(data[0]).map((header) => SwapNameEngHeb(header));
    headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = SwapNameEngHeb(header);
        headerRow.appendChild(th);
    });

    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    const reversedHeaders = Object.keys(data[0]).map((header) => SwapNameHebEng(header));
    
    const tableBody = document.createElement("tbody");

    data.forEach((item, index) => {
        const row = document.createElement("tr");
        const backgroundColor = colorVariants[index];
        row.style.backgroundColor = backgroundColor;

        reversedHeaders.forEach((header) => {
            const cell = document.createElement("td");
            const cellValue = header === "entry_date" ? formatDate(item[header]) : item[header];
            cell.textContent = cellValue;
            row.appendChild(cell);
        });
        
        row.addEventListener("click", () => {
            createSelectedDataCombination(item);
        });
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    DataValueTech.appendChild(table);
}

async function createSelectedDataCombination(item) {
    const customer_ID = item.customer_ID;
    const order_ID = item.order_ID;
    const employee_ID = item.employee_ID;

    let orderItem = await getOrderItemsTech(order_ID);
    if (orderItem.length > 0) {
        const OrderItemsTechTable = document.getElementById("OrderItemsTechTable");
        OrderItemsTechTable.innerHTML = '';
        const tableOrderItems = createTable(orderItem, 'OrderItemsTechTable');
        OrderItemsTechTable.appendChild(tableOrderItems);
        createItemTable(orderItem);
    }

    let customerOrder = await getCustomerOrdersTech(customer_ID, order_ID);
    if (customerOrder.length > 0) {
        const CustomerOrdersTechTable = document.getElementById("CustomerOrdersTechTable");
        CustomerOrdersTechTable.innerHTML = '';
        const tableCustomerOrders = createTable(customerOrder, 'CustomerOrdersTechTable');
        CustomerOrdersTechTable.appendChild(tableCustomerOrders);
    }

    let employeeOrder = await getEmployeeOrderTech(employee_ID, order_ID);
    if (employeeOrder.length > 0) {
        const EmployeeOrderTechTable = document.getElementById("EmployeeOrderTechTable");
        EmployeeOrderTechTable.innerHTML = '';
        const tableEmployeeOrders = createTable(employeeOrder, 'EmployeeOrderTechTable');
        EmployeeOrderTechTable.appendChild(tableEmployeeOrders);
    }
}

  
function createTable(data, tableName) {
    const table = document.createElement("table");
    table.classList.add("dataValueTable");

    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = Object.keys(data[0]);

    headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = SwapNameEngHeb(header);
        headerRow.appendChild(th);
    });

    const deleteHeader = document.createElement("th");
    headerRow.appendChild(deleteHeader);

    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    const tableBody = document.createElement("tbody");

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const cellValue = data[key];
            const row = document.createElement("tr");
            headers.forEach((header) => {
                const cell = document.createElement("td");
                cell.textContent = cellValue[header];
                row.appendChild(cell);
            });
    
            const deleteButton = document.createElement("li");
            deleteButton.textContent = "למחוק";
            deleteButton.addEventListener("click", () => {
                console.log(tableName, data);

                deleteDataTable(tableName, data);
            });
    
            const deleteCell = document.createElement("td");
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);
    
            tableBody.appendChild(row);
        }
    }

    table.appendChild(tableBody);
    return table;
}

async function deleteDataTable(tableName, data) {
    try {
        if (data.length > 0) {
            const item = data[0];
            const order_ID = item.order_ID;
            console.log(order_ID);

            if (tableName === "OrderItemsTechTable") {
                await deleteOrderItemsTechAll(order_ID).then(() => {
                    NavigationControllerPanel.click();
                });
            } else if (tableName === "EmployeeOrderTechTable") {
                await deleteEmployeeOrderTech(order_ID).then(() => {
                    NavigationControllerPanel.click();
                });
            } else if (tableName === "CustomerOrdersTechTable") {
                await deleteCustomerOrdersTech(order_ID).then(() => {
                    NavigationControllerPanel.click();
                });
            }
        }
    } catch (error) {
        const stackTrace = error.stack;
        logErrorDetails(error, stackTrace);
    }
}

  
function createItemTable(data) {
    const SelectedDataTable = document.getElementById("SelectedDataTable");
    SelectedDataTable.innerHTML = '';
  
    data.forEach((item) => {
      const itemNames = item.item_name.split(',');
      const quantities = item.quantity.split(',');
      const item_IDs = item.item_ID.split(',');
      const order_ID = item.order_ID;
  
      itemNames.forEach((itemName, i) => {
        const SelectedDataCard = document.createElement("div");
        SelectedDataCard.classList.add("SelectedDataCard");
        SelectedDataCard.innerHTML = `
          <p>שם מוצר: ${itemName}</p>
          <p>כמות: ${quantities[i]}</p>
          <li class="deleteLink">למחוק</li>
        `;
        const deleteButton = SelectedDataCard.querySelector(".deleteLink");
        deleteButton.addEventListener("click", () => {
            deleteOrderItemsTech(item_IDs[i], order_ID);
            NavigationControllerPanel.click();
        });

        SelectedDataTable.appendChild(SelectedDataCard);
      });
    });
  
    return SelectedDataTable;
}


function createLogFileDisplayTech() {
    const LogFileDisplayTech = document.getElementById("LogFileDisplayTech");
    LogFileDisplayTech.innerHTML = '';

    fetch('error.log')
        .then(response => response.text())
        .then(logContent => {
            const logDisplay = document.createElement('pre');
            logDisplay.textContent = logContent;

            LogFileDisplayTech.appendChild(logDisplay);
        })
        .catch(error => {
            console.error('Error fetching log file:', error);
        });
}

// מפעיל את הגישה לנתונים היוצרת ביקוש לפי שם עמודה
async function EngineProcessDisplayHolderScreens(nameSection) {
    try {
      if (nameSection === 'מוצרים') {
        const items = await getItemsTech();
        EventTableCard(items, 'מוצרים');
      }
      if (nameSection === 'הזמנות') {
        const orders = await getOrdersTech();
        EventTableCard(orders, 'הזמנות');
      }
      if (nameSection === 'לקוחות') {
        const customers = await getCustomersTech();
        EventTableCard(customers, 'לקוחות');
      }
      if (nameSection === 'עובדים') {
        const employees = await getEmployeesTech();
        EventTableCard(employees, 'עובדים');
      }
    } catch (error) {
        const stackTrace = error.stack;
        logErrorDetails(error, stackTrace);
    }
}
// הוחז רשימת עמודות אשר נלחצו
const clickedRowIds = {};
// הוחז צבעים נוצרים לשימוש
const colorVariants = generateColorVariants();

// מייצר צבעים
function generateColors(baseColor, count, incrementValue, alpha) {
    const colors = [];
    const baseRGB = [
        parseInt(baseColor.slice(1, 3), 16),
        parseInt(baseColor.slice(3, 5), 16),
        parseInt(baseColor.slice(5, 7), 16),
    ];

    for (let i = 0; i < count; i++) {
        const newRGB = baseRGB.map((channel, index) =>
            Math.min(255, Math.max(0, channel + i * incrementValue))
        );
        const newColor = `rgba(${newRGB[0]}, ${newRGB[1]}, ${newRGB[2]}, ${alpha})`;
        colors.push(newColor);
    }
    return colors;
}

function generateColorVariants() {
    const variants = [
        ['#0c598d', 4, 40, 0.4],
        ['#2d4986', 4, 40, 0.4],
        ['#666699', 4, 40, 0.4],
        ['#669999', 4, 40, 0.4],
        ['#999966', 4, 40, 0.4],
        ['#006666', 4, 40, 0.4],
        ['#0f74a8', 4, 40, 0.4],
        ['#4274a8', 4, 40, 0.4],
        ['#666633', 4, 40, 0.4],
        ['#400080', 4, 40, 0.4],
        ['#800000', 4, 40, 0.4],
        ['#26734d', 4, 40, 0.4],
        ['#862d49', 4, 40, 0.4],
        ['#993300', 4, 40, 0.4],
        ['#4c4c8a', 4, 40, 0.4],
        ['#558000', 4, 40, 0.4],
    ];
    const colorSets = [];

    variants.forEach((variant) => {
        const colors = generateColors(...variant);
        colorSets.push(colors);
    });

    return colorSets.flat();
}

// משענה תאריך להצגה
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
// יוצר את טבלה הנבחרת לעמודה
function EventTableCard(events, eventType) {
    const TechnicianTableleList = document.getElementById("TechnicianTableleList");
    TechnicianTableleList.innerHTML = '';
    const headers = Object.keys(events[0]);
  
    const headerRow = document.createElement("tr");
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = SwapNameEngHeb(headerText);
      headerRow.appendChild(th);
    });
    TechnicianTableleList.appendChild(headerRow);
  
    events.forEach((event, index) => {
      const row = document.createElement("tr");
      const rowId = `row${index}`;
      row.id = rowId;
      const backgroundColor = colorVariants[index];
      row.style.backgroundColor = backgroundColor;
  
      row.addEventListener("click", () => {
        row.classList.toggle("clicked");
        manageSeletedTableData(row, rowId, event, eventType, backgroundColor);
      });
  
      headers.forEach((headerText) => {
        const cell = document.createElement("td");
        const cellData = event[headerText];
  
        if (['entry_date', 'delivery_date', 'placement_date'].includes(headerText)) {
          cell.textContent = formatDate(cellData);
        } else {
          cell.textContent = cellData || "";
        }
  
        row.appendChild(cell);
      });
  
      TechnicianTableleList.appendChild(row);
    });
    createNewTableDataDetails(headers);
}
// יוצר את המעודה הנבחרת
function manageSeletedTableData(row, rowId, event, eventType, backgroundColor) {
    if (row.classList.contains("clicked")) {
        clickedRowIds[rowId] = true;
        createSeletedTableData(row, rowId, event, eventType, backgroundColor);
    } else {
        delete clickedRowIds[rowId];
        removeSeletedTableData(rowId);
    }
}
// מוסיר את כרטיס העמודה הנבחרת
function removeSeletedTableData(rowId) {
    const seletedTableDataContainer = document.querySelector(`#seletedTableData_${rowId}`);
    console.log(seletedTableDataContainer);

    if (seletedTableDataContainer) {
        const row = document.getElementById(rowId);
        row.classList.remove("clicked");
        seletedTableDataContainer.remove();
    }
}
// מחליף מעברית לאנגלית עוצר מילים
function SwapNameHebEng(label) {
    const translationMap = {
      "מספר מוצר": "item_ID",
      "שם": "name",
      "תיאור": "description",
      "מחיר": "price",
      "מלאי": "stock",
      "מותג": "brand",
      "קטגוריה": "category",
      "מספר סידורי": "serial",
      "תמונה": "img",
      "פעיל": "active",
      "מספר (ID)": "order_ID",
      "מספר הזמנה": "number",
      "תאריך כניסה": "entry_date",
      "תאריך משלוח": "delivery_date",
      "תאריך הזמנה": "placement_date",
      "סטאטוס": "status",
      "מספר לקוח": "customer_ID",
      "שם פרטי": "first_name",
      "שם משפחה": "last_name",
      "טלפון 1": "phone_1",
      "טלפון 2": "phone_2",
      "אימייל": "email",
      "עיר": "city",
      "רחוב": "street",
      "מספר בית": "street_number",
      "דירה": "apartment",
      "קו אורך": "lon",
      "קו רוחב": "lat",
      "מספר עובד": "employee_ID",
      "תפקיד": "role",
      "טלפון": "phone",
      "סיסמה": "password",
      "תמונת פרופיל": "avatar",
      "שם הפריט": "item_name",
      "כמות": "quantity",
      "מספר סידורי": "serial",
      "שם לקוח": "customer_name",
      "שם עובד": "employee_name",
    };
    return translationMap[label] || label; 
}
// מחליף מאנגלית לעברית עוצר מילים
function SwapNameEngHeb(label) {
    const translationMap = {
        "item_ID": "מספר מוצר",
        "name": "שם",
        "description": "תיאור",
        "price": "מחיר",
        "stock": "מלאי",
        "brand": "מותג",
        "category": "קטגוריה",
        "serial": "מספר סידורי",
        "img": "תמונה",
        "active": "פעיל",
        "order_ID": "מספר (ID)",
        "number": "מספר הזמנה",
        "entry_date": "תאריך כניסה",
        "delivery_date": "תאריך משלוח",
        "placement_date": "תאריך הזמנה",
        "status": "סטאטוס",
        "customer_ID": "מספר לקוח",
        "first_name": "שם פרטי",
        "last_name": "שם משפחה",
        "phone_1": "טלפון 1",
        "phone_2": "טלפון 2",
        "email": "אימייל",
        "city": "עיר",
        "street": "רחוב",
        "street_number": "מספר בית",
        "apartment": "דירה",
        "lon": "קו אורך",
        "lat": "קו רוחב",
        "employee_ID": "מספר עובד",
        "role": "תפקיד",
        "phone": "טלפון",
        "password": "סיסמה",
        "avatar": "תמונת פרופיל",
        "item_name": "שם הפריט",
        "quantity": "כמות",
        "serial": "מספר סידורי",
        "customer_name": "שם לקוח",
        "employee_name": "שם עובד",

    };
    return translationMap[label] || label; 
}
// יוצר כרטיס עמודה הנבחרת 
function createSeletedTableData(row, rowId, event, eventType, backgroundColor) {
    const seletedTableDataContainer = row.querySelector(".seletedTableData");
  
    if (!seletedTableDataContainer) {
      const seletedTableData = document.createElement("div");
      seletedTableData.className = "seletedTableData";
      seletedTableData.id = `seletedTableData_${rowId}`;
      seletedTableData.style.backgroundColor = backgroundColor;
  
      const commandsHolderTab = document.createElement("div");
      commandsHolderTab.id = "commandsHolderTab";
  
      const CancelLink = document.createElement("li");
      CancelLink.className = 'commandsLink';
      CancelLink.innerText = 'לבטל';
  
      const UpdateLink = document.createElement("li");
      UpdateLink.className = 'commandsLink';
      UpdateLink.innerText = 'לעדכן';
  
      commandsHolderTab.appendChild(CancelLink);
      commandsHolderTab.appendChild(UpdateLink);
  
      for (const key in event) {
        if (event.hasOwnProperty(key)) {
          const label = document.createElement("label");

          const labelText = SwapNameEngHeb(key);
          label.textContent = labelText + ": ";
          const input = document.createElement("input");
          input.type = "text";
  
          if (key === 'entry_date' || key === 'delivery_date' || key === 'placement_date') {
            const dateInput = document.createElement("input");
            dateInput.type = "date";

            const date = new Date(event[key]);
            const formattedDate = date.toISOString().split('T')[0];

            dateInput.value = formattedDate;
            seletedTableData.appendChild(label);
            seletedTableData.appendChild(dateInput);

          } else if (key === 'status') {
            const select = document.createElement("select");
            select.id = "statusSelect";
            select.name = "status";

            const statusValues = ["ממתין", "באריזה", "באספקה", "סופק", "הוחזר", "בוטל"];

            statusValues.forEach((status) => {
              const option = document.createElement("option");
              option.value = status;
              option.text = status;
              if (status === event[key]) {
                option.selected = true;
              }
              select.appendChild(option);
            });
            seletedTableData.appendChild(label);
            seletedTableData.appendChild(select);
          } else {
            input.value = event[key];
            seletedTableData.appendChild(label);
            seletedTableData.appendChild(input);
          }
        }
      }
  
      seletedTableData.appendChild(commandsHolderTab);
      TechnicianTableData.appendChild(seletedTableData);
  
      CancelLink.addEventListener("click", () => {
        removeSeletedTableData(rowId);
      });
      UpdateLink.addEventListener("click", async () => {
        const eventData = {};
        const inputElements = seletedTableData.querySelectorAll("input");
  
        inputElements.forEach((input, index) => {
          const labelText = input.previousElementSibling.textContent.replace(":", "").trim();
          const translatedLabel = SwapNameHebEng(labelText);
          eventData[translatedLabel] = input.value || null;

        });
      
        console.log(eventData);
        index = eventType;

        try {
          if (index === 'מוצרים') {
            await updateItemTech(eventData, eventData.item_ID);
            console.log(eventData, eventData.item_ID);
            return;
          } else if (index === 'הזמנות') {
            await updateOrderTech(eventData, eventData.order_ID);
          } else if (index === 'לקוחות') {
            await updateCustomerTech(eventData, eventData.customer_ID);
          } else if (index === 'עובדים') {
            await updateEmployeeTech(eventData, eventData.employee_ID);
          }
        } catch (error) {
          const stackTrace = error.stack;
          logErrorDetails(error, stackTrace);
        }
      });
    }
}
// יוצר כרטיס חדש להוספה
function createNewTableDataDetails(headers) {

    const seletedTableData = document.createElement("div");
    seletedTableData.className = "seletedTableData";
    seletedTableData.id = `seletedTableData_A`;
    TechnicianTableData.appendChild(seletedTableData);

    const commandsHolderTab = document.createElement("div");
    commandsHolderTab.id = "commandsHolderTab";
    seletedTableData.appendChild(commandsHolderTab);

    const InsertLink = document.createElement("li");
    InsertLink.className = 'commandsLink';
    InsertLink.innerText = 'להוסיף';

    commandsHolderTab.appendChild(InsertLink);

    headers.forEach((header) => {
    const label = document.createElement("label");
    const labelText = SwapNameEngHeb(header);
    label.textContent = labelText + ": ";
    const input = document.createElement("input");
    input.type = "text";
    input.value = "";
    
    if (header === 'entry_date' || header === 'delivery_date' || header === 'placement_date') {
        const dateInput = document.createElement("input");
        dateInput.type = "date";

        seletedTableData.appendChild(label);
        seletedTableData.appendChild(dateInput);
    } else if (header === 'status') {
        const select = document.createElement("select");
        select.id = "statusSelect";
        select.name = "status";

        const statusValues = ["ממתין", "באריזה", "באספקה", "סופק", "הוחזר", "בוטל"];

        statusValues.forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.text = status;
        select.appendChild(option);
        });

        seletedTableData.appendChild(label);
        seletedTableData.appendChild(select);
    } else {
        seletedTableData.appendChild(label);
        seletedTableData.appendChild(input);
    }
    });

    InsertLink.addEventListener("click", async () => {
        const eventData = {};
        const inputElements = seletedTableData.querySelectorAll("input");
    
        inputElements.forEach((input, index) => {
            const labelText = headers[index];
            let translatedLabel = SwapNameHebEng(labelText);
    
            if (input) {
                if (input.type === "date") {
                    eventData[translatedLabel] = input.value !== undefined ? input.value : null;
                } else {
                    eventData[translatedLabel] = input.value;
                }
            }
        });
    
        let index = '';
        for (const key in eventData) {
            if (key.includes("_ID")) {
                index = key;
                break;
            }
        }

        if (index === 'item_ID') {
            delete eventData[index];
            console.log(eventData);
            await insertItemTech(eventData);
        } else if (index === 'order_ID') {
            delete eventData[index];
            await insertOrderTech(eventData);
        } else if (index === 'customer_ID') {
            delete eventData[index];
            await insertCustomerTech(eventData);
        } else if (index === 'employee_ID') {
            delete eventData[index];
            await insertEmployeeTech(eventData);
        }
    });
    
}    
  



  
  