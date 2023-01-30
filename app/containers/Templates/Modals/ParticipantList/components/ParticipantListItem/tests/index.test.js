import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';
import { ParticipantListItem } from '../index';

describe('<ParticipantListItem />', () => {
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
    ability.can = jest.fn(() => true);
    rendered = shallow(<ParticipantListItem {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  describe('renderWithAccessLevel', () => {
    it('should render what it should render', () => {
      const snapshot = shallow(
        <div>{instance.renderWithAccessLevel()(true)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should render what it should render', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
