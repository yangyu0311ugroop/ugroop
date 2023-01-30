import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import { LOGS_HOOKS } from 'hooks/logs';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import MOMENT_HELPERS from 'utils/helpers/moment';

const usePerDayOfWeek = id => {
  const dayOfWeek = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );

  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
  });

  if (isLoading) return { data: [], isLoading, error };

  const { items = [] } = data;
  items.forEach(item => {
    const dayInWeek = MOMENT_HELPERS.getDateWithFormat(item.date, 'ddd');
    dayOfWeek[dayInWeek] += 1;
  });

  const finalData = Object.entries(dayOfWeek).map(arr => ({
    name: arr[0],
    views: arr[1],
  }));

  return { data: finalData, isLoading, error };
};

export const ViewPerDayCard = memo(props => {
  const { data, isLoading } = usePerDayOfWeek(props.id);

  const content = isLoading ? (
    'Loading...'
  ) : (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="views" fill="#1F273D" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <GridContainer card direction="column">
      <GridItem>
        <JText xl bold>
          Per day of week
        </JText>
      </GridItem>
      <GridItem>
        <Hr quarter />
      </GridItem>
      <GridItem>{content}</GridItem>
    </GridContainer>
  );
});

ViewPerDayCard.propTypes = {
  id: PropTypes.number,
};

export default ViewPerDayCard;
