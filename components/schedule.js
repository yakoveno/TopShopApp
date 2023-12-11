
// Function to generate an order Schedule
async function createSchedule(employee) {
    const ScheduleBox = document.getElementById("ScheduleBox");

    ScheduleBox.innerHTML = '';

    const ScheduleTitel = document.createElement("header");
    ScheduleTitel.classList.add("window-title");
    ScheduleTitel.innerText = "לוח זמנים";
    ScheduleBox.appendChild(ScheduleTitel);
    
    const ScheduleContainer = document.createElement('div');
    ScheduleContainer.id = 'ScheduleContainer';
    ScheduleBox.appendChild(ScheduleContainer);

    const Schedule = document.createElement("div");
    Schedule.classList.add("Schedule");
    ScheduleContainer.appendChild(Schedule);
    
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
    const endDate = new Date(currentDate.getFullYear() + 1, 11, 31);

    const employeeNotes = await getNotes();
    const orders = await getOrders();

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateCard = createDateCard(date);

        const matchingPlacement = orders.filter(order => {
            const placement_date = new Date(order.placement_date);
            return placement_date.toDateString() === date.toDateString();
        });

        matchingPlacement.forEach(order => {
            const orderNote = createOrderNote(order);
            const orderDate = new Date(order.placement_date);

            if (orderDate.toDateString() === date.toDateString()) {
                const NotesHolder = dateCard.querySelector(".NotesHolder");
                NotesHolder.appendChild(orderNote);
            }
        });

        const matchingEmployeeNotes = employeeNotes.filter(note => {
            const to_date = new Date(note.to_date);
            return to_date.toDateString() === date.toDateString();
        });

        matchingEmployeeNotes.forEach(note => {
            const employeeNote = createEmployeeNote(note, employee);
            const NotesHolder = dateCard.querySelector(".NotesHolder");
            NotesHolder.appendChild(employeeNote);
        });

        Schedule.appendChild(dateCard);
    }

    function startFromCurrentDate() {
        const currentDateText = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        const currentCard = document.getElementById(`dateCard-${currentDateText.replace(/\//g, "-")}`);
        currentCard.style.border = "4px double #d9d9d9";

        if (currentCard) {
            const container = document.getElementById("ScheduleContainer");
            const containerRect = container.getBoundingClientRect();
            const cardRect = currentCard.getBoundingClientRect();
            const scrollToPosition = cardRect.left + cardRect.width / 2 - containerRect.left - containerRect.width / 2;
            container.scrollBy({ left: scrollToPosition, behavior: "smooth" });
        }
    }

    function scrollToSpecificDate() {
        const specificDate = new Date(document.getElementById("specificDateInput").value);
        if (!isNaN(specificDate.getTime())) {
            const specificDateText = `${specificDate.getMonth() + 1}/${specificDate.getDate()}/${specificDate.getFullYear()}`;
            const specificCard = document.getElementById(`dateCard-${specificDateText.replace(/\//g, "-")}`);
            specificCard.style.border = "4px double #d9d9d9";
            if (specificCard) {
                const container = document.getElementById("ScheduleContainer");
                const containerRect = container.getBoundingClientRect();
                const cardRect = specificCard.getBoundingClientRect();
                const scrollToPosition = cardRect.left + cardRect.width / 2 - containerRect.left - containerRect.width / 2;
                container.scrollBy({ left: scrollToPosition, behavior: "smooth" });
            }
        }
    }
    startFromCurrentDate();
    const currentDayButton = document.createElement("button");
    currentDayButton.innerText = "היום";
    currentDayButton.addEventListener("click", startFromCurrentDate);
    
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "specificDateInput";

    const goToButton = document.createElement("button");
    goToButton.innerText = "לעבור על";
    goToButton.addEventListener("click", scrollToSpecificDate);
    
    document.querySelector(".window-title").appendChild(currentDayButton);
    document.querySelector(".window-title").appendChild(goToButton);
    document.querySelector(".window-title").appendChild(dateInput);
}

// Function to create an order note
function createOrderNote(order) {
    const orderNote = document.createElement("div");
    const date = new Date(order.delivery_date); 
    const deliveryDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        
    orderNote.classList.add("orderNote")
    orderNote.innerHTML = `
        <p>שיבוץ הזמנה: ${order.number}</p>
        <p>${order.customerFirstName} ${order.customerLastName}</p>
        <p>${order.status}</p>
        <p>אספקה ב - ${deliveryDate}</p>
    `;

    orderNote.addEventListener("click", () => {
        ipcRenderer.send('orderTab', order);
    });

    return orderNote;
}

// Function to create an employee note
function createEmployeeNote(note, employee) {
    const employeeNote = document.createElement("div");
    const noteDate = new Date(note.to_date); 
    const employeeNoteDate = `${noteDate.getDate()}/${noteDate.getMonth() + 1}/${noteDate.getFullYear()}`;
    const employeeRole = employee.role;
    employeeNote.classList.add("employeeNote")
    employeeNote.innerHTML = `
        <p>פתקה מ - ${employeeNoteDate}</p>
        <p>${note.titel}</p>
        <p>${note.first_name} ${note.last_name}</p>
        <p>${note.role}</p>
    `;

    const detailNoteButton = document.createElement("button");
    detailNoteButton.innerText = "פרטים";

    const deleteNoteButton = document.createElement("button");
    deleteNoteButton.innerText = "מחק";

    if (employeeRole === "Manager" || employeeRole === "Supervisor" || employeeRole === "Technician") {
        employeeNote.appendChild(deleteNoteButton);
    }

    detailNoteButton.addEventListener("click", () => {
        ipcRenderer.send('NoteTab', note);
    });
    deleteNoteButton.addEventListener('click', async () => {
        const confirmation = confirm("האם אתה בטוח שברצונך למחוק פריט זה?");
        if (confirmation) {
            deleteNote(note.note_ID);
            await createSchedule(employee);
        }
    });

    employeeNote.appendChild(detailNoteButton);
    return employeeNote;
}

// Function to create a date card
function createDateCard(date) {
    const dateCard = document.createElement("div");
    dateCard.classList.add("dateCard");

    const NotesHolder = document.createElement("div");
    NotesHolder.classList.add("NotesHolder");
    
    const dateText = document.createElement("p");
    const weekdayText = date.toLocaleDateString(undefined, { weekday: "long" });
    dateText.innerHTML = `${weekdayText}<br>${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    dateCard.appendChild(dateText);

    const idString = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    dateCard.setAttribute("id", `dateCard-${idString}`);

    const weekdayColors = {
        "יום ראשון": "#d0e1e1",
        "יום שני": "#d0e1e1",
        "יום שלישי": "#d0e1e1",
        "יום רביעי": "#d0e1e1",
        "יום חמישי": "#d0e1e1",
        "יום שישי": "#eeffcc",
        "יום שבת": "#eeffcc"
    };
    dateText.style.backgroundColor = weekdayColors[weekdayText];
    dateCard.appendChild(NotesHolder);

    return dateCard;
}
