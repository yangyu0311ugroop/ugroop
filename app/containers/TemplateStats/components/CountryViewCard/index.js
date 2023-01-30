import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import { LOGS_HOOKS } from 'hooks/logs';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const useCountryData = id => {
  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );
  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
  });

  if (isLoading) return { data: [], isLoading, error };

  const { items = [] } = data;
  const filteredData = items.reduce((acc, value, index) => {
    const countryName = value.country_name ? value.country_name : 'Other';
    if (index === 0) return { [countryName]: 1 };
    if (!acc[countryName]) return { ...acc, [countryName]: 1 };
    acc[countryName] += 1;
    return acc;
  }, {});

  const finalData = Object.entries(filteredData).map(arr => ({
    country: arr[0],
    views: arr[1],
  }));

  return { data: finalData, isLoading, error };
};

export const CountryViewCard = memo(props => {
  const { data, isLoading } = useCountryData(props.id);
  let content;

  if (isLoading) content = <GridItem>Loading...</GridItem>;
  else if (data.length === 0) content = <GridItem>No data available</GridItem>;
  else
    content = data.map(datum => (
      <GridItem key={datum.country}>
        <GridContainer justify="space-between">
          <GridItem>{datum.country}</GridItem>
          <GridItem>{datum.views}</GridItem>
        </GridContainer>
        <Hr quarter />
      </GridItem>
    ));

  return (
    <GridContainer card direction="column">
      <GridItem>
        <JText xl bold>
          Country
        </JText>
      </GridItem>
      <GridItem>
        <Hr quarter />
      </GridItem>
      <GridItem>
        <GridContainer direction="column">{content}</GridContainer>
      </GridItem>
    </GridContainer>
  );
});

CountryViewCard.propTypes = {
  id: PropTypes.number,
};

export default CountryViewCard;
