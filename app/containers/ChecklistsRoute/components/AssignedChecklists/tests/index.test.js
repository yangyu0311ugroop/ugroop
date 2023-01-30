import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AssignedChecklists } from '../index';

describe('<AssignedChecklists />', () => {
  let rendered;
  let instance;

  const props = {};

  beforeEach(() => {
    rendered = shallow(<AssignedChecklists {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AssignedChecklists).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
