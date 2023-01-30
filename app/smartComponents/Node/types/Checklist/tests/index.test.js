import { OPTION, DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import Hover from 'viewComponents/Hover';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEMPLATE } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { Checklist } from '../index';

describe('<Checklist />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 99955,
    nextNodeId: 55333,
    classes: {
      progressOutstanding: 'progressOutstanding',
      progressCompleted: 'progressCompleted',
    },
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    LOGIC_HELPERS.ifFunction = jest.fn(() => jest.fn());
    rendered = shallow(<Checklist {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Checklist).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('toggleExpanded()', () => {
    it('should toggleExpanded', () => {
      rendered.setProps({ expanded: false });
      instance.toggleExpanded();

      rendered.setProps({ expanded: true });
      instance.toggleExpanded();

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
    it('should toggleExpanded use state', () => {
      rendered.setProps({ expanded: true, useExpandedState: true });
      instance.toggleExpanded();

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('toggleShowCompleted()', () => {
    it('should toggleShowCompleted', () => {
      rendered.setState({ showCompleted: false });
      instance.stopPropagation = jest.fn();

      instance.toggleShowCompleted(123);
      expect(rendered.state().showCompleted).toBe(true);

      instance.toggleShowCompleted(123);
      expect(rendered.state().showCompleted).toBe(false);

      expect(instance.stopPropagation).toBeCalledWith(123);
    });
  });

  describe('handleOnClickStatus()', () => {
    it('should handleOnClickStatus', () => {
      const toggleNode = jest.fn(test => () => test);
      rendered.setState({ showCompleted: false });
      rendered.setProps({ toggleNode });
      const e = { stopPropagation: jest.fn() };
      instance.handleOnClickStatus(e);
      expect(toggleNode).toBeCalled();
    });
    it('should handleOnClickStatus', () => {
      rendered.setState({ showCompleted: false });
      const e = { stopPropagation: jest.fn() };
      expect(instance.handleOnClickStatus(e)).toEqual(DO_NOTHING);
    });
  });

  describe('toggleShowOutstanding()', () => {
    it('should toggleShowOutstanding', () => {
      rendered.setState({ showOutstanding: false });
      instance.stopPropagation = jest.fn();

      instance.toggleShowOutstanding(123);
      expect(rendered.state().showOutstanding).toBe(true);

      instance.toggleShowOutstanding(123);
      expect(rendered.state().showOutstanding).toBe(false);

      expect(instance.stopPropagation).toBeCalledWith(123);
    });
  });

  describe('toggleShowCheckItems()', () => {
    it('should toggleShowCheckItems', () => {
      rendered.setState({ showCheckItems: false });

      instance.toggleShowCheckItems(123);
      expect(rendered.state().showCheckItems).toBe(true);

      instance.toggleShowCheckItems(123);
      expect(rendered.state().showCheckItems).toBe(false);
    });
  });

  describe('stopPropagation()', () => {
    it('should stopPropagation', () => {
      const event = { stopPropagation: jest.fn() };

      instance.stopPropagation(event);

      expect(event.stopPropagation).toBeCalledWith();
    });
  });

  describe('handleClick', () => {
    it('should call ifFunction with particular parameters', () => {
      instance.handleClick();
      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderSummary()', () => {
    it('should renderSummary', () => {
      instance.canDoSomething = () => false;
      const snapshot = shallow(<div>{instance.renderSummary()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderSummary when can do something', () => {
      instance.canDoSomething = () => true;
      instance.isTemplate = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderSummary()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderSummary when can canUpdate', () => {
      instance.canUpdate = () => true;
      instance.isExpanded = () => true;
      rendered.setProps({ editing: true });
      const snapshot = shallow(<div>{instance.renderSummary()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCardStatus()', () => {
    it('should return null', () => {
      instance.isClosed = jest.fn(() => false);

      expect(instance.renderCardStatus()).toBe(null);
    });

    it('should renderCardStatus', () => {
      instance.isClosed = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.renderCardStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCardSummary()', () => {
    it('should renderCardSummary', () => {
      instance.renderCardStatus = jest.fn(() => 'renderCardStatus');

      const snapshot = shallow(<div>{instance.renderCardSummary()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderCardSummary closed', () => {
      instance.isClosed = jest.fn(() => true);
      instance.renderCardStatus = jest.fn(() => 'renderCardStatus');

      const snapshot = shallow(<div>{instance.renderCardSummary()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCardDetails()', () => {
    it('should renderCardDetails', () => {
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.renderCardDetails()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCardFooter()', () => {
    it('should return null', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => false);

      expect(instance.renderCardFooter()).toBe(null);
    });

    it('should renderCardFooter', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => 'some footer');

      const snapshot = shallow(<div>{instance.renderCardFooter()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderDefaultFooter()', () => {
    it('should return null', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => false);

      expect(instance.renderDefaultFooter()).toBe(null);
    });

    it('should renderDefaultFooter', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => 'some footer');

      const snapshot = shallow(<div>{instance.renderDefaultFooter()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderDefaultFooter', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => 'some footer');
      instance.isClosed = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.renderDefaultFooter()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderCard()', () => {
    it('should return null', () => {
      rendered.setProps({ showClosed: false });
      instance.isClosed = jest.fn(() => true);

      expect(instance.renderCard()).toBe(null);
    });

    it('should renderCard', () => {
      rendered.setProps({ showClosed: true });
      rendered.setState({ showCheckItems: true });
      instance.isClosed = jest.fn(() => false);

      instance.renderCardSummary = jest.fn(() => 'renderCardSummary');
      instance.renderCardDetails = jest.fn(() => 'renderCardDetails');
      instance.renderCardFooter = jest.fn(() => 'renderCardFooter');

      const snapshot = shallow(<div>{instance.renderCard()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSummaryInfo()', () => {
    it('should return null', () => {
      instance.isExpanded = jest.fn(() => true);

      expect(instance.renderSummaryInfo()).toBe(null);
    });

    it('should renderSummaryInfo', () => {
      const snapshot = shallow(<div>{instance.renderSummaryInfo()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null #1', () => {
      rendered.setProps({ showClosed: false });
      instance.isClosed = jest.fn(() => true);

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      instance.renderSummary = jest.fn(() => 'renderSummary');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOption()', () => {
    it('should renderOption', () => {
      rendered.setProps({ content: 'some content' });

      const snapshot = shallow(<div>{instance.renderOption()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDetails()', () => {
    it('should return null', () => {
      instance.isExpanded = jest.fn(() => false);

      expect(instance.renderDetails()).toMatchSnapshot();
    });

    it('should renderDetails', () => {
      instance.isExpanded = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderDetails);
    });
  });

  describe('renderLogic()', () => {
    it('should renderLogic', () => {
      rendered.setProps({ parentNodeId: 22321 });
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.renderLogic()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should renderOption', () => {
      rendered.setProps({ variant: OPTION });
      instance.renderOption = jest.fn(() => 'renderOption');

      expect(instance.render()).toBe('renderOption');
    });

    it('should renderDefault', () => {
      instance.renderDefault = jest.fn(() => 'renderDefault');

      expect(instance.render()).toBe('renderDefault');
    });

    it('should render table row', () => {
      rendered.setProps({ variant: VARIANTS.TABLE });

      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render hover properly if variant is table row', () => {
      rendered.setProps({ variant: VARIANTS.TABLE });

      const snapshot = shallow(
        <div>{rendered.find(Hover).prop('children')({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should not render variant table row properly if parentType is TEMPLATE', () => {
      rendered.setProps({
        variant: VARIANTS.TABLE,
      });
      rendered.setProps({
        parentType: TEMPLATE,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should not render variant test only', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_ONLY,
      });
      rendered.setProps({
        parentType: TEMPLATE,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
