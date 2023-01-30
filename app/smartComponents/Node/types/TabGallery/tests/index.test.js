import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VARIANTS } from 'variantsConstants';
import { TabGallery } from '../index';

describe('<TabGallery />', () => {
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
    rendered = shallow(<TabGallery {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabGallery).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should call fetchPublic', () => {
      rendered.setProps({
        isPublic: true,
        variant: 'card',
        children: [],
      });
      instance.fetchPublic = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchPublic).toHaveBeenCalled();
    });
  });

  describe('fetchPublic', () => {
    it('should call dispatchTo', () => {
      instance.fetchPublic({ id: 1, templateId: 2, hashkey: '123' });
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
  });

  describe('renderCard()', () => {
    it('should renderCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
  });

  describe('renderTab()', () => {
    it('should renderTab', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTab);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if variant is table', () => {
      rendered.setProps({
        variant: VARIANTS.TABLE,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is badge', () => {
      rendered.setProps({
        variant: VARIANTS.BADGE,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
