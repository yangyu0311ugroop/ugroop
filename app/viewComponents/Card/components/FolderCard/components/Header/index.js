import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UGCardHeaderFolder from 'ugcomponents/Card/UGCardHeaderFolder';

import styles from './styles';

export class Header extends PureComponent {
  render = () => {
    const { tourCount, folderCount, id, baseUrl, content, images } = this.props;
    return (
      <Link to={`${baseUrl}?current=${id}`}> {/*eslint-disable-line*/}
        <UGCardHeaderFolder
          imageList={images}
          tourCount={tourCount}
          subfolderCount={folderCount}
        >
          {content}
        </UGCardHeaderFolder>
      </Link>
    );
  };
}

Header.propTypes = {
  id: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
  content: PropTypes.string,
  tourCount: PropTypes.number,
  folderCount: PropTypes.number,
  images: PropTypes.array,
};

Header.defaultProps = {
  tourCount: 0,
  folderCount: 0,
  content: '',
  images: [],
};

export default withStyles(styles, { name: 'FolderHeader' })(Header);
