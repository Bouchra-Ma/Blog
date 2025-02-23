
import React from 'react';
import Articles from './Components/Articles';
import ArticleDetail from './routes/ArticleDetail';
import { Routes, Route } from 'react-router';
import Header from './Components/Header';
import Inscription from './Components/Inscription';
import Connexion from './Components/Connexion';
import AjoutArticle from './Components/AjoutArticle';
import { useTheme } from './Components/ThemeContext'; 

function App() {
  const { theme } = useTheme(); 

  return (
    <div className={`App ${theme === 'light' ? 'light-mode' : 'dark-mode'}`}> 
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/AjoutArticle" element={<AjoutArticle />} />
      </Routes>
    </div>
  );
}

export default App;






