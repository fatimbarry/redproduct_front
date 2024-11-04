import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Styles existants...
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #4a4a4a;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 4px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoText = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 26.66px;
  font-weight: 700;
  line-height: 21.33px;
  color: #FFFFFF;
`;

const Title = styled.h1`
  font-size: 18px;
  color: #333;
  margin: 0 0 16px 0;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 24px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${props => props.isLoading ? '#666' : '#4a4a4a'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${props => props.isLoading ? '#666' : '#333'};
  }
`;

const BackLink = styled.div`
  margin-top: 24px;
  text-align: center;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 14px;
    
    span {
      color: #ffd700;
    }
    
    &:hover span {
      text-decoration: underline;
    }
  }
`;

const Alert = styled.div<{ type: 'success' | 'error' }>`
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  background-color: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
  font-size: 14px;
`;

const Spinner = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ animation: 'spin 1s linear infinite' }}
  >
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <path 
      d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16" 
      fill="white"
    />
  </svg>
);



const PasswordResetPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Réinitialiser l'état d'alerte
    setAlert({ show: false, message: '', type: 'success' });

    // Valider l'email
    if (!validateEmail(email)) {
      setAlert({
        show: true,
        message: 'Veuillez entrer une adresse e-mail valide',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Appel à votre API pour la réinitialisation du mot de passe
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      // Afficher le message de succès
      setAlert({
        show: true,
        message: 'Les instructions de réinitialisation ont été envoyées à votre adresse e-mail',
        type: 'success'
      });

      // Rediriger vers la page de connexion après 3 secondes
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (error) {
      setAlert({
        show: true,
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Logo>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66602 2.66624H29.3286V29.3288L2.66602 2.66624Z" fill="white"/>
            <path d="M2.66602 2.66624H22.663L15.9973 15.9975L2.66602 2.66624Z" fill="black" fillOpacity="0.15"/>
            <path d="M2.66602 2.66624H15.9973L2.66602 29.3288V2.66624Z" fill="white"/>
          </svg>
          <LogoText>RED PRODUCT</LogoText>
        </Logo>
      <Card>
        <form onSubmit={handleSubmit}>
          <Title>Mot de passe oublié?</Title>
          
          {alert.show && (
            <Alert type={alert.type}>
              {alert.message}
            </Alert>
          )}
          
          <Description>
            Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la façon de modifier votre mot de passe.
          </Description>
          
          <Input
            type="email"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner />
                Envoi en cours...
              </>
            ) : (
              'Envoyer'
            )}
          </Button>
        </form>
      </Card>
      <BackLink>
        <Link href="/login">
          Revenir à la <span>connexion</span>
        </Link>
      </BackLink>
    </Container>
  );
};

export default PasswordResetPage;