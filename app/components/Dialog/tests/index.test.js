import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { useImmer } from 'use-immer';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import stylesheet from '../styles';
import { UGDialog } from '../index';
import { renderWithReduxWithRouter } from '../../../utils/testUtility';
import { GlobalProvider } from '../../../containers/App/globalContext';

const mockStyle = mockStylesheet('UGDialog', stylesheet);

describe('UGDialog Component', () => {
  it('should render something', () => {
    const wrapper = shallow(
      <UGDialog classes={mockStyle}>Something!</UGDialog>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('UGDialog Component', () => {
  it('should render something', async () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useImmer({
        IntercomContext: {
          hideIntercomButton: false,
        },
      });
      return { state, dispatch };
    });

    const { rerenderWithReduxWithRouter } = renderWithReduxWithRouter(
      <GlobalProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <UGDialog classes={mockStyle} open smDown>
          Something!
        </UGDialog>
      </GlobalProvider>,
      {},
    );
    expect(result.current.state.IntercomContext.hideIntercomButton).toBe(true);
    rerenderWithReduxWithRouter(
      <GlobalProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <UGDialog classes={mockStyle} open={false} smDown>
          Something!
        </UGDialog>
      </GlobalProvider>,
    );
    fireEvent.mouseDown(document);
  });
});
