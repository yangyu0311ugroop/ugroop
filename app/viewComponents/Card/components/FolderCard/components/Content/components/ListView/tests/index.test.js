import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { FolderListView } from '../index';

describe('<FolderListView />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <FolderListView
        classes={{ listViewRoot: 'listViewRoot' }}
        viewDelegate={{ x: 1 }}
      />,
    );
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(FolderListView).toBeDefined();
    });

    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
