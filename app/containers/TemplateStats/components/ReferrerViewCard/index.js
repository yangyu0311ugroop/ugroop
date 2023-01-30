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
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#db4b4b',
  '#9b2cc7',
  '#fab335',
];

const useReferrerData = id => {
  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );
  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
  });

  if (isLoading) return { data: [], isLoading, error };

  const { items = [] } = data;

  const filteredData = items.reduce((acc, value, index) => {
    const referrer = value.referer ? value.referer : 'Other';
    if (index === 0) return { [referrer]: 1 };
    if (!acc[referrer]) return { ...acc, [referrer]: 1 };
    acc[referrer] += 1;
    return acc;
  }, {});
  const finalData = Object.entries(filteredData).map(arr => ({
    name: arr[0],
    views: arr[1],
  }));

  return { data: finalData, isLoading, error };
};

export const ReferrerViewCard = memo(props => {
  const { data, isLoading } = useReferrerData(props.id);
  let content;

  if (isLoading) content = 'Loading...';
  else if (data.length === 0) content = 'No data available';
  else
    content = (
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            dataKey="views"
            data={data}
            cx="50%"
            cy={100}
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );

  return (
    <GridContainer card direction="column">
      <GridItem>
        <JText xl bold>
          Referrers
        </JText>
      </GridItem>
      <GridItem>
        <Hr quarter />
      </GridItem>
      <GridItem>{content}</GridItem>
    </GridContainer>
  );
});

ReferrerViewCard.propTypes = {
  id: PropTypes.number,
};

export default ReferrerViewCard;
