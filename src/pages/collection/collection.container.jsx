import { gql, useQuery } from '@apollo/client';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component.jsx';

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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
`;

const CollectionPageContainer = ({ match }) => {
  const { loading, error, data } = useQuery(GET_COLLECTION_BY_TITLE, {
    variables: { title: match.params.collectionId },
  });
  console.log({ loading });
  console.log({ error });
  console.log({ data });

  if (loading) return <Spinner />;

  const { getCollectionsByTitle } = data;
  console.log({ getCollectionsByTitle });

  if (error) console.log(error.message);
  return <CollectionPage collection={getCollectionsByTitle} />;
};

export default CollectionPageContainer;
