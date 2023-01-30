import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import Avatar from 'viewComponents/People/components/Avatar';
import { CONFIG } from './config';

export class AvatarById extends PureComponent {
  render() {
    return <Avatar {...this.props} />;
  }
}

AvatarById.propTypes = {
  // resaga value
  fullName: PropTypes.string,
  profileUrl: PropTypes.string,
};

AvatarById.defaultProps = {
  fullName: '?',
  profileUrl: '',
};

export default resaga(CONFIG)(AvatarById);
