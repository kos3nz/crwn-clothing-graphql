import React from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

import DIRECTORY_DATA from './directory.data';

const Directory = () => {
  const { sections } = DIRECTORY_DATA;

  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   sections: selectDirectorySections,
// });

// export default connect(mapStateToProps)(Directory);
export default Directory;
