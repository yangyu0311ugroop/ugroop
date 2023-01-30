import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddHazard } from '../index';

describe('<AddHazard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<AddHazard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddHazard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should handleClose()', () => {
      PORTAL_HELPERS.close = jest.fn();

      instance.handleClose();

      TEST_HELPERS.expectCalledAndMatchSnapshot(PORTAL_HELPERS.close);
    });
  });

  describe('handleCreateSuccess()', () => {
    it('should handleCreateSuccess()', () => {
      instance.handleClose = jest.fn();

      instance.handleCreateSuccess();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleClose);
    });
  });

  describe('selectLikelihood()', () => {
    it('should selectLikelihood()', () => {
      instance.selectLikelihood('likelihood');

      expect(rendered.state().likelihood).toBe('likelihood');
    });
  });

  describe('selectImpact()', () => {
    it('should selectImpact()', () => {
      instance.selectImpact('impact');

      expect(rendered.state().impact).toBe('impact');
    });
  });

  describe('handleValidSubmit()', () => {
    it('should handleValidSubmit()', () => {
      NODE_API_HELPERS.createNode = jest.fn(() => '');

      instance.handleValidSubmit({ content: 'content' });

      TEST_HELPERS.expectCalledAndMatchSnapshot(NODE_API_HELPERS.createNode);
    });
  });

  describe('renderSaveCancelButton()', () => {
    it('should renderSaveCancelButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSaveCancelButton);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      instance.renderSaveCancelButton = jest.fn(() => 'renderSaveCancelButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
