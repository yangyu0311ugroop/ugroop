import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import { Radio, FormControlLabel, makeStyles } from 'components/material-ui';
import { H5 } from 'viewComponents/Typography';
import GridItem from 'components/GridItem';
import { useSelector } from 'react-redux';
import { isEmptyString } from '../../../../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../../../../utils/subscriptionCalculation';
import { isNumber } from '../../../../../utils/numberAdditions';
import { makeSingleSelect } from '../../../../../datastore/selectUtility';
import { PLAN_RESELECTOR } from '../../../../../datastore/planDataImmerStore/selectors';
import JText from '../../../../../components/JText';

const styles = {
  root: {
    width: '100%',
    margin: '4px 0',
    padding: '4px 0',
    borderRadius: 4,
    border: '1px solid #9e9e9e',
    '& > span:first-child': {
      marginTop: 12,
      color: '#7097EB',
      alignSelf: 'flex-start',
    },
    '& > span:last-child': {
      width: '100%',
    },
  },
  grow: {
    flex: 1,
  },
  checked: {
    border: '1px solid #7097eb',
    boxShadow: '0 0 16px -8px #7097eb',
  },
  title: {
    marginTop: 8,
  },
  item: {
    padding: '8px 36px',
    paddingLeft: 1,
  },
  priceStyle: {
    textAlign: 'right',
  },
};
const useStyles = makeStyles(styles);
function Item(props) {
  const classes = useStyles();
  const { index, id } = props;

  const currency = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id,
      attribute: 'currency',
    }),
  );
  const interval = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id,
      attribute: 'interval',
    }),
  );
  const flatAmount = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id,
      attribute: `tiers.${index}.flat_amount`,
    }),
  );

  const unitAmount = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id,
      attribute: `tiers.${index}.unit_amount`,
    }),
  );

  const upto = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id,
      attribute: `tiers.${index}.up_to`,
    }),
  );

  const renderLabel = () => {
    const value = unitAmount || flatAmount || 0;
    let str;
    if (isEmptyString(upto)) {
      str = `over 100 tour seats per tour`;
    } else {
      str = `upto ${upto} tour seats per tour`;
    }
    return (
      <>
        <GridContainer spacing={0} className={classes.item}>
          <GridItem className={classes.title} xs={10}>
            <JText bold lg>
              {str}
            </JText>
          </GridItem>
          {isNumber(value) ? (
            <GridItem xs={2}>
              <GridContainer spacing={0} direction="column">
                <GridItem className={classes.priceStyle}>
                  <JText bold lg>
                    {SubscriptionCalculationUtility.currencyLabelConversion(
                      currency,
                    )}{' '}
                    ${Number(value / 100).toFixed(2)}
                  </JText>
                </GridItem>
                <GridItem className={classes.priceStyle}>
                  <H5 dense textAlign="right">
                    / {interval}
                  </H5>
                </GridItem>
              </GridContainer>
            </GridItem>
          ) : (
            ''
          )}
        </GridContainer>
      </>
    );
  };

  return (
    <FormControlLabel
      value={`${index}`}
      label={renderLabel()}
      control={<Radio />}
      className={classnames(classes.root)}
    />
  );
}

Item.propTypes = {
  index: PropTypes.number,
  id: PropTypes.number,
};

export default React.memo(Item);
