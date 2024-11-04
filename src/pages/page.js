"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {  Search,  Bell, User, LogOut, LayoutDashboard, Building2} from 'lucide-react';
import styled from 'styled-components';
import CreateHotelModal from './CreateHotelModal';
import axios from "axios";


const PriceContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
`;

//List hotels
const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; // Utilise toute la hauteur de la fenêtre
    background-color: #f5f5f5;
    overflow: hidden; // Empêche le double scroll
`;

const Header = styled.header`
    display: flex;
    height: 50px;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
`;

const HeaderLeft = styled.div`
    width: 200px;
    background-color: #464646;
    display: flex;
    align-items: center;
    padding: 0 1rem;

    a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: white;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
    }
`;

const HeaderRight = styled.div`
    flex: 1;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

const PageTitle = styled.div`
    color: #333;
    font-size: 14px;
    font-weight: 500;
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 6px 12px;

    input {
        border: none;
        outline: none;
        font-size: 14px;
        color: #666;
        background: transparent;
        width: 200px;

        &::placeholder {
            color: #999;
        }
    }

    &:focus-within {
        border-color: #999;
    }
`;

const IconButton = styled.button`
    cursor: pointer;
    padding: 5px;
    border: none;
    background: none;
    border-radius: 50%;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const NotificationBadge = styled.div`
    position: relative;
    cursor: pointer;

    &::after {
        content: '';
        position: absolute;
        top: -2px;
        right: -2px;
        width: 8px;
        height: 8px;
        background-color: #FFC107;
        border-radius: 50%;
    }
`;

const MainContainer = styled.div`
    display: flex;
    flex: 1;
    height: calc(100vh - 50px); // Soustrait la hauteur du header
    overflow: hidden; // Empêche le scroll du container principal
`;

// const Sidebar = styled.div`
//     width: 200px;
//     background-color: #464646;
//     color: white;
//     display: flex;
//     flex-direction: column;
// `;
const Sidebar = styled.div`
    width: 200px;
    background-image: linear-gradient(rgba(73, 76, 79, 0.7), rgba(73, 76, 79, 0.7)), url('/background.png') center/cover no-repeat fixed;
    background-size: cover;
    color: white;
    height: 100%;
    position: sticky;
    top: 50px; // Même hauteur que le header
    left: 0;
    overflow-y: auto; // Permet le défilement si le contenu de la sidebar est trop long
    
`;

const SidebarOverlay = styled.div`
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 10;
`;

const ProfileSection = styled.div`
    margin-top: auto;
    margin-bottom: 5rem;
`;

const Divider = styled.div`
    margin: 0 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProfileInfo = styled.div`
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.625rem;
`;

const Avatar = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4b5563;
    font-size: 0.875rem;
    font-weight: 500;
`;



const MenuItemLink = styled(Link)`
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 14px;
    text-decoration: none;
    color: white;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    ${props => props.$isActive && `
        background-color: rgba(255, 255, 255, 0.1);
    `}
`;

const MainContent = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto; // Permet le défilement du contenu principal
    height: 100%;
