import { ADVANCED_EDIT_MODE } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { SeeMore } from '../index';

describe('SeeMore/tests/index.test.js', () => {
  let rendered;
  let instance;

  const resaga = {
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {
      root: 'root',
      readOnly: 'readOnly',
    },
    resaga,
    getValue: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<SeeMore {...props} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<SeeMore />', () => {
    it('should exists', () => {
      expect(SeeMore).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('onResize', () => {
    it('should setState', () => {
      instance.onResize(1, 2);
      expect(rendered.state().dimensions.height).toEqual(2);
    });
  });

  describe('handleCollapseChange', () => {
    it('should setState', () => {
      rendered.setState({ collapse: false });
      instance.handleCollapseChange();
      expect(rendered.state().collapse).toBe(true);
    });
  });

  describe('render()', () => {
    it('should return normal', () => {
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return with See More', () => {
      rendered.setProps({
        readOnly: true,
        editing: false,
        renderSeeMore: true,
      });
      rendered.setState({ dimensions: { height: 200 }, collapse: true });
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return with See Less', () => {
      rendered.setProps({
        readOnly: true,
        editing: false,
        renderSeeMore: true,
      });
      rendered.setState({ dimensions: { height: 200 }, collapse: false });
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render ADVANCED_EDIT_MODE', () => {
      rendered.setProps({ mode: ADVANCED_EDIT_MODE });
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('Open/Close Dialog()', () => {
    it('openDialog should return true when openDisabledSeeMoreDialog is called', () => {
      instance.openDisabledSeeMoreDialog({ stopPropagation: jest.fn() });
      expect(rendered.state().openDialog).toBe(true);
    });

    it('openDialog should return false when closeDisabledSeeMoreDialog is called', () => {
      instance.closeDisabledSeeMoreDialog();
      expect(rendered.state().openDialog).toBe(false);
    });
  });

  describe('handleSwitchChangeSeeMore', () => {
    it('should call dispatchTo', () => {
      instance.handleSwitchChangeSeeMore('value');
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
  });

  describe('handleCreateLinkSuccess()', () => {
    it('should handleCreateLinkSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkSuccess);
    });
    it('should handleCreateLinkSuccess', () => {
      rendered.setState({ loading: true });
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkSuccess);
    });
  });

  describe('updateDisableSeeMoreSuccess()', () => {
    it('updateDisableSeeMoreSuccess', () => {
      instance.state.loading = false;
      instance.updateDisableSeeMoreSuccess();
      expect(instance.state.loading).toBe(false);
    });
  });

  describe('toggleDisableSeeMore()', () => {
    it('should toggleDisableSeeMore', () => {
      instance.state.loading = true;
      instance.handleSwitchChangeSeeMore(1);
      instance.toggleDisableSeeMore(1)();
      expect(instance.state.loading).toBe(true);
    });
  });
});
