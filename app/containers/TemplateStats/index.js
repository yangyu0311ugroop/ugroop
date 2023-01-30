import { GET_TEMPLATE_DETAIL, TEMPLATE_API } from 'apis/constants';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Hr from 'components/Hr';
import JText from 'components/JText';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Content from 'smartComponents/Node/parts/Content';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Icon from 'viewComponents/Icon';
import withResaga from 'resaga';
import ViewsSinceCreationCount from 'smartComponents/Statistics/ViewsSinceCreationCount';

import RangeFilter from './components/RangeFilter';
import TotalViewCount from './components/TotalViewCount';
import ViewsThisWeekCount from './components/ViewsThisWeekCount';
import ViewsThisDayCount from './components/ViewsThisDayCount';
import DevicesViewCard from './components/DevicesViewCard';
import PlatformsViewCard from './components/PlatformsViewCard';
import CountryViewCard from './components/CountryViewCard';
import ViewPerDayCard from './components/ViewPerDayCard';
import ViewsPerHourCard from './components/ViewPerHourCard';
import ReferrerViewCard from './components/ReferrerViewCard';

const useStyles = makeStyles(() => ({
  root: {},
  withBorders: {
    borderRight: '1px solid #eee',
  },
}));

export const TemplateStats = memo(props => {
  const classes = useStyles();
  const { match, resaga, history } = props;
  const id = match.params.id;
  useEffect(() => {
    props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
      payload: {
        id,
      },
    });

    return () => {
      resaga.setValue({
        statsDateRangeFilter: null,
      });
    };
  }, [id]);

  const handleBack = () => {
    history.push(`/tours/${id}`);
  };

  return (
    <div className={classes.root}>
      <Box pt={2} pb={3} pl={5} pr={5}>
        <Box pt={1} pb={1}>
          <Button dense size="extraSmall" color="inline" onClick={handleBack}>
            <Icon icon="chevron-left" size="extraSmall" />{' '}
            <Box ml={1}>Back to Tour Page</Box>
          </Button>
        </Box>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <JText sm bold gray uppercase>
              Statistics
            </JText>
          </GridItem>
          <GridItem>
            <JText xxl bold>
              <Content variant={VARIANTS.VALUE_ONLY} id={id} />
            </JText>
          </GridItem>
        </GridContainer>
        <Hr />
        <Box mt={2}>
          <GridContainer>
            <GridItem xs={12} md={12}>
              <GridContainer alignItems="center" spacing={2}>
                <GridItem className={classes.withBorders}>
                  <ViewsSinceCreationCount id={id} />
                </GridItem>
                <GridItem className={classes.withBorders}>
                  <ViewsThisWeekCount id={id} />
                </GridItem>
                <GridItem className={classes.withBorders}>
                  <ViewsThisDayCount id={id} />
                </GridItem>
              </GridContainer>
              <Hr />
            </GridItem>
            <GridItem xs={12} md={12}>
              <GridContainer justify="space-between" alignItems="center">
                <GridItem>
                  <TotalViewCount id={id} />
                </GridItem>
                <GridItem>
                  <GridContainer direction="column" spacing={0}>
                    <GridItem>
                      <JText sm bold>
                        Views for
                      </JText>
                    </GridItem>
                    <GridItem>
                      <RangeFilter id={id} />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} md={6}>
              <ViewPerDayCard id={id} />
            </GridItem>
            <GridItem xs={12} md={6}>
              <ViewsPerHourCard id={id} />
            </GridItem>
            <GridItem xs={12} md={3}>
              <DevicesViewCard id={id} />
            </GridItem>
            <GridItem xs={12} md={3}>
              <PlatformsViewCard id={id} />
            </GridItem>
            <GridItem xs={12} md={3}>
              <ReferrerViewCard id={id} />
            </GridItem>
            <GridItem xs={12} md={3}>
              <CountryViewCard id={id} />
            </GridItem>
          </GridContainer>
        </Box>
      </Box>
    </div>
  );
});

TemplateStats.propTypes = {
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withResaga({
  setValue: {
    statsDateRangeFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.statsDateRangeFilter,
  },
})(TemplateStats);
