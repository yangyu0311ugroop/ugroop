import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Organisation } from '../index';

describe('Organisation/tests/index.test.js', () => {
  let rendered;
  let instance;

  const props = {
    id: 999,
    classes: { root: 'defaultRoot', img: 'defaultImg' },
  };

  beforeEach(() => {
    rendered = shallow(<Organisation {...props} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<Organisation />', () => {
    it('should exists', () => {
      expect(Organisation).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('renderReadonly()', () => {
    it('should renderReadonly name', () => {
      const snapshot = shallow(
        <div>{instance.renderReadonly('some name')}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderReadonly myOrganisationName', () => {
      rendered.setProps({ myOrganisationName: 'some other name ' });

      const snapshot = shallow(<div>{instance.renderReadonly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return null if !id', () => {
      rendered.setProps({ id: 0 });

      expect(instance.renderReadonly()).toBe(null);
    });
  });

  describe('render()', () => {
    it('should render theirOrganisationName', () => {
      rendered.setProps({ theirOrganisationName: 'some other name ' });
      instance.renderReadonly = jest.fn(() => 'renderReadonly');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render Editing', () => {
      rendered.setProps({ theirOrganisationName: '' });
      instance.renderEditing = jest.fn(() => 'renderEditing');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render nothing', () => {
      rendered.setProps({ theirOrganisationName: '', isOrgEditable: false });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
