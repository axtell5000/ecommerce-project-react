import styled from 'styled-components';
import { Link } from 'react-router-dom';

// // This block of code is going to be used on more than one element
// const OptionContainerStyles = css`
//   cursor: pointer;
//   padding: 10px 15px;
//   text-transform: uppercase;
// `;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  margin-bottom: 25px;  
  width: 100%;

  @media screen and (max-width: 800px) {
    height: 60px;
    margin-bottom: 20px;
    padding: 10px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  padding: 25px;
  width: 70px;

  @media screen and (max-width: 800px) {
    padding: 0;
    width: 50px;
  }
`;

export const OptionsContainer = styled.div`
  align-items: center;
  display: flex;    
  height: 100%;    
  justify-content: flex-end;
  width: 50%;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

// Below is for custom elements like Link
export const OptionLink = styled(Link)`
  cursor: pointer;
  padding: 10px 15px;
  text-transform: uppercase;    
`;
