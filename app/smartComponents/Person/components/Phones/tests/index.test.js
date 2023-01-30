import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PhoneList } from '../index';

describe('<PhoneList />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    phones: [1, 2, 3],
  };

  beforeEach(() => {
    rendered = shallow(<PhoneList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PhoneList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleAddContact', () => {
    it('should call setValue', () => {
      instance.handleAddContact();
      expect(rendered.state().creating).toBe(true);
    });
  });

  describe('finishCreating', () => {
    it('should call setValue', () => {
      instance.finishCreating();
      expect(rendered.state().creating).toBe(false);
    });
  });

  describe('renderSortedPhones', () => {
    it('should render phones based on the sortedIds that were passed on', () => {
      const sortedIds = [1, 2, 3];
      const snapshot = shallow(
        <div>{instance.renderSortedPhones()({ sortedIds })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return default only phones without margins', () => {
      const sortedIds = [1, 2, 3];
      rendered.setProps({ noMargin: true, showDefaultOnly: true });
      const snapshot = shallow(
        <div>{instance.renderSortedPhones()({ sortedIds })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return default only phones with margins', () => {
      const sortedIds = [1, 2, 3];
      rendered.setProps({ showDefaultOnly: true });
      const snapshot = shallow(
        <div>{instance.renderSortedPhones()({ sortedIds })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is phoneCardListOnly', () => {
      rendered.setProps({
        variant: 'phoneCardListOnly',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is fieldsOnly', () => {
      rendered.setProps({
        variant: 'fieldsOnly',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if showCreateForm is true', () => {
      rendered.setProps({
        showCreateForm: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render renderPlaceholder', () => {
      const snapshot = shallow(<div>{instance.renderPlaceholder()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render renderSortedPhoneFields', () => {
      const snapshot = shallow(
        <div>{instance.renderSortedPhoneFields()({ sortedIds: [1, 2] })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render renderSortedPhoneFields', () => {
      const snapshot = shallow(
        <div>{instance.renderSortedPhoneFields()({ sortedIds: [] })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
