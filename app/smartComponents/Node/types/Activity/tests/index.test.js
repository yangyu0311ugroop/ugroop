import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import Hover from 'viewComponents/Hover';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DAY } from 'utils/modelConstants';
import { Activity } from '../index';

describe('<Activity />', () => {
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
    LOGIC_HELPERS.ifFunction = jest.fn(() => jest.fn());
    rendered = shallow(<Activity {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Activity).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should call ifFunction and pass the needed params if parent type is tab', () => {
      rendered.setProps({
        parentType: 'tabtimeline',
      });
      instance.handleClick();
      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });

    it('should call ifFunction and pass the needed params if parent type is not tab', () => {
      instance.handleClick();
      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderPhotoCard()', () => {
    it('should renderPhotoCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotoCard);
    });
  });

  describe('renderDroppedPhoto()', () => {
    it('should renderDroppedPhoto', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDroppedPhoto);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if parent type is day', () => {
      rendered.setProps({
        parentType: DAY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render jpver correctly if userId exist', () => {
      const snapshot = shallow(
        <div>{rendered.find(Hover).prop('children')({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render hover correctly if userId does not exist', () => {
      rendered.setProps({
        userId: 1,
      });
      const snapshot = shallow(
        <div>{rendered.find(Hover).prop('children')({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render description correctly if description does exist', () => {
      rendered.setProps({
        description: 'sample',
      });
      const snapshot = shallow(
        <div>{rendered.find(Hover).prop('children')({})}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render description correctly if description does exist', () => {
      rendered.setProps({
        description: null,
      });
      const snapshot = shallow(
        <div>{rendered.find(Hover).prop('children')({})}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
