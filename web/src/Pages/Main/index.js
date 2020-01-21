import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import Aside from '../../components/Aside';
import DevItem from '../../components/DevItem';

import { Container, Item } from './styles';

export default function Dashborad() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []);

  return (
    <Container>
      <Aside />
      <Item>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </Item>
    </Container>
  );
}
