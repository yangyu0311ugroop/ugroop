import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Subtitle } from '../index';

describe('<Subtitle />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    subtitle: 'some subtitle',
    classes: { default: 'default', disabled: 'disabled' },
    resaga,
    id: 2233,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Subtitle {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Subtitle).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
