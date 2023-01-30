import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import Img from 'components/Img';
import AccessDeniedImg from 'shareAssets/ugroop-access-denied.png';
import { H2, H4 } from 'viewComponents/Typography';
import { DENY_ACCESS_REASON } from 'appConstants';
import { useSelector } from 'react-redux';
import styles from './styles';
import m from './messages';
import {
  isEmptyString,
  pluralizeText,
} from '../../../../utils/stringAdditions';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { ORG_DATASTORE_RESELECTORS } from '../../../../datastore/orgStore/selectorsViaConnect';
import { ORG_ATTRIBUTE } from '../../../../datastore/orgStore/selectors';
import {
  PEOPLE_ATTRIBUTE,
  USER_STORE_RESELECTORS,
} from '../../../../datastore/userStore/selectorsViaConnect';

const useStyles = makeStyles(styles);
function DenyAccess(props) {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const { variant, homeButton } = props;
  useEffect(() => {
    if (!location.state) {
      history.push('/');
    }
  }, [location]);
  const orgId = location.state && location.state.orgId;
  const createdBy = location.state && location.state.createdBy;
  const organisationName = useSelector(state => {
    if (orgId) {
      return makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(
        state,
        {
          id: orgId,
          attribute: ORG_ATTRIBUTE.name,
        },
      );
    }
    return null;
  });

  const organisationOwnerId = useSelector(state => {
    if (orgId) {
      return makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(
        state,
        {
          id: orgId,
          attribute: ORG_ATTRIBUTE.createdBy,
        },
      );
    }
    return null;
  });

  const ownerName = useSelector(state => {
    if (organisationOwnerId) {
      return makeSingleSelect(USER_STORE_RESELECTORS.selectPeopleAttribute)(
        state,
        {
          id: organisationOwnerId,
          attribute: PEOPLE_ATTRIBUTE.knownAs,
        },
      );
    }
    return null;
  });

  const createdByName = useSelector(state => {
    if (createdBy) {
      return makeSingleSelect(USER_STORE_RESELECTORS.selectPeopleAttribute)(
        state,
        {
          id: createdBy,
          attribute: PEOPLE_ATTRIBUTE.knownAs,
        },
      );
    }
    return null;
  });
  const handleGoHome = () => {
    history.push('/');
  };

  const handleRedirect = () => {
    if (orgId) {
      const url = `/orgs/${orgId}/settings/billings`;
      history.push(url);
    } else {
      history.push(`/settings/billings`);
    }
  };

  const renderErrorMessage = (reason, moreInfo, values = {}) => {
    const msg = isEmptyString(moreInfo) ? reason : moreInfo;
    return (
      <GridContainer direction="column" alignItems="center" spacing={0}>
        <GridItem>
          <H2 weight="bold" dense className={classes.title}>
            <M {...m[reason]} values={values} />
          </H2>
        </GridItem>
        <GridItem>
          <H4 dense className={classes.text}>
            <M {...m[`${msg}Denied`]} values={values} />
          </H4>
        </GridItem>
        <GridItem>
          <H4 dense className={classes.text}>
            <M {...m[`${msg}Message`]} values={values} />
          </H4>
        </GridItem>
        <GridItem />
        <GridItem>
          <H4 dense className={classes.text}>
            <M {...m.thankYou} values={values} />
          </H4>
        </GridItem>
      </GridContainer>
    );
  };

  const showHomeButton = () => {
    let showHomebutton = null;
    if (homeButton) {
      showHomebutton = (
        <Button onClick={handleGoHome} className={classes.homeBtn} dense>
          <H4 dense className={classes.home}>
            Back
          </H4>
        </Button>
      );
    }
    return showHomebutton;
  };

  const showRedirectButton = () => {
    let button = null;
    if (location.state && location.state.isOwner) {
      button = (
        <Button
          dense
          onClick={handleRedirect}
          className={classes.homeBtn}
          color="primary"
        >
          <H4 dense className={classes.home}>
            Upgrade Plan
          </H4>
        </Button>
      );
    }
    return button;
  };

  const renderButtons = () => (
    <>
      <GridItem>
        <GridContainer>
          <GridItem>{showRedirectButton()}</GridItem>
          <GridItem>{showHomeButton()}</GridItem>
        </GridContainer>
      </GridItem>
    </>
  );

  const renderMessageContent = () => {
    let children;
    if (location.state) {
      if (
        location.state.reason ===
        DENY_ACCESS_REASON.INSUFFICIENT_CONTRIBUTOR_SEAT
      ) {
        const name = LOGIC_HELPERS.ifElse(ownerName, ownerName, createdByName);
        const lackSeats = location.state.lackSeats;
        children = renderErrorMessage(
          DENY_ACCESS_REASON.INSUFFICIENT_CONTRIBUTOR_SEAT,
          '',
          {
            organisationName,
            ownerName: name,
            lackSeats: `${lackSeats} more team ${pluralizeText(
              'seat',
              lackSeats,
            )}`,
          },
        );
      }
      if (location.state.reason === DENY_ACCESS_REASON.INSUFFICIENT_TOUR_SEAT) {
        const name = LOGIC_HELPERS.ifElse(ownerName, ownerName, createdByName);
        const lackSeats = location.state.lackSeats;
        children = renderErrorMessage(
          DENY_ACCESS_REASON.INSUFFICIENT_TOUR_SEAT,
          '',
          {
            organisationName,
            ownerName: name,
            lackSeats: `${lackSeats} more tour ${pluralizeText(
              'seat',
              lackSeats,
            )}`,
          },
        );
      }
      if (location.state.reason === DENY_ACCESS_REASON.NO_SUBSCRIPTION) {
        if (location.state.fromPath.includes('orgs')) {
          children = renderErrorMessage(
            DENY_ACCESS_REASON.NO_SUBSCRIPTION,
            variant,
          );
        } else {
          children = renderErrorMessage(
            DENY_ACCESS_REASON.NO_SUBSCRIPTION,
            `${variant}Tour`,
          );
        }
      }
      if (location.state.reason === DENY_ACCESS_REASON.NO_ORG_BILLING_ACCESS) {
        children = renderErrorMessage(DENY_ACCESS_REASON.NO_ORG_BILLING_ACCESS);
      }
      if (
        location.state.reason === DENY_ACCESS_REASON.NO_PERSON_BILLING_ACCESS
      ) {
        children = renderErrorMessage(
          DENY_ACCESS_REASON.NO_PERSON_BILLING_ACCESS,
        );
      }
      return children;
    }
    return <div />;
  };

  return (
    <div className={classes.root}>
      <Container large>
        <GridContainer
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.container}
        >
          <GridItem>
            <Img
              src={AccessDeniedImg}
              className={classes.img}
              alt="AccessDenied"
            />
          </GridItem>
          <GridItem>{renderMessageContent()}</GridItem>
          <GridItem>{renderButtons()}</GridItem>
        </GridContainer>
      </Container>
    </div>
  );
}

DenyAccess.propTypes = {
  variant: PropTypes.string,
  homeButton: PropTypes.bool,
};

DenyAccess.defaultProps = {
  homeButton: true,
};

export default React.memo(DenyAccess);
