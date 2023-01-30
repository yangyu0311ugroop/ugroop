import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { withParticipantAccessRoles } from '../hoc';

describe('withParticipantAccessRoles', () => {
  let rendered;

  const Component = () => <div />;
  const Hoc = withParticipantAccessRoles(Component);

  const makeProps = () => ({
    resaga: {},
  });

  beforeEach(() => {
    rendered = shallow(<Hoc {...makeProps()} />);

    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withParticipantAccessRoles).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('still matches snapshot inside render prop', () => {
      const snapshot = shallow(
        <div key={1}>{rendered.renderProp('children')()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
