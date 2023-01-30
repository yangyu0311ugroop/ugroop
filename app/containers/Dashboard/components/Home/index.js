import {
  DASHBOARD_VIEW_STORE,
  INTERCOM_TOUR_PRODUCT,
  PAGE_HELMETS,
  TOUR_INVITATION_TYPE,
  URL_HELPERS,
} from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import { FormattedMessage as M } from 'react-intl';
import GridItem from 'components/GridItem/index';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import OrganisationCard from 'smartComponents/Card/components/OrganisationCard';
import TourInvitationCard from 'smartComponents/Card/components/TourInvitationCard';
import UpNextCard from 'smartComponents/Card/components/UpNextCard';
import InvitationCard from 'ugcomponents/Card/InvitationCard';
import Icon from 'ugcomponents/Icon';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import Card from './components/Card';
import { CONFIG } from './config';
import styles from './styles';
import m from './messages';
import { LoadingText } from '../../../../ugcomponents/Progress';
import JText from '../../../../components/JText';
import UGLink from '../../../../components/Link';
import NewTour from '../../../../smartComponents/Node/components/NewTour';

const useStyles = makeStyles(styles);
function Home(props) {
  const { loading } = props;
  const classes = useStyles();
  const [tourInvitations, setTourInvitations] = useState([]);
  const [upNext, setUpNext] = useState([]);
  const [orgInvitations, setOrgInvitations] = useState([]);
  const [tourTransfers, setTourTransfers] = useState([]);

  const renderOrganisationCard = params => {
    const { array, content } = params;
    setOrgInvitations(array);

    if (!array.length) return null;

    return (
      <GridItem className={classes.width100}>
        <Card name="OrganisationCard" content={content} count={array.length} />
      </GridItem>
    );
  };

  const renderInvitationCard = params => {
    const { array, content } = params;
    setTourInvitations(array);

    if (!array.length) {
      return content;
    }

    return (
      <GridItem className={classes.width100}>
        <Card name="InvitationCard" content={content} count={array.length} />
      </GridItem>
    );
  };

  const renderTransferCard = params => {
    const { array, content } = params;
    setTourTransfers(array);

    if (!array.length) {
      return content;
    }

    return (
      <GridItem className={classes.width100}>
        <Card name="TransferCard" content={content} count={array.length} />
      </GridItem>
    );
  };

  const renderUpNext = context => {
    const { array, content } = context;
    setUpNext(array);

    if (!array.length) {
      return null;
    }

    return (
      <GridItem className={classes.width100}>
        <Card name="UpNext" content={content} count={array.length} />
      </GridItem>
    );
  };

  // eslint-disable-next-line react/prop-types
  const renderNewTourButton = ({ onClick }) => (
    <JText link onClick={onClick}>
      Click to add a trip
    </JText>
  );

  const renderOptions = () => (
    <React.Fragment>
      <GridItem>
        {/* <JText gray>
          There is nothing to see right now do you want to create a new trip?
        </JText> */}
        <Box pt={2}>
          <div className={classes.textAlignCenter}>
            <M {...m.nothingHere} />
          </div>
        </Box>
      </GridItem>
      <GridItem>
        <Box pt={2}>
          {loading && (
            <LoadingText splash hideLogo fullScreen={false} noMargin />
          )}
          {!loading && (
            <GridContainer noWrap>
              <GridItem>
                <NewTour organisationId={-1} userId={-1}>
                  {renderNewTourButton}
                </NewTour>
              </GridItem>
              <GridItem>
                <JText bolder>|</JText>
              </GridItem>
              <GridItem>
                <UGLink to={URL_HELPERS.myTours()}>
                  <JText link>Go to itineraries</JText>
                </UGLink>
              </GridItem>
            </GridContainer>
          )}
        </Box>
      </GridItem>
    </React.Fragment>
  );
  const isEmpty =
    tourInvitations.length === 0 &&
    orgInvitations.length === 0 &&
    upNext.length === 0 &&
    tourTransfers.length === 0;

  const renderEmpty = () => {
    /* const empty =
      tourInvitations.length === 0 &&
      orgInvitations.length === 0 &&
      upNext.length === 0 &&
      tourTransfers.length === 0; */

    // if (!loading) return <LoadingText splash />;

    if (!isEmpty) return null;

    return (
      <GridItem className={classes.width100}>
        {renderProductTourAndWhatsNew()}
        <GridContainer
          card
          highlight
          direction="column"
          cardClassName={classes.collapsedCard}
        >
          <GridItem>
            <div className={classes.icons}>
              <GridContainer alignItems="center" justify="center" spacing={4}>
                <GridItem>
                  <Icon
                    darkMode
                    size="extraMedium"
                    color="success"
                    icon="lnr-list3"
                  />
                </GridItem>
                <GridItem>
                  <Icon
                    darkMode
                    size="extraMedium"
                    color="lavender"
                    icon="users-plus"
                  />
                </GridItem>
                <GridItem>
                  <Icon
                    darkMode
                    size="extraMedium"
                    color="warning"
                    icon="lnr-document"
                  />
                </GridItem>
                <GridItem>
                  <Icon
                    darkMode
                    size="extraMedium"
                    color="yellow"
                    icon="lnr-calendar-check"
                  />
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
          <GridItem>
            <GridContainer direction="column" alignItems="center">
              <GridItem>
                <div className={classes.emptyHeading}>
                  <M {...m.stayOnTrack} />
                </div>
              </GridItem>
              {/* <GridItem>
                <div className={classes.textAlignCenter}>
                  <M {...m.invitePeople} />
                </div>
              </GridItem> */}
              {renderOptions()}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  const renderProductTourAndWhatsNew = () => {
    if (process.env.ENV === 'live' || process.env.ENV === 'production') {
      return (
        <GridItem className={classes.width100}>
          <GridContainer
            noWrap
            spacing={0}
            direction="row"
            justify="space-between"
            className={classes.card}
          >
            <GridItem>
              <UGLink
                to={{
                  pathname: '/',
                  search: INTERCOM_TOUR_PRODUCT,
                }}
                data-testid="productTourLink"
              >
                <JText italic md underline black bold>
                  <M {...m.quickProductTour} />
                </JText>
              </UGLink>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }
    return null;
  };

  return (
    <GridContainer
      direction="column"
      spacing={0}
      alignItems="center"
      data-testid="homeDataTest"
    >
      <Helmet
        title={PAGE_HELMETS.DASHBOARD}
        meta={[{ name: 'description', content: 'Description of Dashboard' }]}
      />
      {!isEmpty && renderProductTourAndWhatsNew()}
      {renderEmpty()}
      <OrganisationCard>{renderOrganisationCard}</OrganisationCard>

      <InvitationCard viewStore={DASHBOARD_VIEW_STORE}>
        {renderInvitationCard}
      </InvitationCard>

      <TourInvitationCard
        viewStore={DASHBOARD_VIEW_STORE}
        type={TOUR_INVITATION_TYPE.TRANSFER}
      >
        {renderTransferCard}
      </TourInvitationCard>

      <UpNextCard>{renderUpNext}</UpNextCard>
    </GridContainer>
  );
}

Home.propTypes = {
  loading: PropTypes.bool,
};

Home.defaultProps = {};

export default compose(resaga(CONFIG))(React.memo(Home));
