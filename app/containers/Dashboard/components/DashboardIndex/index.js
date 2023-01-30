import { withStyles } from '@material-ui/core/styles';
import { URL_HELPERS } from 'appConstants';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import Dialog from 'ugcomponents/Dialog';
import { parseQueryParam } from 'utils/helpers/url';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class DashboardIndex extends PureComponent {
  state = {
    shareToDialog: false,
  };

  componentDidMount = () => this.fetchData();

  onCloseShareToDialog = () => {
    this.setState({ shareToDialog: false });
  };

  goToIndex = () => {
    const { history } = this.props;

    history.push(URL_HELPERS.index());
  };

  handleIgnore = () => {
    this.onCloseShareToDialog();

    this.goToIndex();
  };

  onSwitchAccount = () => {
    const { token, decline } = this.state;
    this.props.resaga.setValue({ token, decline });
    this.onCloseShareToDialog();
  };

  fetchData = () => {
    const search = get(this, 'props.location.search', null);
    const searchObj = parseQueryParam(search);
    const { shareTo, token, decline } = searchObj;
    if (shareTo && token) {
      this.setState({
        shareToDialog: true,
        shareTo,
        token,
        decline,
      });
    } else {
      this.goToIndex();
    }
  };

  renderShareToDialog = () => {
    const { me, classes } = this.props;
    const { shareTo, shareToDialog } = this.state;
    const customClassnames = { headline: classes.headlineText };
    const muiDialogProps = { onClose: this.handleIgnore };

    return (
      <Dialog
        template="custom"
        open={shareToDialog}
        dialogTitle={<M {...m.invitationNotForYou} />}
        confirmFunc={this.onSwitchAccount}
        cancelFunc={this.handleIgnore}
        cancelButton={<M {...m.ignore} />}
        confirmButton={<M {...m.switchAccount} />}
        logoutOnConfirm
        headlineIcon="user-plus"
        headlineTitle={<M {...m.switchAccount} />}
        headlineText={
          <M
            {...m.youAreLoggedInAs}
            values={{ me: <b>{me}</b>, shareTo: <b>{shareTo}</b> }}
          />
        }
        customClassnames={customClassnames}
        muiDialogProps={muiDialogProps}
      />
    );
  };

  render = () => this.renderShareToDialog();
}

DashboardIndex.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props

  // resaga props
  me: PropTypes.string.isRequired,
};

DashboardIndex.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'DashboardIndex' }),
  resaga(CONFIG),
)(DashboardIndex);
