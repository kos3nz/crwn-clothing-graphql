import { useQuery, gql } from '@apollo/client';

import Header from './header.component';

const GET_CART_HIDDEN_AND_CURRENT_USER = gql`
  {
    cartHidden @client
    currentUser @client
  }
`;

const HeaderContainer = () => {
  const { data } = useQuery(GET_CART_HIDDEN_AND_CURRENT_USER);
  const { cartHidden, currentUser } = data;

  return <Header hidden={cartHidden} currentUser={currentUser} />;
};

export default HeaderContainer;
