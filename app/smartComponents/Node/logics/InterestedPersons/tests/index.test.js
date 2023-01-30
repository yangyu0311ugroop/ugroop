import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { InterestedPersons } from '../index';

describe('<InterestedPersons />', () => {
  let rendered;
  let instance;

  const children = jest.fn();
  beforeEach(() => {
    rendered = shallow(<InterestedPersons>{children}</InterestedPersons>);
    instance = rendered.instance();
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();

      expect(children).toBeCalled();
      expect(children.mock.calls).toMatchSnapshot();
    });
    it('should render correctly if move', () => {
      rendered.setProps({
        move: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();

      expect(children).toBeCalled();
      expect(children.mock.calls).toMatchSnapshot();
    });
  });
});
