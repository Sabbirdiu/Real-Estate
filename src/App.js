import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ListingDetail from './pages/ListingDetail';
import AboutRealtor from './pages/AboutRealtor'
import Listings from './pages/Listings';
import SignIn from './pages/SignIn';
import Signup from './pages/SignUp';
import Layout from './hocs/Layout';
import NotFound from './components/NotFound';

import { Provider } from 'react-redux';
import store from './redux/store';
import './sass/main.scss';

import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/aboutre' component={AboutRealtor} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/listings' component={Listings} />
            <PrivateRoute exact path='/listings/:id' component={ListingDetail} />
            {/* <Route exact path='/listings/:id' component={ListingDetail} /> */}
            <Route exact path='/login' component={SignIn} />
            <Route exact path='/signup' component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
