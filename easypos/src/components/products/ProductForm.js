import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';

class ProductForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const type = `${label === 'Product Price'  || label === 'Units' ? 'number' : 'text'}`
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" type={type} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
    this.props.clearField();
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field 
          name="code" 
          component={this.renderInput} 
          label="Product Code" 
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Product Description"
        />
        <Field
          name="price"
          component={this.renderInput}
          label="Product Price"
        />
        <Field
          name="units"
          component={this.renderInput}
          label="Units"
        />
        <Field
          name="subtype"
          component={this.renderInput}
          label="Subtype"
        />
        <button className="ui button primary">Save</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.code) {
    errors.code = 'You must enter a code';
  }

  if (!formValues.subtype) {
    errors.subtype = 'You must enter a subtype';
  }

  if (!formValues.price) {
    errors.price = 'You must enter a price';
  }

  if (!formValues.units) {
    errors.units = 'You must enter the units';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
};

const mapDispatchToProps = dispatch => ({
  clearField: () => dispatch(reset('productForm')),
});


export default reduxForm({
  form: 'productForm',
  validate
})(connect(
  null,
  mapDispatchToProps
)(ProductForm));
