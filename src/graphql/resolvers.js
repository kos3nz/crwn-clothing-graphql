import { gql } from '@apollo/client';

import {
  addItemToCart as addItem,
  removeItemFromCart as removeItem,
  getCartItemCount,
  getTotalPrice,
  clearItemFromCart as clearItem,
} from './cart.utils';

// Type Definition
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type DateTime {
    nanoseconds: Int!
    seconds: Int!
  }

  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]! # needs to return an array whether Items is in the array or not
    RemoveItemFromCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
    SetCurrentUser(user: User!): User!
  }
`;

//## =============== GraphQL Queries =============== ##//

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client # from the client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const GET_TOTAL_PRICE = gql`
  {
    total @client
  }
`;

const GET_ITEMS_AND_COUNT_AND_TOTAL = gql`
  {
    cartItems @client
    itemCount @client
    total @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

//## =============== Resolver =============== ##//

export const resolvers = {
  Mutation: {
    // toggleCartHidden: (_root, _args, _context, _info) => {
    toggleCartHidden: (_root, _args, { cache }) => {
      const data = cache.readQuery({
        query: GET_CART_HIDDEN,
        // variables: {...}
      });
      const { cartHidden } = data;

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      // console.log(cartItems);

      const newCartItems = addItem(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });
      cache.writeQuery({
        query: GET_TOTAL_PRICE,
        data: { total: getTotalPrice(newCartItems) },
      });
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },

    removeItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const newCartItems = removeItem(cartItems, item);

      // console.log({ cartItems });
      // console.log({ newCartItems });

      cache.writeQuery({
        query: GET_ITEMS_AND_COUNT_AND_TOTAL,
        data: {
          itemCount: getCartItemCount(newCartItems),
          total: getTotalPrice(newCartItems),
          cartItems: newCartItems,
        },
      });

      return newCartItems;
    },

    clearItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const newCartItems = clearItem(cartItems, item);

      cache.writeQuery({
        query: GET_ITEMS_AND_COUNT_AND_TOTAL,
        data: {
          itemCount: getCartItemCount(newCartItems),
          total: getTotalPrice(newCartItems),
          cartItems: newCartItems,
        },
      });

      return newCartItems;
    },

    setCurrentUser: (_root, { user }, { cache }) => {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          currentUser: user,
        },
      });

      return user;
    },
  },
};
