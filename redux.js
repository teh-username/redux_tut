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
    UPDATE_CONTACT: 'rebase/phoneBookApp/UPDATE_CONTACT',
    DELETE_CONTACT: 'rebase/phoneBookApp/DELETE_CONTACT',
  };

  // Sub Reducers
  const contactCount = (state = 0, action) => {
    switch (action.type) {
      case actionConstants.ADD_CONTACT:
        return state + 1;
      case actionConstants.DELETE_CONTACT:
        return state - 1;
      default:
        return state;
    }
  };

  const contacts = (state = {}, action) => {
    switch (action.type) {
      case actionConstants.ADD_CONTACT:
        return {
          ...state,
          [generateId()]: {
            name: action.name,
            detail: action.detail,
          },
        };
      case actionConstants.UPDATE_CONTACT:
        return {
          ...state,
          [action.id]: {
            name: action.name,
            detail: action.detail,
          },
        };
      case actionConstants.DELETE_CONTACT:
        return Object.entries(state).reduce(
          (acc, [key, values]) =>
            key === action.id ? acc : { ...acc, [key]: values },
          {}
        );
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
