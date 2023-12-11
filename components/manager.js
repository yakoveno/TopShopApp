function showManagerComponent() {
	const RoleTab = document.getElementById("RoleTab");

	const ManagerTab = document.createElement("div");
	ManagerTab.className = "ManagerTab";
	ManagerTab.innerHTML = `
    <div id="Navigation">
      <li id="NavigationOrders" class="NavigationLink">הזמנות</li>
      <li id="NavigationCustomers" class="NavigationLink">לקוחות</li>
      <li id="NavigationItems" class="NavigationLink">מוצרים</li>
      <li id="NavigationEmployees" class="NavigationLink">עובדים</li>
    </div>
    <div id="Screen"></div>
  `;
	RoleTab.appendChild(ManagerTab);

	NavigationOrders.addEventListener("click", async () => {
		const Screen = document.getElementById("Screen");
		Screen.innerHTML = '';
		Screen.innerHTML += `
      <div id="OrdersBox">
        <header class="window-title" id="OrdersTitel">מאגר הזמנות</header>
        <div class="panel-controller" id="OrdersControllerPanel"></div>
        <div id="Orders"></div>
      </div>
      <div id="InfosBox">
        <header class="window-title" id="InfosTitel">ניטור הזמנות</header>
        <div id="Infos">
          <div id="InfoTabTop"> 
            <div id="OrdersStatusInfo"></div>
            <div id="OrdersEmployeeInfo"></div>
            <div id="OrdersRevenueInfo"></div>
          </div>
          <div id="InfoTabBottom">
            <div id="OrdersInfoContent"></div>
            <div id="OrdersInfoCharts">
              <div id="OrdersStatusesQuantity">
                <div id="OrdersStatusesQuantityTitle" class="panel-controller"></div>
                <div id="OrdersStatusesQuantityChart"></div>
              </div>
              <div id="OrdersStatusesPrice">
                <div id="OrdersStatusesPriceTitle" class="panel-controller"></div>
                <div id="OrdersStatusesPriceChart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="Charts">
        <div id="OrdersAnnualChart" class="Chart"></div>
        <div id="OrdersPriceDistribution" class="Chart"></div>
        <div id="OrdersDateTrends" class="Chart"></div>
      </div>
    `;

		await getOrders().then(orders => {
			createOrders(orders);
			createOrdersStatusInfo(orders);
			createOrdersEmployeeInfo(orders);
			createOrdersRevenueInfo(orders);
			createOrdersStatusesQuantity(orders);
			createOrdersStatusesPrice(orders);
			createOrdersAnnualChart(orders);
			createOrdersPriceDistribution(orders);
			createOrdersDateTrends(orders);
		});
	})

	NavigationCustomers.addEventListener("click", async () => {
		const Screen = document.getElementById("Screen");
		Screen.innerHTML = '';
		Screen.innerHTML += `
      <div id="CustomersBox">
        <div id="Customers">
          <header class="window-title" id="CustomersTitel">מאגר לקוחות</header>
          <div class="panel-controller" id="CustomersPanelController"></div>
          <div id="CustomerList"></div>
        </div>
        <div id="CustomersInfos">
          <header class="window-title" id="CustomersTitel">ניטור לקוחות</header>

          <div id="CustomersInfosContent">

            <div id="CustomersStatistics">
              <div id="CustomersMonthsStatistics"></div>
              <div id="CitysMonthsStatistics"></div>
              <div id="MapVisualization"></div>
            </div>

            <div id="CustomersInfosCharts">

              <div id="CitiesMostProfits">
                <div class="panel-controller" id="CitiesMostProfitsTitle"></div>
                <div id="CitiesMostProfitsChart"></div>
              </div>
              <div id="CitiesMostOrders">
                <div class="panel-controller" id="CitiesMostOrdersTitle"></div>
                <div id="CitiesMostOrdersChart"></div>
              </div>
            </div>
          </div>
        </div>
        <div id="InfoMap"></div>
        <div id="CutomersCharts">
          <div id="CustomersRevenueOrders">
            <div class="panel-controller" id="CustomersRevenueOrdersController"></div>
            <div id="CustomersRevenueOrdersChart"></div>
          </div>
          <div id="CustomersStatusOrders">
            <div class="panel-controller" id="CustomersStatusOrdersController"></div>
            <div id="CustomersStatusOrdersChart"></div>
          </div>
        </div>
      </div>
    `;

		await getCustomers().then(customers => {
			createCustomers(customers);
			processCustomerOrders(customers);
		});
	})

	NavigationItems.addEventListener("click", async () => {
		const Screen = document.getElementById("Screen");
		Screen.innerHTML = '';
		Screen.innerHTML += `
      <div id="ItemsBox">
        <div id="Items">
          <header class="window-title" id="ItemsTitel">מוצרים</header>
          <div class="panel-controller" id="ItemsPanelController"></div>
          <div id="ItemsList"></div>
        </div>
        <div id="ItemsInfos">
          <header class="window-title" id="InfosTitel">מידעה</header>
          <div id ="ItemsInfosContent">
            <div id="ItemsStatus">
              <div id="YearItemsStockContent">
                <div id="YearItemsStock"></div>
                <div id="YearItemsStockChart"></div>
              </div>
              <div id="MonthItemsStockContent">
                <div id="MonthItemsStock"></div>
                <div id="MonthItemsStockChart"></div>
              </div>
              <div id="WeekItemsStockContent">
                <div id="WeekItemsStock"></div>
                <div id="WeekItemsStockChart"></div>
              </div>
            </div>
            <div id="MonthsQuantities">
              <div id="CategorysMonthsQuantities"></div>
              <div id="ItemsMonthQuantitiesChart"></div>
            </div>
            <div id="MonthsVlaues">
              <div id="CategorysMonthsVlaues"></div>
              <div id="ItemsMonthsValuesChart"></div>
            </div>
          </div>
        </div>
        <div id="ItemsCharts">
          <div id="ItemsStockValue"></div>
          <div id="ItemsCategoryValueChart"></div>
        </div>
      </div>
    `;

		await getItems().then(items => {
			createItems(items);
			processItemsOrders(items);
			createItemsCategoryValueChart(items);
			createItemsStockValue(items)
		});

	})

	NavigationEmployees.addEventListener("click", async () => {
		const Screen = document.getElementById("Screen");
		Screen.innerHTML = '';
		Screen.innerHTML += `
        <div id="EmployeesContent">
          <div id="EmployeesNavigation"></div>
          <div id="EmployeeInfoCard"></div>
          <div id="EmployeeStatusInfo"></div>
          <div id="EmployeeInfoCharts"></div>
        </div>
        <div id="EmployeesStatusContent">
          <div id="EmployeesInfos">
            <div id="EmployeesYear">
              <div id="EmployeesYearContent"></div>
              <div id="EmployeesYearContentChart"></div>
            </div>
            <div id="EmployeesMontht">
              <div id="EmployeesMonthtContent"></div>
              <div id="EmployeesMonthtContentChart"></div>
            </div>
            <div id="EmployeesWeek">
              <div id="EmployeesWeekContent"></div>
              <div id="EmployeesWeekContentChart"></div>
            </div>
          </div>
        </div>
        <div id="EmployeesChartsContent">
          <div id="EmployeesAnnualChart" class="Chart"></div>
          <div id="EmployeesMonthlyChart" class="Chart"></div>
        </div>
    `;
		await getEmployees().then(employees => {
      		createEmployeesNavigation(employees);
      		processEmployeeOrders(employees);
			createEmployeesAnnualChart(employees);
			createEmployeesMonthlyChart(employees);
		});

	})
}

//===============================//
// יצירת צבעים 
const backgroundColors = [
	'rgba(255, 204, 0, 0.4)',    // Yellow-Orange
	'rgba(255, 102, 102, 0.4)',  // Coral
  'rgba(102, 255, 153, 0.4)',  // Mint
  'rgba(102, 0, 102, 0.4)',    // Plum
	'rgba(51, 51, 255, 0.4)',    // Royal Blue
	'rgba(204, 102, 255, 0.4)',  // Lavender
  'rgba(204, 0, 102, 0.4)',    // Ruby
  'rgba(255, 51, 102, 0.4)',   // Fuchsia
	'rgba(153, 255, 102, 0.4)',  // Lime
	'rgba(51, 153, 255, 0.4)',   // Sky Blue
	'rgba(102, 102, 0, 0.4)',    // Olive Green
	'rgba(255, 153, 51, 0.4)',   // Tangerine
	'rgba(255, 0, 204, 0.4)',    // Magenta
	'rgba(204, 204, 102, 0.4)',  // Sand
  'rgba(0, 204, 204, 0.4)',    // Turquoise
];

