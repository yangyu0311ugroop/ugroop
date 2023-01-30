import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../ugcomponents/Form';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import SimpleRTE from '../../../../ugcomponents/Inputs/SimpleRTE';
import Hr from '../../../../components/Hr';
import { PORTAL_HELPERS } from '../../helpers';
import Button from '../../../../viewComponents/Button';
import Dialog from '../../../../components/Dialog';
import DialogTitle from '../../../../components/Dialog/UGDialogTitle';
import DialogContent from '../../../../components/Dialog/UGDialogContent';
import {
  CloseButton,
  Title,
} from '../../../../ugcomponents/DialogForm/Complex';
import { makeStyles } from '../../../../components/material-ui';
import { ChatTypes } from '../../../../lib/streamChat/chatType';
import { StreamChatContext } from '../../../../lib/streamChat';

const styles = ({ colors }) => ({
  root: {},
  grow: {
    flex: '1',
  },

  fade: {
    opacity: 0.3,
  },
  heading: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.metallicGray,
  },
});

const useStyles = makeStyles(styles);

const renderTitle = handleClose => (
  <>
    <Title heading="Edit Chat Group Description" />
    <CloseButton onClick={handleClose} />
  </>
);

function EditChannelDescription(props) {
  const client = useContext(StreamChatContext);
  const channelDescription = props.channelDescription;
  const handleValidSubmit = async ({ description }) => {
    const channelId = props.channelId;
    const templateId = props.templateId;
    const name = props.channelName;
    const filter = { type: ChatTypes.UGroop, cid: channelId };
    const channels = await client.queryChannels(
      filter,
      {},
      { state: false, limit: 1 },
    );
    if (channels.length > 0) {
      try {
        await channels[0].update({
          name,
          description,
          templateId,
        });
        PORTAL_HELPERS.close(props);
      } catch (e) {
        // display error
        console.log('error', e);
      }
    }
  };

  const renderContent = classes => (
    <Form onValidSubmit={handleValidSubmit}>
      <GridContainer direction="column">
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <SimpleRTE
                name="description"
                value={channelDescription}
                placeholder="Describe what this chat group is for."
                lines={2}
                className={classes.rte}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <Hr half />
        <GridItem>{renderSaveCancelButton()}</GridItem>
      </GridContainer>
    </Form>
  );

  const handleClose = () => {
    PORTAL_HELPERS.close(props);
  };

  const renderSaveCancelButton = () => (
    <GridContainer alignItems="center">
      <GridItem>
        <Button size="xs" color="gray" onClick={handleClose}>
          Cancel
        </Button>
      </GridItem>
      <GridItem>
        <Button size="xs" color="primary" type="submit">
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>Update description</GridItem>
          </GridContainer>
        </Button>
      </GridItem>
    </GridContainer>
  );
  const classes = useStyles();

  return (
    <Dialog maxWidth="xs" fullWidth open onClose={handleClose}>
      <DialogTitle noPaddingBottom>{renderTitle(handleClose)}</DialogTitle>
      <DialogContent halfPaddingTop>{renderContent(classes)}</DialogContent>
    </Dialog>
  );
}

EditChannelDescription.propTypes = {
  channelId: PropTypes.string,
  channelDescription: PropTypes.string,
  channelName: PropTypes.string,
  templateId: PropTypes.number,
};

EditChannelDescription.defaultProps = {
  channelDescription: '',
};

export default React.memo(EditChannelDescription);
