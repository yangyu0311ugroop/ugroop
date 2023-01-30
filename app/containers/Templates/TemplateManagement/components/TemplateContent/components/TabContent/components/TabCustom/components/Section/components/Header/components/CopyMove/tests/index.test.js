import { NODE_STORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { act } from '@testing-library/react-hooks';

import { MOVE } from 'apis/constants';
import { VARIANTS } from 'variantsConstants';
import { ACTIVITY, DAY, TAB_OTHER } from 'utils/modelConstants';
import { sleep } from 'utils/timeUtility';
import { GlobalProvider } from 'containers/App/globalContext';
import { CopyMove } from '../index';

describe('CopyMove', () => {
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn().mockImplementation((api, action, parameter) => {
      if (parameter.onSuccess) {
        parameter.onSuccess();
      }
      if (action === 'moveNodeAfter') {
        if (parameter.onError) {
          parameter.onError();
        }
      }
    }),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    id: 1,
    resaga,
    templateId: 1,
    action: MOVE,
    variant: VARIANTS.MENU_ITEM,

    visibleTabIds: [2, 3, 4, 5],
    parentType: DAY,
  };

  const nodeData = {
    1: {
      id: 1,
      type: 'template',
      customData: {
        startDate: '2021-05-03T00:00:00.000Z',
        duration: 5,
        displayDate: 'startDate',
      },
    },
    2: {
      id: 2,
      type: 'tabTimeLine',
    },
    3: {
      id: 3,
      type: TAB_OTHER,
      customData: {
        subType: 'people',
      },
    },
    4: {
      id: 4,
      type: TAB_OTHER,
      customData: {
        subType: null,
      },
    },
    5: {
      id: 5,
      type: TAB_OTHER,
      customData: {
        subType: null,
      },
    },
    6: {
      id: 6,
      type: DAY,
      customData: {},
      children: [8, 9],
    },
    7: {
      id: 7,
      type: DAY,
      children: [10, 11],
    },
    70: {
      id: 70,
      type: DAY,
      children: [],
    },
    8: {
      id: 8,
      type: ACTIVITY,
    },
    9: {
      id: 9,
      type: ACTIVITY,
      customData: {},
    },
    10: {
      id: 10,
      type: ACTIVITY,
    },
  };

  it('should render properly by default', () => {
    const render = renderWithRedux(<CopyMove {...props} />);
    expect(render.getByTitle(/move/i)).toBeInTheDocument();
  });

  it('should display CopyMove with days and tabs', async () => {
    const render = renderWithRedux(
      <GlobalProvider>
        <CopyMove
          {...props}
          parentId={6}
          ids={[8, 9]}
          dayIds={[6, 7, 70]}
          simpleMenu
        />
      </GlobalProvider>,
    );
    const { store } = render;
    dispatchSetValue(store, NODE_STORE, 'nodes', nodeData);
    act(() => {
      userEvent.click(screen.queryAllByTestId('popperButton')[0].childNodes[0]);
    });
    expect(screen.getByText(/Select Destination/i)).toBeInTheDocument();
    expect(screen.getByText(/Day/i)).toBeInTheDocument();
    expect(screen.getByText(/Position/i)).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.queryAllByTestId('daySelectMC')[0].childNodes[0]);
    });

    act(() => {
      userEvent.click(screen.queryAllByTestId('daySelectMC')[0].childNodes[0]);
    });
    expect(screen.getByPlaceholderText(/Enter day/i)).toBeInTheDocument();
    expect(screen.getByText(/day 1/i)).toBeInTheDocument();
    userEvent.click(screen.queryByText('day 2'));
    act(() => {
      userEvent.click(
        screen.queryAllByTestId('sectionSelectMC')[0].childNodes[0],
      );
    });
    // userEvent.click(screen.queryByText('1 -'));
    userEvent.click(screen.queryByText('1 - Untitled'));
    act(() => {
      userEvent.click(screen.queryAllByTestId('test-submit')[0].childNodes[0]);
    });
    await sleep(1000);
    expect(resaga.dispatchTo).toBeCalled();
  });
  it('should call dispatchTo CopyMoveChild when selected days has no children', () => {
    const render = renderWithRedux(
      <GlobalProvider>
        <CopyMove
          {...props}
          parentId={6}
          ids={[8, 9]}
          dayIds={[6, 7, 70]}
          simpleMenu
        />
      </GlobalProvider>,
    );
    const { store } = render;
    dispatchSetValue(store, NODE_STORE, 'nodes', nodeData);
    // Show popper menu
    act(() => {
      userEvent.click(screen.queryAllByTestId('popperButton')[0].childNodes[0]);
    });
    // Open day menu
    act(() => {
      userEvent.click(screen.queryAllByTestId('daySelectMC')[0].childNodes[0]);
    });
    // select day 3, no child
    expect(screen.getByText(/day 3/i)).toBeInTheDocument();
    userEvent.click(screen.queryByText('day 3'));
    act(() => {
      userEvent.click(screen.queryAllByTestId('test-submit')[0].childNodes[0]);
    });
    expect(resaga.dispatchTo).toBeCalled();
  });
  it('should call dispatchTo and call setValue node with the same parent', () => {
    const render = renderWithRedux(
      <GlobalProvider>
        <CopyMove
          {...props}
          parentId={6}
          ids={[8, 9]}
          dayIds={[6, 7, 70]}
          simpleMenu
        />
      </GlobalProvider>,
    );
    const { store } = render;
    dispatchSetValue(store, NODE_STORE, 'nodes', nodeData);
    // Show popper menu
    act(() => {
      userEvent.click(screen.queryAllByTestId('popperButton')[0].childNodes[0]);
    });
    act(() => {
      userEvent.click(screen.queryAllByTestId('test-submit')[0].childNodes[0]);
    });
    expect(resaga.dispatchTo).toBeCalled();
    expect(resaga.setValue).toBeCalled();
  });
  it('Day menu expansion should be define  ', () => {
    const render = renderWithRedux(
      <GlobalProvider>
        <CopyMove
          {...props}
          parentId={6}
          ids={[8, 9]}
          dayIds={[6, 7, 70]}
          // simpleMenu
        />
      </GlobalProvider>,
    );
    const { store } = render;
    dispatchSetValue(store, NODE_STORE, 'nodes', nodeData);
    act(() => {
      userEvent.click(screen.queryAllByTestId('popperButton')[0].childNodes[0]);
    });
    act(() => {
      userEvent.click(screen.queryAllByTestId('daySelectMC')[0].childNodes[0]);
    });
    expect(screen.queryAllByTestId('day-expand')).toBeDefined();
    act(() => {
      userEvent.click(screen.queryAllByTestId('day-expand')[0].childNodes[0]);
    });
  });
  it('should display tab first and default tab values', () => {
    const render = renderWithRedux(
      <GlobalProvider>
        <CopyMove {...props} parentId={4} ids={[8]} dayIds={[6, 7]} />
      </GlobalProvider>,
    );
    const { store } = render;
    dispatchSetValue(store, NODE_STORE, 'nodes', nodeData);
    act(() => {
      userEvent.click(screen.queryAllByTestId('popperButton')[0].childNodes[0]);
    });
    expect(screen.getByText(/Select Destination/i)).toBeInTheDocument();
    expect(screen.getByText(/tab/i)).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.queryAllByTestId('tabSelectMC')[0].childNodes[0]);
    });
    expect(screen.getByPlaceholderText(/Enter tab/i)).toBeInTheDocument();
  });
  it('Select tab in timeline should not call scroller', () => {
    const render = renderWithRedux(
      <GlobalProvider>
        <CopyMove
          {...props}
          parentId={3}
          ids={[1, 2]}
          dayIds={[6, 7]}
          simpleMenu
        />
      </GlobalProvider>,
    );
    const { store } = render;
    dispatchSetValue(store, NODE_STORE, 'nodes', nodeData);
    act(() => {
      userEvent.click(screen.queryAllByTestId('popperButton')[0].childNodes[0]);
    });
    act(() => {
      userEvent.click(screen.queryAllByTestId('tabSelectMC')[0].childNodes[0]);
    });
    expect(screen.getByPlaceholderText(/Enter tab/i)).toBeInTheDocument();
    expect(screen.getByText(/Tab 1/i)).toBeInTheDocument();
    userEvent.click(screen.queryByText('Tab 1'));
    act(() => {
      userEvent.click(screen.queryAllByTestId('test-submit')[0].childNodes[0]);
    });
    expect(resaga.dispatchTo).toBeCalled();
    expect(resaga.setValue).toBeCalled();
  });
  it.skip('Select day process', () => {
    const render = renderWithRedux(
      <GlobalProvider>
        <CopyMove
          {...props}
          parentId={6}
          ids={[1]}
          dayIds={[6, 7]}
          simpleMenu
        />
      </GlobalProvider>,
    );
    const { store } = render;
    dispatchSetValue(store, NODE_STORE, 'nodes', nodeData);
    act(() => {
      userEvent.click(screen.queryAllByTestId('popperButton')[0].childNodes[0]);
    });
    act(() => {
      userEvent.click(screen.queryAllByTestId('daySelectMC')[0].childNodes[0]);
    });
    expect(screen.getByText(/Day 1/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Day 1/i));

    act(() => {
      userEvent.click(screen.queryAllByTestId('daySelectMC')[0].childNodes[0]);
    });
    expect(screen.getByText(/Day 2/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Day 2/i));
  });
});
