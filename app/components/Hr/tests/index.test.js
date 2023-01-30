import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Hr } from '../index';

describe('<Hr />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { noMarginTop: 'noMarginTop' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Hr {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Hr).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly w/o children', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();

      expect(LOGIC_HELPERS.ifElse).toBeCalled();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
    it('should render correctly w/ children', () => {
      rendered.setProps({ children: 'some children' });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
