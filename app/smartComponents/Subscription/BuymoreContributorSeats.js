import React from 'react';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import P, { H4, H3 } from 'viewComponents/Typography';
import {
  FREE_ORG_SEATS_THRESHOLD,
  SUBSCRIPTION_FREE_PLANS,
  TourFrom,
  URL_HELPERS,
} from 'appConstants';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import { FormattedMessage as TEXT, FormattedMessage as M } from 'react-intl';
import Table, { TableCell, TableRow, TableBody } from 'viewComponents/Table';
import { pluralizeText, STRING_HELPERS } from '../../utils/stringAdditions';
import Link from '../../components/Link';
import useUserNodesInTours from '../../hooks/useUserNodesInTours';
import useTourFrom from '../../hooks/useTourFrom';
import { useGlobalContext } from '../../containers/App/globalStateContext';
import { makeStyles } from '../../components/material-ui';
import Button from '../../viewComponents/Button';
import JText from '../../components/JText';
import JDialog from '../../ugcomponents/JDialog';
import m from './Messages/index';

/* eslint-disable no-param-reassign */
const styles = {
  buttonTextAlign: {
    textAlign: 'right',
  },
  helperButton: {
    width: 15,
    height: 15,

    marginTop: 5,
    '& > span > i': {
      fontSize: 12,
    },
  },
  h4: {
    margin: '12px 0',
  },
  closeBtn: {
    flex: 1,
    borderRadius: 4,
    padding: '8px 16px',
    margin: '16px 0 0',
    color: '#ffffff',
    backgroundColor: '#7097eb',
    '&:hover': {
      backgroundColor: '#a0b6eb',
    },
  },
};
const useStyles = makeStyles(styles);
export function BuymoreContributorSeats(props) {
  const classes = useStyles();
  const [state, setState] = useImmer({
    helpDialogOpen: false,
  });
  const { templateId } = props;
  const [globalContext] = useGlobalContext();
  const { from, orgId } = useTourFrom({ templateId });

  const recalculateRemainingSeats = () => {
    let pending = 0;
    if (
      globalContext.BillingContext.org.orgPending &&
      globalContext.BillingContext.org.orgPending.length > 0
    ) {
      pending = globalContext.BillingContext.org.orgPending.length;
    }
    const num =
      globalContext.BillingContext.org.orgSeats +
      FREE_ORG_SEATS_THRESHOLD -
      globalContext.BillingContext.org.connectedOrgPeople -
      globalContext.BillingContext.org.connectedContributor -
      pending;
    if (num === 0.5) {
      return 1;
    }
    return num < 1 ? 0 : Math.round(num);
  };

  const remainingSeats = recalculateRemainingSeats();
  const { isLoginUserPartOfTours, tourOwner } = useUserNodesInTours({
    templateId,
  });

  const renderBuyMore = () => {
    const link = URL_HELPERS.orgSubscriptionUpgrade(orgId);
    if (remainingSeats <= 0.5) {
      return (
        <GridItem className={classes.buttonTextAlign}>
          <Link to={link}>Buy more</Link>
        </GridItem>
      );
    }
    return null;
  };

  const openHelperDialog = () => {
    setState(draft => {
      draft.helpDialogOpen = true;
    });
  };
  const closeHelperDialog = () => {
    setState(draft => {
      draft.helpDialogOpen = false;
    });
  };

  // eslint-disable-next-line react/prop-types
  const helperButton = () => (
    <Button
      icon="question"
      variant="outline"
      size="extraSmall"
      onClick={openHelperDialog}
      weight="strong"
      color="darkgray"
      iconButton
      noMargin
      noPadding
      className={classes.helperButton}
    />
  );

  const seatExplain = () => {
    const pending = globalContext.BillingContext.org.orgPending;
    const outsideContributor =
      globalContext.BillingContext.org.connectedContributor;
    const active = (
      <H4 className={classes.h4} dense>
        <M
          {...m.CONTRIBUTOR_ORGSEAT}
          values={{
            orgSeats: `${globalContext.BillingContext.org.orgSeats +
              FREE_ORG_SEATS_THRESHOLD} ${pluralizeText(
              'team seat',
              globalContext.BillingContext.org.orgSeats +
                FREE_ORG_SEATS_THRESHOLD,
            )}`,
            activeMember: `${
              globalContext.BillingContext.org.connectedOrgPeople
            } ${pluralizeText(
              'active members',
              globalContext.BillingContext.org.connectedOrgPeople,
            )}`,
            pendingMembers:
              pending && pending.length > 0
                ? ` and ${pending.length} pending organisation ${pluralizeText(
                    'invitation',
                    pending.length,
                  )}.`
                : '.',
          }}
        />
      </H4>
    );
    let result;
    if (outsideContributor > 0) {
      result = (
        <H4 className={classes.h4} dense>
          <M
            {...m.CONTRIBUTOR_RESULT_WITH_OUTSIDEORG_CONTRIBUTOR}
            values={{
              outSideConnected: `${outsideContributor} ${pluralizeText(
                'new contributor',
                outsideContributor,
              )}`,
              equation: `${remainingSeats}`,
            }}
          />
        </H4>
      );
    } else {
      result = (
        <H4 className={classes.h4} dense>
          <M
            {...m.CONTRIBUTOR_RESULT}
            values={{
              equation: `${remainingSeats}`,
            }}
          />
        </H4>
      );
    }
    return (
      <>
        {active}
        {result}
      </>
    );
  };

  const freeSeatPlanExplain = () => <M {...m.CONTRIBUTOR_FREE} />;

  const messageBody = () => {
    if (
      !SUBSCRIPTION_FREE_PLANS.includes(
        globalContext.BillingContext.org.subscriptionPlan,
      )
    ) {
      return seatExplain();
    }
    return (
      <H4 className={classes.h4} dense>
        {freeSeatPlanExplain()}
      </H4>
    );
  };
  if (!isLoginUserPartOfTours || (from === TourFrom.PERSONAL && !tourOwner)) {
    return <GridItem data-testid="no-access-buy-more" />;
  }
  return (
    <>
      <GridItem>
        <GridContainer direction="column" wrap="nowrap" spacing={0}>
          <GridItem>
            <GridContainer>
              <GridItem data-testid="remainingSeats">
                <P noMargin subtitle>
                  {remainingSeats} team{' '}
                  {STRING_HELPERS.pluralise('seat', remainingSeats, true)} left
                </P>
              </GridItem>
              <GridItem>{helperButton()}</GridItem>
            </GridContainer>
          </GridItem>
          {renderBuyMore()}
        </GridContainer>
      </GridItem>
      <JDialog
        maxWidth="xs"
        open={state.helpDialogOpen}
        disabled={false}
        fullWidth
        onButtonClose={closeHelperDialog}
        header={
          <JText xl>
            {' '}
            <H3 dense weight="bold">
              Contributor Seats Guide
            </H3>
          </JText>
        }
        notesTextWrap={false}
        hideSubmitButton
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{messageBody()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          onClick={closeHelperDialog}
          className={classes.closeBtn}
          data-testid="helpCloseButton"
        >
          <TEXT {...m.confirmBtn} />
        </Button>
      </JDialog>
    </>
  );
}

BuymoreContributorSeats.propTypes = {
  templateId: PropTypes.number,
};

export default React.memo(BuymoreContributorSeats);
