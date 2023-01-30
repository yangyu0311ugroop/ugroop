import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateTourEmail } from '../createTourEmail';
import {
  dispatchSetValue,
  renderWithRedux,
} from '../../../../../utils/testUtility';
import Template from '../../../../../apis/components/Template';
import {
  EMAIL_ME_EVENT_ADDRESS,
  LIST_TEMPLATE_CUSTOM_DATA,
  PATCH_TEMPLATE_CUSTOM_DATA,
} from '../../../../../apis/constants';
import { sleep } from '../../../../../utils/timeUtility';
jest.mock('react-copy-to-clipboard', () => ({
  // eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  CopyToClipboard: props => <div onClick={props.onCopy}>{props.children}</div>,
}));

test('CreateTourEmail shall display loading screen', async () => {
  const mockedResaga = {
    dispatchTo: jest.fn(),
  };
  // eslint-disable-next-line no-unused-vars
  mockedResaga.dispatchTo.mockImplementation((api, func, data) => {});
  renderWithRedux(
    <>
      <CreateTourEmail resaga={mockedResaga} templateId={1} />
      <Template />
    </>,
  );
  const loading = screen.queryByTestId('content-loading');
  expect(loading).toBeInTheDocument();
});
test('CreateTourEmail shall have correct email address', async () => {
  const mockedResaga = {
    dispatchTo: jest.fn(),
  };
  mockedResaga.dispatchTo.mockImplementation((api, func, data) => {
    data.onSuccess({
      templateCustomData: [
        {
          email: 'a@a.com',
        },
      ],
    });
  });
  renderWithRedux(
    <>
      <CreateTourEmail resaga={mockedResaga} templateId={1} />
      <Template />
    </>,
  );
  await waitFor(() => {
    screen.queryByText('textbox', { value: 'a@a.com' });
    const emailField = screen.queryByTestId('emailTextField');
    expect(emailField).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { value: 'a@a.com' }),
    ).toBeInTheDocument();
  });
});
test('CreateTourEmail shall generate email', async () => {
  const mockedResaga = {
    dispatchTo: jest.fn(),
  };
  mockedResaga.dispatchTo.mockImplementation((api, func, data) => {
    if (func === LIST_TEMPLATE_CUSTOM_DATA) {
      data.onSuccess({
        templateCustomData: [
          {
            email: null,
          },
        ],
      });
    } else if (func === PATCH_TEMPLATE_CUSTOM_DATA) {
      data.onSuccess({
        email: 'b@b.com',
      });
    }
  });
  renderWithRedux(
    <>
      <CreateTourEmail resaga={mockedResaga} templateId={1} />
      <Template />
    </>,
  );
  await waitFor(() => {
    screen.getByRole('textbox', { value: 'b@b.com' });
    const textbox = screen.getByRole('textbox', { value: 'b@b.com' });
    const emailField = screen.queryByTestId('emailTextField');
    expect(emailField).toBeInTheDocument();
    expect(textbox).toBeInTheDocument();
  });
});
test('generate new email address', async () => {
  const mockedResaga = {
    dispatchTo: jest.fn(),
  };
  mockedResaga.dispatchTo.mockImplementation((api, func, data) => {
    if (func === LIST_TEMPLATE_CUSTOM_DATA) {
      data.onSuccess({
        templateCustomData: [
          {
            email: 'b@b.com',
          },
        ],
      });
    } else if (func === PATCH_TEMPLATE_CUSTOM_DATA) {
      data.onSuccess({
        email: 'c@c.com',
      });
    }
  });
  renderWithRedux(
    <>
      <CreateTourEmail resaga={mockedResaga} templateId={1} />
      <Template />
    </>,
  );
  const textbox = screen.getByRole('textbox', { value: 'b@b.com' });
  await waitFor(() => {
    expect(textbox).toBeInTheDocument();
  });
  const button = screen.getByRole('button', {
    name: 'Generate a new email address',
  });
  userEvent.click(button);

  const textbox2 = screen.getByRole('textbox', { value: 'c@c.com' });
  expect(textbox2).toBeInTheDocument();
  const copyButton = screen.getByRole('button', {
    name: 'Copy Email',
  });
  expect(copyButton).toBeInTheDocument();
  userEvent.click(copyButton);
  expect(screen.queryByText('copied')).toBeInTheDocument();
});
test('Click send new email address', async () => {
  const mockedResaga = {
    dispatchTo: jest.fn(),
  };
  mockedResaga.dispatchTo.mockImplementation((api, func, data) => {
    if (func === LIST_TEMPLATE_CUSTOM_DATA) {
      data.onSuccess({
        templateCustomData: [
          {
            email: 'b@b.com',
          },
        ],
      });
    } else if (func === EMAIL_ME_EVENT_ADDRESS) {
      expect(data.payload.id).toBe(1);
      expect(data.payload.data.contentType).toBe('sendEventEmailSetting');
      expect(data.payload.data.content.userName).toBe('Yang Yu');
      expect(data.payload.data.content.nodeId).toBe(1);
      expect(data.payload.data.content.content).toBe('aa');
      expect(data.payload.data.content.eventEmailAddress).toBe('b@b.com');
      setTimeout(() => {
        data.onSuccess();
      }, 20);
    }
  });
  const { store } = renderWithRedux(
    <>
      <CreateTourEmail resaga={mockedResaga} templateId={1} templateName="aa" />
      <Template />
    </>,
  );
  dispatchSetValue(store, 'cognitoAcctStore', 'person', {
    id: 11,
    firstName: 'Yang',
    lastName: 'Yu',
    knownAs: 'Yang Yu',
    email: 'yuy0311+02042020@gmail.com',
    secondaryEmail: '',
    gender: 'unknown',
  });
  const textbox = screen.getByRole('textbox', { value: 'b@b.com' });
  await waitFor(() => {
    expect(textbox).toBeInTheDocument();
  });
  const button = screen.getByRole('button', {
    name: 'Email me this address',
  });
  expect(button).toBeInTheDocument();
  userEvent.click(button);
  expect(screen.getByTestId('sendingEmailLoading')).toBeInTheDocument();
  await sleep(50);
  expect(screen.queryByTestId('sendingEmailLoading')).not.toBeInTheDocument();
});
