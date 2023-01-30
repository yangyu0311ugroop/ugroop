import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UGCardHeaderImage from 'ugcomponents/Card/UGCardHeaderImage';
import styles from './styles';

export class Header extends PureComponent {
  render = () => {
    const { images } = this.props;
    return <UGCardHeaderImage images={images} />;
  };
}

Header.propTypes = {
  images: PropTypes.array,
};

Header.defaultProps = {
  images: [],
};

export default withStyles(styles, { name: 'TemplateHeader' })(Header);
