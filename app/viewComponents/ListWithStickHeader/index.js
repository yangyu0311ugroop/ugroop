import React from 'react';
import { VariableSizeList as List } from 'react-window';
import PropTypes from 'prop-types';

function useInnerElementType(Cell, rowHeight) {
  return React.useMemo(
    () =>
      React.forwardRef((props, ref) => {
        // eslint-disable-next-line react/prop-types
        const children = React.Children.map(props.children, child => child);

        children.push(
          React.createElement(Cell, {
            key: '0:0',
            rowIndex: 0,
          }),
        );
        return (
          <div ref={ref} {...props}>
            {children}
          </div>
        );
      }),
    [Cell, rowHeight],
  );
}

export function ListWithStickyCells(props) {
  return (
    <List
      {...props}
      innerElementType={useInnerElementType(props.children, props.rowHeight)}
    />
  );
}

ListWithStickyCells.propTypes = {
  children: PropTypes.any,
  rowHeight: PropTypes.func,
};
