import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  FOLDER_API,
  GET_CHECKLISTS,
  NODE_API,
  UPDATE_NODE,
  BATCH_CREATE_CLONE,
} from 'apis/constants';
import { DO_NOTHING, OPEN, CHECK_INPUT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { DATASTORE_UTILS } from 'datastore';
import { get, head } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import {
  DEFAULT_DURATION,
  RELATIVE,
} from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import { SimpleRTE } from 'ugcomponents/Inputs';
import { TextField } from 'ugcomponents/Form';
import JDialog from 'ugcomponents/JDialog';
// import { OPTION_NONE } from 'ugcomponents/Inputs/SelectField';
import P from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CHECKLIST, CHECKLISTS } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import Popper from 'components/Popper';
import { Chip } from 'components/material-ui';
import MuiAvatar from '@material-ui/core/Avatar';
import Hr from 'components/Hr';
// import Chip from '@material-ui/core/Chip';
import { VARIANTS } from 'variantsConstants';
import Icon from 'ugcomponents/Icon';
import classNames from 'classnames';
import { Slide } from '@material-ui/core';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import JText from 'components/JText';
import ChecklistOptions from './components/ChecklistOptions';
import { CONFIG, CONFIG_ORGANISATION_ID, CONFIG_PARENT_ID } from './config';
import inputProps from './inputs';
import styles from './styles';
import ChecklistContent from './components/ChecklistContent';

export class AddEditChecklist extends PureComponent {
  state = {
    // selectedChecklists: [],
    loading: false,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.editDialogProps = {
      template: 'custom',
      dialogTitle: 'Edit Checklist',
      headlineTitle: 'Edit Checklist',
      headlineIcon: 'lnr-clipboard-pencil',
      headlineText: 'Please enter data for this Checklist',
      customClassnames: {
        content: classes.dialogContent,
      },
    };
    this.addDialogProps = {
      ...this.editDialogProps,
      template: 'add',
      dialogTitle: 'New Checklist',
      headlineTitle: 'New Checklist',
    };

    this.updateDialogProps(this.props);
  };

  componentDidMount = () => {
    const { id, parentNodeId, rootNodeId } = this.props;
    // only fetch on add new Checklist
    if (!id && parentNodeId) {
      return this.fetchChecklists(rootNodeId);
    }

    return DO_NOTHING;
  };

  componentWillReceiveProps = nextProps => {
    const { parentNodeId } = this.props;
    this.updateDialogProps(nextProps);

    if (
      !nextProps.id &&
      nextProps.parentNodeId &&
      parentNodeId !== nextProps.parentNodeId
    ) {
      return this.fetchChecklists(nextProps.rootNodeId);
    }

    return DO_NOTHING;
  };

  onClose = results => {
    this.props.resaga.setValue({
      editChecklistId: null,
      addChecklistParentId: null,
      selectedChecklists: null,
    });
    this.setState({ loading: false });

    // result from create Checklist
    const expandedChecklistId = get(results, 'node.id');
    if (expandedChecklistId) {
      this.props.resaga.setValue({ expandedChecklistId });
    }
  };

  onUpdateError = () => {
    this.setState({ loading: false });
  };

  fetchChecklists = (id, { onSuccess } = {}) => {
    if (!id) return null;

    return this.props.resaga.dispatchTo(FOLDER_API, GET_CHECKLISTS, {
      payload: { id },
      onSuccess,
    });
  };

  updateDialogProps = nextProps => {
    this.addDialogProps.headlineText = <span>{nextProps.parentContent}</span>;
    if (nextProps.parentType) {
      this.addDialogProps.headlineTitle = (
        <span>New checklist on this {nextProps.parentType}</span>
      );
    }
  };

  handleValidSubmit = formData => {
    const { id } = this.props;
    if (id) {
      return this.editChecklist(formData);
    }
    return this.addChecklist(formData);
  };

  handleInvalidSubmit = () => {
    const { id, selectedChecklists } = this.props;
    if (id || !selectedChecklists.length) {
      return DO_NOTHING;
    }
    // Override faulse positive
    return this.handleValidSubmit({});
  };

