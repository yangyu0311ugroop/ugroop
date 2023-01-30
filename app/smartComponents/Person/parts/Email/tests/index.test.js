import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { VIEW_MODE_COPY } from 'appConstants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VARIANTS } from 'variantsConstants';
import { Email } from '../index';

describe('<Email />', () => {
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
    rendered = shallow(<Email {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Email).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('getEditableName()', () => {
    it('should getEditableName()', () => {
      PERSON_STORE_HELPERS.pathToPersonInputName = jest.fn(() => '');

      instance.getEditableName();

      TEST_HELPERS.expectCalled(PERSON_STORE_HELPERS.pathToPersonInputName);
    });
  });

  describe('handleEditableSubmit()', () => {
    it('should handleEditableSubmit()', () => {
      PERSON_DETAIL_HELPER.updatePerson = jest.fn(() => '');

      instance.handleEditableSubmit({});

      TEST_HELPERS.expectCalled(PERSON_DETAIL_HELPER.updatePerson);
    });
  });

  describe('handleCopy()', () => {
    it('should handleCopy()', () => {
      instance.handleCopy();

      expect(rendered.state().copied).toBe(true);
    });
  });

  describe('handleClickEmail', () => {
    it('should call window open to redirect user to email client', () => {
      window.open = jest.fn();

      instance.handleClickEmail();
      expect(window.open).toBeCalled();
    });
  });

  describe('resetCopy()', () => {
    it('should resetCopy()', () => {
      global.setTimeout = jest.fn(cb => cb());

      instance.resetCopy();

      expect(rendered.state().copied).toBe(false);
    });
  });

  describe('renderRow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable()', () => {
    it('should renderEditable', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('renderCopy()', () => {
    it('should renderCopy', () => {
      rendered.setProps({
        personEmail: true,
        email: true,
        link: true,
        dark: true,
        isEllipsis: true,
        emailPersonal: true,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCopy);
    });
    it('should not renderCopy', () => {
      rendered.setProps({
        personEmail: true,
        emailPersonal: false,
        link: true,
        dark: true,
        isEllipsis: true,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCopy);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text field', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_FIELD,
      });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is text field', () => {
      rendered.setProps({
        variant: VIEW_MODE_COPY,
      });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
