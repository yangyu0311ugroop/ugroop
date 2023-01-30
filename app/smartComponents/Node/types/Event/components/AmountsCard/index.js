import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { ADMIN_TOUR_SETTINGS, CURRENCY_OPTIONS } from 'appConstants';
import classnames from 'classnames';
import Empty from 'components/Empty';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { makeStyles } from 'components/material-ui';
import CurrenciesOverview from 'containers/Portal/components/AddEvent/components/EventForm/parts/Amounts/components/CurrenciesOverview';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { makeSingleSelect } from 'datastore/selectUtility';
import {
  FetchEventAmountsQuery,
  useEventGraph,
} from 'graphqlRequest/eventGraphql';
import get from 'lodash/get';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import resaga from 'resaga';
import { withCanEditEvent } from 'smartComponents/Event/hoc';
import SelectField from 'smartComponents/Inputs/SelectField';
import AmountItem from 'smartComponents/Node/types/Event/components/AmountsCard/components/AmountItem';
import AmountsBar from 'smartComponents/Node/types/Event/components/AmountsCard/components/AmountsBar';
import CategoryAmounts from 'smartComponents/Node/types/Event/components/AmountsCard/components/CategoryAmounts';
import { AMOUNT_HELPERS } from 'smartComponents/Node/types/Event/components/AmountsCard/helpers';
import {
  selectAmountLastUpdated,
  selectTourSettings,
} from 'smartComponents/Node/types/Event/components/AmountsCard/selectors';
import useExchangeRates from 'smartComponents/Node/types/Event/components/AmountsCard/useExchangeRates';
import useSymbols from 'smartComponents/Node/types/Event/components/AmountsCard/useSymbols';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TourSetting } from 'smartComponents/TourSettings';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import JButton from 'viewComponents/Button/variants/JButton';
import styles from './styles';

const useStyles = makeStyles(styles);

