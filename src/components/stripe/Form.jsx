import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import '../../index';
import './Stripe.css';
import { firebase, auth } from '../../firebase';
import { toast } from 'react-toastify';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      amount: ''
    };
  }

  addOneHundoSwipes = async () => {
    const user = auth.getCurrentUser();
    const userProfileRef = firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid);
    const userProSnapShot = await userProfileRef.get();
    const userProData = userProSnapShot.data();
    firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid)
      .update({ swipes_remaining: userProData.swipes_remaining + 100 })
      .then(function() {
        toast.success('100 swipes added to your account. Get swiping!');
      });
  };

  addTwoFittySwipes = async () => {
    const user = auth.getCurrentUser();
    const userProfileRef = firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid);
    const userProSnapShot = await userProfileRef.get();
    const userProData = userProSnapShot.data();
    firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid)
      .update({ swipes_remaining: userProData.swipes_remaining + 250 })
      .then(function() {
        toast.success('250 swipes added to your account. Get swiping!');
      });
  };

  addOneThouSwipes = async () => {
    const user = auth.getCurrentUser();
    const userProfileRef = firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid);
    const userProSnapShot = await userProfileRef.get();
    const userProData = userProSnapShot.data();
    firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid)
      .update({ swipes_remaining: userProData.swipes_remaining + 1000 })
      .then(function() {
        toast.success('1,000 swipes added to your account. Get swiping!');
      });
  };

  purchaseOneHundo = e => {
    this.setState({ amount: '2.99' });
    this.handleSubmit(e);
  };

  purchaseTwoFitty = e => {
    this.setState({ amount: '5.99' });
    this.handleSubmit(e);
  };

  purchaseOneThou = e => {
    this.setState({ amount: '9.99' });
    this.handleSubmit(e);
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let token = await this.props.stripe.createToken({ name: this.state.name });
      if (token.error) {
        console.log('Invalid Payment Credentials');
        // TODO: add toast alert ==> invalid payment credentials
      } else if (token.token) {
        if (this.state.amount === '2.99') {
          this.addOneHundoSwipes();
          this.props.history.push('/settings');
        } else if (this.state.amount === '5.99') {
          this.addTwoFittySwipes();
          this.props.history.push('/settings');
        } else if (this.state.amount === '9.99') {
          this.addOneThouSwipes();
          this.props.history.push('/settings');
        }
        console.log('Valid');
      }
    } catch (e) {
      throw e;
    }
  };

  render() {
    return (
      <div className="stripe-container">
        <h1>Get More Swipes</h1>
        <h2>And Get More Matches!</h2>
        <form className="stripe-form">
          <div className="form-div">
            <label>Name on Card:</label>
            <input
              type="text"
              className="input"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <div id="cc-input">
            <CardElement className="stripe-card" />
            </div>
            <label className="charge">Charge it!</label>
            <div className="stripe-btns-container">
            <button className="stripe-btn" onClick={this.purchaseOneHundo}>
              100 swipes: <br/>$2.99
            </button>
            <button className="stripe-btn" onClick={this.purchaseTwoFitty}>
              250 swipes: <br/> $5.99
            </button>
            <button className="stripe-btn" onClick={this.purchaseOneThou}>
              1000 swipes: <br/> $9.99
            </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default injectStripe(Form);