// The Orders Box
// הצגת כל הזמנות + חיפוש לפי שם או מספר הזמנה
function createOrders(orders) {
	const Orders = document.getElementById("Orders");
	Orders.innerHTML = '';

	const OrdersControllerPanel = document.getElementById("OrdersControllerPanel");
	const searchInput = document.createElement("input");
	searchInput.id = "searchInput";
	searchInput.placeholder = "חיפוש";
	OrdersControllerPanel.appendChild(searchInput);

	const CSVDocument = document.createElement("li");
	CSVDocument.innerText = "הזמנות - CSV";
	CSVDocument.addEventListener("click", () => {
		const headers = Object.keys(orders[0]);
		const csvData = [headers.join(',')];

		orders.forEach((order) => {
			const values = headers.map((header) => {
				let value = order[header];
				if (typeof value === "string") {
					value = `"${value}"`;
				}
				return value;
			});
			csvData.push(values.join(','));
		});

		const csvContent = csvData.join('\n');
		const blob = new Blob([csvContent], {
			type: 'text/csv'
		});

		const a = document.createElement('a');
		a.href = window.URL.createObjectURL(blob);
		a.download = 'orders.csv';
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(a.href);
		document.body.removeChild(a);
	});
	OrdersControllerPanel.appendChild(CSVDocument);

	const updateOrders = () => {
		orders.forEach(order => {
			const deliveryDate = new Date(order.delivery_date).toLocaleDateString();
			const Order = document.createElement("div");
			Order.className = "Order";
			Order.innerHTML = `<li>${order.customerFirstName} ${order.customerLastName}<br>${order.number}<br>${deliveryDate}</li>`;

			Order.addEventListener("click", () => {
				ipcRenderer.send('orderTab', order.order_ID);
			});
			Orders.appendChild(Order);
		});
	}
	updateOrders();

	searchInput.addEventListener("input", async function() {
		const searchString = searchInput.value.toLowerCase();
		const Order = document.querySelectorAll(".Order");
		let isSearching = true;

		Order.forEach(Order => {
			if (!isSearching) {
				return;
			}

			const orderName = Order.querySelector("li").textContent.toLowerCase();
			if (orderName.includes(searchString)) {
				Order.style.backgroundColor = "#ccffcc";
				Orders.prepend(Order);
			} else {
				Order.style.backgroundColor = "";
				Orders.appendChild(Order);
			}
		});

		if (searchString === "") {
			isSearching = false;
			Order.forEach(Order => {
				const originalBackgroundColor = Order.getAttribute("data-original-bg");
				Order.style.backgroundColor = originalBackgroundColor;
			});
		}
	});
}
// The Info Box
// The Info Tab Top
// קיבוץ הזמנות לפי סטטאטוס לשנה
function createOrdersStatusInfo(orders) {
	const OrdersStatusInfo = document.getElementById("OrdersStatusInfo");
	OrdersStatusInfo.innerHTML = '';
	OrdersStatusInfo.innerHTML = '<span>הזמנות לפי סטטאטוס</span>';


	const currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();

	const OrderStatusInfosTitel = document.createElement("div");
	OrderStatusInfosTitel.className = "panel-controller";
	OrdersStatusInfo.appendChild(OrderStatusInfosTitel);

	const prevMonthButton = document.createElement("li");
	prevMonthButton.innerText = "חודש קודם";
	prevMonthButton.addEventListener("click", () => {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
		updateStatusList();
	});

	const nextMonthButton = document.createElement("li");
	nextMonthButton.innerText = "חודש הבא";
	nextMonthButton.addEventListener("click", () => {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
		updateStatusList();
	});

	OrderStatusInfosTitel.appendChild(prevMonthButton);
	OrderStatusInfosTitel.appendChild(nextMonthButton);

	const statusList = document.createElement("div");
	statusList.className = "statusList";

	function updateStatusList() {
		statusList.innerHTML = '';

		const currentMonthName = document.createElement("p");
		currentMonthName.innerHTML = `${currentYear} ${getCurrentMonthName()}`;
		statusList.appendChild(currentMonthName);

		const statusCounts = {};

		orders.forEach((order) => {
			const orderDate = new Date(order.entry_date);
			const orderYear = orderDate.getFullYear();
			const orderMonth = orderDate.getMonth();

			// Check if the order is in the current month and year
			if (orderYear === currentYear && orderMonth === currentMonth) {
				const status = order.status;
				if (!statusCounts[status]) {
					statusCounts[status] = 0;
				}
				statusCounts[status]++;
			}
		});

		for (const status in statusCounts) {
			const statusItem = document.createElement("li");
			statusItem.textContent = `${status}: ${statusCounts[status]}`;
			statusItem.addEventListener("click", () => {
				const filteredOrders = orders.filter((order) => {
					const orderDate = new Date(order.entry_date);
					const orderYear = orderDate.getFullYear();
					const orderMonth = orderDate.getMonth();
					return (
						orderYear === currentYear &&
						orderMonth === currentMonth &&
						order.status === status
					);
				});
				createOrdersInfoContent(filteredOrders);
			});
			statusList.appendChild(statusItem);
		}
		OrdersStatusInfo.appendChild(statusList);

		// Load all orders for the current month and year by default
		const allOrdersForCurrentMonth = orders.filter((order) => {
			const orderDate = new Date(order.entry_date);
			const orderYear = orderDate.getFullYear();
			const orderMonth = orderDate.getMonth();
			return (
				orderYear === currentYear &&
				orderMonth === currentMonth
			);
		});
		createOrdersInfoContent(allOrdersForCurrentMonth);
	}

	function getCurrentMonthName() {
		const monthNames = [
			"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
			"יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
		];
		return monthNames[currentMonth];
	}

	updateStatusList();
}
// קיבוץ הזמנות לפי עובדים לשנה
function createOrdersEmployeeInfo(orders) {
	const OrdersEmployeeInfo = document.getElementById("OrdersEmployeeInfo");
	OrdersEmployeeInfo.innerHTML = '';
	OrdersEmployeeInfo.innerHTML = '<span>הזמנות לפי עובדים</span>';

	const currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();

	const OrderEmployeeInfosTitel = document.createElement("div");
	OrderEmployeeInfosTitel.className = "panel-controller";
	OrdersEmployeeInfo.appendChild(OrderEmployeeInfosTitel);

	const prevMonthButton = document.createElement("li");
	prevMonthButton.innerText = "חודש קודם";
	prevMonthButton.addEventListener("click", () => {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
		updateEmployeeList();
	});

	const nextMonthButton = document.createElement("li");
	nextMonthButton.innerText = "חודש הבא";
	nextMonthButton.addEventListener("click", () => {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
		updateEmployeeList();
	});

	OrderEmployeeInfosTitel.appendChild(prevMonthButton);
	OrderEmployeeInfosTitel.appendChild(nextMonthButton);

	const employeeList = document.createElement("div");
	employeeList.className = "employeeList";

	function updateEmployeeList() {
		employeeList.innerHTML = '';

		const currentMonthName = document.createElement("p");
		currentMonthName.innerHTML = `${currentYear} ${getCurrentMonthName()}`;
		employeeList.appendChild(currentMonthName);

		const employeeCounts = {};

		orders.forEach((order) => {
			const orderDate = new Date(order.entry_date);
			const orderYear = orderDate.getFullYear();
			const orderMonth = orderDate.getMonth();

			// Check if the order is in the current month and year
			if (orderYear === currentYear && orderMonth === currentMonth) {
				const employeeID = order.employee_ID;
				if (!employeeCounts[employeeID]) {
					employeeCounts[employeeID] = {
						firstName: order.employeeFirstName,
						lastName: order.employeeLastName,
						count: 0,
					};
				}
				employeeCounts[employeeID].count++;
			}
		});

		for (const employeeID in employeeCounts) {
			const employeeItem = document.createElement("li");
			const {
				firstName,
				lastName,
				count
			} = employeeCounts[employeeID];
			employeeItem.textContent = `${firstName} ${lastName}: ${count}`;
			employeeItem.addEventListener("click", () => {
				const filteredOrders = orders.filter((order) => {
					const orderDate = new Date(order.entry_date);
					const orderYear = orderDate.getFullYear();
					const orderMonth = orderDate.getMonth();
					return (
						orderYear === currentYear &&
						orderMonth === currentMonth &&
						order.employee_ID === employeeID
					);
				});
				createOrdersInfoContent(filteredOrders);
			});
			employeeList.appendChild(employeeItem);
		}
		OrdersEmployeeInfo.appendChild(employeeList);

		// Load all orders for the current month and year by default
		const allOrdersForCurrentMonth = orders.filter((order) => {
			const orderDate = new Date(order.entry_date);
			const orderYear = orderDate.getFullYear();
			const orderMonth = orderDate.getMonth();
			return (
				orderYear === currentYear &&
				orderMonth === currentMonth
			);
		});
		createOrdersInfoContent(allOrdersForCurrentMonth);
	}

	function getCurrentMonthName() {
		const monthNames = [
			"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
			"יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
		];
		return monthNames[currentMonth];
	}

	updateEmployeeList();
}
// הזמנות משולב רווח סטטאטוס שנה חודש שבועה הכל
function createOrdersRevenueInfo(orders) {
	const OrdersRevenueInfo = document.getElementById("OrdersRevenueInfo");
	OrdersRevenueInfo.innerHTML = '';
	OrdersRevenueInfo.innerHTML = '<span>הזמנות משולב רווח סטטאטוס</span>';


	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDayOfWeek = currentDate.getDay();
	const currentDayOfMonth = currentDate.getDate();

	const OrdersRevenueInfoTitel = document.createElement("div");
	OrdersRevenueInfoTitel.className = "panel-controller";
	OrdersRevenueInfo.appendChild(OrdersRevenueInfoTitel);

	const OrdersRevenueInfoHeader = document.createElement("div");
	OrdersRevenueInfoHeader.className = "OrdersRevenueInfoHeader";
	OrdersRevenueInfo.appendChild(OrdersRevenueInfoHeader);

	// Week filter
	const daysMatrix = Array.from({
		length: 7
	}, (_, day) => {
		const date = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek + day);
		return {
			dayOfWeek: day,
			date: date,
		};
	});

	// Week filter
	const currentWeekFilter = document.createElement("li");
	currentWeekFilter.innerText = "שבועה";
	currentWeekFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			const entryMonth = entryDate.getMonth();
			const entryDayOfMonth = entryDate.getDate();
			return entryYear === currentYear && entryMonth === currentMonth &&
				entryDayOfMonth >= daysMatrix[0].date.getDate() && entryDayOfMonth <= daysMatrix[6].date.getDate();
		});
		OrdersRevenue.remove();
		updateData(filteredOrders, "שבועה");
	});
	OrdersRevenueInfoTitel.appendChild(currentWeekFilter);

	// Month filter
	const currentMonthFilter = document.createElement("li");
	currentMonthFilter.innerText = "חודש";
	currentMonthFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			const entryMonth = entryDate.getMonth();
			return entryYear === currentYear && entryMonth === currentMonth;
		});
		OrdersRevenue.remove();
		updateData(filteredOrders, "חודש");
	});
	OrdersRevenueInfoTitel.appendChild(currentMonthFilter);

	// Year filter
	const currentYearFilter = document.createElement("li");
	currentYearFilter.innerText = "שנה";
	currentYearFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			return entryYear === currentYear;
		});
		OrdersRevenue.remove();
		updateData(filteredOrders, "שנה");
	});
	OrdersRevenueInfoTitel.appendChild(currentYearFilter);

	// All filter
	const currentAllFilter = document.createElement("li");
	currentAllFilter.innerText = "הכל";
	currentAllFilter.addEventListener("click", () => {
		OrdersRevenue.remove();
		updateData(orders, "הכל");
	});
	OrdersRevenueInfoTitel.appendChild(currentAllFilter);


	const updateData = (filteredOrders, header) => {
		let OrdersRevenue = document.createElement("div");
		OrdersRevenue.id = "OrdersRevenue";
		OrdersRevenue.innerHTML = '';

		OrdersRevenueInfoHeader.innerHTML = `תצוגה לפי ${header}`;

		const totalCompleted = filteredOrders.filter(order => order.status === 'סופק' || order.status === 'באספקה').length;
		const completedRevenue = filteredOrders.reduce((total, order) => {
			if (order.status === 'סופק' || order.status === 'באספקה') {
				return total + parseFloat(order.totalPrice);
			}
			return total;
		}, 0);

		const totalUncompleted = filteredOrders.filter(order => order.status === 'ממתין' || order.status === 'באריזה').length;
		const uncompletedRevenue = filteredOrders.reduce((total, order) => {
			if (order.status === 'ממתין' || order.status === 'באריזה') {
				return total + parseFloat(order.totalPrice);
			}
			return total;
		}, 0);

		const totalCanceled = filteredOrders.filter(order => order.status === 'בוטל' || order.status === 'הוחזר').length;
		const canceledRevenue = filteredOrders.reduce((total, order) => {
			if (order.status === 'בוטל' || order.status === 'הוחזר') {
				return total + parseFloat(order.totalPrice);
			}
			return total;
		}, 0);

		const averageCompletedValue = totalCompleted > 0 ? completedRevenue / totalCompleted : 0;
		const averageUncompletedValue = totalUncompleted > 0 ? uncompletedRevenue / totalUncompleted : 0;
		const averageCanceledValue = totalCanceled > 0 ? canceledRevenue / totalCanceled : 0;

		OrdersRevenue.innerHTML = `
      <div id="OrdersCompleted">
        <li>
          הושלמו<br>
          הזמנות: ${totalCompleted}<br>
          רווח: ${completedRevenue.toFixed(2)}₪<br>
          ממוצעה: ${averageCompletedValue.toFixed(2)}₪
        </li>
      </div>
      <div id="OrdersUncompleted">
        <li>
          בטיפול<br>
          הזמנות: ${totalUncompleted}<br>
          רווח: ${uncompletedRevenue.toFixed(2)}₪<br>
          ממוצעה: ${averageUncompletedValue.toFixed(2)}₪
        </li>
      </div>
      <div id="OrdersCanceled">
        <li>
          מבוטלות<br>
          הזמנות: ${totalCanceled}<br>
          רווח: ${canceledRevenue.toFixed(2)}₪<br>
          ממוצעה: ${averageCanceledValue.toFixed(2)}₪
        </li>
      </div>
    `;
		OrdersRevenueInfo.appendChild(OrdersRevenue);

		OrdersCompleted.addEventListener("click", () => {
			createOrdersInfoContent(filteredOrders.filter(order => order.status === 'סופק' || order.status === 'באספקה'));
		})
		OrdersUncompleted.addEventListener("click", () => {
			createOrdersInfoContent(filteredOrders.filter(order => order.status === 'ממתין' || order.status === 'באריזה'));
		})
		OrdersCanceled.addEventListener("click", () => {
			createOrdersInfoContent(filteredOrders.filter(order => order.status === 'בוטל' || order.status === 'הוחזר'));
		})
	}
	updateData(orders, "הכל");
}
// The Info Tab Bottom
// מציג הזמנות נבחרות
function createOrdersInfoContent(orders) {
	const OrdersInfoContent = document.getElementById("OrdersInfoContent");
	OrdersInfoContent.innerHTML = '';

	function formatDate(date) {
		if (date === null) {
			return "טרם שובץ";
		}

		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	orders.forEach(order => {
		const placementDate = formatDate(order.placement_date ? new Date(order.placement_date) : null);
		const currentDate = new Date();
		const deliveryDate = new Date(order.delivery_date);
		let remainingDays = Math.ceil((deliveryDate - currentDate) / (1000 * 60 * 60 * 24));

		if (remainingDays < 0) {
			remainingDays = 0;
		}

		const OrderCard = document.createElement("div");
		OrderCard.className = "OrderCard";
		OrderCard.innerHTML = `
      <li>
        הזמנה: ${order.number}<br>
        לקוח: ${order.customerFirstName} ${order.customerLastName}<br>
        שובץ ל - ${placementDate}<br>
        ימים לאספקה: ${remainingDays}<br>
        סוכן מטפל: ${order.employeeFirstName} ${order.employeeLastName}<br>
      </li>
    `;
		OrderCard.addEventListener("click", () => {
			ipcRenderer.send('orderTab', order.order_ID);
		});
		OrdersInfoContent.appendChild(OrderCard);
	});

}
//  תרשים להזמנות לפי סטטוסים
function createOrdersStatusesQuantity(orders) {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDayOfWeek = currentDate.getDay();
	const currentDayOfMonth = currentDate.getDate();

	const OrdersStatusesQuantityTitle = document.getElementById("OrdersStatusesQuantityTitle");

	// סינון שבועה
	const daysMatrix = Array.from({
		length: 7
	}, (_, day) => {
		const date = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek + day);
		return {
			dayOfWeek: day,
			date: date,
		};
	});

	// סינון שבועה בלחיצה
	const currentWeekFilter = document.createElement("li");
	currentWeekFilter.innerText = "שבועה";
	currentWeekFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			const entryMonth = entryDate.getMonth();
			const entryDayOfMonth = entryDate.getDate();
			return entryYear === currentYear && entryMonth === currentMonth && entryDayOfMonth >= daysMatrix[0].date.getDate() && entryDayOfMonth <= daysMatrix[6].date.getDate();
		});
		updateData(filteredOrders, "שבועה");
	});
	OrdersStatusesQuantityTitle.appendChild(currentWeekFilter);

	// סינון חודש בלחיצה
	const currentMonthFilter = document.createElement("li");
	currentMonthFilter.innerText = "חודש";
	currentMonthFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			const entryMonth = entryDate.getMonth();
			return entryYear === currentYear && entryMonth === currentMonth;
		});
		updateData(filteredOrders, "חודש");
	});
	OrdersStatusesQuantityTitle.appendChild(currentMonthFilter);

	// סינון שנתיבלחיצה 
	const currentYearFilter = document.createElement("li");
	currentYearFilter.innerText = "שנה";
	currentYearFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			return entryYear === currentYear;
		});
		updateData(filteredOrders, "שנה");
	});
	OrdersStatusesQuantityTitle.appendChild(currentYearFilter);

	// סינון כללי בלחציה
	const currentAllFilter = document.createElement("li");
	currentAllFilter.innerText = "הכל";
	currentAllFilter.addEventListener("click", () => {
		updateData(orders, "הכל");
	});
	OrdersStatusesQuantityTitle.appendChild(currentAllFilter);

	const updateData = (filteredOrders, header) => {
		const OrdersStatusesQuantityChart = document.getElementById("OrdersStatusesQuantityChart");
		OrdersStatusesQuantityChart.innerHTML = '';

		const pieCanvas = document.createElement("canvas");
		pieCanvas.id = "pieChart";
		OrdersStatusesQuantityChart.appendChild(pieCanvas);

		const statusCounts = {
			'סופק': 0,
			'באספקה': 0,
			'באריזה': 0,
			'ממתין': 0,
			'בוטל': 0,
			'הוחזר': 0
		};

		filteredOrders.forEach(order => {
			if (order.status in statusCounts) {
				statusCounts[order.status]++;
			}
		});

		const statusLabels = Object.keys(statusCounts);
		const statusData = Object.values(statusCounts);

		const totalStatusCount = statusData.reduce((acc, val) => acc + val, 0);
		const statusPercentages = statusData.map(count => ((count / totalStatusCount) * 100).toFixed(2) + '%');

    new Chart(pieCanvas, {
			type: "pie",
			data: {
				labels: statusLabels.map((label, index) => `${label} (${statusPercentages[index]})`),
				datasets: [{
					data: statusData,
					backgroundColor: backgroundColors,
				}],
			},
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            },
          title: {
            display: true,
            text: `כמויות לפי סטטוסים תצוגה ל - ${header}`,
            font: {
              size: 14
            },
            padding: 0,
          },
        },
      },
		});
	};

	updateData(orders, "הכל");
}
//  תרשים להזמנות לפי מחיר 
function createOrdersStatusesPrice(orders) {
	console.log(orders);
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDayOfWeek = currentDate.getDay();
	const currentDayOfMonth = currentDate.getDate();

	const OrdersStatusesPriceTitle = document.getElementById("OrdersStatusesPriceTitle");

	// Week filter
	const daysMatrix = Array.from({
		length: 7
	}, (_, day) => {
		const date = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek + day);
		return {
			dayOfWeek: day,
			date: date,
		};
	});

	// Week filter
	const currentWeekFilter = document.createElement("li");
	currentWeekFilter.innerText = "שבועה";
	currentWeekFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			const entryMonth = entryDate.getMonth();
			const entryDayOfMonth = entryDate.getDate();
			return entryYear === currentYear && entryMonth === currentMonth && entryDayOfMonth >= daysMatrix[0].date.getDate() && entryDayOfMonth <= daysMatrix[6].date.getDate();
		});
		updateData(filteredOrders, "שבועה");
	});
	OrdersStatusesPriceTitle.appendChild(currentWeekFilter);

	// Month filter
	const currentMonthFilter = document.createElement("li");
	currentMonthFilter.innerText = "חודש";
	currentMonthFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			const entryMonth = entryDate.getMonth();
			return entryYear === currentYear && entryMonth === currentMonth;
		});
		updateData(filteredOrders, "חודש");
	});
	OrdersStatusesPriceTitle.appendChild(currentMonthFilter);

	// Year filter
	const currentYearFilter = document.createElement("li");
	currentYearFilter.innerText = "שנה";
	currentYearFilter.addEventListener("click", () => {
		const filteredOrders = orders.filter(order => {
			const entryDate = new Date(order.entry_date);
			const entryYear = entryDate.getFullYear();
			return entryYear === currentYear;
		});
		updateData(filteredOrders, "שנה");
	});
	OrdersStatusesPriceTitle.appendChild(currentYearFilter);

	// All filter
	const currentAllFilter = document.createElement("li");
	currentAllFilter.innerText = "הכל";
	currentAllFilter.addEventListener("click", () => {
		updateData(orders, "הכל");
	});
	OrdersStatusesPriceTitle.appendChild(currentAllFilter);

	const updateData = (filteredOrders, header) => {
		const OrdersStatusesPriceChart = document.getElementById("OrdersStatusesPriceChart");
		OrdersStatusesPriceChart.innerHTML = '';

		const pieCanvas = document.createElement("canvas");
		pieCanvas.id = "pieChart";
		OrdersStatusesPriceChart.appendChild(pieCanvas);

		const statusProfits = {
			'סופק': 0,
			'באספקה': 0,
			'באריזה': 0,
			'ממתין': 0,
			'בוטל': 0,
			'הוחזר': 0
		};
		
		const totalOrderPrice = filteredOrders.reduce((acc, order) => {
			const orderTotalPrice = parseFloat(order.totalPrice.replace(/[^0-9.-]+/g, ''));
			if (!isNaN(orderTotalPrice)) {
				acc += orderTotalPrice;
			}
			return acc;
		}, 0);
		
		filteredOrders.forEach(order => {
			if (order.status in statusProfits) {
				const orderTotalPrice = parseFloat(order.totalPrice.replace(/[^0-9.-]+/g, ''));
				if (!isNaN(orderTotalPrice)) {
					statusProfits[order.status] += orderTotalPrice;
				}
			}
		});
		
		console.log(totalOrderPrice);
		const statusLabels = Object.keys(statusProfits);
		const statusProfitsData = Object.values(statusProfits);

		// Calculate percentages
		const statusPercentages = statusProfitsData.map(profit => ((profit / totalOrderPrice) * 100).toFixed(2) + '%');

	  new Chart(pieCanvas, {
			type: "pie",
			data: {
				labels: statusLabels.map((label, index) => `${label} (${statusPercentages[index]})`),
				datasets: [{
          label: '\u20AA',
					data: statusProfitsData,
					backgroundColor: backgroundColors,
				}],
			},
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            },
          title: {
            display: true,
            text: `רווח לפי סטטוסים תצוגה ל - ${header}`,
            font: {
              size: 14
            },
            padding: 3,
          },
        },
      },
    });
	};

	updateData(orders, "הכל");
}
// The Charts Box
// גרף שנתי לפי כמות ומחיר
function createOrdersAnnualChart(orders) {
	const currentDate = new Date();
	let currentYear = currentDate.getFullYear();

	const ordersByYear = {};
	orders.forEach((order) => {
		const orderYear = new Date(order.delivery_date).getFullYear();
		if (order.status !== "בוטל" && order.status !== "הוחזר") {
			if (!ordersByYear[orderYear]) {
				ordersByYear[orderYear] = [];
			}
			ordersByYear[orderYear].push(order);
		}
	});

	const monthNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

	const updateData = () => {
		const OrdersAnnualChart = document.getElementById("OrdersAnnualChart");
		OrdersAnnualChart.innerHTML = '';

		const OrdersAnnualChartTitel = document.createElement("div");
		OrdersAnnualChartTitel.classList.add("panel-controller");
		OrdersAnnualChart.appendChild(OrdersAnnualChartTitel);

		const prevButton = document.createElement("li");
		prevButton.innerText = "שנה קודם";
		prevButton.addEventListener("click", () => {
			currentYear--;
			updateData();
		});
		const nextButton = document.createElement("li");
		nextButton.innerText = "שנה הבא";
		nextButton.addEventListener("click", () => {
			currentYear++;
			updateData();
		});

		OrdersAnnualChartTitel.appendChild(prevButton);
		OrdersAnnualChartTitel.appendChild(nextButton);

		const currentYearOrders = ordersByYear[currentYear] || [];

		const barCanvas = document.createElement("canvas");
		barCanvas.id = "barChart";
		OrdersAnnualChart.appendChild(barCanvas);

		const labels = monthNames;
		const datasets = [{
				label: "רווח \u20AA ",
				data: [],
				backgroundColor: backgroundColors,
				yAxisID: "y-axis-profit",
			},
			{
				label: "הזמנות",
				data: [],
				backgroundColor: backgroundColors,
				yAxisID: "y-axis-orders",
			},
		];

		for (let month = 0; month < 12; month++) {
			const monthlyTotalPrice = currentYearOrders
				.filter((order) => new Date(order.delivery_date).getMonth() === month)
				.reduce((sum, order) => sum + order.totalPrice, 0);

			const monthlyTotalOrders = currentYearOrders
				.filter((order) => new Date(order.delivery_date).getMonth() === month)
				.length;

			datasets[0].data.push(monthlyTotalPrice);
			datasets[1].data.push(monthlyTotalOrders);
		}

		new Chart(barCanvas, {
			type: "bar",
			data: {
				labels: labels,
				datasets: datasets,
			},
			options: {
				plugins: {
          legend:{
            display:false,
          },
					title: {
						display: true,
						text: `תרשים פעילות חודשית לשנה - ${currentYear}`,
						font: {
							size: 14
						},
					},
				},
				scales: {
					x: {
						stacked: false,
					},
					"y-axis-profit": {
						display: false,
					},
					"y-axis-orders": {
						display: false,
					},
				},
			},
		});
	};
	updateData();
}
// גרף מחיר ממוצעה
function createOrdersPriceDistribution(orders) {
	let currentYear = new Date().getFullYear();
	const ordersByYear = {};

	// Function to reset priceCounts to an array of zeros
	const resetPriceCounts = () => Array(priceRanges.length).fill(0);

	const priceRanges = [{
			min: 0,
			max: 100
		},
		{
			min: 101,
			max: 250
		},
		{
			min: 251,
			max: 650
		},
		{
			min: 651,
			max: 1350
		},
		{
			min: 1351,
			max: 2000
		},
		{
			min: 2001,
			max: Infinity
		},
	];

	let priceCounts = resetPriceCounts();

	const updateData = () => {
		const OrdersPriceDistribution = document.getElementById("OrdersPriceDistribution");
		OrdersPriceDistribution.innerHTML = '';

		const OrdersPriceDistributionTitel = document.createElement("div");
		OrdersPriceDistributionTitel.classList.add("panel-controller");
		OrdersPriceDistribution.appendChild(OrdersPriceDistributionTitel);

		const prevButton = document.createElement("li");
		prevButton.innerText = "שנה קודם";
		prevButton.addEventListener("click", () => {
			currentYear--;
			priceCounts = resetPriceCounts();
			updateData();
		});

		const nextButton = document.createElement("li");
		nextButton.innerText = "שנה הבא";
		nextButton.addEventListener("click", () => {
			currentYear++;
			priceCounts = resetPriceCounts();
			updateData();
		});

		OrdersPriceDistributionTitel.appendChild(prevButton);
		OrdersPriceDistributionTitel.appendChild(nextButton);

		const barCanvas = document.createElement("canvas");
		barCanvas.id = "barChart";
		OrdersPriceDistribution.appendChild(barCanvas);

		const labels = priceRanges.map(range => `${range.min}-${range.max}`);
		const datasets = [{
			label: "הזמנות",
			data: priceCounts,
			backgroundColor: backgroundColors,
		}, ];

		const currentYearOrders = orders.filter((order) => {
			const orderYear = new Date(order.delivery_date).getFullYear();
			return orderYear === currentYear && order.status !== "בוטל";
		});

		currentYearOrders.forEach(order => {
			const price = order.totalPrice;
			for (let i = 0; i < priceRanges.length; i++) {
				if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
					priceCounts[i]++;
					break;
				}
			}
		});

		new Chart(barCanvas, {
			type: "bar",
			data: {
				labels: labels,
				datasets: datasets,
			},
			options: {
				plugins: {
          legend: {
            display: false,
          },
					title: {
						display: true,
						text: `תרשים פילוח שווי הזמנות לשנה - ${currentYear}`,
						font: {
							size: 14
						},
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							stepSize: 1,
							min: 0,
						},
					},
				},
			},
		});
	};
	updateData();
}
// גרף שבועה
function createOrdersDateTrends(orders) {
	let currentYear = new Date().getFullYear();
	const data = {
		weekdays: [
			"יום ראשון",
			"יום שני",
			"יום שלישי",
			"יום רביעי",
			"יום חמישי",
			"יום שישי",
			"שבת",
		],
		orderCounts: Array(7).fill(0),
		profits: Array(7).fill(0),
	};

	const updateData = () => {
		const OrdersDateTrends = document.getElementById("OrdersDateTrends");
		OrdersDateTrends.innerHTML = '';

		const OrdersDateTrendsTitel = document.createElement("div");
		OrdersDateTrendsTitel.classList.add("panel-controller");
		OrdersDateTrends.appendChild(OrdersDateTrendsTitel);

		const prevButton = document.createElement("li");
		prevButton.innerText = "שנה קודם";
		prevButton.addEventListener("click", () => {
			currentYear--;
			data.orderCounts = Array(7).fill(0);
			data.profits = Array(7).fill(0);
			updateData();
		});

		const nextButton = document.createElement("li");
		nextButton.innerText = "שנה הבא";
		nextButton.addEventListener("click", () => {
			currentYear++;
			data.orderCounts = Array(7).fill(0);
			data.profits = Array(7).fill(0);
			updateData();
		});

		OrdersDateTrendsTitel.appendChild(prevButton);
		OrdersDateTrendsTitel.appendChild(nextButton);

		const lineChartCanvas = document.createElement("canvas");
		lineChartCanvas.id = "lineChartCanvas";
		OrdersDateTrends.appendChild(lineChartCanvas);

		const lineChartContext = lineChartCanvas.getContext("2d");
		const currentYearOrders = orders.filter((order) => {
			const entryDate = new Date(order.entry_date);
			return (
				order.status !== "בוטל" &&
				entryDate.getFullYear() === currentYear
			);
		});

		currentYearOrders.forEach((order) => {
			const entryDate = new Date(order.entry_date);
			const weekday = entryDate.getDay();
			data.orderCounts[weekday]++;
			data.profits[weekday] += order.totalPrice;
		});

		new Chart(lineChartContext, {
			type: "line",
			data: {
				labels: data.weekdays,
				datasets: [{
						label: "הזמנות",
						data: data.orderCounts,
						fill: false,
            backgroundColor: "rgb(255, 255, 255)",
						pointBackgroundColor: backgroundColors,
						pointRadius: 5,

						yAxisID: "y-axis-orders",
					},
					{
						label: "\u20AA רווח",
						data: data.profits,
						fill: false,
            backgroundColor: "rgb(255, 255, 255)",
						pointBackgroundColor: backgroundColors,
						pointRadius: 5,

					},
				],
			},
			options: {
				plugins: {
          legend: {
            display: false,
          },
					title: {
						display: true,
						text: `תרשים מגמות שבועי לשנה - ${currentYear}`,
						font: {
							size: 14
						},
					},
				},
				scales: {
					y: {
            grid:{ display:false},
						beginAtZero: true,
						title: {
							display: true,
							text: "רווח ליום",
						},
					},
					"y-axis-orders": {
						position: "right",
						beginAtZero: true,
						title: {
							display: true,
							text: "הזמנות ליום",
						},
						ticks: {
							stepSize: 1,
							min: 0,
						},
					},
				},
			},
		});
	};
	updateData();
}

