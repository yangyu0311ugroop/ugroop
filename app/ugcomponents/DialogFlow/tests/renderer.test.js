import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';

import { DialogFlow } from '../renderer';
import stylesheet from '../styles';

const mockStyle = mockStylesheet('DialogFlow', stylesheet);

describe('DialogFlow', () => {
  let renderer;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      isOpen: true,
      isFullWidth: false,
      actionBtnSize: 'small',
      isDiscardBtnHidden: true,
      isXBtnHidden: false,
      classes: mockStyle,
      onClose: jest.fn(),
      onSave: jest.fn(),
      onDiscardClick: jest.fn(),
      onCloseClick: jest.fn(),
      onCancelClick: jest.fn(),
      isSaveDisabled: false,
      isBeingDiscarded: false,
      dialogClassName: '',
    };
    renderer = shallow(<DialogFlow {...mockProps}>Sample</DialogFlow>);
  });
  it('should render what it should render given the props passed', () => {
    expect(toJSON(renderer)).toMatchSnapshot();
  });
  it('should not hide discardBtn if isDiscardBtnHidden is false', () => {
    renderer.setProps({
      isDiscardBtnHidden: false,
    });
    expect(toJSON(renderer)).toMatchSnapshot();
  });
  it('should hide x button if isXBtnHidden is true', () => {
    renderer.setProps({
      isXBtnHidden: true,
    });
    expect(toJSON(renderer)).toMatchSnapshot();
  });
  it('should have runnable function that returns undefined for onValidSubmit, onValid and onInvalid props', () => {
    renderer.setProps({
      onSave: undefined,
    });
    const iProps = renderer.instance().props;
    expect(iProps.onValidSubmit()).not.toBeDefined();
    expect(iProps.onValid()).not.toBeDefined();
    expect(iProps.onInvalid()).not.toBeDefined();
    expect(iProps.onSave()).not.toBeDefined();
  });
});
