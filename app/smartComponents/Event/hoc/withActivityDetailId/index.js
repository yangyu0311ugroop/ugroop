import React, { PureComponent } from 'react';
import get from 'lodash/get';
import SelectActivityDetail from 'smartComponents/Event/logics/SelectActivityDetail';

export const withActivityDetailId = (config = {}) => Component =>
  class HOC extends PureComponent {
    render = () => {
      const outputProp = get(config, 'outputProp', 'activityDetailId');
      const eventId = get(this.props, 'dataId', 0);
      const targetKey = get(config, 'targetKey', 'start');

      return (
        <SelectActivityDetail id={eventId} targetKey={targetKey}>
          {id => {
            const props = { ...this.props, [outputProp]: id };
            return <Component {...props} />;
          }}
        </SelectActivityDetail>
      );
    };
  };
