import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import './Stripe.css';

class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            name: '',
            amount: '',
        }
    }

        componentDidUpdate(previousProps, previousState) {
                console.log(this.state);
        }

        handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                let token = await this.props.stripe.createToken({ name: this.state.name });
                console.log(token);
            }catch(e) {
                throw e;
            }
        }

        selectPriceMonthly = ((e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ amount: 2.99 })
            this.handleSubmit(e);
        });
        selectPriceAnnual = ((e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ amount: 19.99 });
            this.handleSubmit(e);
        });
    
    render() {
        return (
        <div className="stripe-container">
            <form className="stripe-form">
            <label>Name</label>
            <input
                type="text"
                className="input"
                value={this.state.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
            />

            <label>CC Number -- Exp. Date -- CVC</label>
            <CardElement className="stripe-card"/>
            <label>Charge it!</label>
            <button onClick={this.selectPriceMonthly}>Monthly: $2.99</button>
            <button onClick={this.selectPriceAnnual}>Annual: $19.99</button>
            </form>
        </div>
        )}
}



interface IFormProps extends ReactStripeElements.InjectedStripeProps{ }

interface IFormState {
    name: string;
    amount: string;
}

export default injectStripe(Form);