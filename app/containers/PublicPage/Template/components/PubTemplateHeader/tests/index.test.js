import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PubTemplateHeader } from '../index';

describe('<PubTemplateHeader />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<PubTemplateHeader {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PubTemplateHeader).toBeDefined();
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
