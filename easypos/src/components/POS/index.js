import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print'
import { fetchProducts, fetchCart, addToCart, deleteCartItem } from '../../actions'
import POSForm from '../products/POSForm'
import Recipt from './Recipt'
import '../products/POSForm.css'
import './pos.css'


class POS extends React.Component {

    componentDidMount() {
        this.props.fetchProducts()
        this.props.fetchCart()
    }


    renderCart = () => {
        return (
            <React.Fragment>
                {this.props.cart.map((item) => (
                        <React.Fragment key={item.id}>

                            <div className='one wide column'>
                                    {!item.quantity ? 1 : item.quantity}
                            </div>
                            <div className='four wide column'>
                                    {item.code}
                            </div>
                            <div className='six wide column'>
                                    {`${item.description}, ${item.subtype}`}
                            </div>
                            <div className='two wide column'>
                                    {`$${item.price}`}
                            </div>
                            <div className='two wide column'>
                                    {`$${item.price * item.quantity}`}
                            </div>
                            <div className='one wide column'>
                                <div>
                                    <Link to={`/pos/delete/${item.id}`}>
                                        <i className="trash alternate outline icon"></i>
                                    </Link>
                                </div>
                            </div>
                        </ React.Fragment>
                ))}
            </ React.Fragment>
        )
    }


    onSubmit = formValues => {
        const item = this.props.products.find(item => item.code === formValues.code)
        if (item) {
            const qty = formValues.quantity ? formValues.quantity : 1
            const o = {
                'code': item.code,
                'description': item.description,
                'price': item.price,
                'quantity': qty,
                'units': item.units,
                'subtype': item.subtype,
                'product_id': item.id,
                'date': new Date().toJSON().slice(0,10).replace(/-/g,'/')
            }
            this.props.addToCart(o)
        }
    }


    renderTotal = () => {
        if (this.props.cart) {
            let total = 0
            this.props.cart.forEach((item) => {
                total += (item.price * item.quantity)
            })
            return (
                <React.Fragment>
                    <div className='eleven wide column'>
                                        
                    </div>
                    <div className='two wide column'>
                        TOTAL:
                    </div>
                    <div className='three wide column'>
                        {`$${total}`}
                    </div>
                </ React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    {this.props.cart.map((item) => (
                            <React.Fragment>
                                <div className='twelve wide column'>
                                        
                                </div>
                                <div className='two wide column'>
                                        Total:
                                </div>
                                <div className='two wide column'>
                                        $0.00
                                </div>
                            </ React.Fragment>
                    ))}
                </ React.Fragment>
            )
        }

    }

    onResetClick = () => {
        this.props.cart.forEach(el => this.props.deleteCartItem(el.id))
    }

    render() {
        return (
            <div>
                <div>
                    <div className='ui grid'>
                        <div className='one wide column'>
                            <h4 className='ui header'>Qty</h4>
                        </div>
                        <div className='four wide column'>
                            <h4 className='ui header'>Product Code</h4>
                        </div>
                        <div className='six wide column'>
                            <h4 className='ui header'>Description</h4>
                        </div>
                        <div className='two wide column'>
                            <h4 className='ui header'>Price</h4>
                        </div>
                        <div className='two wide column'>
                            <h4 className='ui header'>Sub Total</h4>
                        </div>
                        <div className='one wide column'>
                            
                        </div>
                        {this.renderCart()}
                        {this.renderTotal()}
                    </div>
                    <div className='ui divider'></div>
                    <div className='ui grid'>
                        <div className='eleven wide column'>
                           <POSForm onSubmit={this.onSubmit} />
                        </div>
                        <div className='two wide column'>
                            <ReactToPrint 
                                trigger={() => {
                                    return (
                                        <button className="ui huge green icon left floated button">
                                            <i className="dollar sign icon"></i>
                                        </button>
                                    )
                                }}
                                content={() => this.componentRef}
                            />
                        </div>
                        <div className='two wide column'>
                            <button onClick={this.onResetClick} className="ui huge icon left floated button">
                                <i className="redo alternate icon"></i>
                            </button>
                        </div>
                        <div className='one wide column'>

                        </div>
                    </div>
                </div>
                <Recipt ref={el => (this.componentRef = el)} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      products: Object.values(state.products),
      cart: Object.values(state.cart)
      // currentUserId: state.auth.userId,
      // isSignedIn: state.auth.isSignedIn
    };
};

export default connect(
    mapStateToProps,
    { fetchProducts, addToCart, fetchCart, deleteCartItem }
)(POS)