import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { OrgRoleTable } from '../index';

describe('<OrgRoleTable />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    ids: [1, 2, 3],
  };

  beforeEach(() => {
    rendered = shallow(<OrgRoleTable {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(OrgRoleTable).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDefault()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderList()', () => {
    it('should return null', () => {
      rendered.setProps({
        showPersonal: true,
        onClickMenu: jest.fn(),
        selectedOrgId: -1,
        ids: [-1],
      });
      const secondResult = shallow(<div>{instance.renderList()}</div>);
      expect(toJSON(secondResult)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ ids: [1, 2], maxRender: 1 });
      const snapshot = shallow(<div>{instance.renderList()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly when render show all', () => {
      rendered.setProps({ showPersonal: true, onClickMenu: jest.fn() });
      const snapshot = shallow(<div>{instance.renderList()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('toggleShowAll', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.toggleShowAll()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderShowMore', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderShowMore(1, [1, 2])}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot toggleShowAll', () => {
      rendered.setProps({ ids: [1, 2], maxRender: 1 });
      rendered.setState({ showAll: true });
      const snapshot = shallow(<div>{instance.renderShowMore(1, [1, 2])}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPersonal()', () => {
    it('should return null', () => {
      rendered.setProps({
        showPersonal: true,
        onClickMenu: jest.fn(),
      });
      const secondResult = shallow(<div>{instance.renderPersonal(true)}</div>);
      expect(toJSON(secondResult)).toMatchSnapshot();
    });
  });

  describe('renderOrgButton()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.renderOrgButton({ openMenu: '1' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setState({ selectedOrgId: 1 });
      const snapshot = shallow(
        <div>{instance.renderOrgButton({ openMenu: '1' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOrgMenu()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderOrgMenu()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOrgMenuItem()', () => {
    it('should render correctly', () => {
      rendered.setProps({ showPersonal: true });

      const snapshot = shallow(
        <div>{instance.renderOrgMenuItem({ closeMenu: '1' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onClickOrgMenu()', () => {
    it('should render correctly', () => {
      rendered.setProps({ onClickMenu: () => () => 'hello' });
      const snapshot = shallow(
        <div>{instance.onClickOrgMenu(1)({ stopPropagation: () => '1' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.onClickOrgMenu(1)({ stopPropagation: () => '1' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTable()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderTable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderListMenu()', () => {
    it('should render correctly', () => {
      rendered.setProps({ showPersonal: true });
      const snapshot = shallow(<div>{instance.renderListMenu()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      rendered.setProps({ showPersonal: true });

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
