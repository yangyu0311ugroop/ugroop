import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { SeatDialog } from '../index';

describe('<SeatDialog />', () => {
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
    rendered = shallow(<SeatDialog {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SeatDialog).toBeDefined();
  });

  it('should render correctly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('renderHeading', () => {
    it('should render heading for dialog form add', () => {
      rendered.setProps({ mode: 'add' });
      const renderCloseButton = jest.fn(() => 'renderCloseButton');
      const snapshot = shallow(
        <div>{instance.renderHeading({ renderCloseButton })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render heading for dialog form edit', () => {
      rendered.setProps({ mode: 'edit' });
      const renderCloseButton = jest.fn(() => 'renderCloseButton');
      const snapshot = shallow(
        <div>{instance.renderHeading({ renderCloseButton })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
