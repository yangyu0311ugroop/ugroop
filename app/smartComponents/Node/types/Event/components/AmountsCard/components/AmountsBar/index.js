import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { makeStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import styles from './styles';

const useStyles = makeStyles(styles);

function AmountsBar(props) {
  const classes = useStyles();
  const {
    highlight,
    currency,
    budgetAmount,
    actualAmount,
    full,
    title,
  } = props;

  const budgetPercentage = EVENT_VIEW_HELPERS.percentage(
    budgetAmount,
    actualAmount,
  );
  const actualPercentage = EVENT_VIEW_HELPERS.percentage(
    actualAmount,
    budgetAmount,
  );
  const budgetActive = highlight === 'Budget';
  const actualActive = highlight === 'Actual';

  return (
    <GridContainer direction="column" spacing={1}>
      {title && (
        <GridItem>
          <JText blue lg capitalize>
            {title}
          </JText>
        </GridItem>
      )}
      <GridItem>
        <GridContainer alignItems="center" spacing={2} wrap="nowrap">
          <GridItem>
            <GridContainer direction="column">
              <GridItem>
                <JText bold={budgetActive} dark sm={!budgetActive}>
                  Budget
                </JText>
              </GridItem>
              <GridItem>
                <JText bold={actualActive} dark sm={!actualActive}>
                  Actual
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>

          <GridItem xs>
            <div className={classes.barWidth}>
              <GridContainer alignItems="center" spacing={0} wrap="nowrap">
                <GridItem>
                  <div className={classes.dividerLine} />
                </GridItem>
                <GridItem xs>
                  <GridContainer direction="column">
                    <GridItem>
                      <div
                        className={classnames(
                          budgetActive
                            ? classes.activeBar
                            : classes.inactiveBar,
                          classes.bar,
                        )}
                        style={{
                          width: `${budgetPercentage * 100}%`,
                        }}
                      />
                    </GridItem>
                    <GridItem>
                      <div
                        className={classnames(
                          actualActive
                            ? classes.activeBar
                            : classes.inactiveBar,
                          classes.bar,
                        )}
                        style={{
                          width: `${actualPercentage * 100}%`,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>

          <GridItem>
            <GridContainer alignItems="flex-end" direction="column">
              <GridItem>
                <JText bold={budgetActive} sm={!budgetActive} dark>
                  {EVENT_VIEW_HELPERS.normaliseAmount(
                    budgetAmount,
                    currency,
                    full,
                  )}
                </JText>
              </GridItem>
              <GridItem>
                <JText bold={actualActive} sm={!actualActive} dark>
                  {EVENT_VIEW_HELPERS.normaliseAmount(
                    actualAmount,
                    currency,
                    full,
                  )}
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}

AmountsBar.propTypes = {
  title: PropTypes.node,
  highlight: PropTypes.string,
  currency: PropTypes.string,
  budgetAmount: PropTypes.number,
  actualAmount: PropTypes.number,
  full: PropTypes.bool,
};
AmountsBar.defaultProps = {
  highlight: 'Actual',
  budgetAmount: 0,
  actualAmount: 0,
};

export default AmountsBar;
