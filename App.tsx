import { Provider } from 'react-redux';
import { store } from './app/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import Navigation from './routes/Navigation';

import axios from 'axios';

axios.defaults.baseURL = 'https://project-landc.herokuapp.com/api';
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey="pk_test_51LjHD8CTkCBdW01yDaOLjevZ6SH66rJBPOyHmAh3LNOAEte3OtOprNfwGG5J6qYUij0tNRMGYTfInHcQYX19nAUT006MRJMfHs"
        merchantIdentifier="L&C shop"
        threeDSecureParams={{
          backgroundColor: '#fff',
          timeout: 3,
        }}
      >
        <Navigation />
      </StripeProvider>
    </Provider>
  );
}
