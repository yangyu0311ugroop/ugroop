import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ChecklistsRoute } from '../index';

describe('<ChecklistsRoute />', () => {
  let rendered;
  let instance;

  const props = {
    match: { url: 'some url' },
  };

  beforeEach(() => {
    rendered = shallow(<ChecklistsRoute {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChecklistsRoute).toBeDefined();
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
