import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RateAverage } from 'smartComponents/Node/logics';

import { RateSummary } from '../index';

describe('<RateSummary />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<RateSummary {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RateSummary).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      const field = snapshot.find(RateAverage).renderProp('children')(1);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(toJSON(field)).toMatchSnapshot();
    });
  });
});
