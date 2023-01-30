import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { FolderListItem } from '../index';

describe('<FolderListItem />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <FolderListItem
        classes={{}}
        type="type"
        content="content"
        index={0}
        url="url"
      />,
    );
    instance = rendered.instance();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(FolderListItem).toBeDefined();
    });

    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('still matches snapshot if props.type=folder', () => {
      rendered.setProps({ type: 'folder' });
      expect(instance.render()).toMatchSnapshot();
    });
  });
});
