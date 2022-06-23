import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Filme from './pages/Filme';
import Header from './components/Header';
import Page404 from './pages/404';
import Favoritos from './pages/Favoritos';

function RoutesApp(){
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/filme/:id" element={ <Filme/> } />
        <Route path="/favoritos" element={ <Favoritos/> } />

        <Route path="*" element={ <Page404/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;
