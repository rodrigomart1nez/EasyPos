import _ from 'lodash'

export default (state = {}, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return { ...state, [action.payload.id]: action.payload };
      case 'EDIT_CART':
        return { ...state, [action.payload.id]: action.payload };
      case 'DELETE_CART_ITEM':
        return _.omit(state, action.payload);
      case 'FETCH_CART':
        return { ...state, ..._.mapKeys(action.payload, 'id') };
      case 'FETCH_CART_ITEM':
        return { ...state, [action.payload.id]: action.payload };
      default:
        return state;
    }
};