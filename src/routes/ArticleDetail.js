import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'; 
import './ArticleDetail.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const ArticleDetail = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  
  const [editedArticle, setEditedArticle] = useState({ title: '', content: '' });  
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`http://localhost:5000/articles/${id}`)
      .then(response => response.json())
      .then(data => {
        setArticle(data);
        setEditedArticle({ title: data.title, content: data.content }); 
      })
      .catch(error => alert(error));
  }, [id]);

  const handleTitleClick = () => {
    setShowDetails(true);
  }; 

  

  const handleEdit = () => {
    setIsEditing(true); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArticle({ ...editedArticle, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/articles/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(editedArticle),
      });

      const data = await response.json();
      if (response.ok) {
        setArticle(editedArticle); 
        setIsEditing(false); 
      } else {
        console.error("Erreur de mise à jour:", data);
        alert("Échec de la mise à jour de l'article.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("C bon ta modification est enregistrée.");
      navigate('/'); 
    }
  };

  return (
    <div className="article-detail-container">
      {article && (
        <h2 onClick={handleTitleClick} style={{ cursor: 'pointer', color: '#26098d' }}>
          {article.title}
        </h2>
      )}

      {showDetails && !isEditing && (
        <div>
          <p>{article.content}</p>
          <p>{article.created_at}</p>
          <p>{article.user_id}</p>
          <p>{article.category_id}</p>
          <div className="buttons-container">
            <button className="button" onClick={handleEdit}>
              <i className="fas fa-edit"></i> Modifier
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <div>
          
          <label>
            Titre :
            <input
              type="text"
              name="title"
              value={editedArticle.title}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Contenu :
            <textarea
              name="content"
              value={editedArticle.content}
              onChange={handleChange}
            />
          </label>
          <br />
          <div className="buttons-container">
            <button className="button" onClick={handleSave}>Enregistrer</button>
            <button className="button" onClick={() => setIsEditing(false)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
