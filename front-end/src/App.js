import React from 'react';
import Header from '../src/components/Header/header';
import Routes from './routes';
import Footer from '../src/components/Footer/';
import moment from 'moment';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
