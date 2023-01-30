/**
 * Created by dan on 6/1/17.
 */
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';
import { GalleryInitial } from '../index';

describe('GalleryInitial/tests/index.test.js', () => {
  const resaga = { dispatchTo: jest.fn() };
  const info = { id: 1, content: 'hi ho' };
  let rendered;
  let instance;
  beforeEach(() => {
    // override setTimeout to call back immediately
    global.setTimeout = jest.fn(cb => cb());
    global.clearTimeout = jest.fn();
    rendered = shallow(
      <GalleryInitial
        classes={{}}
        info={info}
        resaga={resaga}
        id={0}
        fetching={false}
      />,
    );
    rendered = shallow(
      <GalleryInitial
        classes={{}}
        info={info}
        resaga={resaga}
        id={0}
        fetching
      />,
    );
    instance = rendered.instance();
    instance.getRole = jest.fn(() => true);
  });
  afterEach(() => jest.clearAllMocks());

  describe('<GalleryInitial />', () => {
    it('should exists', () => {
      expect(GalleryInitial).toBeDefined();
    });
  });
  describe('renderContent Empty()', () => {
    it('should render EMPTY if !sectionIds.length', () => {
      instance.getRole = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderEmpty()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
