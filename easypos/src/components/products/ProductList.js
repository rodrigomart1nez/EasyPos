import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../actions';

class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

//   renderAdmin(stream) {
//     if (stream.userId === this.props.currentUserId) {
//       return (
//         <div className="right floated content">
//           <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
//             Edit
//           </Link>
//           <Link
//             to={`/streams/delete/${stream.id}`}
//             className="ui button negative"
//           >
//             Delete
//           </Link>
//         </div>
//       );
//     }
//   }

renderControl(product) {
    return (
        <div className="right floated content">
            <h4  className='left floated justified content'>
                {`Stock: ${product.units}`}
            </h4>
            <Link to={`/products/edit/${product.id}`} className="ui button primary">
                Edit
            </Link>
            <Link
                to={`/products/delete/${product.id}`}
                className="ui button negative"
            >
                Delete
            </Link>
        </div>
    );
  }

  renderList() {
    return this.props.products.map(product => {
      const color = product.units <= 5 ? 'red' : ''
      return (
        <div className="item" key={product.id}>
          {this.renderControl(product)}
          <i className={`large middle aligned ${color} dolly flatbed icon`} />
          <div className="content">
            <Link to={`/products/edit/${product.id}`} className="header">
              {product.description}
            </Link>
            <div className="description">{product.subtype}</div>
          </div>
        </div>
      );
    });
  }

  renderNew() {
      return (
        <div className="ui clearing segment">
            <h3 className="ui right floated header">
                <Link to="/products/new" className="ui button primary">
                    Add New Product
                </Link>
            </h3>
            <h1 className="ui left floated header">
                Products
            </h1>
        </div>
      );
  }

  render() {
    return (
      <div>
        {this.renderNew()}
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: Object.values(state.products)
    // currentUserId: state.auth.userId,
    // isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchProducts }
)(ProductList);
