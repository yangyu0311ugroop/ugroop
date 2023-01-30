import { GET_ORGANISATION_INVITATIONS, USER_API } from 'apis/constants';
import { TEXT, URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import UGLink from 'components/Link';
import UGNavLink from 'components/NavLink';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import Notification from 'smartComponents/InvitationNotification';
import Name from 'smartComponents/Organisation/parts/Name';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import Role from 'smartComponents/Organisation/parts/Role';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import { VARIANTS } from 'variantsConstants';
import Icon from 'viewComponents/Icon';
import Item from './components/Item';
import { CONFIG, CONFIG_ID } from './config';
import styles from './styles';

export class OrganisationCard extends PureComponent {
  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.SMALL,
    };
  };

  componentDidMount = () => {
    this.fetchPendingOrgInvitations();
  };

  fetchPendingOrgInvitations = () => {
    this.props.resaga.dispatchTo(USER_API, GET_ORGANISATION_INVITATIONS, {});
  };

  goToOrganisationPage = ({ orgUser: { orgId } }) => {
    const { history } = this.props;

    return history.push(`${URL_HELPERS.orgIndex(orgId)}`);
  };

  renderPersonal = () => {
    const { classes, userId } = this.props;

    return (
      <GridItem>
        <div className={classes.card}>
          <Item
            reserveLeft={false}
            url={URL_HELPERS.tours()}
            photo={<PersonPhoto id={userId} {...this.photoProps} />}
            heading={<KnownAs id={userId} variant={VARIANTS.STRING_ONLY} />}
            secondary="Personal"
          />
        </div>
      </GridItem>
    );
  };

  renderOrganisations = () => {
    const { classes, organisations } = this.props;

    if (!organisations.length) {
      return null;
    }

    return organisations.map(organisationId => (
      <GridItem key={organisationId}>
        <div className={classes.card}>
          <Item
            reserveLeft={false}
            url={URL_HELPERS.orgIndex(organisationId)}
            photo={
              <OrganisationPhoto id={organisationId} {...this.photoProps} />
            }
            heading={
              <Name id={organisationId} variant={VARIANTS.STRING_ONLY} />
            }
            secondary={<Role id={organisationId} variant={TEXT} />}
          />
        </div>
      </GridItem>
    ));
  };

  renderOrgInvitations = () => {
    const { orgInvitations } = this.props;

    if (!orgInvitations.length) {
      return null;
    }

    return orgInvitations.map(id => (
      <GridItem key={id}>
        <Notification id={id} key={id} />
      </GridItem>
    ));
  };

  renderPendingInvitations = () => {
    const { orgInvitations, children } = this.props;

    const invitations = (
      <GridItem>
        <GridContainer direction="column" spacing={2}>
          {this.renderOrgInvitations()}
        </GridContainer>
      </GridItem>
    );

    if (typeof children === 'function') {
      return children({ content: invitations, array: orgInvitations });
    }

    if (!orgInvitations.length) {
      return null;
    }

    return invitations;
  };

  render = () => {
    const { classes, children } = this.props;

    if (typeof children === 'function') {
      return this.renderPendingInvitations();
    }

    return (
      <React.Fragment>
        <GridContainer
          alignItems="center"
          spacing={2}
          className={classes.heading}
        >
          <GridItem>
            <Icon icon="group-work" size="base" />
          </GridItem>
          <GridItem>
            <UGLink to={URL_HELPERS.settingsOrganisations()}>
              Organisations
            </UGLink>
          </GridItem>
          <GridItem>
            <UGNavLink to={URL_HELPERS.orgNew()}>
              <Icon
                size={SIZE_CONSTANTS.XXS}
                icon="lnr-plus"
                color="success"
                bold
              />{' '}
              Create new organisation
            </UGNavLink>
          </GridItem>
        </GridContainer>
        <GridContainer
          alignItems="center"
          spacing={2}
          className={classnames(classes.heading, classes.invitations)}
        >
          {this.renderPendingInvitations()}
        </GridContainer>
        <GridContainer alignItems="center" spacing={3}>
          {this.renderPersonal()}
          {this.renderOrganisations()}
        </GridContainer>
      </React.Fragment>
    );
  };
}

OrganisationCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.func,

  // resaga props
  organisations: PropTypes.array,
  orgInvitations: PropTypes.array,
  userId: PropTypes.number,
};

OrganisationCard.defaultProps = {
  organisations: [],
  orgInvitations: [],
  userId: 0,
};

export default compose(
  withStyles(styles, { name: 'OrganisationCard' }),
  withRouter,
  resaga(CONFIG_ID),
  resaga(CONFIG),
)(OrganisationCard);
