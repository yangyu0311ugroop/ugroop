import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import styles from '../styles';
import { TemplateCard } from '../index';

const mockStyle = mockStylesheet('TemplateCard', styles);

describe('<TemplateCard />', () => {
  const props = {
    content: 'Sample Tour',
    isLoading: false,
    rootClassName: 'rootClassName',
    cardImageUrl: 'cardImageUrl',
    showActions: true,
    templateQueryParam: 'templateQueryParam',
    baseUrl: 'baseUrl',
    renderAdditionalContent: 'renderAdditionalContent',
    renderActions: jest.fn(),
    weekDay: 'Monday',
    startDate: 'April 1, 2019',
    duration: 1,
    description: 'description',
  };

  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<TemplateCard classes={mockStyle} {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  describe('smoke tests', () => {
    it('should render what it should render when component is not loading', () => {
      instance.renderActions = jest.fn(() => 'renderActions');
      instance.renderDescription = jest.fn(() => 'renderDescription');
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render what it should render when component is loading', () => {
      rendered.setProps({
        isLoading: true,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('renderDescription', () => {
    it('should render shortDescription and preserve new line', () => {
      rendered.setProps({
        description: 'qweqwe\nqweqwe\nqweqwe\n',
      });
      const snapshot = shallow(<div>{instance.renderDescription()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render nothing if there is no description', () => {
      rendered.setProps({
        description: null,
      });
      expect(instance.renderDescription()).toEqual('');
    });
  });

  describe('renderActions', () => {
    it('should show actions if showActions is true', () => {
      rendered.setProps({
        renderActions: jest.fn(() => 'renderActions'),
      });
      const snapshot = shallow(<div>{instance.renderActions()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should show actions if showActions is false', () => {
      rendered.setProps({
        showActions: false,
      });
      expect(instance.renderActions()).toEqual('');
    });
  });
});
