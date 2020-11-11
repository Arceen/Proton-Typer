
import React from 'react';
import ReactDOM from 'react-dom';
import WordContainer from './word_container.js'
const App = ()=> {
  return (
    <div>
      Hello
      <WordContainer />
    </div>
  );
  }

ReactDOM.render(<App/>, document.querySelector('#root'));
