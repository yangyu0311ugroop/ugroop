import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import CoolTheme from 'theme/coolTheme';
import styles from '../style';
import { NodeContent } from '../index';

const classes = mockStylesheet('NodeContent', styles, CoolTheme);

describe('<NodeContent />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes,
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<NodeContent {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(NodeContent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderBody()', () => {
    it('should renderBody', () => {
      rendered.setProps({ content: 'content', className: 'customClassName' });

      const snapshot = shallow(<div>{instance.renderBody()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render not render Link', () => {
      rendered.setProps({ disabled: true });

      instance.renderBody = jest.fn(() => 'renderBody');

      expect(instance.render()).toBe('renderBody');
    });

    it('should render Link', () => {
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
