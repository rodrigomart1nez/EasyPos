import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchCartItem, deleteCartItem } from '../../actions';

class PosDelete extends React.Component {
    componentDidMount() {
        this.props.fetchCartItem(this.props.match.params.id);
    }
    
    renderActions() {
        const { id } = this.props.match.params;
    
        return (
          <React.Fragment>
            <button
              onClick={() => this.props.deleteCartItem(id)}
              className="ui button negative"
            >
              Delete
            </button>
            <Link to="/pos" className="ui button">
              Cancel
            </Link>
          </React.Fragment>
        );
    }
    
    renderContent() {
        if (!this.props.item) {
          return 'Are you sure you want to delete this product sale?';
        }
    
        return `Are you sure you want to delete "${
          this.props.item.description
        }" sale?`;
    }


    render () {
        return (
            <Modal
                title="Cancel product"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/pos')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { item: state.cart[ownProps.match.params.id] };
};
  
export default connect(
    mapStateToProps,
    { fetchCartItem, deleteCartItem }
)(PosDelete);

