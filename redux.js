window.redux = {};

/*
  Store:
  {
    contactCount: 12,
    contacts: {
      <id>: {
        name: <name>,
        detail: <detail>,
      },
    }
  }
*/

const generateId = () =>
  Math.random()
    .toString(36)
    .substring(7);

(redux => {
  // Imports
  const { createStore } = Redux;

  // Action Constants
  const actionConstants = {
    ADD_CONTACT: 'rebase/phoneBookApp/ADD_CONTACT',
  };

  // Default states
  const defaultContactCount = 0;
  const defaultContacts = {};

  // Sub Reducers
  const contactCount = (state = defaultContactCount, action) => {
    switch (action.type) {
      case actionConstants.ADD_CONTACT:
        return state + 1;
      default:
        return state;
    }
  };

  const contacts = (state = defaultContacts, action) => {
    switch (action.type) {
      case actionConstants.ADD_CONTACT:
        return {
          ...state,
          [generateId()]: {
            name: action.name,
            detail: action.detail,
          },
        };
      default:
        return state;
    }
  };

  // Main Reducer
  const phoneBookApp = (state = {}, action) => {
    return {
      contactCount: contactCount(state.contactCount, action),
      contacts: contacts(state.contacts, action),
    };
  };

  // Export Store
  redux.store = createStore(phoneBookApp);

  // Export Constants
  redux.constants = actionConstants;
})(window.redux);
