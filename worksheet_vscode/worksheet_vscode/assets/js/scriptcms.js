// Utility functions for validation
function isValidPhoneNumber(phone) {
    return /^(01|02|07)\d{9}$/.test(phone);
}

function isValidBirthdate(date) {
    const today = new Date();
    const birthDate = new Date(date);
    return birthDate < today && birthDate.getFullYear() >= 1900; // Arbitrary start year for valid range
}

// Unique ID generator
function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

// Load contacts from local storage
function loadContacts() {
    return JSON.parse(localStorage.getItem('contacts') || '[]');
}

// Save contacts to local storage
function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Display all contacts
function displayContacts() {
    const contactsContainer = document.getElementById('contactsContainer');
    contactsContainer.innerHTML = '';
    const contacts = loadContacts();
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `${contact.firstName} ${contact.lastName} - ${contact.phoneNumbers.join(', ')} - ${contact.emails.join(', ')} - ${contact.birthdate}
            <button onclick="editContact('${contact.id}')">Edit</button>
            <button onclick="deleteContact('${contact.id}')">Delete</button>`;
        contactsContainer.appendChild(li);
    });
}

// Create or update a contact
document.getElementById('contactForm').onsubmit = function (e) {
    e.preventDefault();
    const id = document.getElementById('contactId').value || generateUniqueId();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phoneNumbers = document.getElementById('phoneNumbers').value.trim().split(',').map(num => num.trim());
    const emails = document.getElementById('emails').value.trim().split(',').map(email => email.trim());
    const birthdate = document.getElementById('birthdate').value;

    if (!firstName || firstName.length < 2 || !lastName || lastName.length < 2) return alert("Names must be at least 2 characters.");
    if (!phoneNumbers.every(isValidPhoneNumber)) return alert("Each phone number must be 11 digits and start with 01, 02, or 07.");
    if (!emails.every(email => email.includes("@"))) return alert("Each email must be a valid format.");
    if (!isValidBirthdate(birthdate)) return alert("Invalid birthdate.");

    const contact = { id, firstName, lastName, phoneNumbers, emails, birthdate };
    const contacts = loadContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) contacts.push(contact);
    else contacts[index] = contact;
    
    saveContacts(contacts);
    displayContacts();
    document.getElementById('contactForm').reset();
}

// Search contacts
function searchContacts() {
    const searchTerm = document.getElementById('searchField').value.toLowerCase();
    const contacts = loadContacts();
    const filteredContacts = contacts.filter(contact => 
        contact.firstName.toLowerCase().includes(searchTerm) || 
        contact.lastName.toLowerCase().includes(searchTerm)
    );
    displayFilteredContacts(filteredContacts);
}

function displayFilteredContacts(contacts) {
    const contactsContainer = document.getElementById('contactsContainer');
    contactsContainer.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `${contact.firstName} ${contact.lastName} - ${contact.phoneNumbers.join(', ')} - ${contact.emails.join(', ')} - ${contact.birthdate}`;
        contactsContainer.appendChild(li);
    });
}

// Edit a contact
function editContact(id) {
    const contacts = loadContacts();
    const contact = contacts.find(contact => contact.id === id);
    if (!contact) return;
    document.getElementById('contactId').value = contact.id;
    document.getElementById('firstName').value = contact.firstName;
    document.getElementById('lastName').value = contact.lastName;
    document.getElementById('phoneNumbers').value = contact.phoneNumbers.join(', ');
    document.getElementById('emails').value = contact.emails.join(', ');
    document.getElementById('birthdate').value = contact.birthdate;
}

// Delete a contact
function deleteContact(id) {
    const contacts = loadContacts().filter(contact => contact.id !== id);
    saveContacts(contacts);
    displayContacts();
}

// Initialize display on page load
displayContacts();