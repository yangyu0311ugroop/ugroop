import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import Form from 'ugcomponents/Form';
import { Adminstration } from '../index';

describe('<Adminstration />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const intl = {
    formatMessage: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    intl,
  };

  beforeEach(() => {
    rendered = shallow(<Adminstration {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Adminstration).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text only variant', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is text field', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_FIELD,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
