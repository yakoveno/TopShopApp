
async function createProfile(employee, messages = null) {
    const ProfileBox = document.getElementById("ProfileBox");
    ProfileBox.innerHTML = '';

    if (messages === null) {messages = await getMessagesEmployee(employee.employee_ID);}

    const PersonProfile = document.createElement("div");
    PersonProfile.id = "PersonProfile";
    ProfileBox.appendChild(PersonProfile);

    const PersonInfo = document.createElement("div");
    PersonInfo.classList.add("PersonInfo");
    PersonInfo.innerHTML = `
        <img src="${employee.avatar}">
        <p>${employee.first_name}</p>
    `;
    PersonInfo.addEventListener("click", () => {createEmployeeInfo(employee, TabDisplay);})
    PersonProfile.appendChild(PersonInfo);

    const TabDisplay = document.createElement("div");
    TabDisplay.classList.add("TabDisplay");
    ProfileBox.appendChild(TabDisplay);

    const activeTabKey = `activeTab_${employee.employee_ID}`;
    let activeTab = localStorage.getItem(activeTabKey);
    
    if (!activeTab) {
      activeTab = 'employeeInfo';
      localStorage.setItem(activeTabKey, activeTab);
    }
    
    if (activeTab === 'sentMessages') {
        displayMessages(employee, messages.sentMessages, TabDisplay, activeTabKey);
    } else if (activeTab === 'receivedMessages') {
        displayMessages(employee, messages.receivedMessages, TabDisplay, activeTabKey);
    } else if (activeTab === 'flaggedMessages') {
        displayMessages(employee, messages, TabDisplay, activeTabKey);
    } else {
        createEmployeeInfo(employee, TabDisplay);
    }
    createFunctionsNav(employee, TabDisplay, PersonProfile, messages, activeTabKey);
    createMessagesNav(employee, TabDisplay, PersonProfile, messages, activeTabKey);

    return ProfileBox;
}
function createFunctionsNav(employee, TabDisplay, PersonProfile, messages, activeTabKey){
    const FunctionsNav = document.createElement("div");
    FunctionsNav.classList.add("FunctionsNav");
    FunctionsNav.innerText = "פעולות";
    const NewNoteTab = document.createElement("button");
    NewNoteTab.classList.add("TabButton");
    NewNoteTab.innerText = "פתקה";
    const NewMessageTab = document.createElement("button");
    NewMessageTab.classList.add("TabButton");
    NewMessageTab.innerText = "הודעה";
    const SearchTab = document.createElement("input");
    SearchTab.classList.add("TabButton");
    SearchTab.placeholder = "חיפוש";

    FunctionsNav.appendChild(NewNoteTab);
    FunctionsNav.appendChild(NewMessageTab);
    FunctionsNav.appendChild(SearchTab);
    PersonProfile.appendChild(FunctionsNav);

    NewNoteTab.addEventListener("click", () => {
        displayNewNote(employee, TabDisplay);
        localStorage.setItem(activeTabKey, 'employeeInfo');
    });
    
    NewMessageTab.addEventListener("click", () => {
        displayNewMessage(employee, TabDisplay);
        localStorage.setItem(activeTabKey, 'sentMessages');
    });
    
    SearchTab.addEventListener("input", async () => {
        const searchString = SearchTab.value.toLowerCase();
        displaySearchTab(searchString, employee, messages, TabDisplay);
    });
}
function createMessagesNav(employee, TabDisplay, PersonProfile, messages, activeTabKey){
    const MessagesNav = document.createElement("div");
    MessagesNav.classList.add("MessagesNav");
    MessagesNav.innerText = "הודעות";
    const SentTab = document.createElement("button");
    SentTab.classList.add("TabButton");
    SentTab.innerText = "נשלחו";
    const ReceivedTab = document.createElement("button");
    ReceivedTab.classList.add("TabButton");
    ReceivedTab.innerText = "התקבלו";
    const FlaggedTab = document.createElement("button");
    FlaggedTab.classList.add("TabButton");
    FlaggedTab.innerText = "נבחרים";

    MessagesNav.appendChild(SentTab);
    MessagesNav.appendChild(ReceivedTab);
    MessagesNav.appendChild(FlaggedTab);
    PersonProfile.appendChild(MessagesNav);

    SentTab.addEventListener("click", () => {
        displayMessages(employee, messages.sentMessages, TabDisplay);
        localStorage.setItem(activeTabKey, 'sentMessages');
    });

    ReceivedTab.addEventListener("click", () => {
        displayMessages(employee, messages.receivedMessages, TabDisplay);
        localStorage.setItem(activeTabKey, 'receivedMessages');
    });

    FlaggedTab.addEventListener("click", () => {
        displayMessages(employee, messages, TabDisplay);
        localStorage.setItem(activeTabKey, 'flaggedMessages');
    });
}
function displayMessages(employee, messages, TabDisplay) {
    TabDisplay.innerHTML = ''; 

    if (messages.hasOwnProperty("sentMessages") && messages.hasOwnProperty("receivedMessages")) {
        messages.sentMessages.forEach(message => {
            if (message.flag === 1 && message.active === 1) {
                const MessageCard = createMessageCard(employee, message);
                TabDisplay.appendChild(MessageCard);
            }
        });
        messages.receivedMessages.forEach(message => {
            if (message.flag === 1 && message.active === 1) {
                const MessageCard = createMessageCard(employee, message);
                TabDisplay.appendChild(MessageCard);
            }
        });
    } else {
        messages.forEach(message => {
            if (message.flag === 0 && message.active === 1) {
                const MessageCard = createMessageCard(employee, message);
                TabDisplay.appendChild(MessageCard);
            }
        });
    }
}
function createMessageCard(employee, message) {
    const MessageCard = document.createElement("div");
    MessageCard.classList.add("MessageCard");

    const MessageDate = message.send_date ? new Date(message.send_date).toLocaleDateString("en-US") : '';

    const MessageHead = document.createElement("div");
    MessageHead.classList.add("MessageHead");
    
    const MessageHeadName = document.createElement("div");
    MessageHeadName.classList.add("MessageHeadName");
    MessageHeadName.innerHTML = `${message.name}`;
    
    const MessageHeadTitel = document.createElement("div");
    MessageHeadTitel.classList.add("MessageHeadTitel");
    MessageHeadTitel.innerHTML = `${message.titel}`;
    
    const MessageHeadDate = document.createElement("div");
    MessageHeadDate.classList.add("MessageHeadDate");
    MessageHeadDate.innerHTML = MessageDate;
    
    MessageHead.appendChild(MessageHeadName);
    MessageHead.appendChild(MessageHeadTitel);
    MessageHead.appendChild(MessageHeadDate);
    
    const MessageBody = document.createElement("div");
    MessageBody.classList.add("MessageBody");
    MessageBody.innerHTML = `${message.message_text}`;

    MessageCard.appendChild(MessageHead);
    MessageCard.appendChild(MessageBody);

    const MessageStatus = document.createElement("button");
    MessageStatus.classList.add("MessageStatus");
    MessageStatus.innerText = message.flag === 1 ? "מ-נבחרים" : "ל-נבחרים";

    const MessageState = document.createElement("button");
    MessageState.classList.add("MessageState");
    MessageState.innerText = message.active === 1 ? "הסר" : "שחזר";

    MessageCard.appendChild(MessageStatus);
    MessageCard.appendChild(MessageState);

    MessageStatus.addEventListener("click", async () => {
        const newFlagValue = message.flag === 1 ? 0 : 1;
        updateMessageStatus(message.message_ID, newFlagValue);
        await createProfile(employee);
        const notification = new window.Notification("בוצעה עדכון סטאטוס הודעה");
        setTimeout(() => {notification.close();}, 16000);
    });

    MessageState.addEventListener("click", async () => {
        const newActiveValue = message.active === 1 ? 0 : 1;
        updateMessageState(message.message_ID, newActiveValue);
        await createProfile(employee);
        const notification = new window.Notification("בוצעה עדכון הודעה");
        setTimeout(() => {notification.close();}, 16000);
    });

    MessageCard.addEventListener("click", () => {
        MessageBody.classList.toggle("expanded");
        const allMessageCards = document.querySelectorAll(".MessageCard");
        allMessageCards.forEach(card => {
            if (card !== MessageCard) {
                const body = card.querySelector(".MessageBody");
                body.classList.remove("expanded");
            }
        });
    });

    return MessageCard;
}

