import React, { useContext } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import resaga from 'resaga';
import { makeStyles } from 'components/material-ui';
import { isMobile } from 'react-device-detect';
import Dialog from '../../../../components/Dialog';
import DialogTitle from '../../../../components/Dialog/UGDialogTitle';
import DialogContent from '../../../../components/Dialog/UGDialogContent';
import { PORTAL_HELPERS } from '../../helpers';
import {
  CloseButton,
  Title,
} from '../../../../ugcomponents/DialogForm/Complex';
import Form from '../../../../ugcomponents/Form';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import Hr from '../../../../components/Hr';
import Button from '../../../../viewComponents/Button';
import { H5 } from '../../../../viewComponents/Typography';
import m from './messages';
import { CONFIG } from './config';
import { StreamChatContext } from '../../../../lib/streamChat';
import { useMessengerContext } from '../../../StreamChat/messageStateContext';
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
    <Title heading="Hide Chat Group" />
    <CloseButton onClick={handleClose} />
  </>
);

function HideChannelDialog(props) {
  const client = useContext(StreamChatContext);
  const [, dispatchCtx] = useMessengerContext();
  const handleValidSubmit = async () => {
    const channel = await client.queryChannels({
      cid: props.channelId,
    });
    try {
      const data = await channel[0].hide();
      if (data) {
        PORTAL_HELPERS.close(props);
        if (isMobile) {
          // bring the slide in to reset the active channels
          dispatchCtx.toggleChannelSliderValue();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const renderContent = () => (
    <Form onValidSubmit={handleValidSubmit}>
      <GridContainer direction="column">
        <GridItem>
          <H5>
            <FormattedMessage {...m.archiveDescription} />
          </H5>
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
      <GridItem xs />
      <GridItem>
        <Button size="xs" color="primary" type="submit">
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>Continue</GridItem>
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

HideChannelDialog.propTypes = {
  channelId: PropTypes.string,
};

export default compose(resaga(CONFIG))(
  injectIntl(React.memo(HideChannelDialog)),
);
