import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCArdForm from './SimpleCArdForm';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe('pk_test_51J1AjGFZ5I1NprVm1n4zmvYFV1yBKycy8Te0eJsnoZtwVw7HaPphpZXTucrVRby8Upirqjnrx7zzB5nlG4lkmIRx00eFZV8kZM');

const ProcessPayment = ({handlePayment}) => {
    return (

            <Elements stripe={stripePromise}>
                <SimpleCArdForm handlePayment={handlePayment}></SimpleCArdForm>
            </Elements>

    );
};

export default ProcessPayment;