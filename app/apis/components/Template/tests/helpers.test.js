import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TEMPLATE_API_HELPERS } from '../helpers';
import { TEMPLATE_API_EVENT_UTILS } from '../utils/events';

describe('apis/Template/helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };

  it('fetchEvents', () => {
    TEMPLATE_API_HELPERS.fetchEvents(
      {
        templateId: 1,
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  describe('createEvents', () => {
    it('creates no events', () => {
      const models = [];
      TEMPLATE_API_EVENT_UTILS.convertToBatchCreate = jest.fn(() => models);
      TEMPLATE_API_HELPERS.createEvent(
        {
          templateId: 1,
          model: { node: {}, data: {} },
          onSuccess: jest.fn(),
          onError: jest.fn(),
        },
        { resaga },
      );
      expect(resaga.dispatchTo).not.toBeCalled();
      expect(resaga.setValue).not.toBeCalled();
    });

    it('handles no onSuccess or onError', () => {
      expect(() => {
        const models = [{}];
        TEMPLATE_API_EVENT_UTILS.convertToBatchCreate = jest.fn(() => models);
        TEMPLATE_API_HELPERS.createEvent(
          {
            templateId: 1,
            model: { node: {}, data: {} },
            onSuccess: null,
            onError: null,
          },
          { resaga },
        );
        const node = {};

        // create event
        resaga.dispatchTo.mock.calls[0][2].onSuccess({ node });
        resaga.dispatchTo.mock.calls[0][2].onError();

        // get times
        resaga.dispatchTo.mock.calls[1][2].onSuccess();
      }).not.toThrow();
    });

    it('batch creates 2 events', () => {
      global.setTimeout = jest.fn(cb => cb());

      const models = [{}, {}];
      const onSuccess = jest.fn();
      const onError = jest.fn();
      TEMPLATE_API_EVENT_UTILS.convertToBatchCreate = jest.fn(() => models);
      TEMPLATE_API_HELPERS.createEvent(
        {
          templateId: 1,
          model: { node: {}, data: {} },
          onSuccess,
          onError,
        },
        { resaga },
      );
      const node = {};

      // first create event
      resaga.dispatchTo.mock.calls[0][2].onSuccess({ node });
      resaga.dispatchTo.mock.calls[0][2].onError();

      // first get times
      resaga.dispatchTo.mock.calls[1][2].onSuccess();

      // second create event
      resaga.dispatchTo.mock.calls[2][2].onSuccess({ node });
      resaga.dispatchTo.mock.calls[2][2].onError();

      // second get times
      resaga.dispatchTo.mock.calls[3][2].onSuccess();

      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
      expect(onSuccess.mock.calls).toMatchSnapshot();
      expect(onError.mock.calls).toMatchSnapshot();
    });
  });

  it('getIds', () => {
    const object = {
      1: {},
    };
    expect(TEMPLATE_API_HELPERS.getObjectIds(object)).toEqual([1]);
  });

  it('getIds if no object', () => {
    const object = null;
    expect(TEMPLATE_API_HELPERS.getObjectIds(object)).toEqual([]);
  });

  it('getIds if no object keys', () => {
    const object = {};
    expect(TEMPLATE_API_HELPERS.getObjectIds(object)).toEqual([]);
  });

  it('patchEvent', () => {
    TEMPLATE_API_HELPERS.patchEvent(
      {
        model: { node: {}, data: {} },
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    TEMPLATE_API_HELPERS.patchEvent(
      {
        model: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  it('deleteEvent', () => {
    TEMPLATE_API_HELPERS.deleteEvent(
      {
        id: 1,
        dataId: 2,
        templateId: 3,
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  it('moveToDay', () => {
    TEMPLATE_API_HELPERS.patchEvent = jest.fn(() => 'patchEvent');

    expect(
      TEMPLATE_API_HELPERS.moveToDay(
        {
          eventData: {},
        },
        { resaga },
      ),
    ).toBe('patchEvent');
  });

  it('moveToUnplanned', () => {
    TEMPLATE_API_HELPERS.patchEvent = jest.fn(() => 'patchEvent');

    expect(
      TEMPLATE_API_HELPERS.moveToUnplanned(
        {
          eventData: {},
        },
        { resaga },
      ),
    ).toBe('patchEvent');
  });

  it('reactivateEvent', () => {
    TEMPLATE_API_HELPERS.patchEvent = jest.fn(() => 'patchEvent');

    TEMPLATE_API_HELPERS.reactivateEvent(
      {
        eventData: {},
      },
      { resaga },
    );

    TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.patchEvent);
  });

  it('convertAttachments null', () => {
    expect(TEMPLATE_API_HELPERS.convertAttachments()).toEqual({});
  });

  it('convertAttachments not defined', () => {
    const data = { eventAttachments: null };

    expect(TEMPLATE_API_HELPERS.convertAttachments(data)).toEqual(data);
  });

  it('convertAttachments is array', () => {
    const data = { eventAttachments: [1, 2] };

    expect(TEMPLATE_API_HELPERS.convertAttachments(data)).toEqual(data);
  });

  it('convertAttachments is object', () => {
    const data = { eventAttachments: { 1: { name: 'file1' } } };

    expect(TEMPLATE_API_HELPERS.convertAttachments(data)).toEqual({
      eventAttachments: [{ name: 'file1' }],
    });
  });

  it('createFlightBooking', () => {
    TEMPLATE_API_HELPERS.createFlightBooking(
      {
        templateId: 3,
        model: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  it('patchFlightBooking', () => {
    TEMPLATE_API_HELPERS.patchFlightBooking(
      {
        model: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      {
        dataId: 1,
        templateId: 2,
        resaga,
      },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  it('deleteFlightBooking', () => {
    TEMPLATE_API_HELPERS.deleteFlightBooking(
      {
        dataId: 1,
        templateId: 2,
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      { resaga },
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  it('createEventAttachment', () => {
    TEMPLATE_API_HELPERS.createEventAttachment(
      {
        eventId: 1,
        templateId: 2,
        data: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      resaga,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  it('deleteEventAttachment', () => {
    TEMPLATE_API_HELPERS.deleteEventAttachment(
      {
        eventId: 1,
        templateId: 2,
        attachmentId: 3,
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      resaga,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });

  it('patchEventAttachment', () => {
    TEMPLATE_API_HELPERS.patchEventAttachment(
      {
        eventId: 1,
        templateId: 2,
        attachmentId: 3,
        data: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      resaga,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('batchRecentActivity', () => {
    const props = { resaga };
    TEMPLATE_API_HELPERS.batchRecentActivity(
      {
        id: 1,
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      props,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('getPeople', () => {
    const props = { resaga };
    TEMPLATE_API_HELPERS.getPeople(
      {
        eventId: 1,
        templateId: 2,
        attachmentId: 3,
        data: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      props,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('addRole', () => {
    const props = { resaga };
    TEMPLATE_API_HELPERS.addRole(
      {
        eventId: 1,
        templateId: 2,
        attachmentId: 3,
        data: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      props,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('addOwnRole', () => {
    const props = { resaga };
    TEMPLATE_API_HELPERS.addMyOwnRole(
      {
        templateId: 2,
        attachmentId: 3,
        data: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      props,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('getParticipants', () => {
    const props = { resaga };
    TEMPLATE_API_HELPERS.getParticipants(
      {
        templateId: 2,
        attachmentId: 3,
        data: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      props,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
  it('upsertSetting', () => {
    const props = { resaga };
    TEMPLATE_API_HELPERS.upsertSetting(
      {
        templateId: 2,
        attachmentId: 3,
        data: {},
        onSuccess: 'onSuccess',
        onError: 'onError',
      },
      props,
    );
    expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
  });
});
