import React from 'react';
import { shallow } from 'enzyme';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { ability } from 'apis/components/Ability/ability';
import { DayTitleLocationContent, style } from '../dayTitleLocationContent';

describe('<DayTitleLocationContent />', () => {
  let wrapper;
  let instance;

  const classes = mockStylesheet('', style, coolTheme);

  const makeProps = () => ({
    title: '',
    location: '',
    displayDescription: {},
    placeId: '',
    icon: '',
    classes,
  });

  beforeEach(() => {
    wrapper = shallow(<DayTitleLocationContent {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DayTitleLocationContent).toBeDefined();
  });
  describe('#render()', () => {
    it('not explodes', () => {
      instance.canEdit = jest.fn(() => true);

      expect(wrapper).toHaveLength(1);
      expect(instance.render()).toBeDefined();
    });
  });

  describe('canEdit()', () => {
    it('should canEdit', () => {
      wrapper.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(true);
    });
  });
});
