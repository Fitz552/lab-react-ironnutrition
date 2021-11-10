import React from 'react';
import FoodList from './FoodList';
import 'bulma/css/bulma.css';
import foods from "./foods.json"

function App() {
  return (
    <div className="App">
      <FoodList foods={foods}/>
    </div>
  );
}

export default App;