  selectoptionValue = ({ id, label, groupId, checklists = [] }) => () => {
    const { selectedChecklists } = this.props;
    const index = selectedChecklists.some(val => val.id === id);
    let ids = selectedChecklists;
    if (index) {
      if (id === groupId) {
        ids = selectedChecklists.filter(val => val.groupId !== id);
      } else {
        ids = selectedChecklists
          .filter(val => val.id !== id)
          .filter(a => a.id !== groupId);
      }
    } else if (id === groupId) {
      const groupIds = checklists
        .map(checkId => ({
          id: checkId,
          label: '',
          groupId,
          checklists: [],
        }))
        .concat([{ id, label, groupId, checklists }]);
      ids = selectedChecklists
        .filter(({ groupId: grpId }) => grpId !== groupId)
        .concat(groupIds);
    } else {
      ids = selectedChecklists.concat([{ id, label, groupId, checklists }]);
      const current = ids.filter(cval => cval.groupId === groupId);
      if (current.length === checklists.length) {
        ids = ids.concat([{ id: groupId, label, groupId, checklists }]);
      }
    }
    return this.props.resaga.setValue({ selectedChecklists: ids });
  };

  addChecklist = data => {
    const { parentNodeId, selectedChecklists } = this.props;
    const { content, description } = data;

    this.setState({ loading: true });

    if (selectedChecklists.length) {
      const idstoCopy = selectedChecklists
        .filter(({ id, groupId }) => id !== groupId)
        .map(val => val.id);
      return this.copyFromIds(idstoCopy);
    }

    const node = {
      content,
      status: OPEN,
      customData: {
        description,
        dueDate: {
          mode: RELATIVE,
          value: DEFAULT_DURATION,
        },
      },
      type: CHECKLIST,
    };

    return NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId,
        childKey: CHECKLISTS,
        onSuccess: this.addSuccess,
      },
      this.props,
    );
  };

  addSuccess = result => {
    const id = get(result, 'node.id');
    this.getTreeAndTimes(id);
    this.onClose(result);
  };

  getTreeAndTimes = id => {
    NODE_API_HELPERS.getTreeAndTimes({ id }, this.props);
  };

  copyFromIds = ids => {
    const { parentNodeId } = this.props;
    // always create as child, no linked-list here
    return this.props.resaga.dispatchTo(NODE_API, BATCH_CREATE_CLONE, {
      payload: {
        node: ids,
        data: { parentNodeId, filter: 'checklist' },
      },
      onSuccess: this.batchCopyNodeSuccess,
      onError: this.onClose,
    });
  };

  batchCopyNodeSuccess = result => {
    // const cloneIds = result.map(data => data.cloneId);
    this.setState({ loading: false });
    const { cloneIds } = result;

    this.props.resaga.setValue({
      checklists: DATASTORE_UTILS.upsertArray('', cloneIds),
    });
    this.onClose({ node: { id: head(cloneIds) } });
  };

  copyNodeSuccess = ({ cloneId }) => {
    this.fetchChecklists(cloneId, { onSuccess: this.fetchListSuccess });
    this.getTreeAndTimes(cloneId);

    this.props.resaga.setValue({ expandedChecklistId: cloneId });
  };

  fetchListSuccess = (res, { id }) => {
    this.props.resaga.setValue({
      checklists: DATASTORE_UTILS.upsertArray('', id),
    });
    this.onClose();
  };

  editChecklist = ({ content, description }) => {
    const { id } = this.props;

    this.setState({ loading: true });

    const node = { content, customData: { description }, type: CHECKLIST };

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node,
      },
      onError: this.onUpdateError,
      onSuccess: this.onClose,
    });
  };

  dialogProps = () => {
    const { id } = this.props;

    if (id) {
      return this.editDialogProps;
    }

    return this.addDialogProps;
  };

  renderCopyItems = () => {
    const { id, classes, selectedChecklists } = this.props;

    const group = selectedChecklists.filter(
      ({ groupId, id: checkId }) => groupId === checkId,
    );
    const checklist = selectedChecklists.filter(
      ({ groupId }) => !group.some(val => val.groupId === groupId),
    );

    // only able to copy items when creating
    if (id) {
      return null;
    }
    return (
      <GridContainer
        direction="column"
        className={selectedChecklists.length && classes.selected}
      >
        <GridItem>{this.renderPopper()}</GridItem>
        <GridItem>{this.renderSelected()}</GridItem>
        {!!selectedChecklists.length && (
          <GridItem xs>
            <GridContainer borderHighlight>
              <GridItem xs>
                <Hr half />
                <P
                  dense
                  className={classes.countSelect}
                >{`Selected Checklists:  Group(${group.length}), Checklists: (${
                  checklist.length
                }) `}</P>
              </GridItem>
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderPopper = () => {
    const { classes, selectedChecklists } = this.props;
    return (
      <Popper
        placement="right"
        menuHeader="Checklists"
        renderButton={this.renderPopperButton}
        stopPropagation
        selectedChecklists={selectedChecklists}
        className={classes.popperRoot}
        noPadding
      >
        {this.renderPopperOptions}
      </Popper>
    );
  };

  renderPopperButton = ({ openMenu }) => {
    const { classes, selectedChecklists } = this.props;
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
        className={classes.popperButton}
        color="base"
        selectedChecklists={selectedChecklists}
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>Copy from</GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderPopperOptions = () => {
    const { parentType, parentNodeId, rootNodeId, classes } = this.props;
    return (
      <GridContainer direction="column" className={classes.options}>
        <GridItem>
          <ChecklistOptions
            parentType={parentType}
            parentNodeId={parentNodeId}
            onChange={this.selectoptionValue}
            rootNodeId={rootNodeId}
            variant={CHECK_INPUT}
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderSelected = () => {
    const { classes, selectedChecklists } = this.props;
    const group = selectedChecklists.filter(
      ({ groupId, id }) => groupId === id,
    );
    const checklist = selectedChecklists.filter(
      ({ groupId }) => !group.some(val => val.groupId === groupId),
    );
    if (!selectedChecklists.length) return null;
    return (
      <GridContainer alignItems="baseline" direction="row">
        {group.concat(checklist).map((val, index) => (
          <GridItem className={classes.root} key={val.id}>
            <Chip
              variant="outlined"
              avatar={LOGIC_HELPERS.ifElse(
                val.id === val.groupId,
                <MuiAvatar className={classes.img}>
                  {val.checklists.length}
                </MuiAvatar>,
                null,
              )}
              label={
                <div className="j-text-ellipsis">
                  <ChecklistContent
                    id={val.id}
                    parentNodeId={val.groupId === val.id ? null : val.groupId}
                    index={index}
                  />
                </div>
              }
              onClick={this.handleClick}
              onDelete={this.selectoptionValue(val)}
              className={classNames(
                classes.chip,
                'j-text-ellipsis',
                LOGIC_HELPERS.ifElse(
                  val.id === val.groupId,
                  classes.groupChip,
                  classes.checklistChip,
                ),
              )}
              key={val.id}
              inputProps={{ id: val.id, checked: true }}
            />
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  render = () => {
    const {
      classes,
      id,
      parentNodeId,
      content,
      description,
      selectedChecklists,
      smDown,
    } = this.props;
    const { loading } = this.state;

    const mobileProps = LOGIC_HELPERS.ifElse(
      smDown,
      {
        fullScreen: true,
        TransitionComponent: Slide,
        TransitionProps: { direction: 'up' },
      },
      {},
    );

    const renderForm = (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <TextField {...inputProps.NAME} value={content} />
          </GridItem>
          <GridItem className={classes.rteGrid}>
            <SimpleRTE
              {...inputProps.DESCRIPTION}
              value={description}
              className={classes.rte}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );

    return (
      <JDialog
        open={Boolean(id || parentNodeId)}
        fullWidth
        fullScreen={false}
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
        onClose={this.onClose}
        disabled={loading}
        header={
          <GridContainer alignItems="center">
            <GridItem>
              <JText xl>{this.dialogProps().dialogTitle}</JText>
            </GridItem>
          </GridContainer>
        }
        {...mobileProps}
      >
        <GridContainer direction="column">
          {this.renderCopyItems()}
          {LOGIC_HELPERS.ifElse(!selectedChecklists.length, renderForm)}
        </GridContainer>
      </JDialog>
    );
  };
}

AddEditChecklist.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,
  // parent props
  id: PropTypes.number, // checklist id
  parentNodeId: PropTypes.number, // checklist id
  submitButtonContent: PropTypes.string,

  // resaga props
  content: PropTypes.string,
  parentContent: PropTypes.string,
  parentType: PropTypes.string,
  description: PropTypes.string,
  selectedChecklists: PropTypes.array,

  rootNodeId: PropTypes.number,
};

AddEditChecklist.defaultProps = {
  id: 0,
  parentNodeId: 0,
  content: '',
  parentContent: '',
  parentType: '',
  description: '',
  submitButtonContent: 'Save Changes',
  selectedChecklists: [],
};

export default compose(
  withStyles(styles, { name: 'AddEditChecklist' }),
  withRouter,
  resaga(CONFIG_PARENT_ID),
  resaga(CONFIG_ORGANISATION_ID),
  resaga(CONFIG),
  withSMDown,
)(AddEditChecklist);
