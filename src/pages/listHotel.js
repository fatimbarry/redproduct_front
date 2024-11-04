import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Search, 
  Plus,
  Bell,
  ChevronRight,
  LogOut,
  Flag,
  LayoutGrid,
  List
} from 'lucide-react';
import styled from 'styled-components';


// Styled components existants avec modifications
const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;


const Content = styled.div`
  padding: 2rem;
`;
const HotelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const HotelCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
`;

const HotelInfo = styled.div`
  padding: 1rem;
  
  .location {
    font-size: 0.75rem;
    color: #718096;
    margin-bottom: 0.25rem;
  }
  
  .name {
    font-weight: 600;
    color: #2D3748;
    margin-bottom: 0.5rem;
  }
  
  .price {
    color: #4A5568;
    font-size: 0.875rem;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4A5568;
  cursor: pointer;
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: #2D3748;
  padding: 1.25rem;
  position: fixed;
  height: 100vh;
`;

const Logo = styled.div`
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavItem = styled.div`
  color: #E2E8F0;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  
  &.active {
    background-color: #4A5568;
    border-radius: 0.375rem;
  }
`;

// Modification du UserSection avec border-top
const UserSection = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 1.25rem;
  color: white;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const UserInfo = styled.div`
  font-size: 0.875rem;
  
  .status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #A3A3A3FF;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      background-color: #48BB78;
      border-radius: 50%;
    }
  }
`;

const MainContent = styled.div`
  margin-left: 280px;
  flex: 1;
  background-color: #F7FAFC;
`;

const Header = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #E2E8F0;
`;

// Modification du TopHeader pour le nouveau layout
const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  .right-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 240px;
  
  input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 1px solid #E2E8F0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    
    &::placeholder {
      color: #A0AEC0;
    }
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #A0AEC0;
    width: 16px;
    height: 16px;
  }
`;

const NotificationBadge = styled.div`
  position: relative;
  
  .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    background-color: #F6AD55;
    color: white;
    font-size: 0.625rem;
    padding: 0.125rem 0.25rem;
    border-radius: 9999px;
    min-width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Nouveau composant pour le header inférieur
const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
`;


const HotelCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4A5568;
  font-size: 0.875rem;

  .count {
    color: #A0AEC0;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #E2E8F0;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #4A5568;
  font-size: 0.875rem;
  cursor: pointer;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// ... Autres styled components restent identiques

export default function HotelManagement() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Fetch hotels from API
  useEffect(() => {
    fetchHotels();
  }, []);

  // Filter hotels based on search term
  useEffect(() => {
    if (Array.isArray(hotels)) { // Check if hotels is an array
      const filtered = hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHotels(filtered);
    }
  }, [hotels, searchTerm]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/hotels');
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = await response.json();
      setHotels(data);
      setFilteredHotels(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des hôtels');
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Sidebar>
        <Logo>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h18v18H3z"/>
          </svg>
          RED PRODUCT
        </Logo>
        
        <nav>
          <NavItem>Dashboard</NavItem>
          <LayoutGrid className="h-5 w-5" />
          <NavItem className="active">Liste des hôtels</NavItem>
        </nav>
        
        <UserSection>
          <UserAvatar src="/api/placeholder/40/40" alt="Profile" />
          <UserInfo>
            <div>Mouhamet Badiane</div>
            <div className="status">en ligne</div>
          </UserInfo>
        </UserSection>
      </Sidebar>

      <MainContent>
        <Header>
          <TopHeader>
            <h1 className="text-xl font-medium">Liste des hôtels</h1>
            <div className="right-section">
              <SearchBar>
                <Search />
                <input 
                  placeholder="Recherche" 
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </SearchBar>
              <div className="user-section">
                <NotificationBadge>
                  <Bell size={20} />
                  <div className="badge">1</div>
                </NotificationBadge>
                <img 
                  src="/api/placeholder/32/32" 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
                <IconButton>
                  <LogOut size={20} />
                </IconButton>
              </div>
            </div>
          </TopHeader>
          
          <HeaderBottom>
            <HotelCount>
              <span>Hôtels</span>
              <ChevronRight size={16} />
              <span className="count">{filteredHotels.length}</span>
            </HotelCount>
            <AddButton>
              <Plus />
              Créer un nouveau hôtel
            </AddButton>
          </HeaderBottom>
        </Header>

        <Content>
          {loading && (
            <div className="flex justify-center items-center p-8">
              <div className="text-gray-600">Chargement des hôtels...</div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center p-8">
              <div className="text-red-600">{error}</div>
            </div>
          )}


          {!loading && !error && Array.isArray(filteredHotels) && (
              <HotelGrid>
                {filteredHotels.map(hotel => (
                  <HotelCard key={hotel.id}>
                    <img 
                      src={hotel.image || '/api/placeholder/400/300'}
                      alt={hotel.name}
                    />  
                  <HotelInfo>
                    <div className="location">{hotel.location}</div>
                    <div className="name">{hotel.name}</div>
                    <div className="price">{hotel.price} XOF par nuit</div>
                  </HotelInfo>
                </HotelCard>
              ))}
            </HotelGrid>
          )}

          {!loading && !error && filteredHotels.length === 0 && (
            <div className="flex justify-center items-center p-8">
              <div className="text-gray-600">Aucun hôtel trouvé</div>
            </div>
          )}
        </Content>
      </MainContent>
    </Container>
  );
}