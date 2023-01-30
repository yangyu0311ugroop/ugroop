import { renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import momentjs from 'moment';
import configureStore from '../../../../../../../../../../../../../../configureStore';
import {
  dispatchSetValue,
  reduxEnhancer,
  renderWithReduxWithRouter,
  SizeWrapper,
} from '../../../../../../../../../../../../../../utils/testUtility';
import { GlobalProvider } from '../../../../../../../../../../../../../App/globalContext';
import TemplateAPI from '../../../../../../../../../../../../../../apis/components/Template';
import NodeAPI from '../../../../../../../../../../../../../../apis/components/Node';
import ContributorList from '../index';
import {
  ABILITY_DATA_STORE,
  COGNITO_ACCOUNTSTORE,
  INVITATION_STORE,
  NODE_STORE,
  ORGANISATION_DATA_STORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from '../../../../../../../../../../../../../../appConstants';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from '../../../../../../../../../../../../../../apis/components/Ability/roles';
import TemplateTourConnection from '../../../../../../../../../../../../Modals/TourConnection';
import { ability } from '../../../../../../../../../../../../../../apis/components/Ability/ability';

const componentSetupWithData = (initialData, props) => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer(initialData);
    return { state, dispatch };
  });

  const twoMonthsAgo = momentjs(new Date())
    .subtract(2, 'month')
    .hour(0)
    .minute(0)
    .second(0);

  const s = configureStore({}, {}, [reduxEnhancer(result.current)]);
  const { store, history } = renderWithReduxWithRouter(
    <GlobalProvider store={result.current}>
      <TemplateAPI />
      <NodeAPI />
      <SizeWrapper>
        <ContributorList templateId={props.templateId} />
      </SizeWrapper>
      <TemplateTourConnection />
    </GlobalProvider>,
    { store: s },
  );
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'roles', {
    298: {
      activated: [14, 99, 4, 23, 99, 383, 285, 412, 9],
    },
    2: {
      activated: [4, 5, 6],
    },
  });
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'members', {
    4: {
      role: 'admin',
      knownAs: 'YY',
    },
    9: {
      role: 'owner',
      knownAs: 'KC',
    },
    14: {
      role: 'admin',
      knownAs: 'SK',
    },
    23: {
      role: 'admin',
      knownAs: 'DL',
    },
    99: {
      role: 'admin',
      knownAs: 'QD',
    },
    285: {
      role: 'admin',
      knownAs: 'PV',
    },
    383: {
      role: 'admin',
      knownAs: 'JA',
    },
    412: {
      role: 'member',
      knownAs: 'KT',
    },
  });
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 4,
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
  dispatchSetValue(store, ABILITY_DATA_STORE, 'tours');
  dispatchSetValue(store, INVITATION_STORE, 'userNodeIds', [
    1042,
    1043,
    1044,
    1045,
  ]);

  dispatchSetValue(store, INVITATION_STORE, 'userNodes', {
    1045: {
      nodeId: 28652,
      userId: 99,
      userNodeId: null,
      shareFrom: 99,
      role: 'tour_organizer',
      userRole: null,
      id: 1045,
      createdAt: twoMonthsAgo, // '2020-10-29T01:46:39.029Z',
      updatedAt: '2020-10-29T01:46:39.029Z',
      userNodes: [],
    },
  });
  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'shareList.filter',
    'All Contributors',
  );
  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'filterRoleBy',
    TOUR_CONTRIBUTOR_ROLE_TYPES,
  );
  return { store, history, result };
};

