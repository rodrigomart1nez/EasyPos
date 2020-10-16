import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchProduct, deleteProduct } from '../../actions';

class ProductDelete extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteProduct(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/products" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.product) {
      return 'Are you sure you want to delete this product?';
    }

    return `Are you sure you want to delete "${
      this.props.product.description
    }"`;
  }

  render() {
    return (
      <Modal
        title="Delete Product"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/products')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { product: state.products[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchProduct, deleteProduct }
)(ProductDelete);
