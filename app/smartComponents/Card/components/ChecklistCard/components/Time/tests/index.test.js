import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import { Time } from '../index';

describe('<Time />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 'monday',
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Time {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Time).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('toggleNode()', () => {
    it('should toggleNode', () => {
      CHECKLIST_HELPERS.toggleStatus = jest.fn(() => 'toggleStatus');

      instance.toggleNode({ id: '2233' })();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderButtons()', () => {
    it('should renderButtons', () => {
      const snapshot = shallow(
        <div>{instance.renderButtons({ id: 2233 })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderBody()', () => {
    it('should renderBody', () => {
      const snapshot = shallow(
        <div>
          {instance.renderBody(
            {
              id: 2233,
              checklists: [1],
              expanded: false,
              selected: false,
            },
            {
              showCompleted: true,
              showOutstanding: true,
            },
            {},
          )}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('setTrail()', () => {
    it('settrail when currentAbilityResolver is null ', () => {
      const snapshot = shallow(<div>{instance.setTrail(1)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('settrail when currentAbilityResolver has value', () => {
      rendered.setState({
        currentAbilityResolver: 1,
      });
      const snapshot = shallow(<div>{instance.setTrail(1)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderTrailData()', () => {
    it('renderTrailData', () => {
      const snapshot = shallow(
        <div>{instance.renderTrailData({ templateId: 1 })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ ids: [1, 2] });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
