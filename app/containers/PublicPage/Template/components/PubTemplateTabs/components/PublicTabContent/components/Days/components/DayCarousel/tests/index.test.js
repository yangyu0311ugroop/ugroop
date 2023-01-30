import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import momentHelper from 'utils/helpers/moment';
import { DayCarousel } from '../index';

describe('<DayCarousel />', () => {
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
    rendered = shallow(<DayCarousel {...props} />);
    instance = rendered.instance();
    momentHelper.addDayThenGetDate = jest.fn(() => 7);
    momentHelper.getDateWithFormat = jest.fn(() => 7);
  });

  it('should exists', () => {
    expect(DayCarousel).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps', () => {
    it('should set state for current day id', () => {
      const nextProps = { daysId: [1, 2], currentDayId: 2 };
      instance.componentWillReceiveProps(nextProps);
      expect(instance.state.page).toBe(1);
      expect(instance.state.currPage).toBe(1);
    });
    it('should not set state when currentDayId in not in daysId', () => {
      const nextProps = { daysId: [1, 2] };
      instance.componentWillReceiveProps(nextProps);
      expect(instance.state.page).toBe(0);
      expect(instance.state.currPage).toBe(0);
    });
  });

  describe('onChange', () => {
    it('should set page state based on the index passed to it', () => {
      instance.onChange(77);
      expect(rendered.state().page).toBe(77);
    });
    it('should set page state based on the index passed to it', () => {
      const days = [{ id: 0 }, { id: 1 }, { id: 2 }];
      rendered.setProps({ days });
      instance.onChange(1);
      expect(resaga.setValue).toBeCalledWith({ currentQueryDayId: days[1].id });
    });
  });

  describe('generateDate', () => {
    it('should generate date based on startDate passed to it', () => {
      const days = 0;
      const startDate = '2018-03-12T16:00:00.000Z';
      const date = instance.generateDate(days, startDate);
      expect(date).toBe('7 - 7');
    });
  });

  describe('render()', () => {
    const arrayWithPhotos = [
      {
        content: 'Trekking Somewhere Far Far Away',
        customData: {
          description: '<p>Special Day</p>',
          location: null,
          showSectionPlaceholder: true,
        },
        id: 223,
        parentNodeId: 222,
        photos: {
          content:
            'FileContainers/com.ugroop.personContainer/download/02cbf2f1-ed36-48c7-947b-cf465bcff28e.jpeg',
          nodeId: 223,
          metaInfo: {
            height: 1,
            scale: 1,
            width: 0.6462212486308871,
            x: 0.14984840547962586,
            y: 0,
          },
          id: 2,
        },
        type: 'day',
        updatedAt: '2018-02-14T07:58:18.005Z',
      },
      {
        content: 'Trekking Somewhere Far Far Away',
        customData: {
          description: '<p>Special Day</p>',
          location: null,
          showSectionPlaceholder: true,
        },
        id: 224,
        parentNodeId: 222,
        photos: {
          content:
            'FileContainers/com.ugroop.personContainer/download/02cbf2f1-ed36-48c7-947b-cf465bcff28e.jpeg',
          nodeId: 223,
          metaInfo: {
            height: 1,
            scale: 1,
            width: 0.6462212486308871,
            x: 0.14984840547962586,
            y: 0,
          },
          id: 2,
        },
        type: 'day',
        updatedAt: '2018-02-14T07:58:18.005Z',
      },
    ];
    const arrayWithoutPhotos = [
      {
        content: 'Trekking Somewhere Far Far Away',
        customData: {
          description: '<p>Special Day</p>',
          location: null,
          showSectionPlaceholder: true,
        },
        id: 223,
        parentNodeId: 222,
        photos: null,
        type: 'day',
        updatedAt: '2018-02-14T07:58:18.005Z',
      },
      {
        content: 'Trekking Somewhere Far Far Away',
        customData: {
          description: '<p>Special Day</p>',
          location: null,
          showSectionPlaceholder: true,
        },
        id: 224,
        parentNodeId: 222,
        photos: null,
        type: 'day',
        updatedAt: '2018-02-14T07:58:18.005Z',
      },
    ];
    it('should render correctly if days are > 0', () => {
      rendered.setProps({
        days: arrayWithPhotos,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if days photo are not available', () => {
      rendered.setProps({
        days: arrayWithoutPhotos,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if days are 0', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
