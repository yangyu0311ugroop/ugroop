import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Risks } from '../index';

describe('<Risks />', () => {
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

    rendered = shallow(<Risks {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Risks).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderCard()', () => {
    it('should renderCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'LOGIC_HELPERS.switchCase');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
