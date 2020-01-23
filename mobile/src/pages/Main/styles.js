import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Description = styled.View`
  width: 260px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const Bio = styled.Text`
  color: #666;
  margin-top: 5px;
`;

export const Techs = styled.Text`
  margin-top: 5px;
`;

export const SearchForm = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 50px;
  background: #fff;
  color: #333;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
  /* shadoColor: #000;
  shadowOpacity: 0.2;
  shadowOffSet: {
    width: 4px;
    height: 4px;
  }, */
  /* elevation: 2; */
`;

export const SearchButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #8e4dff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;
