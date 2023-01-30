import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import AvatarById from '../AvatarById';
import { CONFIG } from './config';

export class AvatarByToken extends PureComponent {
  render() {
    return <AvatarById {...this.props} />;
  }
}

AvatarByToken.propTypes = {
  userId: PropTypes.number,
};

AvatarByToken.defaultProps = {
  userId: 0,
};

export default compose(resaga(CONFIG))(AvatarByToken);
