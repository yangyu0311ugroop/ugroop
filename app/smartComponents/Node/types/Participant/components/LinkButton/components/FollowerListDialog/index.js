import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import React from 'react';
import PropTypes from 'prop-types';
import JText from 'components/JText';
import Create from 'smartComponents/Node/parts/Followers/components/Create';
import List from 'smartComponents/Node/parts/Followers/components/List';
import Dialog from 'components/Dialog';
import Padding from 'viewComponents/Padding';
import Button from 'viewComponents/Button';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';

export const AddLinkDialogButton = ({ buttonRef, onClick }) => (
  <Button
    color="primary"
    dense
    size="small"
    buttonRef={buttonRef}
    onClick={onClick}
    data-testid="follower-list-dialog-add-link"
  >
    Add Link
  </Button>
);

AddLinkDialogButton.propTypes = {
  buttonRef: PropTypes.func,
  onClick: PropTypes.func,
};

export const FollowerListDialog = ({
  open,
  onClose,
  id,
  firstName,
  lastName,
}) => (
  <Dialog
    data-testid="follower-list-dialog"
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="xs"
  >
    <Padding bottom="md" top="md" right="md" left="md">
      <GridContainer direction="column">
        <GridItem>
          <GridContainer justify="space-between" alignItems="center">
            <GridItem>
              <GridContainer alignItems="center">
                <GridItem>
                  <Title heading="Followers" />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <CloseButton
                onClick={onClose}
                data-testid="follower-list-dialog-close-button"
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <JText nowrap={false}>
                Select the person whom you want to add as a follower to&nbsp;
                <b>
                  {firstName} {lastName}
                </b>
                :
              </JText>
            </GridItem>
            <GridItem>
              <List id={id} />
            </GridItem>
            <GridItem>
              <GridContainer justify="space-between">
                <GridItem />
                <GridItem>
                  <Create renderButton={AddLinkDialogButton} id={id} />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Padding>
  </Dialog>
);

FollowerListDialog.propTypes = {
  id: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

FollowerListDialog.defaultProps = {
  open: false,
};

export default React.memo(FollowerListDialog);
