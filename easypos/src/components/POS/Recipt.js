import React from 'react'
import { fetchCart } from '../../actions'
import { connect } from 'react-redux'
import './recipt.css'


class Recipt extends React.Component {

    componentDidMount() {
        this.props.fetchCart()
    }

    renderItem = () => {
        return (
            <React.Fragment>
                {this.props.cart.map((item) => (
                    <tr className="service" key={item.id}>
                        <td className="tableitem"><p className="itemtext">{item.description}</p></td>
                        <td className="tableitem"><p className="itemtext">{item.quantity}</p></td>
                        <td className="tableitem"><p className="itemtext">{`$${item.price * item.quantity}`}</p></td>
                    </tr>
                ))}
            </ React.Fragment>
        )
    }

    renderTotal = () => {
        if (this.props.cart) {
            let total = 0
            this.props.cart.forEach((item) => {
                total += (item.price * item.quantity)
            })
            return (
                <React.Fragment>
                    <tr className="tabletitle">
                        <td></td>
                        <td className="Rate"><h2>tax</h2></td>
                        <td className="payment"><h2>{`$${total * 0.16}`}</h2></td>
                    </tr>
                    <tr className="tabletitle">
                        <td></td>
                        <td className="Rate"><h2>Total</h2></td>
                        <td className="payment"><h2>{`$${total}`}</h2></td>
                    </tr>
                </React.Fragment>
            )
        }
    }
    
    reciptDate = () => {
        const date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
        return (<p>{date}</p>)
    }

    render() {
        return (
            <div >
                <div id="invoice-POS">
        
                    <center id="top">
                        <div className="logo"><i className="huge chess knight icon"></i></div>
                        <div className="info"> 
                            <h2>Easy POS Inc</h2>
                        </div>
                    </center>
                    
                    <div id="mid">
                        <div className="info">
                            <h2>Contact Info</h2>
                            <p> 
                                Address : street city, state 0000<br/>
                                Email   : EasyPOS@gmail.com<br/>
                                Phone   : 555-555-5555<br/>
                            </p>
                        </div>
                    </div>
                
                    <div id="bot">
            
                        <div id="table">
                            <table>
                                <tbody>
                                    <tr className="tabletitle">
                                        <td className="itemm"><h2>Item</h2></td>
                                        <td className="Hours"><h2>Qty</h2></td>
                                        <td className="Rate"><h2>Sub Total</h2></td>
                                    </tr>
                                    {this.renderItem()}
                                    {this.renderTotal()}
                                </tbody>
                            </table>
                        </div>
            
                        <div id="legalcopy">
                            <p className="legal"><strong> Thank you for your business! </strong><br/> 

                            If you are not 100% satisfied with your purchase, you can return the product and get a full refund or exchange the product for another one, be it similar or not.
                        
                            You can return a product for up to 30 days from the date you purchased it.
                        
                            Any product you return must be in the same condition you received it and in the original packaging. Please keep the receipt.                         
                            </p>
                            {this.reciptDate()}
                        </div>
            
                    </div>
                </div>
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
    { fetchCart },
    null,
    { forwardRef: true }
)(Recipt)