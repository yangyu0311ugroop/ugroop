import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { EditableFolderCard } from '../index';

describe('EditableFolderCard', () => {
  let rendered;
  let instance;

  const props = {
    templateViewActions: {
      onUpdate: jest.fn(),
      onEditCancel: jest.fn(),
    },
  };

  beforeEach(() => {
    rendered = shallow(<EditableFolderCard {...props} />);
    instance = rendered.instance();
  });

  describe('render', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
