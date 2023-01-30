import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import { LOGS_HOOKS } from 'hooks/logs';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
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

const usePlatformData = id => {
  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );
  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
  });

  if (isLoading) return { data: [], isLoading, error };

  const { items = [] } = data;

  const filteredData = items.reduce((acc, value, index) => {
    if (index === 0) return { [value.os]: 1 };
    if (!acc[value.os]) return { ...acc, [value.os]: 1 };
    acc[value.os] += 1;
    return acc;
  }, {});
  const finalData = Object.entries(filteredData).map(arr => ({
    name: arr[0],
    views: arr[1],
  }));

  return { data: finalData, isLoading, error };
};

export const PlatformsViewCard = memo(props => {
  const { data, isLoading } = usePlatformData(props.id);
  let content;

  if (isLoading) content = 'Loading...';
  else if (data.length === 0) content = 'No data available';
  else
    content = (
      <Box minHeight={280}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              dataKey="views"
              data={data}
              cx="50%"
              cy={116}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    );

  return (
    <GridContainer card direction="column">
      <GridItem>
        <JText xl bold>
          Platforms
        </JText>
      </GridItem>
      <GridItem>
        <Hr quarter />
      </GridItem>
      <GridItem>{content}</GridItem>
    </GridContainer>
  );
});

PlatformsViewCard.propTypes = {
  id: PropTypes.number,
};

export default PlatformsViewCard;
