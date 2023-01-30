import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Hazard } from '../index';

describe('<Hazard />', () => {
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

    rendered = shallow(<Hazard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Hazard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('canEdit()', () => {
    it('should canEdit()', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(true);
    });
  });

  describe('renderResponsibility()', () => {
    it('should return null', () => {
      expect(
        instance.renderResponsibility({
          isEmpty: true,
          isViewing: true,
          editable: false,
        }),
      ).toBe(null);
    });

    it('should renderResponsibility empty', () => {
      instance.canEdit = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderResponsibility, [
        { isEmpty: true, isViewing: true },
      ]);
    });

    it('should renderResponsibility', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderResponsibility, [
        { isEmpty: false, content: 'renderResponsibility' },
      ]);
    });
  });

  describe('renderWhen()', () => {
    it('should return null', () => {
      expect(
        instance.renderWhen({
          isEmpty: true,
          isViewing: true,
          editable: false,
        }),
      ).toBe(null);
    });

    it('should renderWhen empty', () => {
      instance.canEdit = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderWhen, [
        { isEmpty: true, isViewing: true },
      ]);
    });

    it('should renderWhen', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderWhen, [
        { isEmpty: false, content: 'renderWhen' },
      ]);
    });
  });

  describe('renderDone()', () => {
    it('should return null', () => {
      expect(
        instance.renderDone({
          isEmpty: true,
          isViewing: true,
          editable: false,
        }),
      ).toBe(null);
    });

    it('should renderDone empty', () => {
      instance.canEdit = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderDone, [
        { isEmpty: true, isViewing: true },
      ]);
    });

    it('should renderDone', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDone, [
        { isEmpty: false, content: 'renderDone' },
      ]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderResponsibility = jest.fn(() => 'renderResponsibility');
      instance.renderWhen = jest.fn(() => 'renderWhen');
      instance.renderDone = jest.fn(() => 'renderDone');
      instance.canEdit = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
