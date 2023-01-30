import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ChecklistDialogs } from '../index';

describe('<ChecklistDialogs />', () => {
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
    rendered = shallow(<ChecklistDialogs {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChecklistDialogs).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        editChecklistId: 11,
        addChecklistParentId: 22,
        seeCheckItemDetail: 33,
      });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
