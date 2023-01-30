import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { withNodeRole } from '../index';

describe('withNodeRole', () => {
  let rendered;

  const Component = () => <div />;
  const Hoc = withNodeRole(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    rendered = shallow(<Hoc {...makeProps()} />);

    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withNodeRole).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('still matches snapshot inside nodeProp', () => {
      const snapshot = shallow(
        <div key={1}>{rendered.renderProp('children')()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
