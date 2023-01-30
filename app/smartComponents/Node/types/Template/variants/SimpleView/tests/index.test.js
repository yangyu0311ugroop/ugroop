import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { SimpleView } from '../index';

describe('<Compressed />', () => {
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
    rendered = shallow(<SimpleView {...props} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(SimpleView).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isActive()', () => {
    it('should isActive()', () => {
      expect(instance.isActive()).toBe(false);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      rendered.setProps({ showOrganisation: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent, [
        {
          starred: true,
        },
      ]);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ recent: true, fullWidth: true, flexWidth: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