async function displayNewMessage(employee, TabDisplay) {
    TabDisplay.innerHTML = "";

    const NewMessage = document.createElement("div");
    NewMessage.classList.add("NewMessage");

    const NewMessageTitel = document.createElement("input");
    NewMessageTitel.classList.add("NewMessageTitel");
    NewMessageTitel.placeholder = "כותרת";

    const MessageReceivers = document.createElement("div");
    MessageReceivers.classList.add("MessageReceivers");

    const allEmployees = await getEmployees();
    const otherEmployees = allEmployees.filter(emp => emp.employee_ID !== employee.employee_ID);

    const receiversData = [];

    otherEmployees.forEach(otherEmployee => {
        const EmployeeReceiver = document.createElement("button");
        EmployeeReceiver.innerText = `${otherEmployee.first_name} ${otherEmployee.last_name}`;
        EmployeeReceiver.addEventListener("click", () => {
            const receiverIndex = receiversData.findIndex(receiver => receiver.receiver_employee_ID === otherEmployee.employee_ID);
            if (receiverIndex === -1) {
                receiversData.push({
                    receiver_employee_ID: otherEmployee.employee_ID,
                    rec_flag: false
                });
                EmployeeReceiver.classList.add("selected");
            } else {
                receiversData.splice(receiverIndex, 1);
                EmployeeReceiver.classList.remove("selected");
            }
        });
        MessageReceivers.appendChild(EmployeeReceiver);
    });

    const NewMessageText = document.createElement("textarea");
    NewMessageText.classList.add("NewMessageText");
    NewMessageText.placeholder = "תוכן";
    
    const SendButton = document.createElement("button");
    SendButton.classList.add("SendButton");
    SendButton.innerText = "שלח";
    SendButton.addEventListener("click", async () => {
        const titel = NewMessageTitel.value.trim();
        const text = NewMessageText.value.trim();

        if (!titel || !text || receiversData.length === 0) {
            alert("אנא מלא את הכותרת והטקסט, ובחר לפחות נמען אחד.");
            return;
        }

        const messageData = {
            sender_employee_ID: employee.employee_ID,
            message_text: text,
            send_date: new Date(),
            titel: titel
        };

        try {
            const messageId = await insertMessage(messageData, receiversData);
            const updatedMessages = await getMessagesEmployee(employee.employee_ID);
            if (messageId) {
                await createProfile(employee, updatedMessages);
            }
            const notification = new window.Notification("בוצעה עדכון הודעה");
            setTimeout(() => {notification.close();}, 16000);
        } 
        catch (error) {console.error(error);}
    });

    NewMessage.appendChild(NewMessageTitel);
    NewMessage.appendChild(MessageReceivers);
    NewMessage.appendChild(NewMessageText);
    NewMessage.appendChild(SendButton);
    TabDisplay.appendChild(NewMessage);
    
    return NewMessage;
}
async function displayNewNote(employee, TabDisplay) {
    TabDisplay.innerHTML = "";

    const NewNote = document.createElement("div");
    NewNote.classList.add("NewNote");

    const NewNoteTitel = document.createElement("input");
    NewNoteTitel.classList.add("NewNoteTitel");
    NewNoteTitel.placeholder = "כותרת";

    const NewNoteDate = document.createElement("input");
    NewNoteDate.classList.add("NewNoteDate");
    NewNoteDate.type = "date";

    const NewNoteText = document.createElement("textarea");
    NewNoteText.classList.add("NewNoteText");
    NewNoteText.placeholder = "תוכן";

    const SendButton = document.createElement("button");
    SendButton.classList.add("SendButton");
    SendButton.innerText = "שלח";
    SendButton.addEventListener("click", async () => {
        const titel = NewNoteTitel.value.trim();
        const text = NewNoteText.value.trim();
        const to_date = NewNoteDate.value;

        if (!titel || !text || !to_date) {
            alert("מלא כותרת, תוכן, תאריך");
            return;
        }

        const employee_ID = employee.employee_ID;
        const at_date = new Date();
        const noteData = {
            employee_ID,
            titel,
            text,
            to_date,
            at_date,
        };
        try {
            const result = await insertNote(noteData);
            if (result) {
                await createSchedule(employee);
            }
            const notification = new window.Notification("ההודעה נשלחה בהצלחה");
            setTimeout(() => {notification.close();}, 16000);
        } 
        catch (error) {console.error(error);}
    });

    NewNote.appendChild(NewNoteTitel);
    NewNote.appendChild(NewNoteDate);
    NewNote.appendChild(NewNoteText);
    NewNote.appendChild(SendButton);
    TabDisplay.appendChild(NewNote);

    return NewNote;
}

