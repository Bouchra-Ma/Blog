import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './Articles.css';
import { useNavigate } from 'react-router'; 


const Articles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`http://localhost:5000/articles`)
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => alert('Erreur lors du chargement des articles: ' + error));
  }, []);

  
  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Connecte toi d'abord !");
      navigate('/connexion'); 
      return; 
    }

    try {
      if (window.confirm("T'es sûr ?")) {
        const response = await fetch(`http://localhost:5000/articles/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
        console.log('Réponse de la suppression:', response);
       
        if (response.ok) {
          setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
        } else {
          const errorData = await response.json();
          console.error('Erreur détaillée:', errorData);
          alert("Erreur lors de la suppression de l'article.");
        }
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Une erreur est survenue lors de la suppression de l\'article.');
    }
  };

 
  const handleAddArticle = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Connecte toi d'abord !");
      navigate('/connexion'); 
    } else {
      navigate('/AjoutArticle'); 
    }
  };

  return (
    <div className="articles-container">
      <h1 className="articles-title">Mes Articles</h1>
      <button onClick={handleAddArticle}>Ajouter un Article</button>

      <ul className="articles-list">
        {articles.map((article) => (
          <li key={article.id} className="article-item">
            <h2 className="article-title">
              <Link to={`/article/${article.id}`} className="article-link">
                {article.title}
              </Link>
            </h2>
            <p className="article-excerpt">Lire... pour plus de détails</p>

            <button 
              className="delete-button" 
              onClick={() => handleDelete(article.id)} 
              style={{ marginLeft: '500px' }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
