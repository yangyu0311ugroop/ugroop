import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { withPhoneCUD } from '../index';

const SampleComponent = () => <div />;

describe('<hoc />', () => {
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
    const Component = withPhoneCUD(SampleComponent);
    rendered = shallow(<Component {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(withPhoneCUD).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderWrappedComponent', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.renderWrappedComponent()({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
