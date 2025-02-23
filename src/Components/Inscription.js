import React, { useState } from 'react';
import './Inscription.css'; 
import { useNavigate } from 'react-router'; 

const Inscription = () => {
  const [firstname, setFirstname] = useState(''); 
  const [lastname, setLastname] = useState('');   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const navigate = useNavigate(); 
  
  const handleSubmit = (e) => {
    e.preventDefault();

//    là on fais appell à l'api pour envoyé les donées
    fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, email, password }), 
    })
      .then(response => {
        if (response.ok) {
         
          navigate('/connexion');
        } else {
          alert('Inscription échouée');
        }
      })
      .catch(error => alert(error));
  };

  return (
    <div className="register-container">
      <h2>Créer Ton Compte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom:</label> 
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Nom:</label>  
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}  
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Inscription;
