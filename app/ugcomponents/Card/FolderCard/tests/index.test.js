/**
 * Created by paulcedrick on 7/17/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import stylesheet from '../styles';
import { FolderCard } from '../index';

const mockStyle = mockStylesheet('TemplateFolder', stylesheet, theme);

describe('FolderCard component', () => {
  let rendered;

  const props = {
    onEnableEdit: jest.fn(),
    onEditSubmit: jest.fn(),
    onEditCancel: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<FolderCard classes={mockStyle} id={3} {...props} />);
  });
  afterAll(() => {
    if (global.gc) {
      global.gc();
    }
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render what it should render when isLoading', () => {
    rendered.setProps({
      isLoading: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should not use ugFolderLinkEmpty if folderItems props is not empty', () => {
    rendered.setProps({
      folderItems: [{ type: 'template' }],
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render actions if showActions is true', () => {
    rendered.setProps({
      showActions: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should not render actions if showActions is false', () => {
    rendered.setProps({
      showActions: false,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should show card if it is editable', () => {
    rendered.setProps({
      isEditable: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should not show card if it is not editable', () => {
    rendered.setProps({
      isEditable: false,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