//===============================//

// מעבד הזמנות לפי לקוחות, קראיה לתצוגה
async function processCustomerOrders(customers) {
    const orders = await getOrders();
    const customersData = [];
    console.log(customers);

    for (const customer of customers) {
        // Check if customer.order_IDs is not null before splitting
        if (customer.order_IDs) {
            const orderIDs = customer.order_IDs.split(',').map(Number);
            const customerOrders = orders.filter(order => orderIDs.includes(order.order_ID));
            customersData.push({
                customer,
                orders: customerOrders
            });
        }
    }

    createCustomersMonthsStatistics(customersData);
    createCitysMonthsStatistics(customersData);
    createCitiesMostProfits(customersData);
    createCitiesMostOrders(customersData);
    createMapVisualization(customersData);
    createCustomersRevenueOrders(customersData);
    createCustomersStatusOrders(customersData);
}

// מציג רשימת לקוחות
function createCustomers(customers) {
	const CustomerList = document.getElementById("CustomerList");
	CustomerList.innerHTML = '';;
	const searchInput = document.createElement("input");
	searchInput.id = "searchInput";
	searchInput.placeholder = "חיפוש";
	CustomersPanelController.appendChild(searchInput);

	const updateCustomerList = () => {
		customers.forEach(customer => {
			const Customer = document.createElement("div");
			Customer.classList.add("Customer");
			Customer.innerHTML = `<li>${customer.first_name} ${customer.last_name}</li>`;
			Customer.addEventListener("click", () => {
				ipcRenderer.send('customerTab', customer.customer_ID);
			});
			CustomerList.appendChild(Customer);
		});
	};
	updateCustomerList();

	searchInput.addEventListener("input", async function() {
		const searchString = searchInput.value.toLowerCase();
		const Customer = document.querySelectorAll(".Customer");
		let isSearching = true;

		Customer.forEach(Customer => {
			if (!isSearching) {
				return;
			}

			const customerName = Customer.querySelector("li").textContent.toLowerCase();
			if (customerName.includes(searchString)) {
				Customer.style.backgroundColor = "#ccffcc";
				CustomerList.prepend(Customer);
			} else {
				Customer.style.backgroundColor = "";
				CustomerList.appendChild(Customer);
			}
		});

		if (searchString === "") {
			isSearching = false;
			Customer.forEach(Customer => {
				const originalBackgroundColor = Customer.getAttribute("data-original-bg");
				Customer.style.backgroundColor = originalBackgroundColor;
			});
		}
	});
}
// top section ניטור לקוחות-- לקוחות לפי סטטאטוס
function createCustomersMonthsStatistics(customersData) {
	const CustomersMonthsStatistics = document.getElementById("CustomersMonthsStatistics");
	CustomersMonthsStatistics.innerHTML = '';
	CustomersMonthsStatistics.innerHTML = '<span>לקוחות לפי סטטאטוס</span>';

	const CustomersMonthsStatisticsController = document.createElement("div");
	CustomersMonthsStatisticsController.className = "panel-controller";
	CustomersMonthsStatistics.appendChild(CustomersMonthsStatisticsController);

	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();

	const prevMonthButton = document.createElement("li");
	prevMonthButton.innerText = "חודש קודם";
	prevMonthButton.addEventListener("click", () => {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
		const statistics = calculateCityStatistics(customersData, currentMonth, currentYear);
		updateStatusList(statistics.averageProfit, statistics.averageOrders);
	});
	CustomersMonthsStatisticsController.appendChild(prevMonthButton);

	const nextMonthButton = document.createElement("li");
	nextMonthButton.innerText = "חודש הבא";
	nextMonthButton.addEventListener("click", () => {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
		const statistics = calculateCityStatistics(customersData, currentMonth, currentYear);
		updateStatusList(statistics.averageProfit, statistics.averageOrders);
	});
	CustomersMonthsStatisticsController.appendChild(nextMonthButton);

	const statusList = document.createElement("div");
	statusList.className = "statusList";

	function updateStatusList(averageProfit, averageOrders) {
		statusList.innerHTML = '';

		const currentMonthName = document.createElement("p");
		currentMonthName.innerHTML = `${currentYear} ${getCurrentMonthName()}`;
		statusList.appendChild(currentMonthName);

		const averageProfitElement = document.createElement("li");
		averageProfitElement.innerHTML = `רווח ממוצע: ${averageProfit.toFixed(2)}`;
		statusList.appendChild(averageProfitElement);

		const averageOrdersElement = document.createElement("li");
		averageOrdersElement.innerHTML = `הזמנות ממוצעות: ${averageOrders.toFixed(2)}`;
		statusList.appendChild(averageOrdersElement);

		CustomersMonthsStatistics.appendChild(statusList);
	}

	function getCurrentMonthName() {
		const monthNames = [
			"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
			"יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
		];
		return monthNames[currentMonth];
	}

	function calculateCityStatistics(customersData, month, year) {
		const filteredData = customersData.filter((data) => {
			return data.orders.some((order) => {
				const entryDate = new Date(order.entry_date);
				return entryDate.getMonth() === month && entryDate.getFullYear() === year;
			});
		});

		const totalCustomers = filteredData.length;
		const totalProfit = filteredData.reduce((sum, customerData) => {
			return sum + customerData.orders.reduce((orderSum, order) => orderSum + order.totalPrice, 0);
		}, 0);

		const totalOrders = filteredData.reduce((sum, customerData) => {
			return sum + customerData.orders.length;
		}, 0);

		const averageProfit = totalProfit / totalCustomers;
		const averageOrders = totalOrders / totalCustomers;

		return {
			averageProfit,
			averageOrders,
		};
	}
	prevMonthButton.click();
}
// top section ניטור לקוחות-- ערים לפי סטטאטוס
function createCitysMonthsStatistics(customersData) {
	const CitysMonthsStatistics = document.getElementById("CitysMonthsStatistics");
	CitysMonthsStatistics.innerHTML = '';
	CitysMonthsStatistics.innerHTML = '<span>ערים לפי סטטאטוס</span>';

	const CitysMonthsStatisticsController = document.createElement("div");
	CitysMonthsStatisticsController.className = "panel-controller";
	CitysMonthsStatistics.appendChild(CitysMonthsStatisticsController);

	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();

	const prevMonthButton = document.createElement("li");
	prevMonthButton.innerText = "חודש קודם";
	prevMonthButton.addEventListener("click", () => {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
		const statistics = calculateCityStatistics(customersData, currentMonth, currentYear);
		updateStatusList(statistics.averageCityProfit, statistics.averageCityOrders);
	});
	CitysMonthsStatisticsController.appendChild(prevMonthButton);

	const nextMonthButton = document.createElement("li");
	nextMonthButton.innerText = "חודש הבא";
	nextMonthButton.addEventListener("click", () => {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
		const statistics = calculateCityStatistics(customersData, currentMonth, currentYear);
		updateStatusList(statistics.averageCityProfit, statistics.averageCityOrders);
	});
	CitysMonthsStatisticsController.appendChild(nextMonthButton);

	const statusList = document.createElement("div");
	statusList.className = "statusList";

	function updateStatusList(averageCityProfit, averageCityOrders) {
		statusList.innerHTML = '';

		const currentMonthName = document.createElement("p");
		currentMonthName.innerHTML = `${currentYear} ${getCurrentMonthName()}`;
		statusList.appendChild(currentMonthName);

		const averageCityProfitElement = document.createElement("li");
		averageCityProfitElement.innerHTML = `רווח ממוצע: ${averageCityProfit.toFixed(2)}`;
		statusList.appendChild(averageCityProfitElement);

		const averageCityOrdersElement = document.createElement("li");
		averageCityOrdersElement.innerHTML = `הזמנות ממוצעות: ${averageCityOrders.toFixed(2)}`;
		statusList.appendChild(averageCityOrdersElement);

		CitysMonthsStatistics.appendChild(statusList);
	}

	function getCurrentMonthName() {
		const monthNames = [
			"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
			"יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
		];
		return monthNames[currentMonth];
	}

	function calculateCityStatistics(customersData, month, year) {
		const filteredData = customersData.filter((data) => {
			return data.orders.some((order) => {
				const entryDate = new Date(order.entry_date);
				return entryDate.getMonth() === month && entryDate.getFullYear() === year;
			});
		});

		const cityStatistics = new Map();
		filteredData.forEach((customerData) => {
			const city = customerData.customer.city;
			const profit = customerData.orders.reduce((orderSum, order) => orderSum + order.totalPrice, 0);
			const ordersCount = customerData.orders.length;

			if (cityStatistics.has(city)) {
				const existingStats = cityStatistics.get(city);
				existingStats.totalProfit += profit;
				existingStats.totalOrders += ordersCount;
				existingStats.confirmedOrders += customerData.orders.filter((order) => order.status === "באספקה" || order.status === "סופק").length;
				existingStats.awaitingOrders += customerData.orders.filter((order) => order.status === "ממתין" || order.status === "באריזה").length;
				existingStats.canceledOrders += customerData.orders.filter((order) => order.status === "בוטל" || order.status === "הוחזר").length;
			} else {
				cityStatistics.set(city, {
					totalProfit: profit,
					totalOrders: ordersCount,
					confirmedOrders: customerData.orders.filter((order) => order.status === "באספקה" || order.status === "סופק").length,
					awaitingOrders: customerData.orders.filter((order) => order.status === "ממתין" || order.status === "באריזה").length,
					canceledOrders: customerData.orders.filter((order) => order.status === "בוטל" || order.status === "הוחזר").length,
				});
			}
		});

		const totalCities = cityStatistics.size;
		let totalCityProfit = 0;
		let totalCityOrders = 0;

		cityStatistics.forEach((stats) => {
			totalCityProfit += stats.totalProfit;
			totalCityOrders += stats.totalOrders;
		});

		const averageCityProfit = totalCityProfit / totalCities;
		const averageCityOrders = totalCityOrders / totalCities;

		return {
			averageCityProfit,
			averageCityOrders
		};
	}


	prevMonthButton.click();
}
// גרף רווחים לקוחות הכל שנתי חודשי שבועה!!!!
function createCustomersRevenueOrders(customersData) {
	function processAndRenderData(header) {
		if (header === "הכל") {
			const filteredCustomersData = customersData;
			const {
				customerLabels,
				totalPriceData
			} = processCustomerProfits(filteredCustomersData);
			updateData(customerLabels, totalPriceData, header);
		} else {
			const currentDate = new Date();
			const currentYear = currentDate.getFullYear();
			const currentMonth = currentDate.getMonth();
			const currentDayOfMonth = currentDate.getDate();
			let startDate, endDate;

			if (header === "שבועה") {
				const currentDayOfWeek = currentDate.getDay();
				startDate = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek);
				endDate = new Date(currentYear, currentMonth, currentDayOfMonth);
			} else if (header === "חודש") {
				startDate = new Date(currentYear, currentMonth, 1);
				endDate = new Date(currentYear, currentMonth + 1, 0);
			} else if (header === "שנה") {
				startDate = new Date(currentYear, 0, 1);
				endDate = new Date(currentYear, 11, 31);
			}

			const filteredCustomersData = customersData.filter(customerData => {
				for (const order of customerData.orders) {
					const entryDate = new Date(order.entry_date);
					if (entryDate >= startDate && entryDate <= endDate) {
						return true;
					}
				}
				return false;
			});

			const {
				customerLabels,
				totalPriceData
			} = processCustomerProfits(filteredCustomersData);
			updateData(customerLabels, totalPriceData, header);
		}
	}

	function processCustomerProfits(filteredCustomersData) {
		const customerProfits = {};

		for (const customerData of filteredCustomersData) {
			const customerName = `${customerData.customer.first_name} ${customerData.customer.last_name}`;
			let totalConfirmedProfit = 0;
			let totalUnconfirmedProfit = 0;

			for (const order of customerData.orders) {
				if (
					(order.status === "סופק" || order.status === "באספקה" || order.status === "באריזה" || order.status === "ממתין")
				) {
					totalConfirmedProfit += order.totalPrice;
				} else if (order.status === "בוטל" || order.status === "הוחזר") {
					totalUnconfirmedProfit += order.totalPrice;
				}
			}

			if (!customerProfits[customerName]) {
				customerProfits[customerName] = {
					confirmed: totalConfirmedProfit,
					unconfirmed: totalUnconfirmedProfit
				};
			} else {
				customerProfits[customerName].confirmed += totalConfirmedProfit;
				customerProfits[customerName].unconfirmed += totalUnconfirmedProfit;
			}
		}

		const sortedCustomers = Object.keys(customerProfits).sort(
			(a, b) =>
			customerProfits[b].confirmed + customerProfits[b].unconfirmed -
			customerProfits[a].confirmed - customerProfits[a].unconfirmed
		);

		const topCustomers = sortedCustomers.slice(0, 10);
		const customerLabels = [];
		const totalPriceData = [];

		for (const customer of topCustomers) {
			customerLabels.push(customer);
			totalPriceData.push([customerProfits[customer].confirmed, customerProfits[customer].unconfirmed]);
		}

		return {
			customerLabels,
			totalPriceData
		};
	}

	function updateData(customerLabels, totalPriceData, header) {
		CustomersRevenueOrdersChart.innerHTML = '';
		const barCanvas = document.createElement("canvas");
		barCanvas.id = "barChart";
		barCanvas.classList.add("Chart");
		CustomersRevenueOrdersChart.appendChild(barCanvas);
		const ctx = barCanvas.getContext("2d");

		new Chart(ctx, {
			type: "bar",
			data: {
				labels: customerLabels,
				datasets: [{
					label: "הזמנות מאושרות",
					data: totalPriceData.map(data => data[0]),
					backgroundColor: backgroundColors,
					borderWidth: 1,
				},
				{
					label: "הזמנות לא מאושרות",
					data: totalPriceData.map(data => data[1]),
					backgroundColor: backgroundColors,
					borderWidth: 1,
				}],
			},
			options: {
				scales: {
					x: {
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						display: false,
						position: 'top',
					},
          title: {
            display: true,
            text: `לקוחות לפי רווח - ${header}`,
            font: {
              size: 14
            },
          },
				},
			},
		});
	}

	const filters = [{
			text: "שבועה",
			eventHandler: () => processAndRenderData("שבועה")
		},
		{
			text: "חודש",
			eventHandler: () => processAndRenderData("חודש")
		},
		{
			text: "שנה",
			eventHandler: () => processAndRenderData("שנה")
		},
		{
			text: "הכל",
			eventHandler: () => processAndRenderData("הכל")
		},
	];

	filters.forEach(filter => {
		const filterElement = document.createElement("li");
		filterElement.innerText = filter.text;
		filterElement.addEventListener("click", filter.eventHandler);
		CustomersRevenueOrdersController.appendChild(filterElement);
	});

	processAndRenderData("חודש");
}
// גרף הזמנות לקוחות הכל שנתי חודשי שבועה!!!
function createCustomersStatusOrders(customersData) {
	function processAndRenderData(header) {
		if (header === "הכל") {
			const filteredCustomersData = customersData;
			const {
				employeeLabels,
				confirmedData,
				unconfirmedData
			} = processEmployeeOrders(filteredCustomersData);
			updateData(employeeLabels, confirmedData, unconfirmedData, header);
		} else {
			const currentDate = new Date();
			const currentYear = currentDate.getFullYear();
			const currentMonth = currentDate.getMonth();
			const currentDayOfMonth = currentDate.getDate();
			let startDate, endDate;

			if (header === "שבועה") {
				const currentDayOfWeek = currentDate.getDay();
				startDate = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek);
				endDate = new Date(currentYear, currentMonth, currentDayOfMonth);
			} else if (header === "חודש") {
				startDate = new Date(currentYear, currentMonth, 1);
				endDate = new Date(currentYear, currentMonth + 1, 0);
			} else if (header === "שנה") {
				startDate = new Date(currentYear, 0, 1);
				endDate = new Date(currentYear, 11, 31);
			}

			const filteredCustomersData = customersData.filter(customerData => {
				for (const order of customerData.orders) {
					const entryDate = new Date(order.entry_date);
					if (entryDate >= startDate && entryDate <= endDate) {
						return true;
					}
				}
				return false;
			});

			const {
				employeeLabels,
				confirmedData,
				unconfirmedData
			} = processEmployeeOrders(filteredCustomersData);
			updateData(employeeLabels, confirmedData, unconfirmedData, header);
		}
	}

	function processEmployeeOrders(filteredCustomersData) {
		const employeeOrders = {};

		for (const customerData of filteredCustomersData) {
			const employeeName = `${customerData.customer.first_name} ${customerData.customer.last_name}`;

			for (const order of customerData.orders) {
				if (
					(order.status === "סופק" || order.status === "באספקה" || order.status === "באריזה" || order.status === "ממתין")
				) {
					if (!employeeOrders[employeeName]) {
						employeeOrders[employeeName] = {
							confirmed: 1,
							unconfirmed: 0
						};
					} else {
						employeeOrders[employeeName].confirmed++;
					}
				} else if (order.status === "בוטל" || order.status === "הוחזר") {
					if (!employeeOrders[employeeName]) {
						employeeOrders[employeeName] = {
							confirmed: 0,
							unconfirmed: 1
						};
					} else {
						employeeOrders[employeeName].unconfirmed++;
					}
				}
			}
		}

		const sortedEmployees = Object.keys(employeeOrders).sort(
			(a, b) =>
			employeeOrders[b].confirmed + employeeOrders[b].unconfirmed -
			employeeOrders[a].confirmed - employeeOrders[a].unconfirmed
		);

		const topEmployees = sortedEmployees.slice(0, 10);
		const employeeLabels = [];
		const confirmedData = [];
		const unconfirmedData = [];

		for (const employee of topEmployees) {
			employeeLabels.push(employee);
			confirmedData.push(employeeOrders[employee].confirmed);
			unconfirmedData.push(employeeOrders[employee].unconfirmed);
		}

		return {
			employeeLabels,
			confirmedData,
			unconfirmedData
		};
	}

	function updateData(employeeLabels, confirmedData, unconfirmedData, header) {
		CustomersStatusOrdersChart.innerHTML = '';
		const barCanvas = document.createElement("canvas");
		barCanvas.id = "barChart";
		barCanvas.classList.add("Chart");
		CustomersStatusOrdersChart.appendChild(barCanvas);
		const ctx = barCanvas.getContext("2d");

		new Chart(ctx, {
			type: "bar",
			data: {
				labels: employeeLabels,
				datasets: [{
						label: "הזמנות מאושרות",
						data: confirmedData,
						backgroundColor: backgroundColors,
						borderWidth: 1,
					},
					{
						label: "הזמנות לא מאושרות",
						data: unconfirmedData,
						backgroundColor: backgroundColors,
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					x: {
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						display: true,
						position: 'top',
						title: {
							display: true,
							text: `לקוחות לפי מספר הזמנות - ${header}`,
							font: {
								size: 14
							},
						},
					},
				},
			},
		});
	}

	const filters = [{
			text: "שבועה",
			eventHandler: () => processAndRenderData("שבועה")
		},
		{
			text: "חודש",
			eventHandler: () => processAndRenderData("חודש")
		},
		{
			text: "שנה",
			eventHandler: () => processAndRenderData("שנה")
		},
		{
			text: "הכל",
			eventHandler: () => processAndRenderData("הכל")
		},
	];

	filters.forEach(filter => {
		const filterElement = document.createElement("li");
		filterElement.innerText = filter.text;
		filterElement.addEventListener("click", filter.eventHandler);
		CustomersStatusOrdersController.appendChild(filterElement);
	});

	processAndRenderData("חודש");
}
// תרשים פילוח ערים לפי רווח
function createCitiesMostProfits(customersData) {
	const CitiesMostProfitsTitle = document.getElementById("CitiesMostProfitsTitle");

	const currentWeekFilter = document.createElement("li");
	currentWeekFilter.innerText = "שבועה";
	currentWeekFilter.addEventListener("click", () => {
		const filteredData = filterData(customersData, "שבועה");
		updatePieChart(filteredData, "שבועה");
	});
	CitiesMostProfitsTitle.appendChild(currentWeekFilter);

	const currentMonthFilter = document.createElement("li");
	currentMonthFilter.innerText = "חודש";
	currentMonthFilter.addEventListener("click", () => {
		const filteredData = filterData(customersData, "חודש");
		updatePieChart(filteredData, "חודש");
	});
	CitiesMostProfitsTitle.appendChild(currentMonthFilter);

	const currentYearFilter = document.createElement("li");
	currentYearFilter.innerText = "שנה";
	currentYearFilter.addEventListener("click", () => {
		const filteredData = filterData(customersData, "שנה");
		updatePieChart(filteredData, "שנה");
	});
	CitiesMostProfitsTitle.appendChild(currentYearFilter);

	const currentAllFilter = document.createElement("li");
	currentAllFilter.innerText = "הכל";
	currentAllFilter.addEventListener("click", () => {
		const cityProfits = {};
		customersData.forEach((customerData) => {
			const customer = customerData.customer;
			const orders = customerData.orders;
			const city = customer.city;
			const totalProfits = orders
				.filter((order) => order.status !== "בוטל" && order.status !== "הוחזר")
				.reduce((sum, order) => sum + order.totalPrice, 0);

			if (!cityProfits[city]) {
				cityProfits[city] = totalProfits;
			} else {
				cityProfits[city] += totalProfits;
			}
		});

		const cityProfitsArray = Object.entries(cityProfits).map(([city, totalProfits]) => ({
			city,
			totalProfits
		}));
		cityProfitsArray.sort((a, b) => b.totalProfits - a.totalProfits);

		const filteredData = cityProfitsArray.slice(0, 10);

		updatePieChart(filteredData, "הכל");
	});
	CitiesMostProfitsTitle.appendChild(currentAllFilter);


	const filterData = (data, header) => {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();
		const currentDayOfMonth = currentDate.getDate();
		let startDate, endDate;

		if (header === "שבועה") {
			const currentDayOfWeek = currentDate.getDay();
			startDate = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek);
			endDate = new Date(currentYear, currentMonth, currentDayOfMonth);
		} else if (header === "חודש") {
			startDate = new Date(currentYear, currentMonth, 1);
			endDate = new Date(currentYear, currentMonth + 1, 0);
		} else if (header === "שנה") {
			startDate = new Date(currentYear, 0, 1);
			endDate = new Date(currentYear, 11, 31);
		}

		const cityProfits = new Map();

		data.forEach((customerData) => {
			const customer = customerData.customer;
			const orders = customerData.orders.filter((order) => {
				const entryDate = new Date(order.entry_date);
				return entryDate >= startDate && entryDate <= endDate && order.status !== "בוטל" && order.status !== "הוחזר";
			});
			const totalProfits = orders.reduce((sum, order) => sum + order.totalPrice, 0);
			const city = customer.city;

			if (cityProfits.has(city)) {
				cityProfits.set(city, cityProfits.get(city) + totalProfits);
			} else {
				cityProfits.set(city, totalProfits);
			}
		});

		const cityProfitsArray = Array.from(cityProfits, ([city, totalProfits]) => ({
			city,
			totalProfits
		}));
		cityProfitsArray.sort((a, b) => b.totalProfits - a.totalProfits);
		return cityProfitsArray.slice(0, 10);
	};

	const updatePieChart = (filteredData, header) => {
		const CitiesMostProfitsChart = document.getElementById("CitiesMostProfitsChart");
		CitiesMostProfitsChart.innerHTML = '';

		const nonZeroProfitData = filteredData.filter((data) => data.totalProfits > 0);

		const pieCanvas = document.createElement("canvas");
		pieCanvas.id = "pieChart";
		CitiesMostProfitsChart.appendChild(pieCanvas);

		const cityLabels = nonZeroProfitData.map((data) => data.city);
		const cityProfitsData = nonZeroProfitData.map((data) => data.totalProfits);

		new Chart(pieCanvas, {
			type: "pie",
			data: {
				labels: cityLabels,
				datasets: [{
          label: '\u20AA',
					data: cityProfitsData,
					backgroundColor: backgroundColors,
				}],
			},
			options: {
				plugins: {
					legend: {
						display: true,
						position: 'right',
            align: 'start'
					},
          title: {
            display: true,
            text: `רווחים לפי ערים תצוגה ל - ${header}`,
            font: {
              size: 14
            },
          },
				},
			},
		});
	};

	currentAllFilter.click();
}
// תרשים פילוח ערים לפי הזמנות
function createCitiesMostOrders(customersData) {
	const CitiesMostOrdersTitle = document.getElementById("CitiesMostOrdersTitle");

	const currentWeekFilter = document.createElement("li");
	currentWeekFilter.innerText = "שבועה";
	currentWeekFilter.addEventListener("click", () => {
		const filteredData = filterData(customersData, "שבועה");
		updatePieChart(filteredData, "שבועה");
	});
	CitiesMostOrdersTitle.appendChild(currentWeekFilter);

	const currentMonthFilter = document.createElement("li");
	currentMonthFilter.innerText = "חודש";
	currentMonthFilter.addEventListener("click", () => {
		const filteredData = filterData(customersData, "חודש");
		updatePieChart(filteredData, "חודש");
	});
	CitiesMostOrdersTitle.appendChild(currentMonthFilter);

	const currentYearFilter = document.createElement("li");
	currentYearFilter.innerText = "שנה";
	currentYearFilter.addEventListener("click", () => {
		const filteredData = filterData(customersData, "שנה");
		updatePieChart(filteredData, "שנה");
	});
	CitiesMostOrdersTitle.appendChild(currentYearFilter);

	const currentAllFilter = document.createElement("li");
	currentAllFilter.innerText = "הכל";
	currentAllFilter.addEventListener("click", () => {
		const cityOrderCounts = countAllOrdersByCity(customersData);
		updatePieChart(cityOrderCounts, "הכל");
	});
	CitiesMostOrdersTitle.appendChild(currentAllFilter);

	const countAllOrdersByCity = (data) => {
		const cityOrderCounts = new Map();

		data.forEach((customerData) => {
			const customer = customerData.customer;
			const orders = customerData.orders.filter((order) => order.status !== "בוטל" && order.status !== "הוחזר");
			const city = customer.city;
			const orderCount = orders.length;

			if (cityOrderCounts.has(city)) {
				cityOrderCounts.set(city, cityOrderCounts.get(city) + orderCount);
			} else {
				cityOrderCounts.set(city, orderCount);
			}
		});

		const cityOrderCountsArray = Array.from(cityOrderCounts, ([city, orderCount]) => ({
			city,
			orderCount
		}));

		cityOrderCountsArray.sort((a, b) => b.orderCount - a.orderCount);

		return cityOrderCountsArray.slice(0, 10);
	};

	CitiesMostOrdersTitle.appendChild(currentAllFilter);

	const filterData = (data, header) => {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();
		const currentDayOfMonth = currentDate.getDate();
		let startDate, endDate;

		if (header === "שבועה") {
			const currentDayOfWeek = currentDate.getDay();
			startDate = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek);
			endDate = new Date(currentYear, currentMonth, currentDayOfMonth);
		} else if (header === "חודש") {
			startDate = new Date(currentYear, currentMonth, 1);
			endDate = new Date(currentYear, currentMonth + 1, 0);
		} else if (header === "שנה") {
			startDate = new Date(currentYear, 0, 1);
			endDate = new Date(currentYear, 11, 31);
		}
		const cityOrderCounts = new Map();
		data.forEach((customerData) => {
			const customer = customerData.customer;
			const orders = customerData.orders.filter((order) => {
				const entryDate = new Date(order.entry_date);
				return entryDate >= startDate && entryDate <= endDate && order.status !== "בוטל" && order.status !== "הוחזר";
			});
			const city = customer.city;
			const orderCount = orders.length;

			if (cityOrderCounts.has(city)) {
				cityOrderCounts.set(city, cityOrderCounts.get(city) + orderCount);
			} else {
				cityOrderCounts.set(city, orderCount);
			}
		});
		const cityOrderCountsArray = Array.from(cityOrderCounts, ([city, orderCount]) => ({
			city,
			orderCount
		}));
		cityOrderCountsArray.sort((a, b) => b.orderCount - a.orderCount);
		return cityOrderCountsArray.slice(0, 10);
	};


	const updatePieChart = (filteredData, header) => {
		const CitiesMostOrdersChart = document.getElementById("CitiesMostOrdersChart");
		CitiesMostOrdersChart.innerHTML = '';

		const nonZeroOrderCountData = filteredData.filter((data) => data.orderCount > 0);

		const pieCanvas = document.createElement("canvas");
		pieCanvas.id = "pieChart";
		CitiesMostOrdersChart.appendChild(pieCanvas);

		const cityLabels = nonZeroOrderCountData.map((data) => data.city);
		const cityOrderCountsData = nonZeroOrderCountData.map((data) => data.orderCount);

		const pieChart = new Chart(pieCanvas, {
			type: "pie",
			data: {
				labels: cityLabels,
				datasets: [{
					data: cityOrderCountsData,
					backgroundColor: backgroundColors,
				}],
			},
			options: {
				plugins: {
					legend: {
						display: true,
						position: 'top',
						title: {
							display: true,
							text: `מספר הזמנות לפי ערים תצוגה ל - ${header}`,
							font: {
								size: 14
							},
						},
					},
				},
			},
		});
	};
	currentAllFilter.click();
}
// תצוגת מפה 
function createMapVisualization(customersData) {
	const map = L.map('InfoMap', {
		center: [31.5, 34.75],
		zoom: 8,
		zoomControl: false,
	});
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

	const CustomersViaCity = document.createElement("div");
	CustomersViaCity.className = "CustomersViaCity";
	MapVisualization.appendChild(CustomersViaCity);

	const cityCounts = {};

	for (const data of customersData) {
		const {
			customer
		} = data;
		const cityName = customer.city;

		if (!cityCounts[cityName]) {
			cityCounts[cityName] = 0;
		}
		cityCounts[cityName]++;
	}

	const CitiesWithMostProfits = document.createElement("li");
	CitiesWithMostProfits.textContent = "ערים לפי רווח מירבי";
	CitiesWithMostProfits.className = "CitiesWithMostProfits";
	CitiesWithMostProfits.addEventListener("click", () => {
		// Logic to display cities with most profits
		map.eachLayer((layer) => {
			if (layer instanceof L.Marker) {
				map.removeLayer(layer);
			}
		});

		const sortedByProfits = customersData.slice().sort((a, b) => b.profits - a.profits).slice(0, 10);

		for (const data of sortedByProfits) {
			const {
				customer
			} = data;
			const cityName = customer.city;
			const cityLat = customer.lat;
			const cityLon = customer.lon;

			const marker = L.marker([cityLat, cityLon]).addTo(map);
			marker.bindPopup(`${cityName}: Profits - $${data.profits}`);
		}
	});
	CustomersViaCity.appendChild(CitiesWithMostProfits);

	const CitiesWithMostOrders = document.createElement("li");
	CitiesWithMostOrders.textContent = "ערים לפי כמות הזמנות מירבית";
	CitiesWithMostOrders.className = "CitiesWithMostOrders";
	CitiesWithMostOrders.addEventListener("click", () => {
		// Logic to display cities with most orders
		map.eachLayer((layer) => {
			if (layer instanceof L.Marker) {
				map.removeLayer(layer);
			}
		});

		const sortedByOrders = customersData.slice().sort((a, b) => b.orders - a.orders).slice(0, 10);

		for (const data of sortedByOrders) {
			const {
				customer
			} = data;
			const cityName = customer.city;
			const cityLat = customer.lat;
			const cityLon = customer.lon;

			const marker = L.marker([cityLat, cityLon]).addTo(map);
			marker.bindPopup(`${cityName}: Orders - ${data.orders}`);
		}
	});
	CustomersViaCity.appendChild(CitiesWithMostOrders);

	const CitiesWithMostCustomers = document.createElement("li");
	CitiesWithMostCustomers.textContent = "ערים לפי כמות לקוחות מירבית";
	CitiesWithMostCustomers.className = "CitiesWithMostCustomers";
	CitiesWithMostCustomers.addEventListener("click", () => {
		// Logic to display cities with most customers
		map.eachLayer((layer) => {
			if (layer instanceof L.Marker) {
				map.removeLayer(layer);
			}
		});

		const cityCountsSorted = Object.entries(cityCounts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 10);

		for (const [cityName, count] of cityCountsSorted) {
			const cityData = customersData.find(data => data.customer.city === cityName);
			const cityLat = cityData.customer.lat;
			const cityLon = cityData.customer.lon;

			const marker = L.marker([cityLat, cityLon]).addTo(map);
			marker.bindPopup(`${cityName}: Customers - ${count}`);
		}
	});
	CustomersViaCity.appendChild(CitiesWithMostCustomers);
}

