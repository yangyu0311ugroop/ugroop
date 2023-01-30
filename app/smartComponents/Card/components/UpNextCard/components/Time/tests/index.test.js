import { shallow } from 'enzyme/build';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import { Time } from 'smartComponents/Card/components/UpNextCard/components/Time/index';

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

  describe('onDayClick', () => {
    it('should set value of the selectedId in template management view store', () => {
      instance.onDayClick(1);

      expect(resaga.setValue).toBeCalledWith({
        selectedId: 1,
      });
    });
  });

  describe('renderButtons()', () => {
    it('should renderButtons', () => {
      const snapshot = shallow(
        <div>{instance.renderButtons({ id: 2233 })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should not renderButtons', () => {
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
  describe('renderNode()', () => {
    it('should render correctly and pass the day id as the parent id', () => {
      const snapshot = shallow(
        <div>
          {instance.renderNode({ index: 1, last: 1, nodeId: 999, id: 998 })({
            templateId: 1,
            dayId: 2,
          })}
        </div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly and pass the templateid as the parent id ', () => {
      const snapshot = shallow(
        <div>
          {instance.renderNode({ index: 1, last: 1, nodeId: 999, id: 998 })({
            templateId: 1,
            dayId: null,
          })}
        </div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('setAbilityResolver()', () => {
    it('currentAbilityResolver is id is null then do nothing  ', () => {
      const snapshot = shallow(<div>{instance.setAbilityResolver()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('currentAbilityResolver is not null then should do no thing ', () => {
      instance.setState({ currentAbilityResolver: 1 });
      const snapshot = shallow(<div>{instance.setAbilityResolver(1)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('currentAbilityResolver should set state ', () => {
      instance.setAbilityResolver(1);
      expect(rendered.state().currentAbilityResolver).toEqual(1);
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
