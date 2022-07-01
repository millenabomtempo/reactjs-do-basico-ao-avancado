import { Router } from "react-router-dom";
import { Provider } from 'react-redux';

import history from './services/history'
import store from "./store";

import Header from "./components/Header";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header/>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
