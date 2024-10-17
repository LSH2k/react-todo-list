import styled from 'styled-components'

export const Aside = styled.aside`
  padding: 16px;
  background-color: #eee;
  height: 100vh;

  @media (max-width: 600px) {
    height: 32vh;
  }
`

export const Filtros = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-top: 16px;

  @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
  }
`
