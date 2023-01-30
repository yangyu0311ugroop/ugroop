import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Forms } from '..';

describe('<Forms />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: [],
  });

  beforeEach(() => {
    wrapper = shallow(<Forms {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Forms).toBeDefined();
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderPart('div')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('toggleShowAll', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.toggleShowAll()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('openAttachmentView', () => {
    it('should true if attachment is toggled', () => {
      instance.openAttachmentView();

      expect(wrapper.state().attaching).toEqual(true);
    });
  });

  describe('renderMoreLess', () => {
    it('should match snapshot when show less', () => {
      const snapshot = shallow(<div>{instance.renderMoreLess(1, [])}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot when show more', () => {
      const snapshot = shallow(
        <div>{instance.renderMoreLess(1, [1, 2, 3])}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      wrapper.setProps({ value: [1, 2] });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if loading is true', () => {
      wrapper.setProps({ value: [1, 2], loading: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if compact is true', () => {
      wrapper.setProps({ value: [1, 2], compact: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('still matches snapshot if iconPadding is true', () => {
      wrapper.setProps({ value: [1, 2], iconPadding: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      wrapper.setProps({
        renderProp: false,
        readOnly: true,
        value: [1, 2, 3],
      });
      wrapper.setState({ attaching: false });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should return loading', () => {
      wrapper.setProps({
        renderProp: false,
        readOnly: true,
        value: [1, 2, 3],
        loading: true,
        iconPadding: true,
      });
      wrapper.setState({ attaching: false });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      wrapper.setProps({
        compact: false,
        simple: false,
      });
      wrapper.setState({ attaching: false });
      instance.renderValueProp = jest.fn();

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      wrapper.setProps({
        renderProp: true,
        children: jest.fn(),
        compact: false,
        simple: false,
      });
      instance.renderValueProp = jest.fn();

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
