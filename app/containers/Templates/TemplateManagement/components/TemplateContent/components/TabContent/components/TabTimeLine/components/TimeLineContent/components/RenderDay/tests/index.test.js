import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RenderDay } from '../index';

describe('RenderDay component', () => {
  const day = {
    id: 99,
    content: 'hi',
    children: [{ id: 1, hi: 'ho' }, { id: 2, ho: 'hi' }],
  };
  const crud = {
    create: jest.fn(),
    delete: jest.fn(),
  };
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const index = 2;
  let rendered;
  let instance;
  const onRemoveSection = () => () => {};
  const onDoneNodeForm = () => () => {};

  beforeEach(() => {
    rendered = shallow(
      <RenderDay
        resaga={resaga}
        classes={{}}
        activityIds={[1]}
        dayId={day.id}
        crud={crud}
        index={index}
        onRemoveSection={onRemoveSection}
        onDoneNodeForm={onDoneNodeForm}
        selected
      />,
    );
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<RenderDay />', () => {
    describe('componentWillReceiveProps()', () => {
      it('should return null', () => {
        rendered.setProps({ dayId: 99 });

        instance.componentWillReceiveProps({ dayId: 99 });

        TEST_HELPERS.expectNotCalled(resaga.setValue);
      });

      it('should componentWillReceiveProps', () => {
        rendered.setProps({ dayId: 99 });

        instance.componentWillReceiveProps({ dayId: 2234 });

        TEST_HELPERS.expectCalled(resaga.setValue);
      });
    });

    describe('componentWillUnmount()', () => {
      it('should return null', () => {
        rendered.setProps({ editing: false });

        instance.componentWillUnmount();

        TEST_HELPERS.expectNotCalled(resaga.setValue);
      });

      it('should componentWillUnmount', () => {
        rendered.setProps({ editing: true });

        instance.componentWillUnmount();

        TEST_HELPERS.expectCalled(resaga.setValue);
      });
    });

    describe('renderChildren()', () => {
      it('should return null', () => {
        rendered.setProps({ activityIds: [] });

        const snapshot = shallow(<div>{instance.renderChildren()}</div>);

        expect(toJSON(snapshot)).toMatchSnapshot();
      });

      it('should renderChildren', () => {
        rendered.setProps({ activityIds: [1, 2] });

        const snapshot = shallow(<div>{instance.renderChildren()}</div>);

        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });

    describe('render()', () => {
      it('should render', () => {
        rendered.setProps({ activityIds: [1, 2] });
        instance.renderChildren = jest.fn(() => 'renderChildren');

        const snapshot = shallow(<div>{instance.render()}</div>);

        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });

    it('should exists', () => {
      expect(RenderDay).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });
});
