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

document.addEventListener('click', e => {
  if (e.target.className === 'contactEdit') {
    const { id } = e.target.dataset;
  }
});

// Table Renderer
const renderTable = entries => {
  elements.contactTable.innerHTML = '';
  let rows = '';
  Object.entries(entries).forEach(([id, data]) => {
    rows += `<tr>
      <td><input value="${data.name}" id="name-${id}"/></td>
      <td><input value="${data.detail}" id="detail-${id}"/></td>
      <td>
        <button class="contactEdit" data-id="${id}">Edit</button>
        <button class="contactDelete" data-id="${id}">Delete</button>
      </td>
    </tr>`;
  });
  elements.contactTable.innerHTML = rows;
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
