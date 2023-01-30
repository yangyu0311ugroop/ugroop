import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { withPassportCUD } from '../index';

describe('withPassportCUD', () => {
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
    const sample = sampleProps => <div {...sampleProps} />;
    const Component = withPassportCUD(sample);
    rendered = shallow(<Component {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(withPassportCUD).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderWrappedComponnet()', () => {
    it('should render the wrapped component', () => {
      const snapshot = shallow(<div>{instance.renderWrappedComponent()}</div>);

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
