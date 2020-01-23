import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

import {
  Container,
  Description,
  Name,
  Bio,
  Techs,
  SearchForm,
  SearchInput,
  SearchButton
} from './styles';

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadInitialLocation();
  }, []);

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });
    setDevs(response.data);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <Container>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={{ flex: 1 }}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0]
            }}
          >
            <Image
              style={{
                width: 54,
                height: 54,
                borderRadius: 4,
                borderWidth: 4,
                borderColor: '#fff'
              }}
              source={{
                uri: dev.avatar_url
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username
                });
              }}
            >
              <Description>
                <Name>{dev.name}</Name>
                <Bio>{dev.bio}</Bio>
                <Techs>{dev.techs.join(', ')}</Techs>
              </Description>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <SearchForm>
        <SearchInput
          placeholder="Search devs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <SearchButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </SearchButton>
      </SearchForm>
    </Container>
  );
}
