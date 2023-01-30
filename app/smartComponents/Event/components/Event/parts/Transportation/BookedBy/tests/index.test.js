import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { BookedBy } from '../index';

describe('<BookedBy />', () => {
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
    rendered = shallow(<BookedBy {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(BookedBy).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSubmit', () => {
    it('should create request to patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({});

      expect(TEMPLATE_API_HELPERS.patchEvent).toBeCalled();
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

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