//===============================//

// מעבד מוצרים לפי הזמנות, קראיה לתצוגה
async function processItemsOrders(items) {
	const orders = await getOrders();
	const itemsData = [];

	for (const item of items) {
		if (item.order_IDs) {
			const orderIDs = item.order_IDs.split(',').map(Number);
			const itemsOrders = orders.filter(order => orderIDs.includes(order.order_ID));

			itemsData.push({
				item,
				orders: itemsOrders
			});
		} else {
			itemsData.push({
				item,
				orders: []
			});
		}
	}
  createYearItemsStock(itemsData);
  createMonthItemsStock(itemsData);
  createWeekItemsStock(itemsData);
	createCategorysMonthsQuantities(itemsData);
	createCategorysMonthsVlaues(itemsData);
}

// יצירת רשימת מוצרים
function createItems(items) {

	const searchInput = document.createElement("input");
	searchInput.id = "searchInput";
	searchInput.placeholder = "חיפוש";
	ItemsPanelController.appendChild(searchInput);


	const updateItems = () => {
		items.forEach(item => {
			const Item = document.createElement("div");
			Item.classList.add("Item");
			Item.innerHTML = `<li>${item.name}<br>${item.serial}</li>`;

			Item.addEventListener("click", async () => {
				ipcRenderer.send('itemTab', item.item_ID);
			});
			ItemsList.appendChild(Item);
		});
	}
	updateItems();

	searchInput.addEventListener("input", async function() {
		const searchString = searchInput.value.toLowerCase();
		const Item = document.querySelectorAll(".Item");
		let isSearching = true;

		Item.forEach(Item => {
			if (!isSearching) {
				return;
			}

			const itemName = Item.querySelector("li").textContent.toLowerCase();
			if (itemName.includes(searchString)) {
				Item.style.backgroundColor = "#ccffcc";
				Items.prepend(Item);
			} else {
				Item.style.backgroundColor = "";
				ItemsList.appendChild(Item);
			}
		});

		if (searchString === "") {
			isSearching = false;
			Item.forEach(Item => {
				const originalBackgroundColor = Item.getAttribute("data-original-bg");
				Item.style.backgroundColor = originalBackgroundColor;
			});
		}
	});
}
// תצוגת תנועת מלאי שנתי
function createYearItemsStock(itemsData) {
  const YearItemsStock = document.getElementById("YearItemsStock");
  YearItemsStock.className = "ItemsStock";
  YearItemsStock.innerHTML = '<span>תנועת מלאי שנתי</span>';

	let currentYear = new Date().getFullYear();

	const YearItemsStockTitle = document.createElement("div");
	YearItemsStockTitle.classList.add("panel-controller");
	YearItemsStock.appendChild(YearItemsStockTitle);

	const prevButton = document.createElement("li");
	prevButton.innerText = "שנה קודם";
	prevButton.addEventListener("click", () => {
    currentYear--;
		updateStatusList(itemsData,currentYear);
	});
	YearItemsStockTitle.appendChild(prevButton);

	const nextButton = document.createElement("li");
	nextButton.innerText = "שנה הבא";
	nextButton.addEventListener("click", () => {
    currentYear++;
		updateStatusList(itemsData, currentYear);
	});
	YearItemsStockTitle.appendChild(nextButton);

	const statusList = document.createElement("div");
	statusList.className = "statusList";
	YearItemsStock.appendChild(statusList);

  function updateStatusList(itemsData, currentYear){
    statusList.innerHTML = '';
  
    const currentMonthName = document.createElement("p");
    currentMonthName.innerHTML = `${currentYear}`;
    statusList.appendChild(currentMonthName);
  
	let deliveredCount = 0;
	let inWorkCount = 0;
	let canceledCount = 0;
	
	const uniqueOrderIds = new Set();
	itemsData.forEach((data) => {
		const orders = data.orders;
		for (const order of orders) {
			const orderYear = new Date(order.entry_date).getFullYear();
			if (orderYear === currentYear && !uniqueOrderIds.has(order.order_ID)) {
				uniqueOrderIds.add(order.order_ID);
	
				const totalItems = parseFloat(order.totalItems);
				if (!isNaN(totalItems)) {
					if (order.status === 'סופק') {
						deliveredCount += totalItems;
					} else if (order.status === 'באריזה' || order.status === 'באספקה' || order.status === 'ממתין') {
						inWorkCount += totalItems;
					} else if (order.status === 'בוטל' || order.status === 'הוחזר') {
						canceledCount += totalItems;
					}
				}
			}
		}
	});
	
  
    const itemsDeliveredCount = document.createElement("li");
    itemsDeliveredCount.innerHTML = `סופק: ${deliveredCount}`;
    itemsDeliveredCount.addEventListener("click", () =>{
      filterYearItems(itemsData, currentYear, 'סופק');
    })
    statusList.appendChild(itemsDeliveredCount);
  
    const itemsInWorkCount = document.createElement("li");
    itemsInWorkCount.innerHTML = `בעבודה: ${inWorkCount}`;
    itemsInWorkCount.addEventListener("click", () =>{
      filterYearItems(itemsData, currentYear, 'בעבודה');
    })
    statusList.appendChild(itemsInWorkCount);
  
    const itemsCanceledCount = document.createElement("li");
    itemsCanceledCount.innerHTML = `בוטל: ${canceledCount}`;
    itemsCanceledCount.addEventListener("click", () =>{
      filterYearItems(itemsData, currentYear, 'בוטל');
    })
    statusList.appendChild(itemsCanceledCount);
  }
  filterYearItems(itemsData, currentYear, 'סופק');

  function filterYearItems(itemsData, currentYear, type) {

    const uniqueOrderIds = new Set();
    const itemMap = new Map();

    itemsData.forEach((itemData) => {
      itemData.orders.forEach((order) => {
        const entryDate = new Date(order.entry_date);
        if (entryDate.getFullYear() === currentYear && type === 'סופק' && order.status === 'סופק' && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
        else if (entryDate.getFullYear() === currentYear && type === 'בעבודה' && ['באריזה', 'באספקה', 'ממתין'].includes(order.status) && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
        else if (entryDate.getFullYear() === currentYear && type === 'בוטל' && ['בוטל', 'הוחזר'].includes(order.status) && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
      });
    });

    const itemLabels = Array.from(itemMap.keys());
    const itemData = [Array.from(itemMap.values()).join(',')];
    updateYearItemsStockChart(itemLabels, itemData, type);
  }

  updateStatusList(itemsData, currentYear);
}
// גרף תנועת מלאי שנתי
function updateYearItemsStockChart(itemLabels, itemData) {
  const YearItemsStockChart = document.getElementById("YearItemsStockChart");
  YearItemsStockChart.innerHTML = '';
  const canvasElement = document.createElement("canvas");
  YearItemsStockChart.appendChild(canvasElement);

  const chartContext = canvasElement.getContext("2d");

  new Chart(chartContext, {
    type: "bar",
    data: {
      labels: itemLabels,
      datasets: [{
        label: '\u20AA',
        data: itemData[0].split(',').map(parseFloat),
        backgroundColor: backgroundColors,
      }],
    },
    options: {
      responsive: true,

      plugins: {
        legend: { 
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  });
}
// תצוגת תנועת מלאי חודשי
function createMonthItemsStock(itemsData) {
  const MonthItemsStock = document.getElementById("MonthItemsStock");
  MonthItemsStock.className = "ItemsStock";
  MonthItemsStock.innerHTML = '<span>תנועת מלאי חודשי</span>';

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function getCurrentMonthName() {
    const monthNames = [
      "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
      "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ];
    return monthNames[currentMonth];
  }

  const MonthItemsStockTitle = document.createElement("div");
  MonthItemsStockTitle.classList.add("panel-controller");
  MonthItemsStock.appendChild(MonthItemsStockTitle);

  const prevButton = document.createElement("li");
  prevButton.innerText = "חודש קודם";
  prevButton.addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
      updateStatusList(itemsData, currentYear, currentMonth);
  });
  MonthItemsStockTitle.appendChild(prevButton);

  const nextButton = document.createElement("li");
  nextButton.innerText = "חודש הבא";
  nextButton.addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
      updateStatusList(itemsData, currentYear, currentMonth);
  });
  MonthItemsStockTitle.appendChild(nextButton);

  const statusList = document.createElement("div");
  statusList.className = "statusList";
  MonthItemsStock.appendChild(statusList);

  function updateStatusList(itemsData, currentYear, currentMonth){
    statusList.innerHTML = '';

    const currentMonthName = document.createElement("p");
    currentMonthName.innerHTML = `${currentYear} ${getCurrentMonthName()}`;
    statusList.appendChild(currentMonthName);

	let deliveredCount = 0;
	let inWorkCount = 0;
	let canceledCount = 0;
	
	const uniqueOrderIds = new Set();
	
	itemsData.forEach((data) => {
		const orders = data.orders;
		for (const order of orders) {
			const entryDate = new Date(order.entry_date);
			if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear && !uniqueOrderIds.has(order.order_ID)) {
				uniqueOrderIds.add(order.order_ID);
	
				// Additional check to ensure order.totalItems is a valid number
				const totalItems = parseFloat(order.totalItems);
				if (!isNaN(totalItems)) {
					if (order.status === 'סופק') {
						deliveredCount += totalItems;
					} else if (order.status === 'באריזה' || order.status === 'באספקה' || order.status === 'ממתין') {
						inWorkCount += totalItems;
					} else if (order.status === 'בוטל' || order.status === 'הוחזר') {
						canceledCount += totalItems;
					}
				}
			}
		}
	});


    const itemsDeliveredCount = document.createElement("li");
    itemsDeliveredCount.innerHTML = `סופק: ${deliveredCount}`;
    itemsDeliveredCount.addEventListener("click", () =>{
      filterMonthItems(itemsData, currentYear, currentMonth, 'סופק');
    })    
    statusList.appendChild(itemsDeliveredCount);

    const itemsInWorkCount = document.createElement("li");
    itemsInWorkCount.innerHTML = `בעבודה: ${inWorkCount}`;
    itemsInWorkCount.addEventListener("click", () =>{
      filterMonthItems(itemsData, currentYear, currentMonth, 'בעבודה');
    })
    statusList.appendChild(itemsInWorkCount);

    const itemsCanceledCount = document.createElement("li");
    itemsCanceledCount.innerHTML = `בוטל: ${canceledCount}`;
    itemsCanceledCount.addEventListener("click", () =>{
      filterMonthItems(itemsData, currentYear, currentMonth, 'בוטל');
    })
    statusList.appendChild(itemsCanceledCount);
  }
  filterMonthItems(itemsData, currentYear, currentMonth, 'בעבודה');

  function filterMonthItems(itemsData, currentYear, currentMonth, type) {
      
    const uniqueOrderIds = new Set();
    const itemMap = new Map();

    itemsData.forEach((itemData) => {
      itemData.orders.forEach((order) => {
        const entryDate = new Date(order.entry_date);
        if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear && type === 'סופק' && order.status === 'סופק' && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
        else if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear && type === 'בעבודה' && ['באריזה', 'באספקה', 'ממתין'].includes(order.status) && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
        else if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear && type === 'בוטל' && ['בוטל', 'הוחזר'].includes(order.status) && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
      });
    });

    const itemLabels = Array.from(itemMap.keys());
    const itemData = [Array.from(itemMap.values()).join(',')];
    updateMonthItemsStockChart(itemLabels, itemData, type);
  }

  updateStatusList(itemsData, currentYear, currentMonth);

}
// גרף תנועת מלאי חודשי
function updateMonthItemsStockChart(itemLabels, itemData){
	console.log(itemLabels, itemData);
  const MonthItemsStockChart = document.getElementById("MonthItemsStockChart");
  MonthItemsStockChart.innerHTML = '';

  const canvasElement = document.createElement("canvas");
	MonthItemsStockChart.appendChild(canvasElement);

	const chartContext = canvasElement.getContext("2d");

  new Chart(chartContext, {
		type: "bar",
		data: {
			labels: itemLabels,
			datasets: [{
        label: '\u20AA',
				data: itemData[0].split(',').map(parseFloat),
				backgroundColor: backgroundColors,
			}],
		},
		options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
				},
        legend: {
          display: false,
        },
			},
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
		},
	});
}
// תצוגת תנועת מלאי שבועי
function createWeekItemsStock(itemsData) {
  const WeekItemsStock = document.getElementById("WeekItemsStock");
  WeekItemsStock.className = "ItemsStock";
  WeekItemsStock.innerHTML = '<span>תנועת מלאי שבועית</span>';

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentWeek = getWeekNumber(currentDate);

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  const WeekItemsStockTitle = document.createElement("div");
  WeekItemsStockTitle.classList.add("panel-controller");
  WeekItemsStock.appendChild(WeekItemsStockTitle);

  const prevButton = document.createElement("li");
  prevButton.innerText = "שבוע קודם";
  prevButton.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 7);
    currentYear = currentDate.getFullYear();
    currentWeek = getWeekNumber(currentDate);
    updateStatusList(itemsData, currentYear, currentWeek);
  });
  WeekItemsStockTitle.appendChild(prevButton);

  const nextButton = document.createElement("li");
  nextButton.innerText = "שבוע הבא";
  nextButton.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 7);
    currentYear = currentDate.getFullYear();
    currentWeek = getWeekNumber(currentDate);
    updateStatusList(itemsData, currentYear, currentWeek);
  });
  WeekItemsStockTitle.appendChild(nextButton);

  const statusList = document.createElement("div");
  statusList.className = "statusList";
  WeekItemsStock.appendChild(statusList);

  function updateStatusList(itemsData, currentYear, currentWeek) {
    statusList.innerHTML = '';

    let weekStartDate = new Date(currentYear, 0, 2 + (currentWeek - 1) * 7);
    let weekEndDate = new Date(currentYear, 0, 1 + currentWeek * 7);

    const weekStartString = `${weekStartDate.getDate()}/${weekStartDate.getMonth() + 1}/${weekStartDate.getFullYear()}`;
    const weekEndString = `${weekEndDate.getDate()}/${weekEndDate.getMonth() + 1}/${weekEndDate.getFullYear()}`;

    const currentWeekName = document.createElement("p");
    currentWeekName.innerHTML = `${weekStartString} - ${weekEndString}`;
    statusList.appendChild(currentWeekName);

    let deliveredCount = 0;
    let inWorkCount = 0;
    let canceledCount = 0;

    const uniqueOrderIds = new Set();

    itemsData.forEach((data) => {
      const orders = data.orders;
      for (const order of orders) {
        const entryDate = new Date(order.entry_date);
        if (
          entryDate >= weekStartDate &&
          entryDate <= weekEndDate &&
          !uniqueOrderIds.has(order.order_ID)
        ) {
          uniqueOrderIds.add(order.order_ID);
          if (order.status === 'סופק') {
            deliveredCount += order.totalItems;
          } else if (
            order.status === 'באריזה' ||
            order.status === 'באספקה' ||
            order.status === 'ממתין'
          ) {
            inWorkCount += order.totalItems;
          } else if (order.status === 'בוטל' || order.status === 'הוחזר') {
            canceledCount += order.totalItems;
          }
        }
      }
    });

    const itemsDeliveredCount = document.createElement("li");
    itemsDeliveredCount.innerHTML = `סופק: ${deliveredCount}`;
    itemsDeliveredCount.addEventListener("click", () =>{
      filterWeekItems(itemsData, weekStartDate, weekEndDate, 'סופק');
    })
    statusList.appendChild(itemsDeliveredCount);

    const itemsInWorkCount = document.createElement("li");
    itemsInWorkCount.innerHTML = `בעבודה: ${inWorkCount}`;
    itemsInWorkCount.addEventListener("click", () =>{
      filterWeekItems(itemsData, weekStartDate, weekEndDate, 'בעבודה');
    })
    statusList.appendChild(itemsInWorkCount);

    const itemsCanceledCount = document.createElement("li");
    itemsCanceledCount.innerHTML = `בוטל: ${canceledCount}`;
    itemsCanceledCount.addEventListener("click", () =>{
      filterWeekItems(itemsData, weekStartDate, weekEndDate, 'בוטל');
    })
    statusList.appendChild(itemsCanceledCount);
    filterWeekItems(itemsData, weekStartDate, weekEndDate, 'בעבודה');
  }
  
  function filterWeekItems(itemsData, weekStartDate, weekEndDate, type) {
      
    const uniqueOrderIds = new Set();
    const itemMap = new Map();

    itemsData.forEach((itemData) => {
      itemData.orders.forEach((order) => {
        const entryDate = new Date(order.entry_date);
        if ((entryDate >= weekStartDate && entryDate <= weekEndDate) &&   type === 'סופק' && order.status === 'סופק' && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
        else if ((entryDate >= weekStartDate && entryDate < weekEndDate) && type === 'בעבודה' && ['באריזה', 'באספקה', 'ממתין'].includes(order.status) && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
        else if ((entryDate >= weekStartDate && entryDate < weekEndDate) && type === 'בוטל' && ['בוטל', 'הוחזר'].includes(order.status) && !uniqueOrderIds.has(order.order_ID)){
          uniqueOrderIds.add(order.order_ID)
          const itemNames = order.itemName.split(',').map((str) => str.trim());
          const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
          for (let i = 0; i < itemNames.length; i++) {
            const itemName = itemNames[i];
            const itemTotalValue = itemPrices[i];
            if (itemMap.has(itemName)) {
              itemMap.set(itemName, itemMap.get(itemName) + itemTotalValue);
            } else {
              itemMap.set(itemName, itemTotalValue);
            }
          }
        }
      });
    });

    const itemLabels = Array.from(itemMap.keys());
    const itemData = [Array.from(itemMap.values()).join(',')];
    updateWeekItemsStockChart(itemLabels, itemData);
  }
  updateStatusList(itemsData, currentYear, currentWeek);
  
}
// גרף תנועת מלאי שבועי
function updateWeekItemsStockChart(itemLabels, itemData){
  const WeekItemsStockChart = document.getElementById("WeekItemsStockChart");
  WeekItemsStockChart.innerHTML = '';

  const canvasElement = document.createElement("canvas");
	WeekItemsStockChart.appendChild(canvasElement);

	const chartContext = canvasElement.getContext("2d");

  new Chart(chartContext, {
		type: "bar",
		data: {
			labels: itemLabels,
			datasets: [{
        label: '\u20AA',
				data: itemData[0].split(',').map(parseFloat),
				backgroundColor: backgroundColors,
			}],
		},
		options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
				},
        legend: {
          display: false,
        },
			},
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
		},
	});
}
// גרף למלאי עדכני לפי מחיר ומלאי מוצר
function createItemsStockValue(items) {
	const activeItems = items.filter(item => item.active === 1);
	const labels = activeItems.map(item => item.name);
	const stockData = activeItems.map(item => item.stock);
	const valueData = activeItems.map(item => item.stock * item.price);

	const currentYear = new Date().toLocaleDateString();
	const canvasElement = document.createElement("canvas");
	canvasElement.className = "Chart";
	ItemsStockValue.appendChild(canvasElement);

	const chartContext = canvasElement.getContext("2d");

	new Chart(chartContext, {
		type: "bar",
		data: {
			labels: labels,
			datasets: [{
					label: "שווי \u20AA",
					data: valueData,
					backgroundColor: backgroundColors,
					borderWidth: 1,
				},
				{
					label: "כמות",
					data: stockData,
					type: "line",
					fill: false,
					borderColor: "rgb(153, 153, 153)",
          pointBackgroundColor: backgroundColors,
					borderWidth: 2,
					pointRadius: 5,
					pointHoverRadius: 7,
					yAxisID: "y-line",
				},
			],
		},
		options: {
			plugins: {
        legend:{
          display: false,
        },
				title: {
					display: true,
					text: `תרשים מלאי נוכחי - ${currentYear}`,
					font: {
						size: 14
					},
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					position: 'left',
					grid: {
						display: false
					},
				},
				"y-line": {
					position: "right",
					beginAtZero: true,
					grid: {
						display: false
					},
					ticks: {
						stepSize: 1,
						min: 0,
					},
				},
			},
		},
	});
}
// גרף לגודל ושווי קטגוריה
function createItemsCategoryValueChart(items) {
	const activeItems = items.filter(item => item.active === 1);
	const currentYear = new Date().toLocaleDateString();
	const categoryData = {};
	activeItems.forEach(item => {
		if (categoryData[item.category]) {
			categoryData[item.category].count++;
			categoryData[item.category].totalStock += item.stock;
			categoryData[item.category].totalVlaue += (item.stock * item.price);
		} else {
			categoryData[item.category] = {
				count: 1,
				totalStock: item.stock,
				totalVlaue: (item.stock * item.price),
			};
		}
	});

  const labels = Object.keys(categoryData);
  
  const datasets = labels.map((category, index) => {
    return {
      label: category,
      data: [{
        x: categoryData[category].totalVlaue,
        y: categoryData[category].totalStock,
        r: categoryData[category].count + 10,
      }],
      backgroundColor: backgroundColors[index],
      borderWidth: 1,
    };
  });
  
  const canvasElement = document.createElement("canvas");
  canvasElement.className = "Chart";
  ItemsCategoryValueChart.appendChild(canvasElement);
  
  const chartContext = canvasElement.getContext("2d");
  
  new Chart(chartContext, {
    type: 'bubble',
    data: {
      datasets
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `תרשים קטגוריות נוכחי - ${currentYear}`,
          font: {
            size: 14
          },
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const dataPoint = context.dataset.data[context.dataIndex];
              const xValue = dataPoint.x;
              const yValue = dataPoint.y;
              return `שווי: \u20AA ${xValue}, כמות: ${yValue}`;
            },
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false
          },
        },
        x: {
          grid: {
            display: false
          },
        },
      },
    }
  });

	return canvasElement;
}
// ניטור קטגוריות לפי כמות לחודש
function createCategorysMonthsQuantities(itemsData) {
	const CategorysMonthsQuantities = document.getElementById("CategorysMonthsQuantities");
	CategorysMonthsQuantities.innerHTML = '';
	CategorysMonthsQuantities.innerHTML = '<span>ניטור קטגוריות לפי כמות מוצרים</span>';

	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();

	function getCurrentMonthName() {
		const monthNames = [
			"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
			"יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
		];
		return monthNames[currentMonth];
	}

	const CategorysMonthsQuantitiesTitle = document.createElement("div");
	CategorysMonthsQuantitiesTitle.classList.add("panel-controller");
	CategorysMonthsQuantities.appendChild(CategorysMonthsQuantitiesTitle);

	const prevButton = document.createElement("li");
	prevButton.innerText = "חודש קודם";
	prevButton.addEventListener("click", () => {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
		updateStatusList(itemsData, currentMonth, currentYear);
	});
	CategorysMonthsQuantitiesTitle.appendChild(prevButton);

	const nextButton = document.createElement("li");
	nextButton.innerText = "חודש הבא";
	nextButton.addEventListener("click", () => {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
		updateStatusList(itemsData, currentMonth, currentYear);
	});
	CategorysMonthsQuantitiesTitle.appendChild(nextButton);

	const statusList = document.createElement("div");
	statusList.className = "statusList";
	CategorysMonthsQuantities.appendChild(statusList);

	let selectedCategory;

	function updateStatusList(itemsData, currentMonth, currentYear) {
		statusList.innerHTML = '';
		const categoriesData = {};
		const currentMonthName = document.createElement("p");
		currentMonthName.innerHTML = `${currentYear} ${getCurrentMonthName()}`;
		statusList.appendChild(currentMonthName);

		itemsData.forEach((itemData) => {
			itemData.orders.forEach((order) => {
				const entryDate = new Date(order.entry_date);
				if (
					entryDate.getMonth() === currentMonth &&
					entryDate.getFullYear() === currentYear &&
					order.status !== "בוטל" &&
					order.status !== "הוחזר"
				) {
					const categories = order.itemCategory.split(',');
					categories.forEach((category) => {
						if (categoriesData.hasOwnProperty(category)) {
							categoriesData[category]++;
						} else {
							categoriesData[category] = 1;
						}
					});
				}
			});
		});

		for (const category in categoriesData) {
			const categoryName = document.createElement("li");
			categoryName.innerHTML = `${category} ${categoriesData[category]}`;
			categoryName.addEventListener("click", () => {
				createCategoryItems(category, itemsData, currentMonth, currentYear);
			});
			statusList.appendChild(categoryName);

			if (!selectedCategory) {
				selectedCategory = category;
				categoryName.click();
			}
		}
	}

	function createCategoryItems(category, itemsData, currentMonth, currentYear) {
		const filteredItems = [];
		itemsData.forEach((itemData) => {
			itemData.orders.forEach((order) => {
				const entryDate = new Date(order.entry_date);
				if (
					entryDate.getMonth() === currentMonth &&
					entryDate.getFullYear() === currentYear &&
					order.status !== "בוטל" &&
					order.status !== "הוחזר"
				) {
					const categories = order.itemCategory.split(',');
					const itemNames = order.itemName.split(',');

					const categoryIndex = categories.indexOf(category);
					if (categoryIndex !== -1) {

						const itemName = itemNames[categoryIndex].trim();

						filteredItems.push(itemName);
					}
				}
			});
		});

		const itemCounts = {};
		filteredItems.forEach((itemName) => {
			if (itemCounts.hasOwnProperty(itemName)) {
				itemCounts[itemName]++;
			} else {
				itemCounts[itemName] = 1;
			}
		});

		const itemLabels = Object.keys(itemCounts);
		const itemData = itemLabels.map((label) => itemCounts[label]);
		updateItemsMonthQuantitiesChart(category, itemLabels, itemData);
	}

	updateStatusList(itemsData, currentMonth, currentYear);

}
// הצגת מוצרים לקטגוריה נבחרת
function updateItemsMonthQuantitiesChart(category, itemLabels, itemData) {
	ItemsMonthQuantitiesChart.innerHTML = '';
	const canvasElement = document.createElement("canvas");
	ItemsMonthQuantitiesChart.appendChild(canvasElement);

	const chartContext = canvasElement.getContext("2d");

	new Chart(chartContext, {
		type: "doughnut",
		data: {
			labels: itemLabels,
			datasets: [{
				data: itemData,
				backgroundColor: backgroundColors,
			}],
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: `מוצרים לפי קטגוריה ${category}`,
					font: {
						size: 14
					},
          padding: 0,
				},
			},
		},
	});
}
// ניטור קטגוריות לפי שווי לחודש
function createCategorysMonthsVlaues(itemsData) {
	const CategorysMonthsVlaues = document.getElementById("CategorysMonthsVlaues");
	CategorysMonthsVlaues.innerHTML = '';
	CategorysMonthsVlaues.innerHTML = '<span>ניטור קטגוריות לפי שווי מוצרים</span>';
	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();

	function getCurrentMonthName() {
		const monthNames = [
			"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
			"יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
		];
		return monthNames[currentMonth];
	}

	const CategorysMonthsVlauesTitle = document.createElement("div");
	CategorysMonthsVlauesTitle.classList.add("panel-controller");
	CategorysMonthsVlaues.appendChild(CategorysMonthsVlauesTitle);

	const prevButton = document.createElement("li");
	prevButton.innerText = "חודש קודם";
	prevButton.addEventListener("click", () => {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
		updateStatusList(itemsData, currentMonth, currentYear);
	});
	CategorysMonthsVlauesTitle.appendChild(prevButton);

	const nextButton = document.createElement("li");
	nextButton.innerText = "חודש הבא";
	nextButton.addEventListener("click", () => {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
		updateStatusList(itemsData, currentMonth, currentYear);
	});
	CategorysMonthsVlauesTitle.appendChild(nextButton);

	const statusList = document.createElement("div");
	statusList.className = "statusList";
	CategorysMonthsVlaues.appendChild(statusList);

	let selectedCategory;

	function updateStatusList(itemsData, currentMonth, currentYear) {
		statusList.innerHTML = '';

		const categoriesData = {};
		const categoriesTotalValue = {};

		const currentMonthName = document.createElement("p");
		currentMonthName.innerHTML = `${currentYear} ${getCurrentMonthName()}`;
		statusList.appendChild(currentMonthName);

		itemsData.forEach((itemData) => {
			itemData.orders.forEach((order) => {
				const entryDate = new Date(order.entry_date);
				if (
					entryDate.getMonth() === currentMonth &&
					entryDate.getFullYear() === currentYear &&
					order.status !== "בוטל" &&
					order.status !== "הוחזר"
				) {
					const categories = order.itemCategory.split(',');

					categories.forEach((category) => {
						const categoryIndex = categories.indexOf(category);
						if (categoryIndex !== -1) {
							const itemTotalPrices = order.itemTotalPrice.split(',');
							const itemTotalPrice = parseFloat(itemTotalPrices[categoryIndex]);

							if (categoriesData.hasOwnProperty(category)) {
								categoriesData[category]++;
								categoriesTotalValue[category] += itemTotalPrice;
							} else {
								categoriesData[category] = 1;
								categoriesTotalValue[category] = itemTotalPrice;
							}
						}
					});
				}
			});
		});
		for (const category in categoriesData) {
			const categoryName = document.createElement("li");
			categoryName.innerHTML = `${category} \u20AA ${categoriesTotalValue[category]}`;
			categoryName.addEventListener("click", () => {
				createCategoryItems(category, itemsData, currentMonth, currentYear);
			});
			statusList.appendChild(categoryName);
			if (!selectedCategory) {
				selectedCategory = category;
				categoryName.click();
			}
		}
	}

	function createCategoryItems(category, itemsData, currentMonth, currentYear) {
		const filteredItems = [];
		itemsData.forEach((itemData) => {
			itemData.orders.forEach((order) => {
				const entryDate = new Date(order.entry_date);
				if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear && order.status !== "בוטל" && order.status !== "הוחזר") {
					const categories = order.itemCategory.split(',');
					const itemNames = order.itemName.split(',');
					const itemTotalPrices = order.itemTotalPrice.split(',');

					const categoryIndex = categories.indexOf(category);
					if (categoryIndex !== -1) {
						const itemName = itemNames[categoryIndex].trim();
						const itemTotalPrice = parseFloat(itemTotalPrices[categoryIndex]);
						filteredItems.push({
							name: itemName,
							totalValue: itemTotalPrice
						});
					}
				}
			});
		});

		const itemCounts = {};
		filteredItems.forEach((item) => {
			const itemName = item.name;
			const itemTotalValue = item.totalValue;

			if (itemCounts.hasOwnProperty(itemName)) {
				itemCounts[itemName] += itemTotalValue;
			} else {
				itemCounts[itemName] = itemTotalValue;
			}
		});

		const itemLabels = Object.keys(itemCounts);
		const itemData = itemLabels.map((label) => itemCounts[label]);
		updateItemsMonthsValuesChart(category, itemLabels, itemData);
	}
	updateStatusList(itemsData, currentMonth, currentYear);
}
// הצגת מוצרים לקטגוריה נבחרת
function updateItemsMonthsValuesChart(category, itemLabels, itemData) {
	ItemsMonthsValuesChart.innerHTML = '';
	const canvasElement = document.createElement("canvas");
	ItemsMonthsValuesChart.appendChild(canvasElement);

	const chartContext = canvasElement.getContext("2d");

	const label = '\u20AA';
	new Chart(chartContext, {
		type: "doughnut",
		data: {
			labels: itemLabels,
			datasets: [{
				label,
				data: itemData,
				backgroundColor: backgroundColors,
			}],
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: `מוצרים לפי קטגוריה ${category}`,
					font: {
						size: 14
					},
          padding: 0,
				},
			},
		},
	});
}

