import { shallow } from 'enzyme';
import React from 'react';
import { SelectActivityDetail } from '../index';

describe('<SelectActivityDetail />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    children: jest.fn(),
    dataId: 1,
  };

  beforeEach(() => {
    rendered = shallow(<SelectActivityDetail {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SelectActivityDetail).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.render();

      expect(props.children).toBeCalledWith(1);
    });
  });
});
