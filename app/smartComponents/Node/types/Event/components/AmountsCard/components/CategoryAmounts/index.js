import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { makeStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import AmountsBar from 'smartComponents/Node/types/Event/components/AmountsCard/components/AmountsBar';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import Tooltip from 'viewComponents/Tooltip';
import styles from './styles';

const useStyles = makeStyles(styles);

const ICONS = {
  transportation: 'lnr-car2',
  accommodation: 'lnr-bed',
  activity: 'lnr-calendar-check',
  food: 'lnr-dinner',
};
const ALIASES = {
  transportation: 'Transportation',
  accommodation: 'Accommodation',
  activity: 'Activities',
  food: 'Food',
};

function CategoryAmounts(props) {
  const classes = useStyles();
  const { type, amount, otherAmount, cardState, currency, onClick } = props;

  return (
    <GridItem>
      <div className={classes.item}>
        <GridContainer onClick={onClick} alignItems="center" spacing={2}>
          <GridItem>
            <div className={classnames(classes[`${type}Bg`], classes.icon)}>
              <Icon icon={ICONS[type]} size="normal" color={type} />
            </div>
          </GridItem>
          <GridItem xs>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText dark bold capitalize className={classes.header}>
                  {ALIASES[type]}
                </JText>
              </GridItem>
              <GridItem>
                <div className={classnames(classes.sub)}>
                  <JText gray sm>
                    {EVENT_VIEW_HELPERS.normaliseAmount(amount, currency, true)}
                  </JText>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
          {!!amount && (
            <GridItem>
              <Tooltip
                isLight
                placement="top"
                title={
                  <GridContainer card direction="column">
                    <GridItem>
                      <AmountsBar
                        title={type}
                        highlight={cardState}
                        actualAmount={amount}
                        budgetAmount={otherAmount}
                        currency={currency}
                      />
                    </GridItem>
                  </GridContainer>
                }
                enterDelay={700}
              >
                <JText
                  danger={amount > otherAmount}
                  success={amount < otherAmount}
                  sm
                >
                  {EVENT_VIEW_HELPERS.renderDiff(amount, otherAmount)}
                </JText>
              </Tooltip>
            </GridItem>
          )}
        </GridContainer>
      </div>
    </GridItem>
  );
}

CategoryAmounts.propTypes = {
  type: PropTypes.string,
  cardState: PropTypes.string,
  currency: PropTypes.string,
  amount: PropTypes.number,
  otherAmount: PropTypes.number,
  onClick: PropTypes.func,
};
CategoryAmounts.defaultProps = {};

export default CategoryAmounts;
