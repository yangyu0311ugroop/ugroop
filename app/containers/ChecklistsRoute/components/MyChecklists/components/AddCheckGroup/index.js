import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DO_NOTHING } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { CHECKGROUP, CHECKLISTS } from 'utils/modelConstants';
import { SimpleRTE, Text } from 'ugcomponents/Inputs';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'ugcomponents/Icon';
import { VARIANTS } from 'variantsConstants';
import JDialog from 'ugcomponents/JDialog';
import { InlineButton } from 'ugcomponents/Buttons';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Slide } from '@material-ui/core';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import inputs from './inputs';
import styles from './styles';
import { CONFIG } from './config';

export class AddCheckGroup extends PureComponent {
  state = {
    openDialog: false,
  };

  openAddDialog = e => {
    e.stopPropagation();
    return this.setState({ openDialog: true });
  };

  handleClose = () => this.setState({ openDialog: false });

  onSuccessAdd = ({ node = {} }) => {
    this.props.resaga.setValue({ expandedParentChecklistId: node.id });
    this.setState({ openDialog: false });
  };

  addCheckGroup = formData => {
    const { parentNodeId, lastNodeId, id } = this.props;

    const { content, description } = formData;

    if (!content) {
      return DO_NOTHING;
    }

    const node = { content, type: CHECKGROUP, customData: { description } };

    if (id) {
      return NODE_API_HELPERS.updateNode(
        {
          nodeId: id,
          node,
          onSuccess: this.handleClose,
        },
        this.props,
      );
    }

    return NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId,
        lastNodeId,
        childKey: CHECKLISTS,
        onSuccess: this.onSuccessAdd,
      },
      this.props,
    );
  };

  renderDialog = () => {
    const { id, smDown, content, description, classes } = this.props;
    const mobileProps = LOGIC_HELPERS.ifElse(
      smDown,
      {
        fullScreen: true,
        TransitionComponent: Slide,
        TransitionProps: { direction: 'up' },
      },
      {},
    );
    return (
      <JDialog
        open={this.state.openDialog}
        fullWidth
        fullScreen={false}
        onValidSubmit={this.addCheckGroup}
        onClose={this.handleClose}
        header={
          <GridContainer
            alignItems="center"
            className={classes.noTextWrap}
            noWrap
          >
            <GridItem>
              {LOGIC_HELPERS.ifElse(
                !id,
                'New Checklist Group',
                'Edit Checklist Group',
              )}
            </GridItem>
          </GridContainer>
        }
        {...mobileProps}
      >
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <Text {...inputs.NAME} value={content} />
          </GridItem>
          <GridItem className={classes.rteGrid}>
            <SimpleRTE
              {...inputs.DESCRIPTION}
              value={description}
              className={classes.rte}
            />
          </GridItem>
        </GridContainer>
      </JDialog>
    );
  };

  render = () => {
    const { classes, simple, id } = this.props;
    if (id)
      return (
        <React.Fragment>
          <InlineButton
            onClick={this.openAddDialog}
            title="Edit checklist group"
          >
            <Icon size="xsmall" icon="lnr-pencil" />
          </InlineButton>
          {this.renderDialog()}
        </React.Fragment>
      );
    if (simple)
      return (
        <React.Fragment>
          <Button
            dense
            color="primary"
            size="xs"
            onClick={this.openAddDialog}
            buttonTitle="Add Checklist Group"
            variant={VARIANTS.OUTLINE}
            className={classes.simpleButton}
          >
            <Icon size="xsmall" icon="lnr-plus" />
          </Button>
          {this.renderDialog()}
        </React.Fragment>
      );
    return (
      <GridContainer direction="column" alignItems="center" spacing={1}>
        <GridItem>
          <Button dense color="primary" size="xs" onClick={this.openAddDialog}>
            <GridContainer
              wrap="nowrap"
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <GridItem className={classes.customPadHorizontal} />
              <GridItem>
                <Icon size="normal" icon="lnr-plus" />
              </GridItem>
              <GridItem className={classes.noTextWrap}>
                Add Checklist Group
              </GridItem>
              {/* <GridItem className={classes.customPadHorizontal} /> */}
            </GridContainer>
          </Button>
        </GridItem>
        {this.renderDialog()}
      </GridContainer>
    );
  };
}

AddCheckGroup.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // parent props
  parentNodeId: PropTypes.number,
  simple: PropTypes.bool,
  id: PropTypes.number,
  content: PropTypes.string,
  description: PropTypes.string,
  smDown: PropTypes.bool,

  // resaga props
  lastNodeId: PropTypes.number, // provide this prop if we want to be able to move checkgroup
};

AddCheckGroup.defaultProps = {
  parentNodeId: 0,
  lastNodeId: 0,
  content: '',
  description: '',
};

export default compose(
  withStyles(styles, { name: 'AddCheckGroup' }),
  resaga(CONFIG), // << needed for NODE_API_HELPERS.createNode
  withSMDown,
)(AddCheckGroup);
