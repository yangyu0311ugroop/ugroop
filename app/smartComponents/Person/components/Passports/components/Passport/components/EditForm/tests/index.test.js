import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EditForm } from '../index';

describe('<EditForm />', () => {
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
    rendered = shallow(<EditForm {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EditForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should set issuedDate state if issued date component changes', () => {
    const issuedDate = rendered.find(
      'WithStyles(Connect(WithSimplifyResaga(IssuedDate)))',
    );
    issuedDate.simulate('change', '23 Nov 2018');
    expect(rendered.state().issuedDate).toBe('23 Nov 2018');
  });

  describe('renderInfo', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderInfo()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPhoto', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderPhoto()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent', () => {
    it('should render correctly', () => {
      instance.renderInfo = jest.fn(() => 'renderInfo');
      instance.renderPhoto = jest.fn(() => 'renderPhoto');
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if withFormWrap prop is true', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({
        withFormWrap: false,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
