import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from 'ugcomponents/Dialog';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { H3, H5 } from 'viewComponents/Typography';
import Name from 'smartComponents/Node/parts/Name';
import Icon from 'viewComponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { DEFAULT } from 'appConstants';
import styles from './styles';

export class MoveDialog extends PureComponent {
  renderValue = value => value;

  renderMoveDialogContent = () => {
    const { participantId, fromId, toId, classes } = this.props;
    return (
      <GridContainer direction="column" alignItems="center">
        <GridItem>
          <Icon className={classes.greenIcon} icon="compare" />
        </GridItem>
        <GridItem>
          <H3 weight="bold" className={classes.title}>
            Move&nbsp;
            <Name valueOnly id={participantId} renderValue={this.renderValue} />
            ?
          </H3>
        </GridItem>
        <GridItem className={classes.content}>
          <H5>
            You are about to move this participant from&nbsp;
            <Name valueOnly id={fromId} renderValue={this.renderValue} />
            &nbsp;to&nbsp;
            <Name valueOnly id={toId} renderValue={this.renderValue} />. Are you
            sure you want to continue?
          </H5>
        </GridItem>
      </GridContainer>
    );
  };

  renderLinkUnlinkDialogContent = () => {
    const { participantId, fromId, classes, variant, toId } = this.props;
    const text = LOGIC_HELPERS.ifElse(
      variant === VARIANTS.LINK,
      'Link',
      'Unlink',
    );
    const who = LOGIC_HELPERS.ifElse(variant === VARIANTS.LINK, 'to', 'from');
    const whoId = LOGIC_HELPERS.ifElse(variant === VARIANTS.LINK, toId, fromId);
    return (
      <GridContainer direction="column" alignItems="center">
        <GridItem>
          <Icon className={classes.greenIcon} icon="compare" />
        </GridItem>
        <GridItem>
          <H3 weight="bold" className={classes.title}>
            {text}
            &nbsp;
            <Name valueOnly id={participantId} renderValue={this.renderValue} />
            ?
          </H3>
        </GridItem>
        <GridItem className={classes.content}>
          <H5>
            {`You are about to ${text.toLowerCase()} this participant ${who}`}
            &nbsp;
            <Name valueOnly id={whoId} renderValue={this.renderValue} />. Are
            you sure you want to continue?
          </H5>
        </GridItem>
      </GridContainer>
    );
  };

  renderDialogContent = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.MOVE]: this.renderMoveDialogContent(),
      [VARIANTS.UNLINK]: this.renderLinkUnlinkDialogContent(),
      [VARIANTS.LINK]: this.renderLinkUnlinkDialogContent(),
      [DEFAULT]: this.renderMoveDialogContent(),
    });
  };

  renderTitle = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.MOVE]: 'Move Participant to Another Follower',
      [VARIANTS.LINK]: 'Link Participant',
      [VARIANTS.UNLINK]: 'Unlink Participant',
      [DEFAULT]: 'Move Participant to Another Follower',
    });
  };

  render = () => {
    const customChildren = {
      content: this.renderDialogContent(),
    };

    const { open, closeMoveDialog, confirmMove } = this.props;
    return (
      <Dialog
        template="confirm"
        open={open}
        dialogTitle={this.renderTitle()}
        cancelFunc={closeMoveDialog}
        confirmFunc={confirmMove}
        customChildren={customChildren}
        hideHeadline
      />
    );
  };
}

MoveDialog.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  open: PropTypes.bool,
  closeMoveDialog: PropTypes.func,
  confirmMove: PropTypes.func,
  participantId: PropTypes.number, // ID to be moved
  fromId: PropTypes.number, // parentId
  toId: PropTypes.number, // selectedFollowerId
  variant: PropTypes.string,
};

export default compose(withStyles(styles, { name: 'MoveDialog' }))(MoveDialog);
