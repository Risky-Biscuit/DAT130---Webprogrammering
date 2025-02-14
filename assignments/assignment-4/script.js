"use strict";

/**
 * Represents a single address book entry, containing name, telephone, and email.
 */
class Entry {
  /**
   * @param {string} name - The person's name.
   * @param {string} telephone - The person's phone number.
   * @param {string} email - The person's email address.
   */
  constructor(name, telephone, email) {
    this.name = name;
    this.telephone = telephone;
    this.email = email;
  }
}

/**
 * An array that holds all address book entries. Initially populated with sample data.
 */
const addressBook = [
  new Entry("John Doe", "123456789", "john@example.com"),
  new Entry("Ola Nordmann", "987654321", "ola@example.com"),
];

/**
 * Displays a given list of entries on the page by creating and appending elements.
 * @param {Entry[]} entries - An array of Entry objects to display.
 */
function displayEntries(entries) {
  // Get reference to the "addressBook" container in the HTML
  const addressBookDiv = document.getElementById("addressBook");
  // Clear previous entries from the container
  addressBookDiv.innerHTML = "";

  // Loop through each entry and create elements to display its info
  entries.forEach((entry, index) => {
    // Create a container for each entry and apply a CSS class
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");

    // Set the innerHTML with the entry's details
    // Also include a mailto link for the email
    entryDiv.innerHTML = `
      <p><strong>Name:</strong> ${entry.name}</p>
      <p><strong>Telephone:</strong> ${entry.telephone}</p>
      <p><strong>Email:</strong> <a href="mailto:${entry.email}">${entry.email}</a></p>
    `;

    // Create a Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // When the delete button is clicked, call deleteEntry with the current index
    deleteBtn.addEventListener("click", () => deleteEntry(index));

    // Append the delete button to the entry's container
    entryDiv.appendChild(deleteBtn);

    // Finally, add the entry container to the main addressBookDiv
    addressBookDiv.appendChild(entryDiv);
  });
}

/**
 * Adds a new entry to the address book based on the form inputs.
 * This function is called when the form is submitted.
 * @param {Event} event - The submit event object.
 */
function addEntry(event) {
  // Prevent the default form submission behavior (page reload)
  event.preventDefault();

  // Gather the values from the form fields
  const name = document.getElementById("name").value.trim();
  const telephone = document.getElementById("telephone").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validate that the user at least enters a name
  if (!name) {
    alert("Name is required.");
    return;
  }
  // Validate that there is at least a phone number or an email
  if (!telephone && !email) {
    alert("You need at least a telephone or an email.");
    return;
  }

  // Create a new Entry object
  const newEntry = new Entry(name, telephone, email);

  // Add it to our addressBook array
  addressBook.push(newEntry);

  // Reset the form fields for the next entry
  document.getElementById("entryForm").reset();

  // Refresh the displayed entries
  displayEntries(addressBook);
}

/**
 * Deletes an entry from the address book by index.
 * @param {number} index - The position of the entry in the addressBook array to remove.
 */
function deleteEntry(index) {
  // Confirm with the user before deleting
  if (confirm("Are you sure you want to delete this entry?")) {
    // Remove one item from the array at the given index
    addressBook.splice(index, 1);
    // Refresh the display to show updated list
    displayEntries(addressBook);
  }
}

/**
 * Filters the displayed entries based on the user's search text in the searchField input.
 * This function is called whenever the user types in the search box.
 */
function searchEntries() {
  // Get the current text in the search field and convert to lowercase
  const searchString = document
    .getElementById("searchField")
    .value.toLowerCase();

  // Filter the addressBook array to find matching entries (name, telephone, or email)
  const filteredEntries = addressBook.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchString) ||
      entry.telephone.toLowerCase().includes(searchString) ||
      entry.email.toLowerCase().includes(searchString)
  );

  // Display only the filtered list
  displayEntries(filteredEntries);
}

/**
 * Sorts the address book array by the selected criterion (name, telephone, or email).
 * This function is called whenever the sortOptions dropdown value changes.
 */
function sortEntries() {
  // Get the sort criterion from the dropdown (could be "name", "telephone", or "email")
  const sortValue = document.getElementById("sortOptions").value;

  // Sort the addressBook in-place using localeCompare to compare strings
  addressBook.sort((a, b) => {
    const valA = a[sortValue].toLowerCase();
    const valB = b[sortValue].toLowerCase();
    return valA.localeCompare(valB);
  });

  // Re-display the now-sorted entries
  displayEntries(addressBook);
}

/**
 * Set up the event listeners for form submission, searching, and sorting.
 */
document.getElementById("entryForm").addEventListener("submit", addEntry);
document.getElementById("searchField").addEventListener("input", searchEntries);
document.getElementById("sortOptions").addEventListener("change", sortEntries);

/**
 * Initialize the page by displaying the initial addressBook data when the window finishes loading.
 */
window.onload = () => {
  displayEntries(addressBook);
};
