import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { TemplateShowMore } from '../index';
import styles from '../styles';

const mockStyle = mockStylesheet('TemplateShowMore', styles);

describe('<TemplateShowMore />', () => {
  let rendered;
  let instance;

  const props = {
    classes: mockStyle,
    onClick: jest.fn(),
    fetchLength: 3,
    fetchLimit: 3,
  };

  beforeEach(() => {
    rendered = shallow(<TemplateShowMore {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TemplateShowMore).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render nothing to fetch if fetchLength and fetchLimit are not equal anymore', () => {
    rendered.setProps({
      fetchLength: 2,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render loading if isFetching is true', () => {
    rendered.setProps({
      isFetching: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('onEnter()', () => {
    it('should call onClick props', () => {
      instance.onEnter();
      expect(props.onClick).toBeCalledWith();
    });
  });
});
