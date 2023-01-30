import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VARIANTS } from 'variantsConstants';
import Form from 'ugcomponents/Form';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { Gender } from '../index';

describe('<Gender />', () => {
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
    rendered = shallow(<Gender {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Gender).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderLabel()', () => {
    it('should return null', () => {
      rendered.setProps({ hideLabel: true });

      expect(instance.renderLabel()).toBe(false);
    });

    it('should renderLabel', () => {
      rendered.setProps({ hideLabel: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLabel);
    });
  });

  describe('getEditableName()', () => {
    it('should getEditableName()', () => {
      PERSON_STORE_HELPERS.pathToPersonInputName = jest.fn(() => '');

      instance.getEditableName();

      TEST_HELPERS.expectCalled(PERSON_STORE_HELPERS.pathToPersonInputName);
    });
  });

  describe('#getEditableValue()', () => {
    it('still matches snapshot if value=Male', () => {
      const value = 'Male';
      expect(
        toJSON(shallow(<div>{instance.getEditableValue(value)}</div>)),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if value=unknown', () => {
      const value = 'unknown';
      expect(
        toJSON(shallow(<div>{instance.getEditableValue(value)}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('handleEditableSubmit', () => {
    it('should call PERSON_DETAIL_HELPER.updatePerson', () => {
      PERSON_DETAIL_HELPER.updatePerson = jest.fn();
      instance.handleEditableSubmit({
        model: {},
        onSuccess: jest.fn(),
        onError: jest.fn(),
      });
      expect(PERSON_DETAIL_HELPER.updatePerson).toHaveBeenCalled();
    });
  });

  describe('renderEditableOptions()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEditableOptions()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEditable()).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('still matches snapshot 2', () => {
      expect(instance.renderEditableValue()).toMatchSnapshot();
    });
    it('should match snapshot if renderButton props exist', () => {
      const renderEditableValue = jest.fn(() => 'renderEditableValue');
      rendered.setProps({
        renderEditableValue,
      });
      const snapshot = shallow(<div>{instance.renderEditableValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is radio field', () => {
      rendered.setProps({
        variant: VARIANTS.RADIO_FIELD,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
