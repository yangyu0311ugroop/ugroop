import React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import { DayListView } from '../daylistView';

const renderedComponent = shallow(
  <DayListView className="as" dayIds={[1, 2]} />,
);

describe('DayListView component', () => {
  it('should render something', () => {
    expect(renderedComponent.find(List).children).toHaveLength(1);
  });
});
