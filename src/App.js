import React, { Component } from 'react';
import './App.css';
import { CatChoice } from './Components/CatChoice';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Which of these is a cat?
          </p>
        </header>
        <CatChoice />
      </div>
    );
  }
}

export default App;
