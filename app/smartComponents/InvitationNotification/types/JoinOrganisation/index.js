import { withStyles } from '@material-ui/core/styles';
import {
  CONFIRM_INVITATION,
  DECLINE_INVITATION,
  ORG_INVITATION_API,
} from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import CreatedAt from './parts/CreatedAt';
import InviteFrom from './parts/InviteFrom';
import OrganisationName from './parts/OrganisationName';
import Role from './parts/Role';
import styles from './styles';
import JText from '../../../../components/JText';

export class JoinOrganisation extends PureComponent {
  state = {
    error: null,
  };

  goToOrganisationPage = ({ orgUser: { orgId } }) => {
    const { history } = this.props;

    return history.push(`${URL_HELPERS.orgIndex(orgId)}`);
  };

  acceptOrgInvitation = token => () => {
    this.props.resaga.dispatchTo(ORG_INVITATION_API, CONFIRM_INVITATION, {
      payload: { token },
      onSuccess: this.goToOrganisationPage,
      onError: this.onError,
    });
  };

  declineOrgInvitation = token => () => {
    this.props.resaga.dispatchTo(ORG_INVITATION_API, DECLINE_INVITATION, {
      payload: { token },
      onError: this.onError,
    });
  };

  onError = data => {
    this.setState({ error: data });
  };

  renderButtons = () => {
    const { id } = this.props;
    const { error } = this.state;

    return (
      <React.Fragment>
        <GridItem>
          <Button
            color="primary"
            size="extraSmall"
            noMargin
            onClick={this.acceptOrgInvitation(id)}
            disabled={!!error}
          >
            Accept
          </Button>
        </GridItem>
        <GridItem onClick={this.declineOrgInvitation(id)}>
          <Button
            size="extraSmall"
            variant="outline"
            color="black"
            noMargin
            onClick={this.declineOrgInvitation(id)}
            disabled={!!error}
          >
            Decline
          </Button>
        </GridItem>
      </React.Fragment>
    );
  };

  render = () => {
    const { classes, id } = this.props;
    const { error } = this.state;

    return (
      <GridContainer direction="column" spacing={0} className={classes.root}>
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem className={classes.grow}>
              <b>
                <InviteFrom id={id} />
              </b>{' '}
              invited you to join the{' '}
              <b>
                <OrganisationName id={id} />
              </b>{' '}
              organisation as <Role id={id} article /> <CreatedAt id={id} />.
            </GridItem>
            {this.renderButtons()}
          </GridContainer>
        </GridItem>
        {!!error && (
          <GridItem className={classes.Error}>
            <JText danger sm>
              Request failed, invitation might had been cancelled. Please
              refresh this page.
            </JText>
          </GridItem>
        )}
      </GridContainer>
    );
  };
}

JoinOrganisation.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.string,

  // resaga props
};

JoinOrganisation.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'JoinOrganisation' }),
  withRouter,
  resaga(),
)(JoinOrganisation);
