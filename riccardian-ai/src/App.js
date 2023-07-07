import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";            
import 'primeicons/primeicons.css';                           

import Navbar from './Components/Navbar.componet';
import Landingpage from './pages/Landing.pages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landingpage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
