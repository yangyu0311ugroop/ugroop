import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';
import resaga from 'resaga';
import { compose } from 'redux';
import { CONFIG, RYI_CONFIG } from './config';
import FloatingActions from './components/FloatingActions';

const style = {
  root: {
    height: '100%',
    position: 'relative',
  },
  adminBackground: {
    background: '#f6f8fa',
  },
  printBackground: {
    width: '100%',
    background: '#f6f8fa',
  },
};

export class PublicLayout extends PureComponent {
  renderActions = () => {
    const { location, disableRYI } = this.props;
    const show = !!location && !location.pathname.includes('/interested'); // HACK
    return show && <FloatingActions disableRYI={disableRYI} />;
  };

  render() {
    const { children, classes, location } = this.props;
    const printLayout =
      location && location.pathname.includes('/public/template/2/');

    return (
      <div
        className={classnames(classes.root, {
          [classes.printBackground]: printLayout,
          [classes.adminBackground]: !printLayout,
        })}
      >
        {children}
      </div>
    );
  }
}

PublicLayout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  location: PropTypes.object,
  disableRYI: PropTypes.bool,
};

PublicLayout.defaultProps = {
  classes: {},
  location: { pathname: '' },
  disableRYI: true,
};

export default compose(
  withStyles(style, { name: 'PublicLayout' }),
  resaga(CONFIG),
  resaga(RYI_CONFIG),
)(PublicLayout);
