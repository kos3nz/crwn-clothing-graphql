import { useMutation, gql } from '@apollo/client';

import CollectionItem from './collection-item.component';

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CollectionItemContainer = (props) => {
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);

  return (
    <CollectionItem
      {...props}
      addItem={(item) => {
        // console.log(item);
        addItemToCart({ variables: { item } });
      }}
    />
  );
};

export default CollectionItemContainer;
