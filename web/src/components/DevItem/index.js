import React from 'react';

import { Container } from './styles';

export default function DevItem({ dev }) {
  return (
    <Container>
      <li className="devItem">
        <header>
          <img src={dev.avatar_url} alt={dev.name} />
          <div className="userInfo">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
          </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`http://github.com/${dev.github_username}`}>Access Perfil</a>
      </li>
    </Container>
  );
}
