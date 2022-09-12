import { Route, Routes } from 'react-router-dom';
import List from './components/shoppingList/List';
import Login from './components/login/Login';
import Header from './components/header/Header'
import RecipePicker from './components/recipes/RecipePicker'
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="yourlist" element={<List />} />
          <Route path="recipepicker" element={<RecipePicker />} />
        </Routes>
      </main>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
