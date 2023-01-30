import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { InlineText } from '../index';
import styles from '../styles';

describe('<InlineText />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    name: 'text',
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<InlineText {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(InlineText).toBeDefined();
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

  describe('InlineText style', () => {
    it('should match snapshot', () => {
      const snapshot = mockStylesheet('', styles, coolTheme);
      expect(snapshot).toMatchSnapshot();
    });
  });
});
