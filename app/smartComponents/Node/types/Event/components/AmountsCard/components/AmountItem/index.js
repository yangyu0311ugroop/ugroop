/* eslint-disable react/prop-types */
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#ea989a', '#64aa9d', '#f0af6e', '#6493f7'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function AmountItem(props) {
  const { data } = props;

  return (
    !!data.length && (
      <GridItem>
        <GridContainer direction="column" spacing={0} alignItems="center">
          <GridItem>
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={data}
                  outerRadius={60}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    )
  );
}

AmountItem.propTypes = {
  data: PropTypes.array,
};

AmountItem.defaultProps = {
  data: [],
};

export default AmountItem;
