import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Navigation from '../Navigation';
import Form from './Form';

export default class StripeApp extends React.Component<IAppProps, IAppState> {


  render() {
    return (
      <>
        <Navigation />
        <h1>Upgrade Your Account</h1>
        <h3>To receive premium features!</h3>
        <StripeProvider apiKey="pk_test_ojgxSZHYR90grl2IAcjSjgoc00Rn3bEDfA">
          <Elements>
            <Form />
          </Elements>
        </StripeProvider>
      </>
    )
  }
}


interface IAppProps { }

interface IAppState { }