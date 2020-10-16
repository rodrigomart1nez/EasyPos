import React from 'react'
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import './POSForm.css'

class POSForm extends React.Component {
    renderInput = ({ input, placeholder, meta }) => {
        return (
            <div className='ui action input'>
                <input {...input} autoComplete="off" className='code-field' placeholder={placeholder} />
            </div>
        )
    }

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
                    placeholder="Product code"
                />
                <Field 
                    name="quantity" 
                    component={this.renderInput}
                    placeholder='Quantity (default 1)'
                />
                <button className="ui black button">Add</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    clearField: () => dispatch(reset('posForm')),
});

  
export default reduxForm({
    form: 'posForm'
})(connect(
    null,
    mapDispatchToProps
)(POSForm));
  