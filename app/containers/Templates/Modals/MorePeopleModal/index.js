import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogAction from 'components/Dialog/UGDialogAction';
import Button from 'ugcomponents/Buttons/Button';
import AvatarById from 'ugcomponents/Person/AvatarById';
import styles from './styles';
import m from './messages';

const renderAvatars = classes => (person, idx) => (
  <GridItem key={`${person}-${idx}`} xs={12} md={2}>
    <AvatarById
      disableGrow
      showFullName
      noTooltip
      imgClass={classes.avatar}
      rootClass={classes.avatar}
      userId={person}
    />
  </GridItem>
);

export const MorePeopleModal = ({ classes, isOpen, onClose, people }) => {
  const avatarList = people.map(renderAvatars(classes));
  return (
    <Dialog fullWidth className={classes.root} open={isOpen} onClose={onClose}>
      <DialogTitle>
        <M {...m.modalTitle} />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <GridContainer>{avatarList}</GridContainer>
      </DialogContent>
      <DialogAction>
        <Button onClick={onClose}>
          <M {...m.closeBtn} />
        </Button>
      </DialogAction>
    </Dialog>
  );
};

MorePeopleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  people: PropTypes.array.isRequired,
};
MorePeopleModal.defaultProps = {};

export default withStyles(styles, { name: 'MorePeopleModal' })(MorePeopleModal);
