// pages/login.js
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loader } from 'lucide-react';
import { useState, useEffect } from 'react'; 


const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(73, 76, 79, 0.7), rgba(73, 76, 79, 0.7)), url('/background.png') center/cover no-repeat fixed;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const LogoText = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 26.66px;
  font-weight: 700;
  line-height: 21.33px;
  color: #FFFFFF;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #666;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -0.5rem;

  input {
    width: auto;
  }

  label {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4a4d50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a3d40;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const Links = styled.div`
  text-align: center;
  margin-top: 1.5rem;

  a {
    color: #f0b500;
    text-decoration: none;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    color: #666;
    font-size: 0.9rem;
    margin-top: 1rem;

    a {
      color: #f0b500;
      margin-left: 0.5rem;
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const showToast = (message, type = 'success') => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
  
      if (response.data.token && isClient) {
        localStorage.setItem('token', response.data.token);
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
      }
  
      showToast('Connexion réussie !');
      
      setTimeout(() => {
        router.push('/page');
      }, 3000);
  

    } catch (err) {
      console.error('Erreur détaillée:', {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status
      });

      let errorMessage = 'Erreur lors de la connexion';
      
      if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Le serveur n\'est pas accessible. Vérifiez que le backend est démarré.';
      } else if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = 'Email ou mot de passe invalide';
            break;
          case 401:
            errorMessage = 'Identifiants incorrects';
            break;
          case 404:
            errorMessage = 'Service non trouvé';
            break;
          case 500:
            errorMessage = 'Erreur serveur interne';
            break;
          default:
            errorMessage = err.response.data?.message || 'Erreur lors de la connexion';
        }
      }

      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
};
if (!isClient) {
  return (
    <Container>
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

      <LoginCard>
        <Title>Connectez-vous en tant que Admin</Title>
        <Form onSubmit={handleSubmit}>
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
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label>Gardez-moi connecté</label>
          </CheckboxContainer>
          <Button type="submit" disabled={loading}>
          {loading ? <Loader size={24} className="animate-spin" />: 'Se connecter'}
          </Button>
        </Form>
        <Links>
        <Link href="/reset-password">Mot de passe oublié?</Link>
          <p>
            
            Don&apos;t have an account?
            <Link href="/register">S'inscrire</Link>
          </p>
        </Links>
      </LoginCard>
    </Container>
  );
}
}  
  
