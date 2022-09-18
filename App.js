import { Provider } from 'react-redux';
import { store } from './app/store';
import Navigation from './routes/Navigation';

import axios from 'axios';

axios.defaults.baseURL = 'https://project-landc.herokuapp.com/api';
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
