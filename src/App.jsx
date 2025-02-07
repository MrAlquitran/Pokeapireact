import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Componentes/Landing';
import Login from './Componentes/Login';
import ListaPokemon from './Componentes/ListaPokemon';
import Detalle from './Componentes/Detalle';
import Error404 from './Componentes/Error404';
import JuegoAhorcado from './Componentes/Juego';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listapokemon" element={<ListaPokemon />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/detalle/:name" element={<Detalle />} />
        <Route path="/error" element={<Error404 />} />
        <Route path="/juego" element={<JuegoAhorcado />} />
        
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
};

export default App;
