import React from 'react';
import { useLocation } from 'react-router-dom';
import { LinkStyled, NavList } from './Navs.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {LINKS.map(link => {
          return (
            <li key={link.to}>
              <LinkStyled
                to={link.to}
                className={link.to === location.pathname ? 'active' : ''}
              >
                {' '}
                {link.text}{' '}
              </LinkStyled>
            </li>
          );
        })}
      </NavList>
    </div>
  );
};

export default Navs;
