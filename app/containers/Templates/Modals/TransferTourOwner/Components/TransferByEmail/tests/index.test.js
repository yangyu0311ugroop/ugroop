import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TransferByEmail } from '../index';

describe('<TransferByEmail />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 999,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<TransferByEmail {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TransferByEmail).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('submit', () => {
    it('#handleValid', () => {
      expect(instance.handleValid()).toEqual(DO_NOTHING);
    });
    it('#handleInvalidSubmit', () => {
      expect(instance.handleInvalidSubmit()).toEqual(DO_NOTHING);
    });
    it('#getPersonSuccess', () => {
      instance.getPersonSuccess(
        { inviteeId: 1 },
        { result: { email: 'dan@ugroop' } },
      );
      expect(resaga.setValue).toBeCalled();
    });
    it('#handleFetchEmailInfo', () => {
      instance.handleFetchEmailInfo({ email: 'dan@ugroop' });
      expect(resaga.dispatchTo).toBeCalled();
    });
    it('#handleFetchEmailInfo has no result', () => {
      instance.handleFetchEmailInfo({});
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
