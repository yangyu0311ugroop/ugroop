import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStyles from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import stylesheet from '../styles';
import { BreadcrumbDropdown } from '../index';

const styles = mockStyles('BreadcrumbDropdown', stylesheet, theme);

describe('<BreadcrumbDropdown />', () => {
  let rendered;
  let instance;

  const items = [
    { label: 'It', url: '/1' },
    { label: 'Is', url: '/2' },
    { label: 'Finished', url: '/1' },
  ];
  const props = {
    classes: styles,
    items,
  };

  beforeEach(() => {
    rendered = shallow(<BreadcrumbDropdown {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(BreadcrumbDropdown).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onOpenPopover', () => {
    it('should set anchorEl value to whatever currentTarget is', () => {
      const event = {
        currentTarget: 1,
      };
      rendered.setState({
        anchorEl: 2,
      });
      instance.onOpenPopover(event);
      expect(rendered.state().anchorEl).toBe(1);
    });
  });

  describe('onClose', () => {
    it('should set state anchorEl to null', () => {
      rendered.setState({
        anchorEl: 1,
      });
      instance.onClose();
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('render', () => {
    it('should render something', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
