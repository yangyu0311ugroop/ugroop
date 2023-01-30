import { CLOSED, COMPLETED, OPEN, OUTSTANDING } from 'appConstants';
import { CONSOLE_HELPERS, MISSING_REQUIRED_PROPS } from 'utils/helpers/console';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CHECKITEM, CHECKLIST } from 'utils/modelConstants';

const toggleStatus = (params, props) => {
  const { customData, type, status, ...node } = params;
  const { me } = props;

  let nextStatus;
  let newCustomData;

  switch (type) {
    case CHECKITEM:
      nextStatus = LOGIC_HELPERS.ifElse(
        status === COMPLETED,
        OUTSTANDING,
        COMPLETED,
      );
      newCustomData = LOGIC_HELPERS.ifElse(
        nextStatus === COMPLETED,
        {
          completedAt: new Date().toISOString(),
          completedBy: me,
        },
        {
          completedAt: null,
          completedBy: null,
        },
      );
      break;
    case CHECKLIST:
      nextStatus = LOGIC_HELPERS.ifElse(status === CLOSED, OPEN, CLOSED);
      newCustomData = LOGIC_HELPERS.ifElse(
        nextStatus === CLOSED,
        {
          completedAt: new Date().toISOString(),
          completedBy: me,
        },
        {
          completedAt: null,
          completedBy: null,
        },
      );
      break;
    default:
      CONSOLE_HELPERS.error(
        MISSING_REQUIRED_PROPS,
        'CHECKLIST_HELPERS.toggleStatus: type',
      );
      return null;
  }

  return {
    ...node,
    customData: { ...customData, ...newCustomData },
    type,
    status: nextStatus,
  };
};

export const CHECKLIST_HELPERS = {
  toggleStatus,
};
