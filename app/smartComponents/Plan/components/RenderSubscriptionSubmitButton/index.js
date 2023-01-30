import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';
import GridItem from '../../../../components/GridItem';
import Button from '../../../../viewComponents/Button';
import { H4, H6 } from '../../../../viewComponents/Typography';
import GridContainer from '../../../../components/GridContainer';
import { makeStyles } from '../../../../components/material-ui';
import { getDisplayText } from '../Utility/SubscriptionUtility';
import JText from '../../../../components/JText';
import { usePlanContext } from '../../context/planStateContext';
import {
  DOWNGRADE,
  ORG_SEAT_RENDER,
  SUBSCRIPTION_ENTERPRISE,
} from '../../../../appConstants';

const styles = () => ({
  grow: {
    flex: 1,
  },
  submit: {
    marginTop: 8,
  },
  cancel: {
    margin: 0,
  },
  submitText: {
    color: 'white',
  },
});

const useStyles = makeStyles(styles);
const RenderSubscriptionSubmitButton = props => {
  const classes = useStyles();
  const history = useHistory();
  const [planState] = usePlanContext();
  const handleGoBack = () => history.goBack();
  const disableSubmit =
    props.type === SUBSCRIPTION_ENTERPRISE &&
    props.variant !== ORG_SEAT_RENDER &&
    planState.subscriptionProcessLabel === DOWNGRADE &&
    planState.calculatePlanLists &&
    planState.calculatePlanLists.length === 0;
  const displayError = err => (
    <GridItem>
      <JText danger sm nowrap={false}>
        {err}
      </JText>
    </GridItem>
  );
  const { onSubmit, hideInnerSubmitButton, loading, firstTime } = props;
  if (hideInnerSubmitButton) {
    return null;
  }
  const cancelButton = LOGIC_HELPERS.ifElse(
    firstTime,
    null,
    <GridItem>
      <Button size="small" variant="outline" onClick={handleGoBack} dense>
        <H4 dense weight="bold">
          Cancel
        </H4>
      </Button>
    </GridItem>,
  );
  return (
    <>
      {displayError(planState.stripeError)}
      <GridItem>
        <GridContainer className={classes.submit}>
          <GridItem className={classes.grow}>
            <Button
              onClick={onSubmit}
              size="small"
              block
              dense
              loading={loading}
              disabled={disableSubmit}
            >
              <H4 dense weight="bold" className={classes.submitText}>
                Submit to {getDisplayText()}
              </H4>
            </Button>
          </GridItem>
          {cancelButton}
        </GridContainer>
      </GridItem>
      <GridItem>
        <H6 dense>
          {`By clicking "${getDisplayText()}", you agree to our Terms of Service and Privacy Policy.`}
        </H6>
      </GridItem>
    </>
  );
};

RenderSubscriptionSubmitButton.propTypes = {
  onSubmit: PropTypes.func,
  hideInnerSubmitButton: PropTypes.bool,
  loading: PropTypes.bool,
  firstTime: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
};

export default RenderSubscriptionSubmitButton;
