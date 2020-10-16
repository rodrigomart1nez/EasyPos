import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { editProduct, fetchProduct } from '../../actions';
import ProductForm from './ProductForm';

class ProductEdit extends React.Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id)
    }
    
    onSubmit = formValues => {
        this.props.editProduct(this.props.match.params.id, formValues)
    }

    render () {
        if (!this.props.product) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>Edit Product</h3>
                <ProductForm
                    initialValues={_.pick(this.props.product, 'code', 'description', 'price', 'units', 'subtype')} 
                    onSubmit={this.onSubmit} 
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return { product: state.products[ownProps.match.params.id]}
}

export default connect(
    mapStateToProps,
    { editProduct, fetchProduct }
)(ProductEdit)