test('Contributor Lists', async () => {
  const { store } = componentSetupWithData(
    {
      API: {},
      BillingContext: {
        org: {
          orgMembers: [
            {
              userId: 4,
              email: 'yuy0311@gmail.com',
            },
            {
              userId: 23,
              email: 'danlazojr@yahoo.com',
            },
            {
              userId: 99,
              email: 'jcmpscn+oct181@gmail.com',
            },
            {
              userId: 383,
              email: 'johnseraficougroop+100@gmail.com',
            },
            {
              userId: 14,
              email: 'sk-500@sk.com',
            },
            {
              userId: 412,
              email: 'keren.culalic+1234@gmail.com',
            },
            {
              userId: 285,
              email: 'perryv+latest.kong.01@gmail.com',
            },
            {
              userId: 9,
              email: 'keren.culalic@ugroop.com',
            },
          ],
          deactivatedMembers: [
            {
              userId: 129,
              orgId: 298,
              status: 'confirmed',
              role: 'admin',
              activated: false,
              rootNodeId: 0,
              id: 351,
              createdAt: '2019-09-04T01:55:51.420Z',
              updatedAt: '2021-07-14T11:24:22.241Z',
              firstName: 'Mark',
              lastName: 'Evans',
              fullName: 'Mark Evans',
              knownAs: 'Mark Evans',
              email: 'alex.babauskis+2@gmail.com',
              invitationToken: 'vykuXigKuvHswAR38He2BsOOxPqCc4QL',
              photo: {
                type: 'person',
                url:
                  'FileContainers/com.ugroop.personContainer/download/be0e0777-d985-442b-b999-d66a250baef3.jpeg',
                x: '0.06895280235988199',
                y: '0.05342258195188826',
                w: null,
                h: null,
                width: '0.8849557522123894',
                height: '0.6637168141592921',
                scale: '1.13',
                rotate: '0',
                id: 55,
                personId: 129,
                passportId: null,
                documentId: null,
              },
              hasPersonDetail: true,
              personId: 129,
            },
            {
              userId: 205,
              orgId: 298,
              status: 'confirmed',
              role: 'member',
              activated: false,
              rootNodeId: 0,
              id: 494,
              createdAt: '2020-09-18T12:14:02.564Z',
              updatedAt: '2021-07-08T06:56:29.486Z',
              firstName: 'Yang',
              lastName: 'Yu',
              fullName: 'Yang Yu',
              knownAs: 'MyLordMyGod',
              email: 'yuy0311+02@gmail.com',
              invitationToken: 'B82CIagFGCh8tUHhHfn276KNrP5cEJap',
              photo: '',
              hasPersonDetail: true,
              personId: 205,
            },
            {
              userId: 17,
              orgId: 298,
              status: 'confirmed',
              role: 'member',
              activated: false,
              rootNodeId: 0,
              id: 316,
              createdAt: '2019-07-11T05:06:39.545Z',
              updatedAt: '2019-11-27T00:54:44.527Z',
              firstName: 'Edil',
              lastName: 'Salvador',
              fullName: 'Edil Salvador',
              knownAs: 'Edil Salvador',
              email: 'edil.salvador@ugroop.com.au',
              invitationToken: 'KEATGzHWQ2REVgRtyVLAXtNnQiSIGTqE',
              hasPersonDetail: false,
              personId: 17,
            },
            {
              userId: 271,
              orgId: 298,
              status: 'confirmed',
              role: 'member',
              activated: false,
              rootNodeId: 0,
              id: 315,
              createdAt: '2019-07-11T05:06:32.703Z',
              updatedAt: '2020-09-16T06:54:08.518Z',
              firstName: 'Elijah Tristan',
              lastName: 'Pekson',
              fullName: 'Elijah Tristan Pekson',
              knownAs: 'Elijah Pekson',
              email: 'etrpekson99+3000@gmail.com',
              invitationToken: 'bIqN8jD1DpQcUnYpBgfuuIglktFycO3B',
              hasPersonDetail: true,
              personId: 273,
            },
            {
              userId: 113,
              orgId: 298,
              status: 'confirmed',
              role: 'member',
              activated: false,
              rootNodeId: 0,
              id: 314,
              createdAt: '2019-07-11T05:05:42.211Z',
              updatedAt: '2021-07-15T02:09:01.123Z',
              firstName: 'Paul Cedrick',
              lastName: 'Artigo',
              fullName: 'Paul Cedrick Artigo',
              knownAs: 'PC',
              email: 'paulcedrick.artigo+8@gmail.com',
              invitationToken: '8BRmzwH5xMjjPldbfQBIKUZq8u4lCkAs',
              hasPersonDetail: true,
              personId: 113,
            },
            {
              userId: 337,
              orgId: 298,
              status: 'confirmed',
              role: 'member',
              activated: false,
              rootNodeId: 0,
              id: 354,
              createdAt: '2019-09-18T07:21:52.798Z',
              updatedAt: '2020-08-17T01:59:52.120Z',
              firstName: 'Khaye',
              lastName: 'Eighteen',
              fullName: 'Khaye Eighteen',
              knownAs: 'Khaye Eighteen',
              email: 'keren.culalic+1809@gmail.com',
              invitationToken: 'CuxSpqejT1400Uk8F3XJp2NVrxo5Tmqr',
              photo: '',
              hasPersonDetail: true,
              personId: 401,
            },
          ],
        },
        tourConnectedPeople: [
          {
            nodeId: 28652,
            userId: 23,
            userNodeId: null,
            shareFrom: 23,
            role: 'tour_organizer',
            userRole: 'gfhjghfj',
            id: 1042,
            createdAt: '2020-10-28T04:58:55.451Z',
            updatedAt: '2021-07-13T04:17:55.757Z',
            userNodes: [],
            email: 'danlazojr@yahoo.com',
          },
          {
            nodeId: 28652,
            userId: 115,
            userNodeId: null,
            shareFrom: 115,
            role: 'tour_organizer',
            userRole: 'ghjgfhj',
            id: 1043,
            createdAt: '2020-10-29T00:35:13.639Z',
            updatedAt: '2021-07-13T04:17:58.317Z',
            userNodes: [],
            email: 'alex.babauskis+1@gmail.com',
          },
          {
            nodeId: 28652,
            userId: 113,
            userNodeId: null,
            shareFrom: 113,
            role: 'tour_organizer',
            userRole: null,
            id: 1044,
            createdAt: '2020-10-29T00:56:05.196Z',
            updatedAt: '2020-10-29T00:56:05.196Z',
            userNodes: [],
            email: 'paulcedrick.artigo+8@gmail.com',
          },
          {
            nodeId: 28652,
            userId: 99,
            userNodeId: null,
            shareFrom: 99,
            role: 'tour_organizer',
            userRole: null,
            id: 1045,
            createdAt: '2020-10-29T01:46:39.029Z',
            updatedAt: '2020-10-29T01:46:39.029Z',
            userNodes: [],
            email: 'jcmpscn+oct181@gmail.com',
          },
          {
            nodeId: 28652,
            userId: 4,
            userNodeId: null,
            shareFrom: 4,
            role: 'tour_organizer',
            userRole: null,
            id: 1048,
            createdAt: '2020-10-29T05:36:28.202Z',
            updatedAt: '2020-10-29T05:36:28.202Z',
            userNodes: [],
            email: 'yuy0311@gmail.com',
          },
          {
            nodeId: 28652,
            userId: 422,
            userNodeId: null,
            shareFrom: 23,
            role: 'tour_participant',
            userRole: null,
            id: 1049,
            createdAt: '2020-11-09T03:11:17.934Z',
            updatedAt: '2020-11-09T03:11:17.934Z',
            userNodes: [
              {
                nodeId: 29009,
                userId: 422,
                userNodeId: 1049,
                shareFrom: 23,
                role: 'participant_linkee',
                userRole: null,
                id: 1050,
                createdAt: '2020-11-09T03:11:17.937Z',
                updatedAt: '2020-11-09T03:11:17.937Z',
              },
            ],
            email: 'dvlazojr+11202003@gmail.com',
          },
          {
            nodeId: 28652,
            userId: 129,
            userNodeId: null,
            shareFrom: 4,
            role: 'tour_organizer',
            userRole: null,
            id: 1080,
            createdAt: '2021-07-06T06:21:11.374Z',
            updatedAt: '2021-07-06T06:21:11.374Z',
            userNodes: [],
            email: 'alex.babauskis+2@gmail.com',
          },
          {
            nodeId: 28652,
            userId: 14,
            userNodeId: null,
            shareFrom: 4,
            role: 'tour_organizer',
            userRole: null,
            id: 1110,
            createdAt: '2021-07-13T13:05:43.034Z',
            updatedAt: '2021-07-13T13:05:43.034Z',
            userNodes: [],
            email: 'sk-500@sk.com',
          },
          {
            nodeId: 28652,
            userId: 383,
            userNodeId: null,
            shareFrom: 4,
            role: 'tour_organizer',
            userRole: null,
            id: 1111,
            createdAt: '2021-07-13T13:05:47.327Z',
            updatedAt: '2021-07-13T13:05:47.327Z',
            userNodes: [],
            email: 'johnseraficougroop+100@gmail.com',
          },
          {
            nodeId: 28652,
            userId: 285,
            userNodeId: null,
            shareFrom: 4,
            role: 'tour_organizer',
            userRole: null,
            id: 1112,
            createdAt: '2021-07-13T13:05:52.055Z',
            updatedAt: '2021-07-13T13:05:52.055Z',
            userNodes: [],
            email: 'perryv+latest.kong.01@gmail.com',
          },
          {
            role: 'tour_organizer',
            email: 'danlazojr@yahoo.com',
            token: '5188a9e6-791f-4ab5-a8fc-4fef3107f82b',
            status: 'confirmed',
          },
          {
            role: 'tour_organizer',
            email: 'alex.babauskis+1@gmail.com',
            token: '9e497899-4fe2-4624-b503-c4112deb3577',
            status: 'confirmed',
          },
          {
            role: 'tour_organizer',
            email: 'paulcedrick.artigo+8@gmail.com',
            token: '78c5424e-1a00-4bbf-8fe2-c8fb1f235b69',
            status: 'confirmed',
          },
          {
            role: 'tour_organizer',
            email: 'johnseraficougroop+130@gmail.com',
            token: '8llw6emqyZArdvdfDZ5zUY5a0BY28obG',
            status: 'pending',
          },
          {
            role: 'tour_organizer',
            email: 'jcmpscn+oct181@gmail.com',
            token: '4b3faa5e-45b0-492f-8cae-f107788a3926',
            status: 'confirmed',
          },
          {
            role: 'tour_organizer',
            email: 'yuy0311@gmail.com',
            token: '09c3b181-fdb5-4905-90e8-4bd2d07ad611',
            status: 'confirmed',
          },
          {
            role: 'tour_participant',
            email: 'dvlazojr+11202003@gmail.com',
            token: 'NhDdop9sDHE9B1Y1l3vFn7R7BaFziKJx',
            status: 'confirmed',
          },
          {
            role: 'tour_participant',
            email: 'alex.babauskis+2@gmail.com',
            token: 'N6nd0PgznHZF7J8QxmhO3N5QEjtlVOzv',
            status: 'pending',
          },
        ],
      },
      IntercomContext: {
        hideIntercomButton: false,
      },
    },
    { templateId: 33764 },
  );
  await waitFor(() => {
    expect(screen.queryByText('User 1')).toBeInTheDocument();
    expect(screen.queryByText('Owner')).toBeInTheDocument();
    expect(screen.queryByText('danlazojr@yahoo.com')).toBeInTheDocument();
    expect(screen.queryByTestId('acceptedTourRole23')).toHaveTextContent(
      'Organiser',
    );
    expect(screen.queryByTestId('orgRole23')).toHaveTextContent('Admin');
    expect(
      screen.queryByText('alex.babauskis+1@gmail.com'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('paulcedrick.artigo+8@gmail.com'),
    ).toBeInTheDocument();
    expect(screen.queryByText('jcmpscn+oct181@gmail.com')).toBeInTheDocument();
    expect(screen.queryByTestId('orgRole99')).toHaveTextContent('Admin');
    expect(screen.queryByTestId('acceptedTourRole99')).toHaveTextContent(
      'Organiser',
    );
    expect(screen.queryByText('yuy0311@gmail.com')).toBeInTheDocument();
    expect(screen.queryByTestId('orgRole4')).toHaveTextContent('Admin');
    expect(screen.queryByTestId('acceptedTourRole4')).toHaveTextContent(
      'Organiser',
    );
    expect(
      screen.queryByText('alex.babauskis+2@gmail.com'),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('deactivated129')).toHaveTextContent(
      'Organisation Role:Deactivated',
    );
  });
  const seeDetailButton99 = screen.queryByTestId('seeDetail99').children[0];
  userEvent.click(seeDetailButton99);
  await waitFor(() => {
    expect(screen.queryByTestId('tourConnectionUserName')).toBeInTheDocument();
    expect(screen.queryByTestId('tourConnectionUserName')).toHaveTextContent(
      'User 99',
    );
    expect(screen.queryByText(', joined')).toBeInTheDocument();
    expect(screen.queryByText('2 months ago')).toBeInTheDocument();
    expect(screen.queryByTestId('JDialogCloseButton')).toBeInTheDocument();
    userEvent.click(screen.queryByTestId('JDialogCloseButton'));
  });
  const tour = [
    {
      actions: 'execute',
      subject: [
        'nodeshares',
        'hashkey',
        'link',
        'day',
        'event',
        'activity',
        'feedback',
        'checklist',
        'checkitem',
        'participant',
        'templatesetting',
        'interestedperson',
        'route',
        'photo',
        'tabtimeline',
        'tabgallery',
        'tabother',
        'risk',
        'hazard',
        'room',
        'emailEvents',
        'chat',
      ],
    },
  ];
  ability.update([...tour]);
  // switch to edit mode
  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'updatingTourInfo',
    true,
  );
  // can add more tests but it's beyond what i did, so just check the accept value is not there.
  expect(screen.queryByTestId('acceptedTourRole4')).not.toBeInTheDocument();
});
