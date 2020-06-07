import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const initialState = {
  items: []
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    })
  }

  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item
    })
  }

  const editItem = (item) => {
    dispatch({
      type: 'EDIT_ITEM',
      payload: item
    })
  }

  return (
    <GlobalContext.Provider value={{
      items: state.items,
      removeItem,
      addItem,
      editItem
    }}>
      {children}
    </GlobalContext.Provider>
  )
}