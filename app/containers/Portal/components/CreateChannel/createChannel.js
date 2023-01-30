import React, { useContext } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import resaga from 'resaga';
import { makeStyles } from 'components/material-ui';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useImmer } from 'use-immer';
import Dialog from '../../../../components/Dialog';
import DialogTitle from '../../../../components/Dialog/UGDialogTitle';
import DialogContent from '../../../../components/Dialog/UGDialogContent';
import { CONFIG } from './config';
import { PORTAL_HELPERS } from '../../helpers';
import {
  CloseButton,
  Title,
} from '../../../../ugcomponents/DialogForm/Complex';
import Form, { TextField } from '../../../../ugcomponents/Form';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import SimpleRTE from '../../../../ugcomponents/Inputs/SimpleRTE';
import Hr from '../../../../components/Hr';
import Button from '../../../../viewComponents/Button';
import { H5, H6 } from '../../../../viewComponents/Typography';
import m from './messages';
import { selectCurrentUserAccount } from '../../../../datastore/stormPathStore/selectors';
import { toConformStreamChatId } from '../../../../utils/stringAdditions';
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

export const CONTENT = {
  id: 'channelName',
  name: 'channelName',
  label: 'Name',
  placeholder: 'e.g. privacy-plan ',
  type: 'text',
  required: true,
  autoFocus: true,
  validText: '',
  validations: {
    matchRegexp: /^[a-zA-Z0-9@_-]*$/,
    maxLength: 64,
  },
  validationErrors: {
    matchRegexp:
      'Chat group name can only contain numbers, characters, dash, underscore and @ symbol. Try again?',
    maxLength: 'max length 64 characters',
  },
};

const useStyles = makeStyles(styles);

const renderTitle = handleClose => (
  <>
    <Title heading="Create a chat group" />
    <CloseButton onClick={handleClose} />
  </>
);

function CreateChannel(props) {
  const client = useContext(StreamChatContext);
  const [state, setState] = useImmer({
    error: null,
  });
  const handleValidSubmit = async ({ channelName, description }) => {
    const currentUser = props.currentUser;
    const { email, id } = currentUser;
    const conversation = client.channel(
      ChatTypes.UGroop,
      `${channelName}_${props.templateId}`,
      {
        name: channelName,
        description,
        members: [toConformStreamChatId(`${email}_${id}`)],
        templateId: props.templateId,
      },
    );
    try {
      await conversation.create();
      PORTAL_HELPERS.close(props);
    } catch (e) {
      if (e.message.includes('StreamChat error code 17:')) {
        setState(draft => {
          // eslint-disable-next-line no-param-reassign
          draft.error = 'That name is already taken by a channel';
        });
      } else {
        console.log(e);
      }
    }
  };

  const displayError = () => {
    if (state.error) {
      return (
        <GridItem>
          <H6 error>{state.error}</H6>
        </GridItem>
      );
    }
    return null;
  };

  const textOnChanges = () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.error = null;
    });
  };

  const renderContent = classes => (
    <Form onValidSubmit={handleValidSubmit}>
      <GridContainer direction="column">
        <GridItem>
          <H5>
            <FormattedMessage {...m.createChannelDescription} />
          </H5>
        </GridItem>
        <GridItem>
          <TextField {...CONTENT} onChange={textOnChanges} />
        </GridItem>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <div className={classes.heading}>Description</div>
            </GridItem>
            <GridItem>
              <SimpleRTE
                name="description"
                value=""
                placeholder="What's this chat group about? (optional)"
                lines={2}
                className={classes.rte}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <Hr half />
        {displayError()}
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
        <Button size="xs" color="gray" onClick={handleClose}>
          Discard
        </Button>
      </GridItem>

      <GridItem>
        <Button size="xs" color="primary" type="submit">
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>Create</GridItem>
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

CreateChannel.propTypes = {
  currentUser: PropTypes.object,
  templateId: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUserAccount(),
});

export default compose(
  connect(
    mapStateToProps,
    null,
  ),
  resaga(CONFIG),
)(injectIntl(React.memo(CreateChannel)));
