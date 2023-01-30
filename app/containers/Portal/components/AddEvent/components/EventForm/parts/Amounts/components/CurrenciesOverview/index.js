import { ADMIN_TOUR_SETTINGS, CURRENCY_LIST } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { makeStyles } from 'components/material-ui';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import styles from './styles';

const useStyles = makeStyles(styles);

function CurrenciesOverview(props) {
  const classes = useStyles();
  const { data, tourSettings } = props;

  const homeCurrency = get(tourSettings, [
    ADMIN_TOUR_SETTINGS.HOME_CURRENCY,
    'value',
  ]);

  const renderCurrency = key => (
    <GridItem key={key}>
      <GridContainer alignItems="center" spacing={1} wrap="nowrap">
        <GridItem>
          <div className={classnames(classes.bgGreen, classes.icon)}>
            <JText sm gray>
              {key}
            </JText>
          </div>
        </GridItem>
        <GridItem xs>
          <GridContainer alignItems="baseline" wrap="nowrap">
            <GridItem xs>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <JText dark bold nowrap={false}>
                    {CURRENCY_LIST[key]}
                  </JText>
                </GridItem>
                <GridItem>
                  <div className={classnames(classes.sub)}>
                    <JText gray sm>
                      {key === homeCurrency
                        ? 'Home Currency'
                        : EVENT_VIEW_HELPERS.normaliseAmount(data[key], key)}
                    </JText>
                  </div>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <JText dark sm>
                {EVENT_VIEW_HELPERS.normaliseAmount(
                  EVENT_VIEW_HELPERS.convertAmount(
                    data[key],
                    key,
                    homeCurrency,
                    tourSettings,
                  ),
                  homeCurrency,
                )}
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  return (
    <GridItem>
      <GridContainer direction="column" spacing={1}>
        {Object.keys(data).map(renderCurrency)}
      </GridContainer>
    </GridItem>
  );
}

CurrenciesOverview.propTypes = {
  data: PropTypes.object,
  tourSettings: PropTypes.object,
};
CurrenciesOverview.defaultProps = {
  data: {},
  tourSettings: {},
};

export default CurrenciesOverview;
