import { NODE_API, CREATE_NEXT_NODE, UPDATE_NODE } from 'apis/constants';
import tabHelper from 'datastore/templateManagementStore/helpers/tab';
// import { ORG_ROLE } from 'apis/components/Ability/roles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DialogForm from 'ugcomponents/DialogForm/Simple';
import { Text } from 'ugcomponents/Inputs';
import { ability } from 'apis/components/Ability/ability';
import { TAB_OTHER } from 'utils/modelConstants';
import { ABILITY_HELPERS } from 'apis/components/Ability/helpers';
import { CONFIG, MEMBER_CONFIG } from './config';
import inputs from './inputs';
import styles from './styles';

export class EditTab extends PureComponent {
  state = {
    loading: false,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.dialogProps = {
      template: 'custom',
      dialogTitle: 'Edit Tab',
      headlineTitle: 'Edit Tab',
      headlineIcon: 'lnr-pencil5',
      headlineText: 'Please enter a new name for this tab',
      customClassnames: {
        content: classes.dialogContent,
      },
    };
  };

  handleValidSubmit = formData => {
    const { tabId, parentId } = this.props;

    if (tabId) {
      // edit tab
      this.editTab(formData);
    } else if (parentId) {
      // add tab
      this.addTab(formData);
    }
  };

  handleClose = () => {
    const { onClose, tabId } = this.props;

    if (onClose) {
      if (tabId) {
        onClose('editTab');
      } else {
        onClose('addTab');
      }
    }
    this.setState({ loading: false });
  };

  addTab = ({ content, private: isPrivate }) => {
    const { parentId, templateId } = this.props;
    this.setState({ loading: true });

    this.props.resaga.dispatchTo(NODE_API, CREATE_NEXT_NODE, {
      payload: {
        nodeId: parentId,
        node: { content, type: TAB_OTHER, customData: { private: isPrivate } },
        templateId,
      },
      onSuccess: this.addSuccess,
    });
  };

  addSuccess = (result, payload) => {
    const { onSuccess } = this.props;

    if (onSuccess) onSuccess(result, payload);
    this.handleClose();
  };

  editTab = ({ content, private: isPrivate }) => {
    const { tabId } = this.props;

    const node = {
      content,
      customData: { private: isPrivate },
      type: 'tabother',
    };

    this.setState({ loading: true });

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: tabId,
        node,
      },
      onSuccess: this.editSuccess,
    });
  };

  editSuccess = (result, payload) => {
    const { onSuccess } = this.props;

    this.props.resaga.setValue({
      tabs: tabHelper.upsert(result, payload), // insert tab data
    });

    if (onSuccess) onSuccess(result, payload);
    this.handleClose();
  };

  render = () => {
    const {
      // tourRole,
      // classes,
      open,
      userId,
      content,
      tabId,
      isPrivate,
      dialogProps,
      submitButtonContent,
      // createdBy,
      // role,
    } = this.props;

    const { loading } = this.state;

    // let userRole = role;
    //
    // const allowedOrgRoles = [ORG_ROLE.ADMIN, ORG_ROLE.OWNER];

    // const userRole = ABILITY_HELPERS.logicalUserRole(
    //   allowedOrgRoles,
    //   tourRole,
    //   role,
    // );

    const canCreate = !tabId && ability.can('create', 'tabother'); // create tab when no tabId

    // allow access when owner of private tab, can create a tab and when org admin
    const isAccessible = ability.can('execute', {
      type: TAB_OTHER,
      private: isPrivate,
    });
    const isAccessibleByOwner = ability.can('execute', {
      type: TAB_OTHER,
      createdBy: userId,
    });

    // TODO: Add the new accessbility options for tab

    // allow access when owner of private tab, can create a tab and when org admin
    // const enableCheckbox = ABILITY_HELPERS.enableCheckbox(
    //   tabId,
    //   isAccessibleByOwner,
    //   canCreate,
    //   isAccessible,
    // );

    const showNote = ABILITY_HELPERS.showNote(
      tabId,
      isAccessibleByOwner,
      canCreate,
      isAccessible,
    );

    // const orgRoleAccess = ability.can('execute', {
    //   type: TAB_OTHER,
    //   role: userRole,
    // }); // access based on org role
    // const isCustomTabCreator = ability.can('execute', {
    //   type: TAB_OTHER,
    //   createdBy,
    // }); // access for creator of custom tab

    // const checkboxIsAccessible = ABILITY_HELPERS.showCheckbox(
    //   canCreate,
    //   orgRoleAccess,
    //   isCustomTabCreator,
    // );

    return (
      <DialogForm
        ugDialogProps={{
          ...this.dialogProps,
          ...dialogProps,
          loading,
          disableConfirmButton: loading,
        }}
        onValidSubmit={this.handleValidSubmit}
        open={open}
        onClose={this.handleClose}
        onCancel={this.handleClose}
        submitButtonContent={submitButtonContent}
      >
        <Text {...inputs.NAME} value={content} />
        {/* {checkboxIsAccessible && ( */}
        {/*  <Checkbox */}
        {/*    {...inputs.PRIVATE} */}
        {/*    value={isPrivate} */}
        {/*    className={classes.checkbox} */}
        {/*    disabled={!enableCheckbox} */}
        {/*  /> */}
        {/* )} */}
        {showNote && (
          <div>
            <b>Note:</b> {"Only a tab's owner can change its access level"}
          </div>
        )}
      </DialogForm>
    );
  };
}

EditTab.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  tabId: PropTypes.number,
  parentId: PropTypes.number,
  templateId: PropTypes.number,
  open: PropTypes.bool,
  isOwner: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  dialogProps: PropTypes.object,
  submitButtonContent: PropTypes.string,
  tourRole: PropTypes.string,

  // resaga props
  userId: PropTypes.number,
  content: PropTypes.string,
  isPrivate: PropTypes.bool,
  role: PropTypes.string,
  accountId: PropTypes.number,
  createdBy: PropTypes.number,
};

EditTab.defaultProps = {
  userId: 0,
  content: '',
  submitButtonContent: 'Save Changes',
  isPrivate: false,
  tabId: 0,
  parentId: 0,
  templateId: 0,
  dialogProps: {},
};

export default compose(
  withStyles(styles, { name: 'EditTab' }),
  resaga(CONFIG),
  resaga(MEMBER_CONFIG),
)(EditTab);