//===============================//

// לוחיות עובדים למעבר
function createEmployeesNavigation(employees){
  const EmployeesNavigation = document.getElementById("EmployeesNavigation");
  employees.forEach((employee) => {
    if (employee.role === 'מכירות'){
      const employeeName = document.createElement("li");
      employeeName.innerHTML = `${employee.first_name} ${employee.last_name}`;
      EmployeesNavigation.appendChild(employeeName);

      employeeName.addEventListener("click", () => {
        processEmployeeOrders(employee);
      });
    }
  });
  if (EmployeesNavigation.children.length > 0) {
    EmployeesNavigation.children[0].click();
  }

  const CSVDocument = document.createElement("li");
  CSVDocument.innerText = "עובדים - CSV";
  CSVDocument.addEventListener("click", () => {
	const headers = Object.keys(employees[0]);
	const csvData = [headers.join(',')];
  
	employees.forEach((data) => {
	  const values = headers.map((header) => {
		let value = data[header];
		if (typeof value === "string") {
		  value = `"${value}"`;
		}
		return value;
	  });
	  csvData.push(values.join(','));
	});
  
	const csvContent = csvData.join('\n');
	const blob = new Blob([csvContent], { type: 'text/csv' });
  
	const a = document.createElement('a');
	a.href = window.URL.createObjectURL(blob);
	a.download = 'employees.csv';
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(a.href);
	document.body.removeChild(a);
  });
  
  EmployeesNavigation.appendChild(CSVDocument);
}
// עיבוד הזמנות לפי עובד
async function processEmployeeOrders(employee) {
  const orders = await getOrders();
  const employeeData = [];

  if (employee.order_IDs) {
    const orderIDs = employee.order_IDs.split(',').map(Number);
    const employeeOrders = orders.filter(order => orderIDs.includes(order.order_ID));

    employeeData.push({
      employee,
      orders: employeeOrders
    });
  } else {
    employeeData.push({
      employee,
      orders: []
    });
  }
  EmployeeInfoCard.innerHTML = '';
  EmployeeInfoCharts.innerHTML = '';
  createEmployeeInfoCard(employeeData);
  createEmployeeStatusInfo(employeeData);
  employeeRadarStatus(employeeData);
  employeeDoughnutItems(employeeData);
  employeePolarAreaCategory(employeeData);
}
// לוח עובד 
function createEmployeeInfoCard(employeeData){
  const employee = employeeData[0].employee;
  
  const EmployeeName = document.createElement("li");
  EmployeeName.innerHTML = `${employee.first_name} ${employee.last_name}`;
  EmployeeName.addEventListener("click", () => {
    ipcRenderer.send('employeeTab', employee.employee_ID);
  });
  EmployeeInfoCard.appendChild(EmployeeName);
}
// הצגת נתונים לכול עובד
function createEmployeeStatusInfo(employeeData){
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const orders = employeeData[0].orders;

  const completeOrders = {
    numberOfOrders: 0,
    totalProfits: 0,
    totalItems: 0,
    avgPlacement: 0,
    totalCategorys: [],
  };

  const processOrders = {
    numberOfOrders: 0,
    totalProfits: 0,
    totalItems: 0,
    avgPlacement: 0,
    totalCategorys: [],
  };

  const canceledOrders = {
    numberOfOrders: 0,
    totalProfits: 0,
    totalItems: 0,
    avgPlacement: 0,
    totalCategorys: [],
  };

  function makeUniqueCategoryArray(itemCategory) {
    const categories = itemCategory.split(',').map((category) => category.trim());
    return [...new Set(categories)];
  }

  for (let i = 0; i < orders.length; i++) {
    const orderDate = new Date(orders[i].entry_date);
    const placementDate = orders[i].placement_date ? new Date(orders[i].placement_date) : null;
    const orderStatus = orders[i].status;

    if (orderDate.getFullYear() === currentYear) {
      const uniqueCategories = makeUniqueCategoryArray(orders[i].itemCategory);

      if (orderStatus === 'סופק' || orderStatus === 'באספקה') {
        completeOrders.numberOfOrders++;
        completeOrders.totalProfits += parseFloat(orders[i].totalPrice);
        completeOrders.totalItems += parseInt(orders[i].totalItems);
        completeOrders.totalCategorys.push(...uniqueCategories); 

        if (placementDate) {
          const timeDifference = placementDate - orderDate;
          const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
          completeOrders.avgPlacement += daysDifference;
        }
      } else if (orderStatus === 'ממתין' || orderStatus === 'באריזה') {
        processOrders.numberOfOrders++;
        processOrders.totalProfits += parseFloat(orders[i].totalPrice);
        processOrders.totalItems += parseInt(orders[i].totalItems);
        processOrders.totalCategorys.push(...uniqueCategories);

        if (placementDate) {
          const timeDifference = placementDate - orderDate;
          const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
          processOrders.avgPlacement += daysDifference;
        }
      } else if (orderStatus === 'בוטל' || orderStatus === 'הוחזר') {
        canceledOrders.numberOfOrders++;
        canceledOrders.totalProfits += parseFloat(orders[i].itemTotalPrice);
        canceledOrders.totalItems += parseInt(orders[i].totalItems);
        canceledOrders.totalCategorys.push(...uniqueCategories);

        if (placementDate) {
          const timeDifference = placementDate - orderDate;
          const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
          canceledOrders.avgPlacement += daysDifference;
        }
      }
    }
  }

  completeOrders.totalCategorys = [...new Set(completeOrders.totalCategorys)];
  processOrders.totalCategorys = [...new Set(processOrders.totalCategorys)];
  canceledOrders.totalCategorys = [...new Set(canceledOrders.totalCategorys)];

  if (completeOrders.numberOfOrders > 0) {completeOrders.avgPlacement /= completeOrders.numberOfOrders;}
  
  if (processOrders.numberOfOrders > 0) {processOrders.avgPlacement /= completeOrders.numberOfOrders;}
  
  if (canceledOrders.numberOfOrders > 0) {canceledOrders.avgPlacement /= completeOrders.numberOfOrders;}

  const EmployeeStatusInfo = document.getElementById("EmployeeStatusInfo");
  EmployeeStatusInfo.innerHTML = '';

  const completeOrdersDisplay = document.createElement("div");
  completeOrdersDisplay.className = "EmployeeStatusInfoCard";
  completeOrdersDisplay.innerHTML = `
  <p><strong>הזמנות שהושלמו</strong></p>
  <p><u>הזמנות:</u> ${completeOrders.numberOfOrders}</p>
  <p><u>רווחים מהזמנות:</u> ₪${completeOrders.totalProfits.toFixed(2)}</p>
  <p><u>פריטים שנמכרו:</u> ${completeOrders.totalItems}</p>
  <p><u>קטגוריות:</u><br>${completeOrders.totalCategorys}</p>
  <p><u>ממוצע זמן השיוך:</u> ${completeOrders.avgPlacement.toFixed(2)} ימים</p>
  `;
  EmployeeStatusInfo.appendChild(completeOrdersDisplay);
  
  const processOrdersDisplay = document.createElement("div");
  processOrdersDisplay.className = "EmployeeStatusInfoCard";
  processOrdersDisplay.innerHTML = `
  <p><strong>הזמנות בתהליך</strong></p>
  <p><u>הזמנות:</u> ${processOrders.numberOfOrders}</p>
  <p><u>רווחים מהזמנות:</u> ₪${processOrders.totalProfits.toFixed(2)}</p>
  <p><u>פריטים שנמכרו:</u> ${processOrders.totalItems}</p>
  <p><u>קטגוריות:</u><br>${processOrders.totalCategorys}</p>
  <p><u>ממוצע זמן השיוך:</u> ${processOrders.avgPlacement.toFixed(2)} ימים</p>
  `;
  EmployeeStatusInfo.appendChild(processOrdersDisplay);
  
  const canceledOrdersDisplay = document.createElement("div");
  canceledOrdersDisplay.className = "EmployeeStatusInfoCard";
  canceledOrdersDisplay.innerHTML = `
  <p><strong>הזמנות שבוטלו</strong></p>
  <p><u>הזמנות:</u> ${canceledOrders.numberOfOrders}</p>
  <p><u>רווחים מהזמנות:</u> ₪${canceledOrders.totalProfits.toFixed(2)}</p>
  <p><u>פריטים שנמכרו:</u> ${canceledOrders.totalItems}</p>
  <p><u>קטגוריות:</u><br>${canceledOrders.totalCategorys}</p>
  <p><u>ממוצע זמן השיוך:</u> ${canceledOrders.avgPlacement.toFixed(2)} ימים</p>
  `;
  EmployeeStatusInfo.appendChild(canceledOrdersDisplay);
  
}
// תרשים סטטוסים 
function employeeRadarStatus(employeeData){
  const employeeRadarStatus = document.createElement("div");
  employeeRadarStatus.className = "employeeChartHold";
  EmployeeInfoCharts.appendChild(employeeRadarStatus);
  const orders = employeeData[0].orders;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDayOfMonth = currentDate.getDate();
  let startDate, endDate;

  const employeeRadarStatusTitle = document.createElement("div");
  employeeRadarStatusTitle.classList.add("panel-controller");
  employeeRadarStatus.appendChild(employeeRadarStatusTitle);

  const weekButton = document.createElement("li");
  weekButton.innerText = "שבוע";
  weekButton.addEventListener("click", () => {
    const currentDayOfWeek = currentDate.getDay();
    startDate = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek);
    endDate = new Date(currentYear, currentMonth, currentDayOfMonth);

    filteredEmployeeData(orders, startDate, endDate, 'שבוע');
  });
  employeeRadarStatusTitle.appendChild(weekButton);

  const monthButton = document.createElement("li");
  monthButton.innerText = "חודש";
  monthButton.addEventListener("click", () => {
    startDate = new Date(currentYear, currentMonth, 1);
    endDate = new Date(currentYear, currentMonth + 1, 0);
    filteredEmployeeData(orders, startDate, endDate, 'חודש');
  });
  employeeRadarStatusTitle.appendChild(monthButton);

  const employeeRadarStatusChart = document.createElement("div");
  employeeRadarStatusChart.className = "employeeChart";
  employeeRadarStatus.appendChild(employeeRadarStatusChart);

  function filteredEmployeeData (orders, startDate, endDate, type) {
    const filteredEmployeeData =
    orders.filter(order => {
      const entryDate = new Date(order.entry_date);
      if (entryDate >= startDate && entryDate <= endDate) {
        return true;
      }
    return false;
    });
    updateData(filteredEmployeeData, type);
  }
  const updateData = (filteredEmployeeData, type) => {
    employeeRadarStatusChart.innerHTML = '';

    const statusCounts = {
      'סופק': 0,
      'באספקה': 0,
      'באריזה': 0,
      'ממתין': 0,
      'בוטל': 0,
      'הוחזר': 0
    };
    
    filteredEmployeeData.forEach(order => {
      if (order.status in statusCounts) {
        statusCounts[order.status]++;
      }
    });
    
    const statusLabels = Object.keys(statusCounts);
    const statusData = Object.values(statusCounts);

    const canvasElement = document.createElement("canvas");
    employeeRadarStatusChart.appendChild(canvasElement);
    
    const chartContext = canvasElement.getContext("2d");

    new Chart(chartContext, {
      type: 'radar',
      data: {
        labels: statusLabels,
        datasets: [{
          data: statusData,
          backgroundColor: 'rgb(153, 153, 153)',
          pointBackgroundColor: backgroundColors,
          pointRadius: 8,
        }],
      },
      options: {
        plugins:{
          legend:{
            display: false,
          },
          title: {
            display: true,
            text: `סטטוסים תצוגה ל - ${type}`,
            font: {
              size: 14
            },
            padding: 0,
          },
        },
        scale: {
          ticks: {
            stepSize: 1,
            min: 0,
          },
          pointLabels: {
            font:{size: 20,},
          },
        },
      },
    });

  }
  monthButton.click();
}
// תרשים מצרים ומחיר
function employeeDoughnutItems(employeeData){
  const employeeDoughnutItems = document.createElement("div");
  employeeDoughnutItems.className = "employeeChartHold";
  EmployeeInfoCharts.appendChild(employeeDoughnutItems);
  const orders = employeeData[0].orders;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDayOfMonth = currentDate.getDate();
  let startDate, endDate;

  const employeeDoughnutItemsTitle = document.createElement("div");
  employeeDoughnutItemsTitle.classList.add("panel-controller");
  employeeDoughnutItems.appendChild(employeeDoughnutItemsTitle);

  const weekButton = document.createElement("li");
  weekButton.innerText = "שבוע";
  weekButton.addEventListener("click", () => {
    const currentDayOfWeek = currentDate.getDay();
    startDate = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek);
    endDate = new Date(currentYear, currentMonth, currentDayOfMonth);

    filteredEmployeeData(orders, startDate, endDate, "שבוע");
  });
  employeeDoughnutItemsTitle.appendChild(weekButton);

  const monthButton = document.createElement("li");
  monthButton.innerText = "חודש";
  monthButton.addEventListener("click", () => {
    startDate = new Date(currentYear, currentMonth, 1);
    endDate = new Date(currentYear, currentMonth + 1, 0);
    filteredEmployeeData(orders, startDate, endDate, "חודש");
  });
  employeeDoughnutItemsTitle.appendChild(monthButton);

  const employeeDoughnutItemsChart = document.createElement("div");
  employeeDoughnutItemsChart.className = "employeeChart";
  employeeDoughnutItems.appendChild(employeeDoughnutItemsChart);

  function filteredEmployeeData (orders, startDate, endDate, type) {
    const filteredEmployeeData =
    orders.filter(order => {
      const entryDate = new Date(order.entry_date);
      if (entryDate >= startDate && entryDate <= endDate) {
        return true;
      }
    return false;
    });
    updateData(filteredEmployeeData, type);
  }
  const updateData = (filteredEmployeeData, type) => {
    employeeDoughnutItemsChart.innerHTML = '';

    const itemMap = new Map();
  
    filteredEmployeeData.forEach(order => {
      const itemNames = order.itemName.split(',').map((str) => str.trim());
      const itemPrices = order.itemTotalPrice.split(',').map((str) => parseFloat(str));
      const itemQuantities = order.itemQuantity.split(',').map((str) => parseInt(str));

      for (let i = 0; i < itemNames.length; i++) {
        const itemName = itemNames[i];
        const itemTotalValue = itemPrices[i];
        const itemTotalQuantity = itemQuantities[i];
  
        if (itemMap.has(itemName)) {
          const existingItem = itemMap.get(itemName);
          existingItem.value += itemTotalValue;
          existingItem.quantity += itemTotalQuantity;
        } else {
          itemMap.set(itemName, { value: itemTotalValue, quantity: itemTotalQuantity });
        }
      }
    });
  
    const itemLabels = Array.from(itemMap.keys());
    const itemValues = Array.from(itemMap.values(), item => item.value);
    const itemQuantities = Array.from(itemMap.values(), item => item.quantity);

    const canvasElement = document.createElement("canvas");
    employeeDoughnutItemsChart.appendChild(canvasElement);
  
    const chartContext = canvasElement.getContext("2d");


    new Chart(chartContext, {
      type: "doughnut",
      data: {
        labels: itemLabels,
        datasets: [
          {
            label: "יחידות",
            data: itemQuantities,
            borderWidth: 1,
            backgroundColor: backgroundColors,
          },
          {
            label: "\u20AA רווח",
            data: itemValues,
            borderWidth: 1,
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `כמות מוצרים ומחיר ל - ${type}`,
            font: {
              size: 14
            },
            padding: 0,
          },
        },
      },
    });
  }
  
  monthButton.click();
}
// תרשים יחסי קטגוריות
function employeePolarAreaCategory(employeeData){
  const employeePolarAreaCategory = document.createElement("div");
  employeePolarAreaCategory.className = "employeeChartHold";
  EmployeeInfoCharts.appendChild(employeePolarAreaCategory);
  const orders = employeeData[0].orders;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDayOfMonth = currentDate.getDate();
  let startDate, endDate;

  const employeePolarAreaCategoryTitle = document.createElement("div");
  employeePolarAreaCategoryTitle.classList.add("panel-controller");
  employeePolarAreaCategory.appendChild(employeePolarAreaCategoryTitle);

  const weekButton = document.createElement("li");
  weekButton.innerText = "שבוע";
  weekButton.addEventListener("click", () => {
    const currentDayOfWeek = currentDate.getDay();
    startDate = new Date(currentYear, currentMonth, currentDayOfMonth - currentDayOfWeek);
    endDate = new Date(currentYear, currentMonth, currentDayOfMonth, "שבוע");

    filteredEmployeeData(orders, startDate, endDate);
  });
  employeePolarAreaCategoryTitle.appendChild(weekButton);

  const monthButton = document.createElement("li");
  monthButton.innerText = "חודש";
  monthButton.addEventListener("click", () => {
    startDate = new Date(currentYear, currentMonth, 1);
    endDate = new Date(currentYear, currentMonth + 1, 0);
    filteredEmployeeData(orders, startDate, endDate, "חודש");
  });
  employeePolarAreaCategoryTitle.appendChild(monthButton);

  const employeePolarAreaCategoryChart = document.createElement("div");
  employeePolarAreaCategoryChart.className = "employeeChart";
  employeePolarAreaCategory.appendChild(employeePolarAreaCategoryChart);

  function filteredEmployeeData (orders, startDate, endDate, type) {
    const filteredEmployeeData =
    orders.filter(order => {
      const entryDate = new Date(order.entry_date);
      if (entryDate >= startDate && entryDate <= endDate) {
        return true;
      }
    return false;
    });
    updateData(filteredEmployeeData, type);
  }
  const updateData = (filteredEmployeeData, type) => {
    employeePolarAreaCategoryChart.innerHTML = '';
  
    const categoryMap = new Map();
  
    filteredEmployeeData.forEach(order => {
      const itemCategories = order.itemCategory.split(',').map((str) => str.trim());
      
      itemCategories.forEach(category => {
        if (categoryMap.has(category)) {
          categoryMap.set(category, categoryMap.get(category) + 1);
        } else {
          categoryMap.set(category, 1);
        }
      });
    });
  
    const categoryLabels = Array.from(categoryMap.keys());
    const categoryCounts = Array.from(categoryMap.values());
  
    const canvasElement = document.createElement("canvas");
    employeePolarAreaCategoryChart.appendChild(canvasElement);
  
    const chartContext = canvasElement.getContext("2d");

    new Chart(chartContext, {
      type: "polarArea",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: 'כמות מוצרים',
            data: categoryCounts,
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `יחסי קטגוריות ל - ${type}`,
            font: {
              size: 14
            },
            padding: 0,
          },
        },
      },
    });
  };
  
  monthButton.click();
}

