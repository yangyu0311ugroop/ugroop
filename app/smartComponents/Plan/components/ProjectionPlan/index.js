import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useImmer } from 'use-immer';
import useVigilante from '@mollycule/vigilante';
import { H4 } from '../../../../viewComponents/Typography';
import { URL_HELPERS } from '../../../../appConstants';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import Button from '../../../../viewComponents/Button';
import { VARIANTS } from '../../../../variantsConstants';
import { parseStringJson } from '../../../../utils/stringAdditions';
import { makeStyles } from '../../../../components/material-ui';
import { usePlanContext } from '../../context/planStateContext';
import { makeSelectProjectionPlans } from '../../../../datastore/planDataImmerStore/selectors';

const styles = {
  highlight: {
    background: '#fffbdd',
    padding: 8,
  },
};

const useStyles = makeStyles(styles);
function ProjectPlans(props) {
  const classes = useStyles();
  const history = useHistory();
  const {
    orgId,
    currentfirstTierAmount,
    currentsecondTier,
    quantity,
    seat,
    currentPlanFirstPurchase,
    projectPlanIds,
  } = props;
  const [planState, dispatchState] = usePlanContext();
  const [lstate, setState] = useImmer({
    betterPlanName: '',
  });
  const projectData = useSelector(state =>
    makeSelectProjectionPlans(state, {
      currentfirstTierAmount,
      currentsecondTier,
      quantity,
      seat,
      currentPlanFirstPurchase,
      projectPlanIds,
    }),
  );
  useVigilante('ProjectPlans', {
    ...props,
    projectData,
  });
  useEffect(() => {
    const data = parseStringJson(projectData);
    if (data.betterPlan) {
      dispatchState.setBetterSubscriptionPLan(true);
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.betterPlanName = data.name;
      });
    } else {
      dispatchState.setBetterSubscriptionPLan(false);
    }
  }, [projectData]);

  const redirectToUpdate = () => {
    history.push(URL_HELPERS.orgSubscriptionUpgrade(orgId));
  };

  if (planState.betterSubscriptionPlan) {
    return (
      <GridContainer
        direction="row"
        alignItems="left"
        className={classes.highlight}
      >
        <GridItem>
          {' '}
          <H4 dense>
            We find a better plan for you <b>{lstate.betterPlanName}</b>.
          </H4>
          <Button
            variant={VARIANTS.INLINE}
            size="small"
            dense
            onClick={redirectToUpdate}
          >
            click here to upgrade to new plan
          </Button>
        </GridItem>
      </GridContainer>
    );
  }
  return '';
}

export default React.memo(ProjectPlans);
