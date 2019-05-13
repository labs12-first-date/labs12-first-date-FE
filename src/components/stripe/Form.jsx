import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';

class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            name: '',
            amount: '',

        }

    }
    render() {
        return (
        <div className="container">
            <form className="stripe-form">
            <label>Name</label>
            <input
                type="text"
                className="input"
                value={this.state.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
            />
            <label>Amount</label>
            <input
                type="text"
                className="input"
                value={this.state.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ amount: e.target.value })}
            />
            </form>
        </div>
        )}
}

interface IFormProps { }

interface IFormState {
    name: string;
    amount: string;
}

export default injectStripe(Form);