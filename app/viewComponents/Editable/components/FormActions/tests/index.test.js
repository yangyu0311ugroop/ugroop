import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EditableFormActions, ANONYMOUS_FUNC } from '../index';

describe('<EditableFormActions />', () => {
  let rendered;
  let instance;

  const props = {
    renderPrimaryActions: () => 'Primary actions',
    renderSecondaryActions: () => 'Secondary actions',
  };

  beforeEach(() => {
    rendered = shallow(<EditableFormActions classes={{}} inline {...props} />);
    instance = rendered.instance();
  });

  describe('ANONYMOUS_FUNC', () => {
    it('call ANONYMOUS_FUNC', ANONYMOUS_FUNC);
  });

  describe('renderPrimaryActions', () => {
    it('', () => {
      rendered.setProps({ renderPrimaryActions: null });
      expect(instance.renderPrimaryActions()).toMatchSnapshot();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should match snapshot no Grid', () => {
      rendered.setProps({ noGrid: true });
      instance.renderSaveButton = () => 'renderSaveButton';
      instance.renderCancelButton = () => 'renderCancelButton';
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('ANONYMOUS_FUNC', () => {
    it('call ANONYMOUS_FUNC', ANONYMOUS_FUNC);
  });

  describe('renderExtraButtons()', () => {
    it('should renderExtraButtons', () => {
      const renderActions = jest.fn(() => true);
      rendered.setProps({ renderActions });

      TEST_HELPERS.expectMatchSnapshot(instance.renderExtraButtons);
    });
  });
});
