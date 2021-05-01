import { useQuery, gql } from '@apollo/client';

import CheckoutPage from './checkout.component';

const GET_CART_ITEMS_AND_TOTAL_PRICE = gql`
  {
    cartItems @client
    total @client
  }
`;

const CheckoutPageContainer = () => {
  const {
    data: { cartItems, total },
  } = useQuery(GET_CART_ITEMS_AND_TOTAL_PRICE);

  // console.log(cartItems, total);

  return <CheckoutPage cartItems={cartItems} total={total} />;
};

export default CheckoutPageContainer;
