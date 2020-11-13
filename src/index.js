
import React from 'react';
import ReactDOM from 'react-dom';
import WordContainer from './word_container.js'
import './index.css'
const App = ()=> {
  return (
    <div>
      <WordContainer />
    </div>
  );
  }

ReactDOM.render(<App/>, document.querySelector('#root'));