// תרשים פעילות עובדים שנתית
async function createEmployeesAnnualChart(employees) {
	const currentDate = new Date();
	let currentYear = currentDate.getFullYear();

	const ordersByYear = {};

	async function fetchOrdersForEmployee(employee) {
		if (employee.role === 'מכירות' && (employee.order_IDs !== null)) {
			const OrderIDs = employee.order_IDs.split(',').map(Number);
			await getOrders().then(orders => {
				orders.forEach(order => {
					const orderYear = new Date(order.delivery_date).getFullYear();
					if (OrderIDs.includes(order.order_ID) && order.status !== "בוטל" && order.status !== "הוחזר") {
						if (!ordersByYear[orderYear]) {
							ordersByYear[orderYear] = [];
						}
						ordersByYear[orderYear].push(order);
					}
				});
			})

		}
	}

	await Promise.all(employees.map(fetchOrdersForEmployee));

	const updateData = () => {
		const EmployeesAnnualChart = document.getElementById("EmployeesAnnualChart");
		EmployeesAnnualChart.innerHTML = '';

		const EmployeesAnnualChartTitel = document.createElement("div");
		EmployeesAnnualChartTitel.classList.add("panel-controller");
		EmployeesAnnualChart.appendChild(EmployeesAnnualChartTitel);

		const prevButton = document.createElement("li");
		prevButton.innerText = "שנה קודם";
		prevButton.addEventListener("click", () => {
			currentYear--;
			updateData();
		});
		const nextButton = document.createElement("li");
		nextButton.innerText = "שנה הבא";
		nextButton.addEventListener("click", () => {
			currentYear++;
			updateData();
		});

		EmployeesAnnualChartTitel.appendChild(prevButton);
		EmployeesAnnualChartTitel.appendChild(nextButton);

		const currentYearOrders = ordersByYear[currentYear] || [];

		const barCanvas = document.createElement("canvas");
		barCanvas.id = "barChart";
		EmployeesAnnualChart.appendChild(barCanvas);
		const barChartContext = barCanvas.getContext("2d");

		const employeesSummary = {};

		currentYearOrders.forEach(order => {
			order.employee_ID.split(",").forEach(employeeId => {
				if (!employeesSummary[employeeId]) {
					employeesSummary[employeeId] = {
						firstName: order.employeeFirstName,
						lastName: order.employeeLastName,
						totalOrders: 0,
						totalProfit: 0,
					};
				}
				employeesSummary[employeeId].totalOrders++;
				employeesSummary[employeeId].totalProfit += order.totalPrice;
			});
		});
		const labels = [];
		const totalProfits = [];
		const totalOrders = [];
		for (const employeeId in employeesSummary) {
			const employee = employeesSummary[employeeId];
			labels.push(`${employee.firstName} ${employee.lastName}`);
			totalProfits.push(employee.totalProfit);
			totalOrders.push(employee.totalOrders);
		}
		const barChart = new Chart(barChartContext, {
			type: "bar",
			data: {
				labels: labels,
				datasets: [{
						label: "\u20AA רווח",
						data: totalProfits,
						backgroundColor: "rgba(75, 192, 192, 0.2)",
						borderColor: "rgba(75, 192, 192, 1)",
						borderWidth: 1,
					},
					{
						label: "הזמנות",
						data: totalOrders,
						type: "line",
						fill: false,
						borderColor: "rgba(255, 99, 132, 1)",
						borderWidth: 2,
						pointRadius: 5,
						pointHoverRadius: 7,
						yAxisID: "y-line",
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: `תרשים פעילות עובדים לשנה-${currentYear}`,
						font: {
							size: 14
						},
					},
				},
				scales: {
					y: {
						beginAtZero: true,
					},
					"y-line": {
						position: "right",
						beginAtZero: true,
						ticks: {
							stepSize: 1,
							min: 0,
						},
					},
				},
			},
		});
	};
	updateData();
}

