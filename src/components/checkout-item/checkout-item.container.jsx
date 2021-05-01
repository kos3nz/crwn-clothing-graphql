import { useMutation, gql } from '@apollo/client';

import CheckoutItem from './checkout-item.component';

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item) {
    addItemToCart(item: $item) @client
  }
`;

const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item) {
    removeItemFromCart(item: $item) @client
  }
`;

const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item) {
    clearItemFromCart(item: $item) @client
  }
`;

const CheckoutItemContainer = (props) => {
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
  const [clearItemFromCart] = useMutation(CLEAR_ITEM_FROM_CART);

  return (
    <CheckoutItem
      {...props}
      addItem={(item) => addItemToCart({ variables: { item } })}
      removeItem={(item) => removeItemFromCart({ variables: { item } })}
      clearItem={(item) => clearItemFromCart({ variables: { item } })}
    />
  );
};

export default CheckoutItemContainer;
