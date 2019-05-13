import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Form from './Form';

export default class App extends React.Component<IAppProps, IAppState> {





  render() {
    return (
      <>
      <StripeProvider api="pk_test_ojgxSZHYR90grl2IAcjSjgoc00Rn3bEDfA">
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