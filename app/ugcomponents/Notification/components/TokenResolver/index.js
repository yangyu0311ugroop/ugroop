import { GET_TOKEN, INVITATION_API } from 'apis/constants';
import { DO_NOTHING } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';
import styles from './styles';

export class TokenResolver extends PureComponent {
  componentDidMount = () => {
    this.resolveToken();
  };

  onSuccess = (...params) => {
    const { onSuccess } = this.props;

    if (onSuccess) return onSuccess(...params);

    return DO_NOTHING;
  };

  onError = (...params) => {
    const { onError } = this.props;

    if (onError) return onError(...params);

    return DO_NOTHING;
  };

  resolveToken = () => {
    const { token } = this.props;
    if (token) {
      return this.props.resaga.dispatchTo(INVITATION_API, GET_TOKEN, {
        payload: { tokenId: token },
        onSuccess: this.onSuccess,
        onError: this.onError,
      });
    }

    return DO_NOTHING;
  };

  render = () => false;
}

TokenResolver.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  token: PropTypes.string,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,

  // resaga props
};

TokenResolver.defaultProps = {};

export default compose(
  withRouter,
  withStyles(styles, { name: 'TokenResolver' }),
  resaga(CONFIG),
)(TokenResolver);
