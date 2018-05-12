const { store, constants } = redux;

const elements = {
  addButton: document.getElementById('addContact'),
  nameInput: document.getElementById('contactName'),
  detailInput: document.getElementById('contactDetail'),
  contactTable: document.getElementById('contactList'),
  contactCount: document.getElementById('contactCount'),
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
    store.dispatch({
      type: constants.UPDATE_CONTACT,
      id: id,
      name: document.getElementById(`name-${id}`).value,
      detail: document.getElementById(`detail-${id}`).value,
    });
  } else if (e.target.className === 'contactDelete') {
    const { id } = e.target.dataset;
    store.dispatch({
      type: constants.DELETE_CONTACT,
      id: id,
    });
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
        <button class="contactEdit" data-id="${id}">Update</button>
        <button class="contactDelete" data-id="${id}">Delete</button>
      </td>
    </tr>`;
  });
  elements.contactTable.innerHTML = rows;
};

const renderContactCount = count => {
  elements.contactCount.innerHTML = count;
};

// Renderer
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  renderTable(state.contacts);
  renderContactCount(state.contactCount);
});