function createEmployeeInfo(employee, TabDisplay, activeTabKey) {
    TabDisplay.innerHTML = "";
    const EmployeeInfo = document.createElement("div");
    EmployeeInfo.classList.add("EmployeeInfo");
    EmployeeInfo.innerHTML = `
        <span>${employee.first_name}</span>
        <span>${employee.last_name}</span>
        <span>${employee.phone}</span>
        <span>${employee.email}</span>
        <span>${employee.role}</span>
    `;
    TabDisplay.appendChild(EmployeeInfo);
    const UpdateProfileTab = document.createElement("button");
    UpdateProfileTab.classList.add("TabButton");
    UpdateProfileTab.innerText = "עדכן";
    EmployeeInfo.appendChild(UpdateProfileTab);
    UpdateProfileTab.addEventListener("click", () => {
        displayUpdateProfile(employee, TabDisplay);
        localStorage.setItem(activeTabKey, 'employeeInfo');
    });
    return EmployeeInfo;
}
function displayUpdateProfile(employee, TabDisplay) {
    TabDisplay.innerHTML = '';
    const UpdateProfile = document.createElement("form");
    UpdateProfile.classList.add("UpdateProfile");
    UpdateProfile.innerHTML = `
        <label>שם פרטי:</label><input type="text" name="first_name" value="${employee.first_name}">
        <label>שם משפחה:</label><input type="text" name="last_name" value="${employee.last_name}">
        <label>טלפון:</label><input type="tel" name="phone" value="${employee.phone}">
        <label>דוא"ל:</label><input type="email" name="email" value="${employee.email}">
        <label>תפקיד:</label><input type="text" name="role" value="${employee.role}">
        <label>תמונה:</label><input type="text" name="avatar" value="${employee.avatar}">
        <label>סיסמה:</label><input type="password" name="password" value="${employee.password}">
        <button class="SaveProfile" type="button" onclick="SaveProfile(this.form, '${employee.employee_ID}')">שמור</button>
    `;
    TabDisplay.appendChild(UpdateProfile);
}

