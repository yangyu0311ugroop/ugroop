import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { withFollowers } from '../index';

describe('withFollowers', () => {
  let rendered;

  const Component = () => <div />;
  const Hoc = withFollowers(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    rendered = shallow(<Hoc {...makeProps()} />);

    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withFollowers).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('still matches snapshot inside nodeProp', () => {
      const snapshot = shallow(
        <div key={1}>{rendered.renderProp('children')({ followers: [] })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