`;

const HotelsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const HotelsTitle = styled.h1`
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    color: #333;
`;

const AddHotelButton = styled.button`
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;

    &:hover {
        background-color: #f5f5f5;
        border-color: #999;
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const HotelsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 24px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const HotelCard = styled.div`
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const HotelImage = styled.div`
    height: 192px;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    background-color: #f5f5f5;
`;

const HotelInfo = styled.div`
    padding: 16px;
`;

const HotelAddress = styled.div`
    font-size: 12px;
    color: #8D4B38;;
    margin-bottom: 4px;
`;

const HotelName = styled.h3`
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
`;



const Price = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
`;

const PriceUnit = styled.span`
    font-size: 12px;
    color: #6B7280;
`;


const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    small {
        color: #999;
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #dc3545;
    background-color: rgba(220, 53, 69, 0.1);
    border-radius: 8px;
    margin: 20px 0;

    h3 {
        margin: 0 0 10px 0;
        color: #dc3545;
    }

    p {
        margin: 0;
        color: #666;
    }
`;

const RetryButton = styled.button`
    margin-top: 15px;
    padding: 8px 16px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background: #c82333;
    }
`;

export default function HotelsListPage() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const getImageUrl = (photoPath) => {
        if (!photoPath) return null;
        const url = `${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}/uploads/${photoPath}`;
        console.log('URL générée pour l\'image:', url);
        return url;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get('http://localhost:5000/api/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });
    
                console.log("Réponse complète :", response);
                console.log("Contenu de response.data :", response.data);
    
                if (response.data) {  // Modification ici
                    setUser(response.data);  // Et ici
                } else {
                    throw new Error('Aucune donnée utilisateur trouvée');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, []);



    const navigationLinks = [

        {
            href: "/dashboard",
            icon: <LayoutDashboard size={18} />,
            label: "Dashboard"
        },
        {
            href: "/hotels-list",
            icon: <Building2 size={18} />,
            label: "Liste des hôtels"
        }
    ];

    
const fetchHotels = async () => {
    try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Non authentifié. Veuillez vous connecter.');
            setHotels([]);
            return;
        }

        console.log("Envoi de la requête avec token:", token);

        const response = await axios.get('http://localhost:5000/api/hotels', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log("Réponse brute:", response);
        console.log("Données reçues:", response.data);

        // Vérification plus détaillée de la réponse
        if (typeof response.data === 'string') {
            console.error("Réponse reçue sous forme de chaîne:", response.data);
            setError(`Structure de réponse invalide. Reçu: "${response.data}"`);
            setHotels([]);
            return;
        }

        if (response.data && response.data.data) {
            setHotels(response.data.data);
            // setMetadata(response.data.metadata); // Si vous gérez la pagination
        } else {
            console.warn("Structure de réponse inattendue:", response.data);
            setError('Format de données incorrect');
            setHotels([]);
        }
    } catch (err) {
        console.error("Erreur complète:", err);
        
        if (err.response) {
            console.error("Détails de l'erreur:", {
                status: err.response.status,
                data: err.response.data,
                headers: err.response.headers
            });
            setError(err.response.data.message || 'Erreur lors de la récupération des hôtels');
        } else {
            setError('Erreur de connexion au serveur');
        }
        
        setHotels([]);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchHotels();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';  // Redirection vers la page de login
    };

    const filteredHotels = hotels.filter(hotel =>
        hotel.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardContainer>

            <Header>
                <HeaderLeft>
                    <Link href="/" className="text-white text-sm font-medium no-underline">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66602 2.66624H29.3286V29.3288L2.66602 2.66624Z" fill="white"/>
                        <path d="M2.66602 2.66624H22.663L15.9973 15.9975L2.66602 2.66624Z" fill="black" fillOpacity="0.15"/>
                        <path d="M2.66602 2.66624H15.9973L2.66602 29.3288V2.66624Z" fill="white"/>
                    </svg>
                        RED PRODUCT
                    </Link>
                </HeaderLeft>
                <HeaderRight>
                    <PageTitle>Liste des hôtels</PageTitle>
                    <HeaderActions>
                        <SearchBar>
                            <Search size={16} color="#999" />
                            <input
                                placeholder="Rechercher un hôtel..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </SearchBar>
                        <NotificationBadge>
                            <Bell size={18} color="#666" />
                        </NotificationBadge>
                        <IconButton>
                            <User size={18} color="#666" />
                        </IconButton>
                        <IconButton onClick={handleLogout}>
                            <LogOut size={18} color="#666" />
                        </IconButton>
                    </HeaderActions>
                </HeaderRight>
            </Header>

            <MainContainer>
                <Sidebar>
                    <SidebarOverlay />
                    <MenuContainer>
                        <div className="flex-1">
                            <div className="py-2.5">
                                <MenuItemLink href={'/dashboard'}>
                                    Principal
                                </MenuItemLink>
                                {navigationLinks.map((link) => (
                                    <MenuItemLink
                                        key={link.href}
                                        href={link.href}
                                        $isActive={pathname === link.href}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </MenuItemLink>
                                ))}
                            </div>
                        </div>

                        <ProfileSection>
                            <Divider />
                            <ProfileInfo>
                                <Avatar>
                                    {user?.email ? user.email[0].toUpperCase() : 'U'}
                                </Avatar>
                                <div className="text-sm">
                                    <p className="m-0 text-white small-text">
                                        {user?.username || 'Utilisateur'}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <p className="m-0 text-xs text-gray-400">en ligne</p>
                                    </div>
                                </div>
                            </ProfileInfo>
                        </ProfileSection>

                    </MenuContainer>
                </Sidebar>

                <MainContent>
                    <HotelsHeader>
                        <HotelsTitle>Hôtels ({filteredHotels.length})</HotelsTitle>
                        <AddHotelButton
                            onClick={() => setIsModalOpen(true)} // Modifié pour ouvrir le modal
                            disabled={loading}
                        >
                            {loading ? 'Chargement...' : '+ Créer un nouveau hôtel'}
                        </AddHotelButton>
                    </HotelsHeader>

                    {loading && (
                        <LoadingMessage>
                            <p>Chargement des hôtels...</p>
                            <small>Vérification authentification...</small>
                        </LoadingMessage>
                    )}

                    {error && (
                        <ErrorMessage>
                            <h3>Erreur</h3>
                            <p style={{ whiteSpace: 'pre-line' }}>{error}</p>
                            <RetryButton onClick={fetchHotels}>
                                Réessayer
                            </RetryButton>
                        </ErrorMessage>
                    )}



                    {!loading && !error && filteredHotels.length === 0 && (
                        <LoadingMessage>
                            <p>Chargement des hôtels...</p>
                            <small>Vérification authentification...</small>
                        </LoadingMessage>
                    )}

                    {error && (
                        <ErrorMessage>
                            <h3>Erreur</h3>
                            <p style={{ whiteSpace: 'pre-line' }}>{error}</p>
                            <RetryButton onClick={fetchHotels}>
                                Réessayer
                            </RetryButton>
                        </ErrorMessage>
                    )}


                    {!loading && !error && (
                        <HotelsGrid>
                            {filteredHotels.map((hotel) => (
                                <HotelCard key={hotel.id} hotel={hotel}>
                                    <HotelImage
                                        src={getImageUrl(hotel.photo)} 
                                        alt={hotel.nom}
                                    />
                                    <HotelInfo>
                                        <HotelAddress>{hotel.adresse}</HotelAddress>
                                        <HotelName>{hotel.nom}</HotelName>
                                        <PriceContainer>
                                            <Price>
                                                {parseInt(hotel.prix).toLocaleString()} XOF
                                            </Price>
                                            <PriceUnit>par nuit</PriceUnit>
                                        </PriceContainer>
                                    </HotelInfo>
                                </HotelCard>
                            ))}
                        </HotelsGrid>
                    )}

                    {!loading && !error && filteredHotels.length === 0 && (
                        <LoadingMessage>Aucun hôtel trouvé</LoadingMessage>
                    )}
                    <CreateHotelModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={() => {
                            fetchHotels();
                        }}
                    />
                </MainContent>
            </MainContainer>
        </DashboardContainer>
    );
}



