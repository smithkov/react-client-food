export default (state, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case "EDIT_ITEM":
      const updateItem = action.payload;

      const updateItems = state.items.map((item) => {
        if (item.id === updateItem.id) {
          return updateItem;
        }
        return item;
      });
      return {
        ...state,
        items: updateItems,
      };

    default:
      return state;
  }
};
