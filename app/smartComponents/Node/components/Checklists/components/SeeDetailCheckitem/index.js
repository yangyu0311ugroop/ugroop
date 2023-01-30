import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { DEFAULT, READ_ONLY, SUMMARY, TEXT, TITLE } from 'appConstants';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  Content,
  Description,
  Notes,
  Status,
  Type,
} from 'smartComponents/Node/parts';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import { CHECKITEM, DAY, TEMPLATE } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { CONFIG, PARENT_CONFIG } from './config';
import styles from './styles';

// TODO: this Modal is experimental and will be refactored on next part
export class SeeDetailCheckitem extends PureComponent {
  handleClose = () => {
    this.props.resaga.setValue({ seeCheckItemDetail: null });
  };

  isTemplate = () => [TEMPLATE, DAY].includes(this.props.parentType);

  canUpdate = () =>
    ability.can('execute', {
      type: CHECKITEM,
      createdBy: this.props.createdBy,
    });

  renderEditStatus = () => {
    const { id } = this.props;

    if (!this.isTemplate()) return null;

    return (
      <div>
        <Hr noMarginTop />

        <Status id={id} variant={this.canUpdate() ? SUMMARY : TEXT} />
      </div>
    );
  };

  renderContent = () => {
    const { id, classes, parentNodeId } = this.props;

    const canUpdate = this.canUpdate();

    const title = (
      <Content
        id={id}
        variant={TITLE}
        editable={this.canUpdate()}
        multiline
        textAlign="center"
      />
    );

    const subheader = (
      <span>
        in <Type id={parentNodeId} />{' '}
        <strong>
          <Content id={parentNodeId} variant={VARIANTS.TEXT_ONLY} />
        </strong>
      </span>
    );

    const heading = (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <span>Task</span>
        </GridItem>
        <Hr half noMarginTop className={classes.line} />
        <GridItem className={classes.fontNormal}>
          {subheader}
          {/* <strong>
            <Content id={parentNodeId} variant={VARIANTS.TEXT_ONLY} />
          </strong> */}
        </GridItem>
      </GridContainer>
    );

    return (
      <React.Fragment>
        <CloseButton onClick={this.handleClose} />
        <DialogTitle>
          <Title
            heading={heading}
            headingBackground="Task"
            className={classes.dialogTitle}
            fullWidth
          />
        </DialogTitle>
        <DialogContent>
          <GridContainer direction="column" spacing={0}>
            {this.isTemplate() && (
              <GridItem className={classes.statusPos}>
                <Status id={id} />
              </GridItem>
            )}
            <GridItem className={classes.title} xs>
              {title}
              {/* {subheader} */}
            </GridItem>
            <GridItem className={classes.paddingBottom}>
              <Description
                id={id}
                variant={canUpdate ? DEFAULT : READ_ONLY}
                useEditableRTE
              />
            </GridItem>
            <GridItem className={classes.paddingBottom}>
              <Notes id={id} variant={canUpdate ? DEFAULT : READ_ONLY} />
            </GridItem>
            <GridItem>{this.renderEditStatus()}</GridItem>
          </GridContainer>
        </DialogContent>
      </React.Fragment>
    );
  };

  render = () => {
    const { id } = this.props;

    if (!id) return null;

    return (
      <Dialog
        open={Boolean(id)}
        onClose={this.handleClose}
        maxWidth="sm"
        fullWidth
      >
        {this.renderContent()}
      </Dialog>
    );
  };
}

SeeDetailCheckitem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  parentNodeId: PropTypes.number,

  // resaga props
  createdBy: PropTypes.number,
  parentType: PropTypes.string,
};

SeeDetailCheckitem.defaultProps = {
  id: 0,
  parentNodeId: 0,
  createdBy: 0,
};

export default compose(
  withStyles(styles, { name: 'SeeDetailCheckitem' }),
  resaga(PARENT_CONFIG),
  resaga(CONFIG),
)(SeeDetailCheckitem);
