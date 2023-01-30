import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ParticipantList } from '../index';
import { PORTAL_HELPERS } from '../../../../../../../../../../../../../Portal/helpers';
import { ability } from '../../../../../../../../../../../../../../apis/components/Ability/ability';

describe('<ParticipantList />', () => {
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
    rendered = shallow(<ParticipantList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ParticipantList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleCreateClick', () => {
    it('should call resaga setValue', () => {
      instance.handleCreateClick();

      expect(resaga.setValue).toHaveBeenCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });
  describe('openPrintForm()', () => {
    it('PORTAL_HELPERS.openPrintPdfForm should be called', () => {
      ability.can = jest.fn(() => true);
      PORTAL_HELPERS.openPrintPdfForm = jest.fn();
      instance.openPrintForm();
      expect(PORTAL_HELPERS.openPrintPdfForm).toBeCalled();
      // expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      ability.can = jest.fn(() => true);
      rendered.openPrintForm = jest.fn(() => 'printform');
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
