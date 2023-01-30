import React, { useEffect } from 'react';
import { FormLabel, Slide, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import _ from 'lodash';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import Button from 'viewComponents/Button';
import { FormattedMessage as M } from 'react-intl';
import { useImmer } from 'use-immer';
import uuidv4 from 'uuid/v4';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import { PORTAL_HELPERS } from '../../helpers';
import JDialog from '../../../../ugcomponents/JDialog';
import JText from '../../../../components/JText';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';
import { withSMDown } from '../../../../components/material-ui/hocs/withMediaQuery';
import { VARIANTS } from '../../../../variantsConstants';
import m from './mesage';
import TextField from '../../../../components/Inputs/TextField';
import inputs from './inputs';
import { makeStyles } from '../../../../components/material-ui';
import Hr from '../../../../components/Hr';
import {
  EMAIL_ME_EVENT_ADDRESS,
  LIST_TEMPLATE_CUSTOM_DATA,
  PATCH_TEMPLATE_CUSTOM_DATA,
  TEMPLATE_API,
} from '../../../../apis/constants';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { UGROOP_TRIP_SUBDOMAIN } from '../../../../appConstants';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { selectCurrentLoginPerson } from '../../../../datastore/stormPathStore/selectors';
import { NameUtility } from '../../../../utils/displayNameUtility';
/* eslint-disable no-param-reassign */

const styles = ({ colors }) => ({
  root: {},
  grow: {
    flex: '1',
  },
  label: {
    color: colors.listFontColor,
    fontWeight: 600,
  },
  textFieldRoot: {
    padding: 0,
    zIndex: 2,
    background: 'unset',
    boxShadow: 'unset',
    color: '#607D8B',
    '&:hover': {
      background: '#f6f8fa',
    },
    width: '100%',
  },
  textFieldInput: {
    width: '100%',
  },
  buttonLabel: {
    textDecoration: 'underline',
  },
});

const StyledButton = withStyles({
  label: {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})(Button);

const useStyles = makeStyles(styles);
export function CreateTourEmail(props) {
  const { templateId, templateName } = props;
  // eslint-disable-next-line no-unused-vars
  let timer;
  const [data, setData] = useImmer({
    emailAddress: '',
    loading: true,
    generateEmailLoading: false,
    sendingEmailLoading: false,
    showSent: false,
    copy: false,
  });
  const currentPerson = useSelector(state => selectCurrentLoginPerson()(state));
  const updateTemplateAttribute = payload => {
    props.resaga.dispatchTo(TEMPLATE_API, PATCH_TEMPLATE_CUSTOM_DATA, {
      payload: {
        id: templateId,
        data: payload,
      },
      onSuccess: res => {
        setData(draft => {
          draft.emailAddress = res.email;
          draft.generateEmailLoading = false;
        });
      },
    });
  };

  const setShowSent = () => {
    setData(draft => {
      draft.showSent = true;
    });
    timer = setTimeout(() => {
      setData(draft => {
        draft.showSent = false;
      });
    }, 1000);
  };

  const emailMeEventAddress = () => {
    setData(draft => {
      draft.sendingEmailLoading = true;
    });
    props.resaga.dispatchTo(TEMPLATE_API, EMAIL_ME_EVENT_ADDRESS, {
      payload: {
        id: templateId,
        data: {
          contentType: 'sendEventEmailSetting',
          content: {
            userName: NameUtility.userDisplayName(currentPerson),
            content: templateName,
            nodeId: templateId,
            senderId: currentPerson.id,
            eventEmailAddress: data.emailAddress,
          },
          receivers: [
            { type: 'email', content: { email: currentPerson.email } },
          ],
        },
      },
      onSuccess: () => {
        setData(draft => {
          draft.sendingEmailLoading = false;
        });
        setShowSent();
      },
    });
  };

  useEffect(
    () =>
      function cleanup() {
        timer = null;
      },
    [],
  );
  useEffect(() => {
    if (props.templateId) {
      props.resaga.dispatchTo(TEMPLATE_API, LIST_TEMPLATE_CUSTOM_DATA, {
        payload: {
          query: {
            where: {
              parentNodeId: templateId,
            },
          },
        },
        onSuccess: result => {
          if (
            result.templateCustomData &&
            result.templateCustomData.length > 0
          ) {
            const templateCustomData = result.templateCustomData;
            if (isEmptyString(templateCustomData[0].email)) {
              // generate a new email address
              const email = generateEmail();
              updateTemplateAttribute({
                email,
              });
            } else {
              setData(draft => {
                draft.emailAddress = templateCustomData[0].email;
              });
            }
          }
          setData(draft => {
            draft.loading = false;
          });
        },
      });
    }
  }, [props.templateId]);

  const { smDown } = props;
  const classes = useStyles();
  const mobileProps = LOGIC_HELPERS.ifElse(
    smDown,
    {
      fullScreen: true,
      TransitionComponent: Slide,
      TransitionProps: { direction: 'up' },
    },
    {},
  );

  const handleCloseDialog = () => {
    PORTAL_HELPERS.close(props);
  };
  const generateEmail = () => {
    const safeUserName = _.toLower(
      _.replace(`tour_${templateId}`, /[\s@]/g, '_'),
    );
    const uuid = uuidv4().toString();
    const hashName = _.replace(uuid, /-*/g, '');
    const emailFinal = `${safeUserName}+${hashName}@${UGROOP_TRIP_SUBDOMAIN}`;
    return emailFinal;
  };

  const generateAndUpdateTemplateEmail = () => {
    setData(draft => {
      draft.generateEmailLoading = true;
    });
    const email = generateEmail();
    updateTemplateAttribute({
      email,
    });
  };

  const onCopy = () => {
    setData(draft => {
      draft.copy = true;
    });
  };

  const onRest = () => {
    setData(draft => {
      draft.copy = false;
    });
  };

  const showCopyiedText = () =>
    data.copy ? (
      <GridItem>
        <JText xs success>
          copied
        </JText>
      </GridItem>
    ) : (
      ''
    );

  const displayGeneratingEmailLoad = () =>
    data.generateEmailLoading ? (
      <GridItem>
        <LoadingIndicator margin={false} size={15} />
      </GridItem>
    ) : null;

  const displayEmailingLoad = () => {
    if (data.sendingEmailLoading) {
      return (
        <GridItem data-testid="sendingEmailLoading">
          <LoadingIndicator margin={false} size={15} />
        </GridItem>
      );
    }
    if (data.showSent) {
      return (
        <GridItem>
          <JText xs success>
            sent
          </JText>
        </GridItem>
      );
    }
    return null;
  };

  const displayContent = () =>
    data.loading ? (
      <GridItem xs={12} sm={12} md={12} data-testid="content-loading">
        <LoadingIndicator />
      </GridItem>
    ) : (
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer direction="column">
          <GridItem>
            <GridContainer direction="column">
              <GridItem>
                <FormLabel className={classes.label}>
                  <M {...m.label} />
                </FormLabel>
              </GridItem>
              <GridItem>
                <TextField
                  className={classes.textFieldRoot}
                  InputProps={{
                    classes: {
                      input: classes.textFieldInput,
                    },
                  }}
                  {...inputs.TITLE}
                  value={data.emailAddress}
                  data-testid="emailTextField"
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <GridContainer>
              <GridItem>
                <StyledButton
                  variant={VARIANTS.INLINE}
                  color="darkgray"
                  onClick={generateAndUpdateTemplateEmail}
                  disabled={data.loading}
                >
                  Generate a new email address
                </StyledButton>
              </GridItem>
              {displayGeneratingEmailLoad()}
            </GridContainer>
          </GridItem>
          <GridItem>
            <GridContainer>
              <GridItem>
                <CopyToClipboard text={data.emailAddress} onCopy={onCopy}>
                  <StyledButton
                    variant={VARIANTS.INLINE}
                    color="darkgray"
                    onMouseLeave={onRest}
                  >
                    Copy Email
                  </StyledButton>
                </CopyToClipboard>
              </GridItem>
              {showCopyiedText()}
            </GridContainer>
          </GridItem>
          <GridItem>
            <GridContainer>
              <GridItem>
                <StyledButton
                  variant={VARIANTS.INLINE}
                  color="darkgray"
                  onClick={emailMeEventAddress}
                >
                  Email me this address
                </StyledButton>
              </GridItem>
              <GridItem>{displayEmailingLoad()}</GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );

  return (
    <JDialog
      maxWidth="xs"
      open
      loading={false}
      disabled={false}
      fullWidth
      notesTextWrap={false}
      hideSubmitButton
      onButtonClose={handleCloseDialog}
      header={<JText xl>Add Events via Email</JText>}
      {...mobileProps}
    >
      <GridContainer spacing={2}>
        {displayContent()}
        <GridItem xs={12} sm={12} md={12}>
          <Hr noMarginBottom />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <JText nowrap={false}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Tip: Don't share this email address. Anyone who has it can add Event
            as you. When composing emails, the event title goes in the subject
            and the event description in the body.
          </JText>
        </GridItem>
      </GridContainer>
    </JDialog>
  );
}

CreateTourEmail.propTypes = {
  id: PropTypes.number,
  smDown: PropTypes.bool,
  cb: PropTypes.func,
  resaga: PropTypes.object,
  templateId: PropTypes.number,
  templateName: PropTypes.string,
};

export default compose(
  resaga(),
  withSMDown,
)(React.memo(CreateTourEmail));

CreateTourEmail.defaultProps = {};
