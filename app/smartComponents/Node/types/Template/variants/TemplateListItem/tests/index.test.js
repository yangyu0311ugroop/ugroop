import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TemplateListItem } from '../index';

describe('TemplateListItem', () => {
  let rendered;
  let instance;

  const props = {
    onDelete: jest.fn(),
    onCopy: jest.fn(),
    onMove: jest.fn(),
    classes: {},
    showActions: true,
  };

  beforeEach(() => {
    rendered = shallow(<TemplateListItem {...props} />);
    instance = rendered.instance();
  });

  describe('renderDescription', () => {
    it('should match snapshot if there is no shortDescription', () => {
      rendered.setProps({
        shortDescription: null,
      });
      const snap = shallow(<div>{instance.renderDescription()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should match snapshot if there is shortDescription', () => {
      rendered.setProps({
        shortDescription: 'ding dong',
      });
      const snap = shallow(<div>{instance.renderDescription()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('renderActions', () => {
    it('should return null if showActions is false', () => {
      rendered.setProps({
        showActions: false,
      });
      expect(instance.renderActions()).toEqual(null);
    });
    it('should match snapshot if there is shortDescription', () => {
      rendered.setProps({
        showActions: true,
      });
      const snap = shallow(<div>{instance.renderActions()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
