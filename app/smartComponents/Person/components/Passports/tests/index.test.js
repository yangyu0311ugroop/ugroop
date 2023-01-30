import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Passports } from '../index';

describe('<Passports />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const CUD = {
    store: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    passports: [1, 2, 3],
  };

  beforeEach(() => {
    rendered = shallow(<Passports {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Passports).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('createSuccess', () => {
    it('should set openAddForm redux value to false', () => {
      instance.createSuccess();

      expect(rendered.state().openAddForm).toBe(false);
    });
  });

  describe('openCreateForm', () => {
    it('should set openAddForm redux value to true', () => {
      instance.openCreateForm();

      expect(rendered.state().openAddForm).toBe(true);
    });
  });

  describe('closeCreateForm', () => {
    it('should set openAddForm redux value to false', () => {
      instance.closeCreateForm();

      expect(rendered.state().openAddForm).toBe(false);
    });
  });

  describe('renderDialogHeader', () => {
    it('should render the dialog header accepting a renderCloseButton', () => {
      const snapshot = shallow(
        <div>
          {instance.renderDialogHeader({ renderCloseButton: () => <div /> })}
        </div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDialog', () => {
    it('should render dialog and the edit form', () => {
      const snapshot = shallow(<div>{instance.renderDialog()(CUD)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSortedPassport', () => {
    it('should use the sortedIds passed to it to render phones', () => {
      const sortedIds = [1, 2, 3];
      const snapshot = shallow(
        <div>{instance.renderSortedPassport()({ sortedIds })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPassportEmpty', () => {
    it('should use the sortedIds passed to it to render phones', () => {
      const snapshot = shallow(<div>{instance.renderPassportEmpty()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if withAddButton props is false', () => {
      rendered.setProps({
        withAddButton: false,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if openAddForm props is true', () => {
      rendered.setState({
        openAddForm: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