function AmountsCard(props) {
  const { templateId, canEditEvent } = props;

  const amountLastUpdated = useSelector(store =>
    makeSingleSelect(selectAmountLastUpdated)(store),
  );

  const tourSettings = useSelector(state =>
    makeSingleSelect(selectTourSettings)(state, {
      templateId,
    }),
  );

  const homeCurrency = get(tourSettings, [
    ADMIN_TOUR_SETTINGS.HOME_CURRENCY,
    'value',
  ]);
  const lastRatesUpdated = get(tourSettings, [
    ADMIN_TOUR_SETTINGS.LAST_RATES_UPDATED,
    'value',
  ]);

  const classes = useStyles();
  const [ex, setEx] = useState(null);
  const [subView, setSubView] = useState('Categories');
  const [costs, setCosts] = useState();
  const [cardState, setCardState] = useState('Actual');

  const { data, error } = useEventGraph(
    FetchEventAmountsQuery,
    templateId,
    amountLastUpdated,
  );

  const symbols = useSymbols(homeCurrency, data);

  const { data: exRates, isLoading: isLoadingRates } = useExchangeRates(
    ex,
    homeCurrency,
    symbols,
  );

  const upsertSettings = values => {
    TEMPLATE_API_HELPERS.upsertSettings(
      {
        templateId,
        values,
      },
      props,
    );
  };

  const getExchange = () => {
    setEx(true);
  };

  useEffect(() => {
    setEx(false);
  }, [homeCurrency]);

  useEffect(() => {
    const newCosts = get(data, 'costs.edges');
    if (newCosts) {
      setCosts(newCosts);
    }
  }, [data]);

  useEffect(() => {
    if (exRates && exRates.rates) {
      const lastTimeId = get(
        tourSettings,
        [ADMIN_TOUR_SETTINGS.LAST_RATES_UPDATED, 'id'],
        0,
      );

      const settingsData = symbols.reduce(
        AMOUNT_HELPERS.reduceSettings(exRates.rates, tourSettings),
        [
          {
            settingId: lastTimeId,
            data: {
              customData: {
                key: ADMIN_TOUR_SETTINGS.LAST_RATES_UPDATED,
                value: exRates.timestamp * 1000,
              },
            },
          },
        ],
      );

      upsertSettings(settingsData);
    }
  }, [exRates]);

  // only people with edit access can see amounts feature
  if (!canEditEvent) return null;

  if (error || !costs) {
    return null;
  }

  const totals = costs.reduce(AMOUNT_HELPERS.reduceCosts(tourSettings), {
    budgetTotal: 0,
    actualTotal: 0,
    unknownRates: [],
    allRates: [],
  });

  const openSettings = () => setCardState('Settings');
  const openBudget = () => setCardState('Budget');
  const openActual = () => setCardState('Actual');
  const openMain = () => {
    setEx(false);
    openActual();
  };

  const renderChangeHomeButton = (
    <JText link onClick={openSettings}>
      Change
    </JText>
  );

  const renderHomeCurrency = homeCurrency ? (
    <JText gray nowrap={false}>
      Home currency set to <JText bold>{homeCurrency}</JText>.{' '}
      {renderChangeHomeButton}
    </JText>
  ) : (
    <JText gray nowrap={false}>
      Home currency is not set. {renderChangeHomeButton}
    </JText>
  );

  if (cardState === 'Settings') {
    return (
      <GridItem>
        <GridContainer card direction="column" spacing={2}>
          <GridItem>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <JButton onClick={openMain}>
                  <Icon size="xsmall" icon="lnr-chevron-left" />
                </JButton>
              </GridItem>
              <GridItem>
                <JText dark bold>
                  Amounts Settings
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>

          <Hr half />

          <GridItem>
            <TourSetting
              id={templateId}
              settingKey={ADMIN_TOUR_SETTINGS.HOME_CURRENCY}
              variant={VARIANTS.EDITABLE}
              label="Home Currency"
              placeholder="Change"
              select
              textComponent={SelectField}
              options={CURRENCY_OPTIONS}
            />
          </GridItem>

          {homeCurrency && symbols.length > 0 && (
            <GridItem>
              <GridContainer direction="column" spacing={1}>
                <GridItem>
                  <div className={classes.border}>
                    <GridContainer direction="column" spacing={0}>
                      <GridItem>
                        <div className={classes.panel}>
                          <JText dark nowrap={false}>
                            Rates are expressed as 1 {homeCurrency}
                          </JText>
                        </div>
                      </GridItem>

                      {symbols.map((cur, idx) => (
                        <GridItem key={cur}>
                          <div
                            className={classnames(
                              classes.row,
                              idx % 2 && classes.oddRow,
                            )}
                          >
                            <TourSetting
                              id={templateId}
                              settingKey={ADMIN_TOUR_SETTINGS.EXCHANGE_RATES(
                                cur,
                                homeCurrency,
                              )}
                              variant={VARIANTS.EDITABLE}
                              label={cur}
                              placeholder="Change"
                            />
                          </div>
                        </GridItem>
                      ))}
                    </GridContainer>
                  </div>
                </GridItem>

                <GridItem>
                  <JText gray sm nowrap={false}>
                    Rates may only be used for reference.
                  </JText>{' '}
                  {lastRatesUpdated && (
                    <JText sm gray>
                      As at{' '}
                      {moment(parseInt(lastRatesUpdated, 10)).format(
                        'HH:mm:ss [on] DD/MM/YYYY',
                      )}
                      .{' '}
                    </JText>
                  )}
                  {LOGIC_HELPERS.ifElse(
                    isLoadingRates,
                    <JText sm gray>
                      Fetching rates..
                    </JText>,
                    <JText sm link nowrap={false} onClick={getExchange}>
                      Click to fetch current rates
                    </JText>,
                  )}
                </GridItem>
              </GridContainer>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  }

  if (!costs.length || !homeCurrency) {
    return (
      <Empty
        title="Amounts"
        description={!costs.length && 'No data'}
        button={renderHomeCurrency}
      />
    );
  }

  const openEventDialog = showType => () => {
    PORTAL_HELPERS.openViewEvent(
      {
        templateId,
        showAllDays: true,
        showType,
      },
      props,
    );
  };

  const budgetDetails = costs.reduce(
    AMOUNT_HELPERS.normaliseDetailAmounts('budgetAmount', tourSettings),
    {
      food: 0,
      activity: 0,
      accommodation: 0,
      transportation: 0,
      total: 0,
      unknownRates: [],
    },
  );
  const actualDetails = costs.reduce(
    AMOUNT_HELPERS.normaliseDetailAmounts('actualAmount', tourSettings),
    {
      food: 0,
      activity: 0,
      accommodation: 0,
      transportation: 0,
      total: 0,
      unknownRates: [],
    },
  );
  const costsByCurrency = EVENT_VIEW_HELPERS.costsByCurrencyReducer(
    costs,
    cardState === 'Budget' ? 'budgetAmount' : 'actualAmount',
  );
  const details = cardState === 'Budget' ? budgetDetails : actualDetails;
  const otherDetails = cardState === 'Budget' ? actualDetails : budgetDetails;

  return (
    <GridItem>
      <GridContainer card direction="column" spacing={3}>
        <GridItem>
          <div className={classes.headerDiv}>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem xs>
                <GridContainer alignItems="center" spacing={2} wrap="nowrap">
                  <GridItem
                    className={classnames(
                      cardState === 'Actual' && classes.activeTab,
                    )}
                  >
                    <JText
                      sm
                      blue={cardState === 'Actual'}
                      bolder={cardState === 'Actual'}
                      gray={cardState !== 'Actual'}
                      uppercase
                      onClick={openActual}
                    >
                      {cardState === 'Actual' ? 'Actual Amount' : 'Actual'}
                    </JText>
                  </GridItem>
                  <GridItem
                    className={classnames(
                      cardState === 'Budget' && classes.activeTab,
                    )}
                  >
                    <JText
                      sm
                      blue={cardState === 'Budget'}
                      bolder={cardState === 'Budget'}
                      gray={cardState !== 'Budget'}
                      uppercase
                      onClick={openBudget}
                    >
                      {cardState === 'Budget' ? 'Budget Amount' : 'Budget'}
                    </JText>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <JButton onClick={openSettings}>
                  <Icon icon="lnr-cog" size="small" />
                </JButton>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>

        {totals.unknownRates.length > 0 && (
          <GridItem>
            <div className={classes.warning}>
              <GridContainer alignItems="center" wrap="nowrap" spacing={2}>
                <GridItem>
                  <Icon icon="lnr-warning" color="warning" />
                </GridItem>
                <GridItem xs>
                  <JText sm dark nowrap={false}>
                    Unknown exchange rates for{' '}
                    <JText bold>{totals.unknownRates.join(', ')}</JText>.{' '}
                    <JText link onClick={openSettings}>
                      Go to Settings
                    </JText>
                  </JText>
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
        )}

        <GridItem>
          <AmountsBar
            highlight={cardState}
            actualAmount={totals.actualTotal}
            budgetAmount={totals.budgetTotal}
            currency={homeCurrency}
          />
        </GridItem>

        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <GridContainer alignItems="center" spacing={2}>
                <GridItem>
                  <JText
                    bold={subView === 'Categories'}
                    blue={subView === 'Categories'}
                    gray={subView !== 'Categories'}
                    onClick={() => setSubView('Categories')}
                  >
                    Categories
                  </JText>
                </GridItem>
                {symbols.length > 0 && (
                  <GridItem>
                    <JText
                      bold={subView === 'Currencies'}
                      blue={subView === 'Currencies'}
                      gray={subView !== 'Currencies'}
                      onClick={() => setSubView('Currencies')}
                    >
                      Currencies
                    </JText>
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>

            {subView === 'Categories' && (
              <GridItem>
                <GridContainer direction="column" spacing={2}>
                  <AmountItem
                    data={[
                      {
                        name: 'Food',
                        value: details.food,
                        color: '#ea989a',
                      },
                      {
                        name: 'Activity',
                        value: details.activity,
                        color: '#64aa9d',
                      },
                      {
                        name: 'Accommodation',
                        value: details.accommodation,
                        color: '#f0af6e',
                      },
                      {
                        name: 'Transportation',
                        value: details.transportation,
                        color: '#6493f7',
                      },
                    ]}
                  />
                  <GridItem>
                    <GridContainer direction="column" spacing={0}>
                      <CategoryAmounts
                        cardState={cardState}
                        type="transportation"
                        amount={details.transportation}
                        otherAmount={otherDetails.transportation}
                        currency={homeCurrency}
                        onClick={openEventDialog('Transportation')}
                      />
                      <CategoryAmounts
                        cardState={cardState}
                        type="accommodation"
                        amount={details.accommodation}
                        otherAmount={otherDetails.accommodation}
                        currency={homeCurrency}
                        onClick={openEventDialog('Accommodation')}
                      />
                      <CategoryAmounts
                        cardState={cardState}
                        type="activity"
                        amount={details.activity}
                        otherAmount={otherDetails.activity}
                        currency={homeCurrency}
                        onClick={openEventDialog('Activity')}
                      />
                      <CategoryAmounts
                        cardState={cardState}
                        type="food"
                        amount={details.food}
                        otherAmount={otherDetails.food}
                        currency={homeCurrency}
                        onClick={openEventDialog('Food')}
                      />
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>
            )}

            {subView === 'Currencies' && (
              <CurrenciesOverview
                data={costsByCurrency}
                homeCurrency={homeCurrency}
                tourSettings={tourSettings}
              />
            )}
          </GridContainer>
        </GridItem>

        <GridItem>{renderHomeCurrency}</GridItem>
      </GridContainer>
    </GridItem>
  );
}

AmountsCard.propTypes = {
  canEditEvent: PropTypes.bool,

  templateId: PropTypes.number,
};
AmountsCard.defaultProps = {};

export default compose(
  withCanEditEvent,
  resaga({
    setValue: {
      ...PORTAL_HELPERS.setValue,
    },
  }),
)(AmountsCard);
