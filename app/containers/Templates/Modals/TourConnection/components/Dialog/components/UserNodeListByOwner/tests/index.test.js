import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UserNodeListByOwner } from '../index';
import { TEST_HELPERS } from '../../../../../../../../../utils/helpers/testHelpers';

describe('<UserNodeListByOwner />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
  };

  const onClose = jest.fn();

  const props = {
    classes: {},
    onClose,
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<UserNodeListByOwner {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UserNodeListByOwner).toBeDefined();
  });

  describe('handleRenderContributor', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.handleRenderContributor()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
