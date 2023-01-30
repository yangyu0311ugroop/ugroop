import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import { Dietary } from '../index';

describe('<Dietary />', () => {
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
    rendered = shallow(<Dietary {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Dietary).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleEditableSubmit', () => {
    it('should call patchDietary of person detail api helper', () => {
      PERSON_DETAIL_HELPER.patchDietary = jest.fn();
      rendered.setProps({
        id: 1,
        personId: 2,
      });

      instance.handleEditableSubmit({ mode: {}, rest: {} });

      expect(PERSON_DETAIL_HELPER.patchDietary).toBeCalled();
      expect(PERSON_DETAIL_HELPER.patchDietary.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleEditableDeleteClick', () => {
    it('should call the removeDietary helper api', () => {
      PERSON_DETAIL_HELPER.removeDietary = jest.fn();
      rendered.setProps({
        id: 1,
        personId: 2,
      });
      instance.handleEditableDeleteSuccess = jest.fn(
        () => 'handleEditableDeleteSuccess',
      );
      instance.handleEditableDeleteError = jest.fn(
        () => 'handleEditableDeleteError',
      );

      instance.handleEditableDeleteClick({});

      expect(PERSON_DETAIL_HELPER.removeDietary).toBeCalled();
      expect(PERSON_DETAIL_HELPER.removeDietary.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleEditableDeleteSuccess', () => {
    it('should call onLoad and onClose safely', () => {
      const onLoad = jest.fn();
      const onClose = jest.fn();
      instance.handleEditableDeleteSuccess({ onLoad, onClose })();

      expect(onLoad).toBeCalled();
      expect(onClose).toBeCalled();
    });
  });

  describe('handleEditableDeleteError', () => {
    it('should onLoad safely', () => {
      const onLoad = jest.fn();
      instance.handleEditableDeleteError({ onLoad })();

      expect(onLoad).toBeCalled();
    });
  });

  describe('renderEditableFormActions', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderEditableFormActions()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text field', () => {
      rendered.setProps({
        variant: VARIANTS.FORM,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text only', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
