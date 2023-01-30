import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStyles from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import stylesheet from '../styles';
import { BreadcrumbItem } from '../index';

const styles = mockStyles('BreadcrumbItem', stylesheet, theme);

describe('<BreadcrumbItem />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: styles,
    url: '/mercy-righteousness',
    label: 'Jesus',
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<BreadcrumbItem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(BreadcrumbItem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should not render chevron if isLast props is true or showLastItem and onlyItem is true', () => {
      const variants = [
        { isLast: true },
        { isLast: false, showLastItem: true, onlyItem: true },
      ];
      variants.forEach(variant => {
        rendered.setProps(variant);

        expect(toJSON(rendered)).toMatchSnapshot();
      });
    });
  });
});
