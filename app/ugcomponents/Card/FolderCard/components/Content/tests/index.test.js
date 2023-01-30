/**
 * Created by paulcedrick on 7/17/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import {
  FolderCardContent,
  subFolderViewDef,
  tourViewDef,
  makeViewDelegate,
} from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('FolderCardContent', styles);

describe('FolderCardContent component', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <FolderCardContent classes={mockStyles} itemBaseUrl="/sample" />,
    );
  });

  afterAll(() => {
    if (global.gc) {
      global.gc();
    }
  });
  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render something if tours and subfolders have items', () => {
    rendered.setProps({
      tours: [{ content: 'Jesus is Lord of all!' }],
      subfolders: [
        {
          content:
            'Jesus does not cast out those who humble their selves to Him',
        },
      ],
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

describe('tourViewDef', () => {
  it('should return a component given the passed parameter', () => {
    const result = tourViewDef({ content: 'Jesus is the King of kings!' }, 2);
    const rendered = shallow(result);
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

describe('subFolderViewDef', () => {
  it('should return a component given the passed parameter', () => {
    const result = subFolderViewDef(
      { content: 'God is holy, holy, holy' },
      3,
      '/sample',
    );
    const rendered = shallow(result);
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

describe('makeViewDelegate', () => {
  const elem = [
    {
      content:
        'You can only be saved in your sin by turning away from your sin and believing in Jesus',
    },
  ];
  it('should return an object containing numberOfRow and itemCellView', () => {
    const result = makeViewDelegate(jest.fn(), elem, 'args');
    expect(result.numberOfRow).toBeDefined();
    expect(result.itemCellView).toBeDefined();
  });

  describe('numberOfRow', () => {
    it('should return the length of coll', () => {
      const result = makeViewDelegate(jest.fn(), elem, 'args');
      expect(result.numberOfRow()).toBe(elem.length);
    });
  });

  describe('itemCellView', () => {
    it('should call the viewDef param and pass params', () => {
      const viewDefMock = jest.fn();
      const result = makeViewDelegate(viewDefMock, elem, 'args');
      result.itemCellView(0);
      expect(viewDefMock).toBeCalledWith(elem[0], 0, ['args']);
    });
  });
});
