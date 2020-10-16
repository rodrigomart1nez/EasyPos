import products from '../apis/products';
import history from '../history'

export const signIn = userId => {
    return {
      type: 'SIGN_IN',
      payload: userId
    };
};
  
export const signOut = () => {
    return {
      type: 'SIGN_OUT'
    };
};

export const createProduct = (formValues) => async (dispatch, getState) => {
    const response = await products.post('/products', {...formValues})

    dispatch({ type: 'CREATE_PRODUCT', payload: response.data})
}

export const fetchProducts = () => async dispatch => {
    const response = await products.get('/products')
    
    dispatch({ type: 'FETCH_PRODUCTS', payload: response.data})
}

export const fetchProduct = (id) => async dispatch => {
    const response = await products.get(`/products/${id}`)

    dispatch({ type: 'FETCH_PRODUCT', payload: response.data })
}

export const editProduct = (id, formValues) => async dispatch => {
    const response = await products.patch(`/products/${id}`, formValues)

    dispatch({ type: 'EDIT_PRODUCT', payload: response.data })
    history.push('/products')
}

export const deleteProduct = id => async dispatch => {
    await products.delete(`/products/${id}`);

    dispatch({ type: 'DELETE_PRODUCT', payload: id });
    history.push('/products');
}

//

export const fetchCart = () => async dispatch => {
    const response = await products.get('/pos')
    
    dispatch({ type: 'FETCH_CART', payload: response.data})
}

export const fetchCartItem = (id) => async dispatch => {
    const response = await products.get(`/pos/${id}`)

    dispatch({ type: 'FETCH_CART_ITEM', payload: response.data })
}

export const deleteCartItem = id => async dispatch => {
    await products.delete(`/pos/${id}`);

    dispatch({ type: 'DELETE_CART_ITEM', payload: id });
    history.push('/pos')
}

export const charge = (purchase) => {
    return {
        type: 'CHARGE',
        payload: purchase
    }
}

export const addToCart = (formValues) => async (dispatch) => {
    const response = await products.post('/pos', {...formValues})

    dispatch({ type: 'ADD_TO_CART', payload: response.data})
}
