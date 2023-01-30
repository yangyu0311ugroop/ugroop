import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import AvatarBadge from 'viewComponents/People/components/AvatarBadge';
import { CONFIG } from './config';

export class AvatarByBadge extends PureComponent {
  render() {
    return <AvatarBadge {...this.props} />;
  }
}

AvatarByBadge.propTypes = {
  // resaga value
  fullName: PropTypes.string,
  profileUrl: PropTypes.string,
};

AvatarByBadge.defaultProps = {
  fullName: '?',
  profileUrl: '',
};

export default resaga(CONFIG)(AvatarByBadge);
