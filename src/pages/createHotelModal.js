import React, { useState } from 'react';
import { X, ImagePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    padding: 24px;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
    margin: 0;
    font-size: 18px;
    color: #333;
    font-weight: 500;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InputRow = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
`;

const InputGroup = styled.div`
    flex: 1;
`;

const Label = styled.label`
    display: block;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #666;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    background-color: white;

    &:focus {
        outline: none;
        border-color: #666;
    }
`;

const ImageUploadArea = styled.div`
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    cursor: pointer;
    margin-top: 12px;

    &:hover {
        border-color: #666;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #464646;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 12px;

    &:hover {
        background-color: #333;
    }

    &:disabled {
        background-color: #999;
        cursor: not-allowed;
    }
`;

const CreateHotelModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        email: '',
        contactinfo: '',
        prix: '',
        devise: 'F XOF',
        adresse: '',
        photo: null
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const loadingToastId = toast.loading('Création de l\'hôtel en cours...');
        
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            
            // Ajout des champs textuels
            data.append('nom', formData.nom);
            data.append('description', formData.description || '');
            data.append('email', formData.email);
            data.append('contactinfo', formData.contactinfo);
            data.append('prix', formData.prix);
            data.append('devise', formData.devise);
            data.append('adresse', formData.adresse);
            
            // Ajout de la photo avec vérification
            if (formData.photo) {
                console.log('Photo à uploader:', formData.photo);
                console.log('Type de la photo:', formData.photo.type);
                console.log('Nom de la photo:', formData.photo.name);
                data.append('photo', formData.photo);
            }
            
            // Log du contenu complet du FormData
            console.log('Contenu du FormData:');
            for (let [key, value] of data.entries()) {
                console.log(`${key}: ${value instanceof File ? `File(${value.name})` : value}`);
            }
            
            const response = await fetch('http://localhost:5000/api/hotels', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });
            
            // Log de la réponse brute
            console.log('Status de la réponse:', response.status);
            
            const responseData = await response.json();
            console.log('Response Data:', responseData);
            
            if (response.ok) {
                toast.success('L\'hôtel a été créé avec succès!', {
                    id: loadingToastId,
                    duration: 3000
                });
                onSuccess?.();
                onClose();
                setFormData({
                    nom: '',
                    description: '',
                    email: '',
                    contactinfo: '',
                    prix: '',
                    devise: 'F XOF',
                    adresse: '',
                    photo: null
                });
            } else {
                throw new Error(responseData.message || 'Erreur lors de la création de l\'hôtel');
            }
        } catch (error) {
            console.error('Erreur complète:', error);
            toast.error(
                `Erreur: ${error.message || 'Une erreur est survenue lors de la création de l\'hôtel'}`,
                {
                    id: loadingToastId,
                    duration: 5000
                }
            );
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('Fichier sélectionné:', file);
        setFormData(prev => ({
            ...prev,
            photo: file
        }));
    };
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>CRÉER UN NOUVEAU HÔTEL</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <X size={20} />
                    </CloseButton>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                    <InputRow>
                        <InputGroup>
                            <Label>Nom hôtel</Label>
                            <Input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                placeholder="CAP Marniane"
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>Adresse</Label>
                            <Input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                                placeholder="Les îles du saloum, Mar Lodj"
                                required
                            />
                        </InputGroup>
                    </InputRow>

                    <InputRow>
                        <InputGroup>
                            <Label>E-mail</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="information@gmail.com"
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>Numéro de téléphone</Label>
                            <Input
                                type="tel"
                                name="contactinfo"
                                value={formData.contactinfo}
                                onChange={handleChange}
                                placeholder="+221 77 777 77 77"
                                required
                            />
                        </InputGroup>
                    </InputRow>

                    <InputRow>
                        <InputGroup>
                            <Label>Prix par nuit</Label>
                            <Input
                                type="text"
                                name="prix"
                                value={formData.prix}
                                onChange={handleChange}
                                placeholder="25.000"
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>Devise</Label>
                            <Select
                                name="devise"
                                value={formData.devise}
                                onChange={handleChange}
                                required
                            >
                                <option value="F XOF">F XOF</option>
                                <option value="Euro">Euro</option>
                                <option value="Dollar">Dollar</option>
                            </Select>
                        </InputGroup>
                    </InputRow>

                    <InputGroup>
                        <Label>Ajouter une photo</Label>
                        <ImageUploadArea>
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                                <label htmlFor="photo" style={{ cursor: 'pointer' }}>
                                <ImagePlus size={24} color="#666" style={{ margin: '0 auto' }} />
                                <p style={{ margin: '8px 0 0', color: '#666', fontSize: '14px' }}>
                                    {formData.photo ? formData.photo.name : 'Ajouter une photo'}
                                </p>
                            </label>
                        </ImageUploadArea>
                    </InputGroup>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Création en cours...' : 'Enregistrer'}
                    </SubmitButton>
                </Form>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default CreateHotelModal;