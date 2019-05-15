import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import '../../index';
import './Stripe.css';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: ''
        }
    }

        componentDidUpdate(previousProps, previousState) {
                console.log(this.state);
        }

        handleSubmit = async (e) => {
            e.preventDefault();
            try {
                let token = await this.props.stripe.createToken({ name: this.state.name });
                console.log(token);
                this.props.history.push('/settings')
            }catch(e) {
                throw e;
            }
        }

        
        selectPriceMonthly = ((e) => {
            this.setState({ amount: "2.99" })
            this.handleSubmit(e);
        });

        selectPriceAnnual = ((e) => {
            this.setState({ amount: "19.99" });
            this.handleSubmit(e);
        });

    
    render() {
        return (
        <div className="stripe-container">
            <h1>Upgrade Your Account</h1>
            <h2>To receive premium features!</h2>
            <form className="stripe-form">
                <div className="form-div">
                    <label>Name</label>
                    <input
                        type="text"
                        className="input"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    <CardElement className="stripe-card"/>
                    <label className="charge">Charge it!</label>
                    <button class="btn" onClick={this.selectPriceMonthly}>1000 swipes: $2.99</button>
                    <button class="btn" onClick={this.selectPriceAnnual}>Annual: $49.99</button>
                </div>
            </form>
        </div>
        )}
}

export default injectStripe(Form);