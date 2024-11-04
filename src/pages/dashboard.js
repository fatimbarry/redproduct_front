// pages/dashboard.js
import React from 'react';
import styled from 'styled-components';
import { Mail, Users, Building2, Grid, LayoutDashboard, } from 'lucide-react';
import Link from 'next/link';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #424750;
  color: white;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
  color: white;
`;

const MenuItem = styled.div`
  padding: 12px;
  margin: 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  ${props => props.active && `
    background-color: rgba(255, 255, 255, 0.1);
  `}
`;

const MainContent = styled.main`
  flex: 1;
  padding: 30px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const SearchBar = styled.input`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bgColor};
  color: white;
`;

const StatInfo = styled.div`
  h3 {
    font-size: 24px;
    margin: 0;
    display: flex;
    gap: 8px;
  }
  
  p {
    color: #666;
    margin: 5px 0 0 0;
    font-size: 14px;
  }
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

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 250px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const OnlineStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #4CAF50;
    border-radius: 50%;
  }
`;

const Dashboard = () => {
  const stats = [
    { title: '125', subtitle: 'Formulaires', icon: Mail, color: '#8A6FF7' },
    { title: '40', subtitle: 'Messages', icon: Grid, color: '#26C6DA' },
    { title: '600', subtitle: 'Utilisateurs', icon: Users, color: '#FFB300' },
    { title: '25', subtitle: 'E-mails', icon: Mail, color: '#FF4444' },
    { title: '40', subtitle: 'Hôtels', icon: Building2, color: '#9C27B0' },
    { title: '02', subtitle: 'Entités', icon: Users, color: '#2196F3' },
  ];

  const navigationLinks = [

    {
        href: "/dashboard",
        icon: <LayoutDashboard size={18} />,
        label: "Dashboard"
    },
    {
        href: "/page",
        icon: <Building2 size={18} />,
        label: "Liste des hôtels"
    }
];

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.66602 2.66624H29.3286V29.3288L2.66602 2.66624Z" fill="white"/>
                  <path d="M2.66602 2.66624H22.663L15.9973 15.9975L2.66602 2.66624Z" fill="black" fillOpacity="0.15"/>
                  <path d="M2.66602 2.66624H15.9973L2.66602 29.3288V2.66624Z" fill="white"/>
            </svg>
            RED PRODUCT
          </Logo>  
        
          <div className="flex-1">
                            <div className="py-2.5">
                                <MenuItemLink href={'/dashboard'}>
                                    Principal
                                </MenuItemLink>
                                {navigationLinks.map((link) => (
                                    <MenuItemLink
                                        key={link.href}
                                        href={link.href}
                                    
                                    >
                                        {link.icon}
                                        {link.label}
                                    </MenuItemLink>
                                ))}
                            </div>
                        </div>
        
        <UserProfile>
          <img 
            src="/api/placeholder/40/40" 
            alt="Profile" 
            style={{ borderRadius: '50%' }} 
          />
          <div>
            <div>Fatima Barry</div>
            <OnlineStatus>en ligne</OnlineStatus>
          </div>
        </UserProfile>
      </Sidebar>

      <MainContent>
        <Header>
          <div>
            <h1>Bienvenue sur RED Product</h1>
            <p>Booster Votre Carriere Professionnelle avec JeemaCoder de Bakeli</p>
          </div>
          <SearchBar placeholder="Recherche..." />
        </Header>

        <CardsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <IconWrapper bgColor={stat.color}>
                <stat.icon size={24} />
              </IconWrapper>
              <StatInfo>
                <h3>
                  {stat.title}
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {stat.subtitle}
                  </span>
                </h3>
                <p>Je ne sais pas quoi mettre</p>
              </StatInfo>
            </StatCard>
          ))}
        </CardsGrid>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;