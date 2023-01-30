import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';
import { ParticipantListModeSelect } from '..';

describe('<ParticipantListModeSelect />', () => {
  let wrapper;
  let doResagaSnapshot;

  const makeProps = () => ({
    templateId: 1,
    onClose: jest.fn(),
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
      dispatchTo: jest.fn(
        (key, type, obj) =>
          doResagaSnapshot &&
          expect({ dispatchTo: { key, type, obj } }).toMatchSnapshot(),
      ),
    },
  });

  beforeEach(() => {
    ability.can = jest.fn(() => true);
    wrapper = shallow(<ParticipantListModeSelect {...makeProps()} />);
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(ParticipantListModeSelect).toBeDefined();
  });
  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('still matches snapshot', () => {
      wrapper.setProps({ includeFormsMode: false, includeInviteMode: false });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
