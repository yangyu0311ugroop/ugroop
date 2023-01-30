import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { INVITE_TOOLTIP_MSG } from '../../../../../../../../../appConstants';
import GridItem from '../../../../../../../../../components/GridItem';
import Button from '../../../../../../../../../viewComponents/Button';
import m from './messages';
import ButtonUpgradeActions from '../../../../../../../Components/ButtonUpgradeActions';
import P from '../../../../../../../../../viewComponents/Typography';
import { STRING_HELPERS } from '../../../../../../../../../utils/stringAdditions';
import { useGlobalContext } from '../../../../../../../../App/globalStateContext';
import styles from './style';
import { makeSingleSelect } from '../../../../../../../../../datastore/selectUtility';
import {
  CREATEDBY,
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
} from '../../../../../../../../../datastore/nodeStore/selectorsViaConnect';
import { TOUR_INTERESTED } from '../../../../../../../../../utils/modelConstants';
const useStyles = makeStyles(styles);
/* eslint-disable no-param-reassign */
function InviteButton(props) {
  const classes = useStyles();
  const [globalContext] = useGlobalContext();
  const { needsInvitation, loading, error, templateId, role } = props;
  const orgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: props.templateId,
      attribute: CustomDataOrgId,
    }),
  );
  const owner = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: CREATEDBY,
    }),
  );

  const recalculateRemainingSeats = () => {
    if (orgId) {
      const num =
        globalContext.BillingContext.org.tourSeats -
        globalContext.BillingContext.org.connectedPax;
      if (num === 1.5) return 0;
      return num < 1 ? 0 : Math.round(num);
    }
    const num =
      globalContext.BillingContext.person.tourSeats -
      globalContext.BillingContext.person.connectedPeople;
    return num < 1 ? 0 : Math.round(num);
  };

  const canStillInvite =
    recalculateRemainingSeats() > 0 || role === TOUR_INTERESTED;
  let btn;
  if (error) return null;
  if (canStillInvite) {
    btn = (
      <GridItem>
        <Button
          className={classes.inviteButton}
          type="submit"
          disabled={loading}
          dense
          size="extraSmall"
          weight="bold"
          color="primary"
          buttonTitle={INVITE_TOOLTIP_MSG}
        >
          {loading ? (
            <M {...m.inviteButtonLoadingLabel} />
          ) : (
            <M {...m.inviteButtonLabel} />
          )}
        </Button>
      </GridItem>
    );
  } else {
    btn = (
      <GridItem>
        <ButtonUpgradeActions
          name="Upgrade Plan"
          orgId={orgId}
          tourCreatedBy={owner}
        />
      </GridItem>
    );
  }

  return (
    needsInvitation && (
      <>
        {btn}
        <GridItem>
          <P noMargin subtitle>
            {recalculateRemainingSeats()} {'tour'}{' '}
            {STRING_HELPERS.pluralise(
              'seat',
              recalculateRemainingSeats(),
              true,
            )}{' '}
            remaining
          </P>
        </GridItem>
      </>
    )
  );
}

export default React.memo(InviteButton);
