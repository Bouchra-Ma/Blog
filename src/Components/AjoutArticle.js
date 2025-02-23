import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'; 

const AjoutArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category_id, setCategoryId] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Connecte Toi D'abord !");
      navigate('/login'); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Connecte Toi D'abord !");
      return;
    }

    const user_id = 1; 

    const articleData = {
      title,
      content,
      created_at: new Date().toISOString(),
      user_id,
      category_id,
    };

    try {
      const response = await fetch('http://localhost:5000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        navigate('/'); 
      } else {
        alert('Échec de l\'ajout de Ton article');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert('Erreur lors de l\'ajout de l\'article');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ textAlign: 'center', color: '#371b9b' }}>Ajouter un Article</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Titre :</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Contenu :</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Catégorie ID :</label>
            <input
              type="text"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#371b9b',
              color: 'white',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Ajoute Ton Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjoutArticle;
