import { DO_NOTHING, URL_HELPERS } from 'appConstants';
import { FOLDER_NAME } from 'containers/Templates/constants';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';

import { TemplateActionButtons } from '../index';
import { ability } from '../../../../../../../../apis/components/Ability/ability';
import { TEST_HELPERS } from '../../../../../../../../utils/helpers/testHelpers';

describe('TemplateActionButtons', () => {
  let mockResaga;
  let renderedComponent;
  let instance;
  const mockTemplateId = 1;

  const folderTransactionMock = {
    onCreate: jest.fn(),
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    onBatchDelete: jest.fn(),
    onMoveConfirm: jest.fn(),
    onCopyConfirm: jest.fn(),
    onEnableEditMode: jest.fn(),
    onEditCancel: jest.fn(),
  };

  const history = {
    push: jest.fn(),
  };
  beforeEach(() => {
    SnackbarHelper.openErrorSnackbar = jest.fn();
    mockResaga = {
      analyse: jest.fn(),
      dispatchTo: jest.fn(),
      dispatch: jest.fn(),
      isLoading: jest.fn(),
      setValue: jest.fn(),
    };
    renderedComponent = shallow(
      <TemplateActionButtons
        templateId={mockTemplateId}
        resaga={mockResaga}
        showMoreActions
        classes={{}}
        history={history}
      />,
    );
    instance = renderedComponent.instance();
    jest.clearAllMocks();

    // override setTimeout to call immediately
    global.setTimeout = jest.fn(cb => cb());
    global.clearTimeout = jest.fn();
  });
  it('should render TemplateActionButtonList', () => {
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('onSuccessRoute()', () => {
    it('onSuccessRoute push history', () => {
      instance = renderedComponent.instance();
      instance.onSuccessRoute();
      expect(history.push).toBeCalled();
    });
  });

  describe('onClickDelete', () => {
    it('should set state of isDeleteDialogOpen to true', () => {
      const expected = true;
      instance.onClickDelete();
      expect(renderedComponent.state().isDeleteDialogOpen).toBe(expected);
    });
  });

  describe('onDeleteConfirmed', () => {
    it('should call dispatch', () => {
      const component = renderedComponent.instance();
      component.onDeleteConfirmed();
      expect(mockResaga.dispatchTo).toBeCalled();
    });
  });

  describe('onCloneSuccess', () => {
    it('should call optionOpen and loading', () => {
      renderedComponent.setState({
        optionOpen: true,
        loading: false,
      });
      instance.onCloneSuccess();
      expect(renderedComponent.state().optionOpen).toBe(true);
      expect(renderedComponent.state().loading).toBe(false);
    });
  });

  describe('onCloseCloneOption', () => {
    it('should call optionOpen and loading if true', () => {
      renderedComponent.setState({
        optionOpen: false,
        includeCheckList: false,
        optionRedirect: false,
      });
      renderedComponent.setState({
        loading: true,
      });
      instance.onCloseCloneOption();
      instance = renderedComponent.instance();
      expect(renderedComponent.state().loading).toBe(true);
      expect(renderedComponent.state().optionOpen).toBe(false);
      expect(renderedComponent.state().includeCheckList).toBe(false);
      expect(renderedComponent.state().optionRedirect).toBe(false);
    });

    it('should call optionOpen and loading if false', () => {
      renderedComponent.setState({
        loading: false,
      });
      instance.onCloseCloneOption();
      instance = renderedComponent.instance();
      expect(renderedComponent.state().loading).toBe(false);
      expect(renderedComponent.state().optionOpen).toBe(false);
      expect(renderedComponent.state().includeCheckList).toBe(false);
      expect(renderedComponent.state().optionRedirect).toBe(false);
    });
  });

  describe('onCancelDeleteDialog', () => {
    it('should set state of isDeleteDialogOpen to false', () => {
      renderedComponent.setState({
        isDeleteDialogOpen: true,
      });
      instance.onCancelDeleteDialog();
      expect(renderedComponent.state().isDeleteDialogOpen).toBe(false);
    });
  });

  describe('onClickShare', () => {
    it('should call setValue', () => {
      renderedComponent.setProps({ templateId: 99 });
      const component = renderedComponent.instance();
      component.onClickShare();
      expect(mockResaga.setValue).toHaveBeenCalledWith({ shareDialog: true });
    });
  });

  describe('onClickParticipants', () => {
    it('should call setValue', () => {
      renderedComponent.setProps({ templateId: 99 });
      const component = renderedComponent.instance();
      component.onClickParticipants();
      expect(mockResaga.setValue).toHaveBeenCalledWith({
        participantListViewOpen: true,
      });
    });
  });

  describe('onClickFollowers', () => {
    it('should call setValue', () => {
      renderedComponent.setProps({ templateId: 99 });
      const component = renderedComponent.instance();
      component.onClickFollowers();
      expect(mockResaga.setValue).toHaveBeenCalledWith({
        interestedListViewOpen: true,
      });
    });
  });

  describe('onClickAddChecklist', () => {
    it('should call setValue', () => {
      renderedComponent.setProps({ templateId: 999 });
      const component = renderedComponent.instance();

      component.onClickAddChecklist();

      expect(mockResaga.setValue).toHaveBeenCalledWith({
        addChecklistParentId: 999,
      });
    });
  });

  describe('onClickClone', () => {
    it('optionOpen should open', () => {
      renderedComponent.setProps({ templateId: 99 });
      const component = renderedComponent.instance();
      component.onClickClone();
      expect(renderedComponent.state().optionOpen).toBe(true);
    });
  });
  describe('onConfirmOption', () => {
    it('onConfirmOption if true', () => {
      const component = renderedComponent.instance();
      component.setState({ optionRedirect: true });
      component.onConfirmOption();
      expect(global.setTimeout).toBeCalled();
      // expect(mockResaga.dispatchTo).toBeCalled();
    });
    it('onConfirmOption if false', () => {
      const component = renderedComponent.instance();
      component.setState({ optionRedirect: false });
      component.onConfirmOption();
      expect(mockResaga.dispatchTo).toBeCalled();
    });
  });

  describe('onCloneSuccessMethod', () => {
    it('should call onCloneSuccessMethod', () => {
      const component = renderedComponent.instance();
      component.setState({
        cloneId: 1,
      });
      component.onCloneSuccessMethod({
        cloneId: 1,
      });
    });
  });

  describe('onChangeCheck', () => {
    it('optionOpen should open', () => {
      const component = renderedComponent.instance();
      component.onChangeCheck();
      expect(renderedComponent.state().includeCheckList).toBe(true);
    });
  });

  describe('openComment', () => {
    it('should call resaga.setValue', () => {
      renderedComponent.setProps({ templateId: 99 });
      const inst = renderedComponent.instance();
      inst.openComment();

      expect(mockResaga.setValue).toBeCalled();
      expect(mockResaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('UnderConstruction', () => {
    it('onClickUnderConstruction', () => {
      instance.onClickUnderConstruction();
      expect(instance.state.featureDialog).toBe(true);
    });
    it('onCloseFeatureDialog', () => {
      instance.onCloseFeatureDialog();
      expect(instance.state.featureDialog).toBe(false);
    });
  });

  describe('handleError', () => {
    it('should call openErrorSnackbar helper if err.status is unauthorized', () => {
      instance.onCancelDeleteDialog = jest.fn();
      instance.handleError({
        status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
      });
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
      expect(instance.onCancelDeleteDialog).toBeCalled();
    });

    it('should call openErrorSnackbar helper if err.status is unauthorized', () => {
      instance.handleError({
        status: HTTP_STATUS_CODE.STATUS_SERVER_ERROR,
      });
      expect(SnackbarHelper.openErrorSnackbar).not.toBeCalled();
    });
  });

  describe('Error dialog ', () => {
    it('onCloseErrorDialog', () => {
      renderedComponent.state().errorMessage = 'Some error';
      instance = renderedComponent.instance();
      instance.onCloseErrorDialog();
      expect(instance.state.errorMessage).toBe('');
    });
  });

  describe('cloneTemplateSuccess', () => {
    it('should return false if !tourOwnerAbilities', () => {
      renderedComponent.setProps({ tourOwnerAbilities: [] });

      expect(instance.cloneTemplateSuccess({ id: 1, content: 'qqq' })).toBe(
        DO_NOTHING,
      );

      expect(mockResaga.setValue).not.toBeCalled();
    });

    it('should call setValue', () => {
      renderedComponent.setProps({ tourOwnerAbilities: [1, 2] });

      expect(instance.cloneTemplateSuccess({ id: 1, content: 'qqq' })).not.toBe(
        DO_NOTHING,
      );

      expect(mockResaga.setValue).toBeCalled();
      expect(mockResaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('cloneTemplateError ', () => {
    let testErr;

    it('should be called properly (1)', () => {
      testErr = {
        code: 'jsonerror',
        status: 404,
        response: { error: { message: 'Test message' } },
      };
      instance = renderedComponent.instance();
      instance.cloneTemplateError(testErr);
      expect(instance.state.errorMessage).toBe('HTTP 404: Test message');
    });

    it('should be called properly (2)', () => {
      testErr = {
        code: 'jsonerror',
        response: { error: { message: 'Test message' } },
      };
      instance = renderedComponent.instance();
      instance.cloneTemplateError(testErr);
      expect(instance.state.errorMessage).toBe('Test message');
    });
  });

  describe('openCopyLinkDialog', () => {
    it('should call openCopyLinkDialog properly', () => {
      const component = renderedComponent.instance();
      renderedComponent.setProps({ hashkey: 'abcd' });
      component.openCopyLinkDialog();
      expect(mockResaga.setValue).toBeCalledWith({ showCopyLinkDialog: true });
    });
    it('should call openCopyLinkDialog properly and dispatch post hashkey', () => {
      const component = renderedComponent.instance();
      component.openCopyLinkDialog();
      expect(mockResaga.setValue).toBeCalledWith({ showCopyLinkDialog: true });
    });
  });

  describe('Success Reroute ', () => {
    it('should reroute to organisation tours', () => {
      renderedComponent.setProps({
        rootNodeName: FOLDER_NAME.ORG_TOURS,
        trails: [1, 2],
        rootNodeOrgId: 1,
      });
      instance = renderedComponent.instance();
      instance.onSuccessReroute();
      expect(history.push).toBeCalledWith(
        `${URL_HELPERS.orgTours(1)}?current=1`,
      );
    });

    it('should reroute to my tours', () => {
      renderedComponent.setProps({
        rootNodeName: FOLDER_NAME.MY_TOURS,
        trails: [1, 2],
        organisationId: 1,
      });
      instance = renderedComponent.instance();
      instance.onSuccessReroute();
      expect(history.push).toBeCalledWith(`${URL_HELPERS.tours()}?current=1`);
    });

    it('should reroute to my tours', () => {
      renderedComponent.setProps({
        rootNodeName: FOLDER_NAME.SHARED_TOURS,
        trails: [1, 2],
        organisationId: 1,
      });
      instance = renderedComponent.instance();
      instance.onSuccessReroute();
      expect(history.push).toBeCalledWith(`${URL_HELPERS.sharedTours()}`);
    });
  });

  describe('onSuccessCloneReroute ', () => {
    it('should reroute to my tours if source is not organisation', () => {
      renderedComponent.setProps({
        rootNodeName: FOLDER_NAME.MY_TOURS,
        trails: [1, 2],
        rootNodeOrgId: 1,
      });
      instance = renderedComponent.instance();
      instance.onSuccessCloneReroute();
      expect(history.push).toBeCalledWith(`${URL_HELPERS.tours()}?current=1`);
    });

    it('should reroute to my tours without current query if source is shared tours', () => {
      renderedComponent.setProps({
        rootNodeName: FOLDER_NAME.SHARED_TOURS,
        trails: [1, 2],
        rootNodeOrgId: 1,
      });
      instance = renderedComponent.instance();
      instance.onSuccessCloneReroute();
      expect(history.push).toBeCalledWith(`${URL_HELPERS.tours()}`);
    });

    it('should reroute to organisation tours if source is organisation', () => {
      renderedComponent.setProps({
        rootNodeName: FOLDER_NAME.ORG_TOURS,
        trails: [1, 2],
        rootNodeOrgId: 2233,
      });
      renderedComponent.setProps({ organisationId: 2233 });

      instance = renderedComponent.instance();
      instance.onSuccessCloneReroute();
      expect(history.push).toBeCalledWith(
        `${URL_HELPERS.orgTours(2233)}?current=1`,
      );
    });
  });

  describe('onChangeEvents', () => {
    it('should switch includeEvents state', () => {
      instance.onChangeEvents();
      expect(renderedComponent.state().includeEvents).toBe(true);

      instance.onChangeEvents();
      expect(renderedComponent.state().includeEvents).toBe(false);
    });
  });

  describe('onChangeEventAttachments', () => {
    it('should switch includeEvents state', () => {
      instance.onChangeEventAttachments();
      expect(renderedComponent.state().includeEventAttachments).toBe(false);

      instance.onChangeEventAttachments();
      expect(renderedComponent.state().includeEventAttachments).toBe(true);
    });
  });
  describe('onDeleteSuccess', () => {
    it('should switch includeEvents state', () => {
      instance.onDeleteSuccess();
      expect(mockResaga.setValue).toBeCalled();
    });
  });
  describe('onFolderTreeReset', () => {
    it('should call setvalue', () => {
      instance.onFolderTreeReset();
      expect(mockResaga.setValue).toBeCalled();
    });
  });
  describe('onClickMove', () => {
    it('should call setvalue', () => {
      instance.onClickMove();
      expect(mockResaga.setValue).toBeCalled();
    });
  });
  describe('getOrgSuccess', () => {
    it('should call setvalue', () => {
      instance.getOrgSuccess({ preferenceData: { 1: { paxLabel: 1 } } });
      expect(mockResaga.setValue).toBeCalled();
    });
    it('should stll call setvalue', () => {
      instance.getOrgSuccess({});
      expect(mockResaga.setValue).toBeCalled();
    });
  });
  describe('fetchOrgDetails', () => {
    it('should call dispatchTo', () => {
      instance.fetchOrgDetails(1)();
      expect(mockResaga.dispatchTo).toBeCalled();
    });
  });
  describe('fetchOrgMembers', () => {
    it('should call dispatchTo', () => {
      renderedComponent.setProps({ organisationIds: [1] });
      instance.fetchOrgMembers(1)();
      expect(mockResaga.dispatchTo).toBeCalled();
    });
    it('should call dispatchTo', () => {
      renderedComponent.setProps({ organisationIds: [1] });
      instance.fetchOrgMembers(2)();
      expect(mockResaga.dispatchTo).not.toBeCalled();
    });
  });
  describe('fetchOrgInfo', () => {
    it('should return null', () => {
      renderedComponent.setProps({ id: 1, orgId: 444 });

      expect(instance.fetchOrgInfo({ id: 2233 })).toBe(null);
    });

    it('should dispatchTo', () => {
      renderedComponent.setProps({
        id: 1,
        rootNodeOrgId: 444,
        organisationIds: [999],
      });
      ability.can = jest.fn(() => true);

      instance.fetchOrgInfo({
        id: 1,
        node: { calculated: { organisationId: 999 } },
      });

      TEST_HELPERS.expectCalledAndMatchSnapshot(mockResaga.dispatchTo);
    });
    it('should not dispatchTo', () => {
      renderedComponent.setProps({ id: 1, rootNodeOrgId: -1 });

      expect(instance.fetchOrgInfo({ id: 1 })).toBe(true);
    });
  });
  describe('renderMoveDialog', () => {
    it('should call dispatchTo', () => {
      const moveDialog = shallow(
        <div>{instance.renderMoveDialog()(folderTransactionMock)}</div>,
      );

      expect(toJSON(moveDialog)).toMatchSnapshot();
    });
  });
});
