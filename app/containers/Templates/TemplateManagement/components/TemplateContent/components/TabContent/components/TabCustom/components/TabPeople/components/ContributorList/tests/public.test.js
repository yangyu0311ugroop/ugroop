import { renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import configureStore from '../../../../../../../../../../../../../../configureStore';
import {
  dispatchSetValue,
  reduxEnhancer,
  renderWithReduxWithRouter,
} from '../../../../../../../../../../../../../../utils/testUtility';
import { GlobalProvider } from '../../../../../../../../../../../../../App/globalContext';
import TemplateAPI from '../../../../../../../../../../../../../../apis/components/Template';
import NodeAPI from '../../../../../../../../../../../../../../apis/components/Node';
import ContributorPublicList from '../public';
import {
  COGNITO_ACCOUNTSTORE,
  INVITATION_STORE,
  NODE_STORE,
  ORGANISATION_DATA_STORE,
} from '../../../../../../../../../../../../../../appConstants';

const componentSetupWithData = (initialData, props) => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer(initialData);
    return { state, dispatch };
  });
  const s = configureStore({}, {}, [reduxEnhancer(result.current)]);
  const { store, history } = renderWithReduxWithRouter(
    <GlobalProvider store={result.current}>
      <TemplateAPI />
      <NodeAPI />
      <ContributorPublicList templateId={props.templateId} />
    </GlobalProvider>,
    { store: s },
  );
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'roles', {
    1: {
      activated: [1, 2, 3],
    },
    2: {
      activated: [4, 5, 6],
    },
  });
  dispatchSetValue(store, INVITATION_STORE, 'userNodeIds', [
    1312,
    1313,
    1314,
    1315,
    1316,
  ]);
  dispatchSetValue(store, INVITATION_STORE, 'userNodes', {
    1312: {
      nodeId: 33764,
      userId: 115,
      userNodeId: null,
      shareFrom: 115,
      role: 'tour_organizer',
      userRole: null,
      id: 1312,
      createdAt: '2021-04-29T04:59:45.280Z',
      updatedAt: '2021-04-29T04:59:45.280Z',
      userNodes: [],
    },
    1313: {
      nodeId: 33764,
      userId: 4,
      userNodeId: null,
      shareFrom: 4,
      role: 'tour_organizer',
      userRole: null,
      id: 1313,
      createdAt: '2021-04-29T05:01:08.295Z',
      updatedAt: '2021-04-29T05:01:08.295Z',
      userNodes: [],
    },
    1314: {
      nodeId: 33764,
      userId: 23,
      userNodeId: null,
      shareFrom: 23,
      role: 'tour_organizer',
      userRole: null,
      id: 1314,
      createdAt: '2021-04-29T08:55:05.449Z',
      updatedAt: '2021-04-29T08:55:05.449Z',
      userNodes: [],
    },
    1315: {
      nodeId: 33764,
      userId: 383,
      userNodeId: null,
      shareFrom: 383,
      role: 'tour_organizer',
      userRole: null,
      id: 1315,
      createdAt: '2021-04-30T01:09:29.778Z',
      updatedAt: '2021-04-30T01:09:29.778Z',
      userNodes: [],
    },
    1316: {
      nodeId: 33764,
      userId: 99,
      userNodeId: null,
      shareFrom: 99,
      role: 'tour_organizer',
      userRole: null,
      id: 1316,
      createdAt: '2021-04-30T01:33:14.362Z',
      updatedAt: '2021-04-30T01:33:14.362Z',
      userNodes: [],
    },
  });

  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'members', {
    1: {
      role: 'admin',
    },
  });
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    33764: {
      content: 'sample tour',
      customData: {
        organisationId: 298,
      },
      createdBy: 1,
    },
    2: {
      content: 'sample tour2',
      customData: {
        organisationId: 2,
      },
    },
  });
  return { store, history, result };
};
test('Contributor Public', async () => {
  componentSetupWithData(null, { templateId: 33764 });
  await waitFor(() => {
    expect(screen.queryByText('User 1')).toBeInTheDocument();
    expect(screen.queryByText('Owner')).toBeInTheDocument();
    expect(screen.queryByText('User 115')).toBeInTheDocument();
    expect(screen.queryByText('User 4')).toBeInTheDocument();
    expect(screen.queryByText('User 23')).toBeInTheDocument();
    expect(screen.queryByText('User 99')).toBeInTheDocument();
    expect(screen.queryByText('User 383')).toBeInTheDocument();
  });
});
