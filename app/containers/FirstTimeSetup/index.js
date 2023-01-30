/*
 *
 * FirstTimeSetup
 *
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import H1 from 'components/H1';
import H4 from 'components/H4';
import H6 from 'components/H6';
import Loader from 'react-loading';
import classnames from 'classnames';
import Icon from 'viewComponents/Icon';
import utils from 'routeProtectionV2/helpers/utils';
import UGLink from 'components/Link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage as TEXT } from 'react-intl';
import {
  ADMIN,
  ADMINISTRATOR,
  TOUR_OWNER,
  REVIEWER,
  MODERATOR,
  OWNER,
} from 'utils/orgRoleConstants';
import {
  selectCurrentUserOrgs,
  selectOrgs,
} from 'datastore/stormPathStore/selectors';
import LogoutLink from 'smartComponents/Authentication/components/LogoutLink';
import Grid from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'ugcomponents/Buttons/Button';
import { withStyles } from '@material-ui/core/styles';
import { CONFIG } from './config';
import m from './defines/messages';
import styleSheet from './style';

export class FirstTimeSetup extends PureComponent {
  componentDidMount = () => {
    this.props.handleLoading();
  };

  getRoleMessage = orgRole => {
    switch (orgRole) {
      case ADMIN:
        return this.renderAdminMessage();
      case OWNER:
        return this.renderOwnerMessage();
      default:
        return this.renderGeneralMessage();
    }
  };

  generateList = list => (
    <ul>
      {list.map((li, id) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={id}>{li}</li>
      ))}
    </ul>
  );

  renderOwnerMessage = () => {
    const { classes } = this.props;
    const role = <b style={{ textTransform: 'capitalize' }}>{OWNER}</b>;
    const ability1Highlight = <b>transfer</b>;
    const ability3Highlight = role;
    const ability4Highlight = (
      <b style={{ textTransform: 'capitalize' }}>{ADMINISTRATOR}</b>
    );

    const ability1 = (
      <H4 className={classes.h4Style}>
        <TEXT
          {...m.ownerAbility1}
          values={{ highlightedText: ability1Highlight }}
        />
      </H4>
    );

    const ability2 = (
      <H4 className={classes.h4Style}>
        <TEXT {...m.ownerAbility2} />
      </H4>
    );

    const ability3 = (
      <H4 className={classes.h4Style}>
        <TEXT
          {...m.ownerAbility3}
          values={{ highlightedText: ability3Highlight }}
        />
      </H4>
    );

    const ability4 = (
      <H4 className={classes.h4Style}>
        <TEXT
          {...m.ownerAbility4}
          values={{ highlightedText: ability4Highlight }}
        />
      </H4>
    );

    const abilityList = this.generateList([
      ability1,
      ability2,
      ability3,
      ability4,
    ]);

    return (
      <Fragment>
        <H4 className={classes.h4Style}>
          <TEXT
            {...m.youHaveBeenAssignedAsOwner}
            values={{ highlightedText: role }}
          />
        </H4>
        <H4 className={classes.h4Style}>
          <TEXT {...m.ownerKeyFunctions} />
        </H4>
        {abilityList}
        <H4 className={classes.h4Style}>
          <TEXT {...m.letsGetStarted} />
        </H4>
      </Fragment>
    );
  };

  renderAdminMessage = () => {
    const { classes } = this.props;

    const admin = <b>{ADMINISTRATOR}</b>;
    const reviewers = <b>{REVIEWER}s</b>;
    const moderators = <b>{MODERATOR}s</b>;
    const tourOwners = <b>{TOUR_OWNER}s</b>;

    const ability1 = (
      <H4 className={classes.h4Style}>
        <TEXT {...m.ability1} />
      </H4>
    );
    const ability2 = (
      <H4 className={classes.h4Style}>
        <TEXT {...m.ability2} />
      </H4>
    );
    const ability3 = (
      <H4 className={classes.h4Style}>
        <TEXT {...m.ability3} values={{ admin }} />
      </H4>
    );
    const ability4 = (
      <H4 className={classes.h4Style}>
        <TEXT {...m.ability4} values={{ tourOwners, reviewers, moderators }} />
      </H4>
    );

    const abilityList = this.generateList([
      ability1,
      ability2,
      ability3,
      ability4,
    ]);

    return (
      <Fragment>
        <H4 className={classes.h4Style}>
          <TEXT {...m.youHaveBeenAssignedAsAdmin} values={{ admin }} />
        </H4>
        {abilityList}
        <H4 className={classes.h4Style}>
          <TEXT {...m.nowProceedToOrganisationSetup} />
        </H4>
      </Fragment>
    );
  };

  renderPersonalAccountMessage = () => {
    const { classes } = this.props;
    return (
      <Fragment>
        <H4 className={classes.h4Style}>
          <TEXT {...m.youAreTheOwner} />
        </H4>
        <H4 className={classes.h4Style}>
          <TEXT {...m.whenPlanning} />
          &nbsp;
          <TEXT {...m.informationSpread} />
          &nbsp;
          <TEXT {...m.thingsYouMayWant} />
          &nbsp;
          <TEXT {...m.referencingInfo} />
        </H4>
        <H4 className={classes.h4Style}>
          <TEXT {...m.hereAllInfo} />
        </H4>
        <H4 className={classes.h4Style}>
          <TEXT {...m.letsGetStarted} />
        </H4>
        <H6>
          <TEXT
            {...m.extraNote}
            values={{
              smile: (
                <span role="img" aria-label="smiley">
                  🙂
                </span>
              ),
            }}
          />
        </H6>
      </Fragment>
    );
  };

  renderGeneralMessage = () => {
    const { classes } = this.props;
    return (
      <Fragment>
        <H4 className={classes.h4Style}>
          <TEXT {...m.generalRoleMessage} />
        </H4>
        <H4 className={classes.h4Style}>
          <TEXT {...m.nowProceedToProfileSetup} />
        </H4>
      </Fragment>
    );
  };

  renderWelcomeMessage = () => {
    const { classes, role, orgList } = this.props;
    const welcomeHeader = orgList.length ? (
      <TEXT {...m.welcome} />
    ) : (
      <TEXT {...m.welcomePersonal} />
    );
    const welcomeMessage = orgList.length
      ? this.getRoleMessage(role)
      : this.renderPersonalAccountMessage();

    return (
      <Grid
        justify="space-between"
        direction="column"
        alignItems="center"
        className={classes.container}
      >
        <GridItem className={classes.logo} xs={11} md={11}>
          <H1 className={classes.welcome} weight="h1FontSize">
            <Icon icon="ug-logo" className={classes.iconWaving} size="large" />
            {welcomeHeader}
          </H1>
          {welcomeMessage}
        </GridItem>
      </Grid>
    );
  };

  renderNavigations = () => {
    const { classes, handleLoading, orgs } = this.props;

    let personSetup = false;
    let nextStep = '/admin/setup/organisation';
    let nextStepText = m.proceedToOrgSetup.defaultMessage;
    if (utils.hasOrgSetup(orgs)) {
      // HACK, multi orgs needs to be done it properly.
      personSetup = true;
      nextStep = '/admin/setup/person';
      nextStepText = m.proceedToPersonSetup.defaultMessage;
    }
    return (
      <div className={classes.navigations}>
        <UGLink
          to={nextStep}
          className={classes.proceed}
          onClick={handleLoading}
        >
          <Button
            color="green"
            size="medium"
            className={classnames(
              classes.proceedButton,
              personSetup ? classes.personButton : null,
            )}
          >
            <div>{nextStepText} </div>
            <div className={classes.iconChevron}>
              <Icon icon="lnr-chevron-right" bold />
            </div>
          </Button>
        </UGLink>
        <LogoutLink className={classes.logout}>
          <Button className={classes.logoutButton} onClick={handleLoading}>
            Logout
          </Button>
        </LogoutLink>
      </div>
    );
  };

  render() {
    const { classes, fetching } = this.props;

    if (fetching) {
      return (
        <div className={classes.center}>
          <Loader type="spin" width={24} height={24} />
        </div>
      );
    }

    return (
      <div>
        <Helmet
          title={m.firstTimeSetup.defaultMessage}
          meta={[
            { name: 'description', content: 'Description of First Time Setup' },
          ]}
        />
        {this.renderWelcomeMessage()}
        {this.renderNavigations()}
      </div>
    );
  }
}

FirstTimeSetup.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  orgs: PropTypes.array,
  handleLoading: PropTypes.func,
  handlesOnClick: PropTypes.func,
  classes: PropTypes.object.isRequired,
  intl: PropTypes.shape({ formatMessage: PropTypes.func.isRequired }),

  // resaga
  role: PropTypes.string,
  name: PropTypes.string,
  orgId: PropTypes.number,
  fetching: PropTypes.bool,
  orgList: PropTypes.array,
};

FirstTimeSetup.defaultProps = {
  name: '',
  orgId: 0,
  role: 'admin',
  fetching: true,
  orgList: [],
};

const mapState = createStructuredSelector({
  orgs: selectCurrentUserOrgs(),
  orgList: selectOrgs(),
});

// Wrap the component to inject dispatch and state into it
export default compose(
  resaga(CONFIG),
  connect(
    mapState,
    {},
  ),
  withStyles(styleSheet, { name: 'FirstTimeSetup' }),
)(FirstTimeSetup);
