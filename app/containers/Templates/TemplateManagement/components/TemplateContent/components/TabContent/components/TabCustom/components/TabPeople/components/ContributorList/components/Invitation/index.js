import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import Icon from 'viewComponents/Icon';
import Margin from 'viewComponents/Margin';
// import HelpTourConnections from 'containers/Templates/Modals/ShareList/components/Tabs/components/HelpTourConnections';
import InvitationModal from './components/InvitationModal';
import { CONFIG, CONFIG_0, SET_VALUE } from './config';
import styles from './styles';
import { PORTAL_HELPERS } from '../../../../../../../../../../../../../../Portal/helpers';
import {
  HELP_DIALOG_ATTRIBUTES,
  HELP_DIALOG_KEYS,
} from '../../../../../../../../../../../../../../../appConstants';

export class Invitation extends PureComponent {
  state = {
    inviteFromOrg: false,
    open: false,
  };

  getSelectedOrgId = () => this.props.selectedOrgId || this.props.orgId;

  inviteFromOrg = value => () => {
    this.setState({ inviteFromOrg: !value });
    this.props.resaga.setValue({
      inviteeId: null,
      inviteeToken: '',
      inviteeEmail: null,
      currentProcessId: null,
    });
  };

  orgMenuClick = id => () => this.props.resaga.setValue({ selectedOrgId: id });

  handleClick = () => this.setState({ open: true });

  handleClose = () => {
    this.props.resaga.setValue({
      selectedOrgId: null,
      inviteeId: null,
      inviteeToken: '',
      inviteeEmail: null,
      currentProcessId: null,
    });
    this.setState({ open: false });
  };

  showHelp = () => {
    PORTAL_HELPERS.openHelpDialog(
      { data: HELP_DIALOG_ATTRIBUTES[HELP_DIALOG_KEYS.CONTRIBUTOR_HELP] },
      this.props,
    );
    // this.setState({ showHelp: true });
  };

  render = () => {
    const { classes, id, orgUserIds, showIcon } = this.props;
    const { inviteFromOrg, open } = this.state;

    return (
      <>
        <GridContainer direction="column" spacing={0} dense>
          <GridItem>
            <GridContainer
              direction="row"
              spacing={1}
              alignItems="center"
              dense
              noWrap
              wrap="nowrap"
              className={classes.noWrap}
            >
              <GridItem>
                <Button
                  dense
                  size="xs"
                  noMargin
                  color="primary"
                  onClick={this.handleClick}
                >
                  {showIcon && (
                    <Margin isInline right="sm">
                      <Icon
                        icon={LOGIC_HELPERS.ifElse(
                          inviteFromOrg,
                          'lnr-inbox',
                          'lnr-users-plus',
                        )}
                        className={classes.icon}
                      />
                    </Margin>
                  )}
                  Add Contributor
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  icon="question"
                  variant="outline"
                  size="extraSmall"
                  onClick={this.showHelp}
                  weight="strong"
                  color="gray"
                  iconButton
                  tooltipProps={{ title: 'Tour Connections Help' }}
                  dense
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <InvitationModal
              orgUserIds={orgUserIds}
              orgId={this.getSelectedOrgId()}
              id={id}
              open={open}
              onClose={this.handleClose}
            />
          </GridItem>
        </GridContainer>
      </>
    );
  };
}

Invitation.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  showIcon: PropTypes.bool,

  // resaga props
  id: PropTypes.number,
  orgId: PropTypes.number,
  orgUserIds: PropTypes.array,
  selectedOrgId: PropTypes.number,
};

Invitation.defaultProps = {
  showIcon: true,
};

export default compose(
  withStyles(styles, { name: 'Invitation' }),
  resaga(CONFIG_0),
  resaga(CONFIG),
  resaga(SET_VALUE),
)(Invitation);
