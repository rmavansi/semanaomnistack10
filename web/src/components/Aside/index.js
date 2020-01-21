import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { Container } from './styles';

export default function Aside() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { apiLatitude, apiLongitude } = position.coords;

        setLatitude(apiLatitude);
        setLongitude(apiLongitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGithub_username('');
    setTechs('');
  }

  return (
    <Container>
      <aside>
        <strong>Add</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Github Username</label>
            <input
              type="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithub_username(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Technologies</label>
            <input
              type="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="Latitude">Latitude</label>
              <input
                type="number"
                id="Latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="Longitude">Longitude</label>
              <input
                type="number"
                id="Longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </aside>
    </Container>
  );
}