function SaveProfile(data, employee_ID) {
    const UpdateProfile = data; 
    const formData = new FormData(UpdateProfile); 
    const updatedEmployee = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        role: formData.get('role'),
        avatar: formData.get('avatar'),
        password: formData.get('password'),
    };
    updateEmployee(updatedEmployee, employee_ID);
    const notification = new window.Notification("בוצעה עדכון נתוני פרופיל");
        
    setTimeout(() => {notification.close();}, 16000);
    getEmployees(employee_ID).then(employees => {
        const employee = employees[0]; 
        createProfile(employee);
    });
}

function displaySearchTab(searchString, employee, messages, TabDisplay) {
    TabDisplay.innerHTML = '';

    const matchedMessages = [];
  
    if (messages.hasOwnProperty("sentMessages")) {
      messages.sentMessages.forEach(message => {
        const titleMatch = message.titel.toLowerCase().includes(searchString);
        const textMatch = message.message_text.toLowerCase().includes(searchString);
        if (titleMatch || textMatch) {
          matchedMessages.push(message);
        }
      });
    }
  
    if (messages.hasOwnProperty("receivedMessages")) {
      messages.receivedMessages.forEach(message => {
        const titleMatch = message.titel.toLowerCase().includes(searchString);
        const textMatch = message.message_text.toLowerCase().includes(searchString);
        if (titleMatch || textMatch) {
          matchedMessages.push(message);
        }
      });
    }
  
    if (matchedMessages.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.innerText = "No matching messages found.";
      TabDisplay.appendChild(noResultsMessage);
    } else {
      matchedMessages.forEach(message => {
        const MessageCard = createMessageCard(employee, message);
        TabDisplay.appendChild(MessageCard);
      });
    }
    return matchedMessages;
}



  
  