const { store, constants } = redux;

const elements = {
  addButton: document.getElementById('addContact'),
  nameInput: document.getElementById('contactName'),
  detailInput: document.getElementById('contactDetail'),
  contactTable: document.getElementById('contactList'),
};

// Attach event listeners
elements.addButton.addEventListener('click', () => {
  store.dispatch({
    type: constants.ADD_CONTACT,
    name: elements.nameInput.value,
    detail: elements.detailInput.value,
  });
});

// Table Renderer
const renderTable = entries => {
  elements.contactTable.innerHTML = '';
  Object.entries(entries).forEach(([id, data]) => {
    const row = document.createElement('tr');
    row.appendChild(
      document.createElement('td').appendChild(document.createTextNode('Hello'))
    );
    elements.contactTable.appendChild(row);
  });
  // console.log(Object.entries(entries));
};

// Renderer
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  renderTable(state.contacts);
});

// /*
//   Do separate renderers for each part:
//     1) Number of contacts
//     2) Table displayed (better to just rerender the whole thing)
// */
