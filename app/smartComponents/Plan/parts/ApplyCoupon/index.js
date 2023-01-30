import React from 'react';
import PropTypes from 'prop-types';
import Form from 'ugcomponents/Form';
import { makeStyles } from 'components/material-ui';
import { useImmer } from 'use-immer';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { Text as TextField } from '../../../Inputs';
import Button from '../../../../viewComponents/Button';
import { Span } from '../../../../viewComponents/Typography';
import inputs from './inputs';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { usePlanContext } from '../../context/planStateContext';
/* eslint-disable no-param-reassign */

const styles = {
  root: {
    flexWrap: 'nowrap',
  },
  button: {
    marginLeft: 10,
    marginTop: 0,
    padding: '15px 12px',
    width: '100%',
  },
  buttonText: {
    wordBreak: 'normal',
  },
};
const useStyles = makeStyles(styles);
function ApplyCoupon(props) {
  const classes = useStyles();
  const [state, setState] = useImmer({
    inputChange: false,
    value: '',
  });

  const [planState, dispatch] = usePlanContext();
  const getErrorMessage = () => {
    if (!planState.couponData.couponLoading && state.inputChange) {
      return planState.couponData.applyCouponError;
    }
    return null;
  };

  const onChange = value => {
    setState(draft => {
      draft.inputChange = false;
      draft.value = value;
    });
    dispatch.setApplyCouponError(null);
  };

  const onSubmit = data => {
    setState(draft => {
      draft.inputChange = true;
    });
    props.onSubmit(data);
  };

  const inputComponent = (
    <TextField
      variant="outlined"
      {...inputs.textField}
      getErrorMessage={getErrorMessage}
      helperText={getErrorMessage()}
      onChange={onChange}
      value={
        !isEmptyString(planState.couponData.applyCoupon) ? '' : state.value
      }
    />
  );
  return (
    <Form onValidSubmit={onSubmit}>
      <GridContainer spacing={0} className={classes.root}>
        <GridItem md={10} xs={10} data-testid="couponInput">
          {inputComponent}
        </GridItem>
        <GridItem md={2} xs={2}>
          <Button type="submit" variant="outline" className={classes.button}>
            <Span className={classes.buttonText}>Apply</Span>
          </Button>
        </GridItem>
      </GridContainer>
    </Form>
  );
}

ApplyCoupon.propTypes = {
  onSubmit: PropTypes.func,
};

ApplyCoupon.defaultProps = {};

export default React.memo(ApplyCoupon);
