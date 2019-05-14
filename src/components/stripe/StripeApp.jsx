import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Navigation from '../Navigation';
import Form from './Form';
import { withRouter } from 'react-router-dom';

class StripeApp extends React.Component {


  render() {
    return (
      <>
        <Navigation />
        <h1>Upgrade Your Account</h1>
        <h3>To receive premium features!</h3>
        <StripeProvider apiKey="pk_test_ojgxSZHYR90grl2IAcjSjgoc00Rn3bEDfA">
          <Elements>
            <Form history={this.props.history}/>
          </Elements>
        </StripeProvider>
      </>
    )
  }
}

export default withRouter(StripeApp);