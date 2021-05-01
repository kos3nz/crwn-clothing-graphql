import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
// import App from './App/App';
import { default as App } from './App/App.container';

//## =============== Apollo & GraphQL Set Up =============== ##//

import {
  ApolloProvider,
  createHttpLink,
  ApolloClient,
  gql,
} from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { resolvers, typeDefs } from './graphql/resolvers';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

/* ==============================
NOTE:= How to query the data

client
  .query({
    query: gql`
      {
        getCollectionsByTitle(title: "hats") {
          id
          title
          items {
            id
            name
            price
            imageUrl
          }
        }
      }
    `,
  })
  .then((res) => console.log(res));

============================== */

//:: =============== Caching data in local storage when rendering for the first time  =============== :://
client.writeQuery({
  query: gql`
    {
      cartHidden @client
      cartItems @client
      itemCount @client
      total @client
      currentUser @client
    }
  `,
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
    total: 0,
    currentUser: null,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
