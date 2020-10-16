import { combineReducers } from 'redux';
import productsReducer from './productsReducer'
import { reducer as formReducer} from 'redux-form'
import cartReducers from './cartReducers';

export default combineReducers({
    products: productsReducer,
    form: formReducer,
    cart: cartReducers
})
