import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UGLink from 'components/Link';
import UGCardHeaderFolder from 'ugcomponents/Card/UGCardHeaderFolder';
import styles from './styles';
export const Header = ({ tours, folders, id, baseUrl, content, images }) => (
  <UGLink to={`${baseUrl}?current=${id}`}>
    <UGCardHeaderFolder
      imageList={images}
      tourCount={tours.length}
      subfolderCount={folders.length}
    >
      {content}
    </UGCardHeaderFolder>
  </UGLink>
);

Header.propTypes = {
  id: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
  content: PropTypes.string,
  tours: PropTypes.array,
  folders: PropTypes.array,
  images: PropTypes.array,
};

Header.defaultProps = {
  tours: [],
  folders: [],
  content: '',
  images: [],
};

export default withStyles(styles, { name: 'Header' })(Header);
