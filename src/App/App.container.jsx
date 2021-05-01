import { useQuery, useMutation, gql } from '@apollo/client';

import App from './App';

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

const AppContainer = () => {
  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);
  console.log({ currentUser });
  const [setCurrentUser] = useMutation(SET_CURRENT_USER);

  return (
    <App
      currentUser={currentUser}
      setCurrentUser={(user) => setCurrentUser({ variables: { user } })}
    />
  );
};

export default AppContainer;
