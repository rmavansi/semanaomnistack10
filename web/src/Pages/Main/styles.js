import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 30px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    list-style: none;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  @media (max-width: 650px) {
    ul {
      grid-template-columns: 1fr;
    }
  }
`;

export const Item = styled.div`
  margin-left: 30px;

  @media (max-width: 1000px) {
    margin-left: 0;
    margin-top: 30px;
  }
`;
