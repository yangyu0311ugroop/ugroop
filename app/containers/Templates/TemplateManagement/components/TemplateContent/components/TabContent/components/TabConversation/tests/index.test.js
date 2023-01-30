/**
 * Created by quando on 1/9/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import { TabConversation, styles } from '../index';

describe('TabConversation/tests/index.test.js', () => {
  const tab = { id: 1, content: 'hi ho' };

  let rendered;
  beforeEach(() => {
    rendered = shallow(<TabConversation tab={tab} />);
  });

  describe('<TabConversation />', () => {
    it('should exists', () => {
      expect(TabConversation).toBeDefined();
      expect(styles).toBeDefined();
      expect(styles()).toEqual({});
    });
    it('should render without exploding', () =>
      expect(rendered.length).toBe(1));
  });

  describe('props', () => {
    it('should be set correctly', () => {
      const prop = rendered.instance().props;
      expect(prop.tab).toBe(tab);
    });
  });
});
