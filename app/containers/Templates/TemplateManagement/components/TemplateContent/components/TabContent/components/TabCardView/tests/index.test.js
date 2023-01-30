import { shallow } from 'enzyme';
import React from 'react';
import { TabCardView } from '../index';

describe.skip('<TabCardView />', () => {
  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<TabCardView {...props} />);
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should exists', () => {
    expect(TabCardView).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  /*
  describe('createSections()', () => {
    it('should include children which is the id of days per month and year', () => {
      const tabChildren = [1, 2, 3, 4, 5];
      const divisions = [
        {
          month: 'April',
          year: '2018',
          count: 1,
        },
        {
          month: 'May',
          year: '2018',
          count: 4,
        },
      ];
      const snapshot = shallow(
        <div>{instance.createSections(tabChildren, divisions)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should include children which is the id of days per month and year if sections > 2', () => {
      const tabChildren = [1, 2, 3, 4, 5];
      const divisions = [
        {
          month: 'April',
          year: '2018',
          count: 1,
        },
        {
          month: 'May',
          year: '2018',
          count: 2,
        },
        {
          month: 'June',
          year: '2018',
          count: 2,
        },
      ];
      const snapshot = shallow(
        <div>{instance.createSections(tabChildren, divisions)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderHeading()', () => {
    it('should renderHeading', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeading, ['heading']);
    });
  });

  describe('renderMultiMonth()', () => {
    it('should render something if createSections return array greater than 0', () => {
      instance.createSections = jest.fn(() => [
        {
          year: '2018',
          month: 'May',
          children: [1, 2, 3],
        },
      ]);
      const snapshot = shallow(<div>{instance.renderMultiMonth([])}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSingleMonth()', () => {
    it('should render something if tabChildren array length < 1 and currMonth is blank string', () => {
      const snapshot = shallow(<div>{instance.renderSingleMonth()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render something if tabChildren array length > 1 and currMonth is not blank', () => {
      rendered.setProps({
        tabChildren: [1, 2],
      });
      const snapshot = shallow(
        <div>{instance.renderSingleMonth('April 2018')}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDays()', () => {
    it('should call renderSingleMonth startDate does not exist', () => {
      rendered.setProps({
        startDate: null,
      });
      instance.renderSingleMonth = jest.fn(
        () => 'All my days are counted in the hands of God',
      );
      const snapshot = shallow(<div>{instance.renderDays()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(instance.renderSingleMonth).toBeCalled();
    });

    it('should call renderMultiMonth if months exceeds current month', () => {
      instance.renderMultiMonth = jest.fn(
        () =>
          'My flesh and my heart may fail, but God is my strength and my portion forever',
      );
      momentHelper.getDateWithFormat = jest.fn(() => 'April 2018');
      momentHelper.addDayThenGetDate = jest.fn(() => 'May 2018');
      momentHelper.trackStartDateUpToAddedDay = jest.fn(() => []);
      rendered.setProps({
        startDate: '04-01-2018',
        tabChildren: [1, 2],
      });
      const snapshot = shallow(<div>{instance.renderDays()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(instance.renderMultiMonth).toBeCalledWith([]);
    });

    it('should call renderSingleMonth if startDate exist but only within the month', () => {
      momentHelper.getDateWithFormat = jest.fn(() => 'April 2018');
      momentHelper.addDayThenGetDate = jest.fn(() => 'April 2018');
      momentHelper.trackStartDateUpToAddedDay = jest.fn(() => 'Divisions');
      instance.renderMultiMonth = jest.fn(
        () =>
          'My flesh and my heart may fail, but God is my strength and my portion forever',
      );
      instance.renderSingleMonth = jest.fn(
        () =>
          'My flesh and my heart may fail, but God is my strength and my portion forever',
      );
      rendered.setProps({
        startDate: '04-01-2018',
        tabChildren: [1, 2],
      });
      const snapshot = shallow(<div>{instance.renderDays()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(instance.renderSingleMonth).toBeCalledWith('April 2018');
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderDays = jest.fn(
        () => 'I found my hope in the One who saves my soul',
      );
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
   */
});
