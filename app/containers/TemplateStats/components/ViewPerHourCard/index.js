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
import get from 'lodash/get';
import MOMENT_HELPERS from 'utils/helpers/moment';

const usePerHourOfDay = id => {
  const hourOfDay = {
    '00': 0,
    '01': 0,
    '02': 0,
    '03': 0,
    '04': 0,
    '05': 0,
    '06': 0,
    '07': 0,
    '08': 0,
    '09': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
    '14': 0,
    '15': 0,
    '16': 0,
    '17': 0,
    '18': 0,
    '19': 0,
    '20': 0,
    '21': 0,
    '22': 0,
    '23': 0,
  };

  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );

  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
  });

  if (isLoading) return { data: [], isLoading, error };

  const items = get(data, 'items', []);
  items.forEach(item => {
    const dayInWeek = MOMENT_HELPERS.getDateWithFormat(item.date, 'HH');
    hourOfDay[dayInWeek] += 1;
  });

  const finalData = Object.entries(hourOfDay).map(arr => ({
    name: `${arr[0]}:00`,
    views: arr[1],
  }));

  return { data: finalData, isLoading, error };
};

export const ViewsPerHourCard = memo(props => {
  const { data, isLoading } = usePerHourOfDay(props.id);
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
          Per hour of day
        </JText>
      </GridItem>
      <GridItem>
        <Hr quarter />
      </GridItem>
      <GridItem>{content}</GridItem>
    </GridContainer>
  );
});

ViewsPerHourCard.propTypes = {
  id: PropTypes.number,
};

export default ViewsPerHourCard;
