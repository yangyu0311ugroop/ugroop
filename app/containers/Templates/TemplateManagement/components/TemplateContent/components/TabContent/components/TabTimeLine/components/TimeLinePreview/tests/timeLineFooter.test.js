import React from 'react';
import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import H5 from 'components/H5';
import { TimeLineFooter } from '../timeLineFooter';

const renderedComponent = shallow(
  <TimeLineFooter classes={{}} numberOfDays={10} />,
);

describe('TimeLineToolBar component', () => {
  it('should render something', () => {
    const instance = renderedComponent.instance();
    expect(instance.render()).toBeDefined();
  });
  it('should render with correct date title', () => {
    const cp = shallow(
      <TimeLineFooter classes={{}} dayIds={[0]} dateTitle="end of month" />,
    );
    expect(cp.contains(<AppBar />));
    expect(cp.find(H5)).toHaveLength(2);
    expect(cp.find(H5).getElements()[1].props.children).toBe('end of month');
  });
  it('should render without date title', () => {
    const cp = shallow(
      <TimeLineFooter classes={{}} dayIds={[0]} dateTitle="" />,
    );
    expect(cp.contains(<AppBar />));
    expect(cp.find(H5)).toHaveLength(0);
  });
});
