import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import util from 'containers/Templates/Components/GridView/util';
import dotProp from 'dot-prop-immutable';

import { TemplateCardItem } from '../index';

describe('TemplateCardItem', () => {
  let rendered;
  let instance;

  const props = {
    onMove: jest.fn(),
    onCopy: jest.fn(),
    onDelete: jest.fn(),
    showActions: true,
    classes: {},
    resaga: {
      setValue: jest.fn(),
    },
    parentFolderIdsLength: 1,
  };

  beforeEach(() => {
    rendered = shallow(<TemplateCardItem {...props} />);
    instance = rendered.instance();
    util.dispatch = jest.fn();
  });

  describe('renderActions', () => {
    it('should match snapshot', () => {
      rendered.setProps({ parentFolderIdsLength: false });
      const snap = shallow(<div>{instance.renderActions()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    it('should call util.dispatch if there is no cardImageUrl', () => {
      rendered.setProps({
        cardImageUrl: null,
      });
      instance.componentDidMount();
      expect(util.dispatch).toHaveBeenCalled();
    });
    it('should not call util.dispatch if there is no cardImageUrl', () => {
      rendered.setProps({
        cardImageUrl: '',
      });
      instance.componentDidMount();
      expect(util.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('getTemplateImageSuccess', () => {
    it('should setValue', () => {
      instance.getTemplateImageSuccess([{ content: 'content' }]);
      expect(props.resaga.setValue).toBeCalled();
    });
  });

  describe('getList', () => {
    it('should call dotprop if there is content', () => {
      dotProp.set = jest.fn();
      instance.getList([{ content: '1' }])({ list: [1] });
      expect(dotProp.set).toBeCalled();
    });
    it('should call dotprop if there is no content', () => {
      dotProp.set = jest.fn();
      instance.getList([{ content: null }])({ list: [1] });
      expect(dotProp.set).toBeCalled();
    });
    it('should call dotprop if there is no list', () => {
      dotProp.set = jest.fn();
      instance.getList([{ content: 'null' }])();
      expect(dotProp.set).toBeCalled();
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
