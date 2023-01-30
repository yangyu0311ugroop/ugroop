import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogContent from 'components/Dialog/UGDialogContent';
import Hr from 'components/Hr';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';

import ReactionItem from './components/ReactionItem';
import { CONFIG } from './config';
import styles from './styles';

export class ReactionList extends PureComponent {
  renderUser = id => (
    <GridItem>
      <ReactionItem id={id} />
      <Hr />
    </GridItem>
  );

  renderTitle = () => (
    <>
      <Title
        heading={`${this.props.reactions.length} likes`}
        hideOnSm={false}
        headingUnderline
      />
      <CloseButton onClick={this.props.onClose} />
    </>
  );

  renderContent = () => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <Hr noMarginTop />
      </GridItem>
      {this.props.reactions.map(this.renderUser)}
    </GridContainer>
  );

  render = () => {
    const { open } = this.props;

    return (
      <Dialog open={open} fullWidth maxWidth="xs">
        <DialogTitle noPaddingBottom>{this.renderTitle()}</DialogTitle>
        <DialogContent>{this.renderContent()}</DialogContent>
      </Dialog>
    );
  };
}

ReactionList.propTypes = {
  // hoc props

  // parent props
  open: PropTypes.bool,
  onClose: PropTypes.func,

  // resaga props
  reactions: PropTypes.array,
};

ReactionList.defaultProps = {
  reactions: [],
};

export default compose(
  withStyles(styles, { name: 'ReactionList' }),
  resaga(CONFIG),
)(ReactionList);
