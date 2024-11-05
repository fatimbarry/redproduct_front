// pages/register.js
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Swal from 'sweetalert2';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(73, 76, 79, 0.7), rgba(73, 76, 79, 0.7)), url('/background.png') center/cover no-repeat fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; /* L'image reste fixe pendant le défilement */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FormContainer = styled.div`
  width: 384px;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  color: #333;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 1rem;
  padding: 0 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #474A4D;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background: #474A4D;
  color: white;
  border: none;
  border-radius: 4px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  
  &:hover {
    background: #5a5d61;
  }
  
  &:disabled {
    background: #9a9a9a;
    cursor: not-allowed;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  color: #666;
  
  a {
    color: #FFB800;
    text-decoration: none;
    margin-left: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LogoText = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 26.66px;
  font-weight: 700;
  line-height: 21.33px;
  color: #FFFFFF;
`;

// Style personnalisé pour le toast
const showToast = (message, type = 'success') => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast',
      title: 'toast-title'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
};

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Données envoyées:', formData); // Log des données envoyées
      
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log('Réponse du serveur:', response.data);
      showToast('Inscription réussie ! Redirection...', 'success');
      setTimeout(() => {
      router.push('/login');
      }, 3000);
    } catch (err) {
      console.error('Erreur complète:', err); // Log de l'erreur complète
      console.error("Message d'erreur:", err.message);
      console.error('Réponse du serveur:', err.response); // Log de la réponse d'erreur
      
      if (err.response) {
        // Le serveur a répondu avec un statut d'erreur
        setError(`Erreur ${err.response.status}: ${err.response.data.message || 'Une erreur est survenue'}`);
      } else if (err.request) {
        // La requête a été faite mais pas de réponse reçue
        setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        setError(`Erreur: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageContainer>
      <BrandContainer>
        <Logo>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66602 2.66624H29.3286V29.3288L2.66602 2.66624Z" fill="white"/>
            <path d="M2.66602 2.66624H22.663L15.9973 15.9975L2.66602 2.66624Z" fill="black" fillOpacity="0.15"/>
            <path d="M2.66602 2.66624H15.9973L2.66602 29.3288V2.66624Z" fill="white"/>
          </svg>
          <LogoText>RED PRODUCT</LogoText>
        </Logo>
      </BrandContainer>

      <FormContainer>
        <FormTitle>Inscrivez-vous en tant que Admin</FormTitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Nom"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <CheckboxContainer>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
            <label>Accepter les termes et la politique</label>
          </CheckboxContainer>

          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

          <Button type="submit" disabled={loading}>
            {loading ? <Loader size={24} className="animate-spin" /> : "S'inscrire"}
          </Button>
        </form>

        <LoginPrompt>
          Vous avez déjà un compte?
          <Link href="/login">Se connecter</Link>
        </LoginPrompt>
      </FormContainer>
    </PageContainer>
  );
}