// תרשים פעילות עובדים לחודש
async function createEmployeesMonthlyChart(employees) {
	const currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();

	const ordersByMonth = {};

	async function fetchOrdersForEmployee(employee) {
		if (employee.role === 'מכירות' && (employee.order_IDs !== null)) {
			const OrderIDs = employee.order_IDs.split(',').map(Number);

			await getOrders().then(orders => {
				orders.forEach(order => {
					const orderDate = new Date(order.delivery_date);
					const orderYear = orderDate.getFullYear();
					const orderMonth = orderDate.getMonth();
					const key = `${orderYear}-${orderMonth}`;

					if (OrderIDs.includes(order.order_ID) && order.status !== "בוטל") {
						if (!ordersByMonth[key]) {
							ordersByMonth[key] = [];
						}
						ordersByMonth[key].push(order);
					}
				});
			})

		}
	}

	await Promise.all(employees.map(fetchOrdersForEmployee));

	const updateData = () => {
		const EmployeesMonthlyChart = document.getElementById("EmployeesMonthlyChart");
		EmployeesMonthlyChart.innerHTML = '';

		const EmployeesMonthlyChartTitel = document.createElement("div");
		EmployeesMonthlyChartTitel.classList.add("panel-controller");
		EmployeesMonthlyChart.appendChild(EmployeesMonthlyChartTitel);

		const prevMonthButton = document.createElement("li");
		prevMonthButton.innerText = "חודש קודם";
		prevMonthButton.addEventListener("click", () => {
			if (currentMonth === 0) {
				currentMonth = 11;
				currentYear--;
			} else {
				currentMonth--;
			}
			updateData();
		});

		const nextMonthButton = document.createElement("li");
		nextMonthButton.innerText = "חודש הבא";
		nextMonthButton.addEventListener("click", () => {
			if (currentMonth === 11) {
				currentMonth = 0;
				currentYear++;
			} else {
				currentMonth++;
			}
			updateData();
		});

		EmployeesMonthlyChartTitel.appendChild(prevMonthButton);
		EmployeesMonthlyChartTitel.appendChild(nextMonthButton);

		const key = `${currentYear}-${currentMonth}`;
		const currentMonthOrders = ordersByMonth[key] || [];

		const barCanvas = document.createElement("canvas");
		barCanvas.id = "barChart";
		EmployeesMonthlyChart.appendChild(barCanvas);
		const barChartContext = barCanvas.getContext("2d");

		const employeesSummary = {};

		currentMonthOrders.forEach(order => {
			order.employee_ID.split(",").forEach(employeeId => {
				if (!employeesSummary[employeeId]) {
					employeesSummary[employeeId] = {
						firstName: order.employeeFirstName,
						lastName: order.employeeLastName,
						totalOrders: 0,
						totalProfit: 0,
					};
				}
				employeesSummary[employeeId].totalOrders++;
				employeesSummary[employeeId].totalProfit += order.totalPrice;
			});
		});

		const labels = [];
		const totalProfits = [];
		const totalOrders = [];

		for (const employeeId in employeesSummary) {
			const employee = employeesSummary[employeeId];
			labels.push(`${employee.firstName} ${employee.lastName}`);
			totalProfits.push(employee.totalProfit);
			totalOrders.push(employee.totalOrders);
		}

		const barChart = new Chart(barChartContext, {
			type: "bar",
			data: {
				labels: labels,
				datasets: [{
						label: "\u20AA רווח",
						data: totalProfits,
						backgroundColor: "rgba(75, 192, 192, 0.2)",
						borderColor: "rgba(75, 192, 192, 1)",
						borderWidth: 1,
					},
					{
						label: "הזמנות",
						data: totalOrders,
						type: "line",
						fill: false,
						borderColor: "rgba(255, 99, 132, 1)",
						borderWidth: 2,
						pointRadius: 5,
						pointHoverRadius: 7,
						yAxisID: "y-line",
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: `תרשים פעילות עובדים לחודש-${getMonthName(currentMonth)} ${currentYear}`,
						font: {
							size: 14
						},
					},
				},
				scales: {
					y: {
						beginAtZero: true,
					},
					"y-line": {
						position: "right",
						beginAtZero: true,
						ticks: {
							stepSize: 1,
							min: 0,
						},
					},
				},
			},
		});
	};

	function getMonthName(monthIndex) {
		const monthNames = [
			"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
			"יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
		];
		return monthNames[monthIndex];
	}
	updateData();
}