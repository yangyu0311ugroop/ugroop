import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import { CreatedAt } from '../index';

describe('<CreatedAt />', () => {
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
    rendered = shallow(<CreatedAt {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CreatedAt).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if createdAt exist', () => {
      rendered.setProps({
        createdAt: '03/14/1994',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text with label inline', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_WITH_LABEL_INLINE,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text with label inline and createdAt exist', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_WITH_LABEL_INLINE,
      });
      rendered.setProps({
        createdAt: '2018-09-06T00:46:42.404Z',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
