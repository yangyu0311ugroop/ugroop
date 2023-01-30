import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { FolderCardFooter } from '../index';

describe('<FolderCardFooter />', () => {
  let rendered;

  const props = {
    classes: {},
    tourCount: 3,
    subfolderCount: 2,
  };

  beforeEach(() => {
    rendered = shallow(<FolderCardFooter {...props} />);
  });

  it('should exists', () => {
    expect(FolderCardFooter).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render different stuff when tourCount and subfolderCount total is 0', () => {
    rendered.setProps({
      tourCount: 0,
      subfolderCount: 0,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render different stuff when tourCount is > 1 and subfolderCount total is 0', () => {
    rendered.setProps({
      tourCount: 2,
      subfolderCount: 0,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render different stuff when tourCount is 1 and subfolderCount total is 1', () => {
    rendered.setProps({
      tourCount: 1,
      subfolderCount: 1,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render different stuff when tourCount is 0 and subfolderCount total is 2', () => {
    rendered.setProps({
      tourCount: 0,
      subfolderCount: 2,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
