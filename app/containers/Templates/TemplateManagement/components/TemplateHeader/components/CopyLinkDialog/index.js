import { FormLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  POST_HASHKEY,
  REMOVE_HASHKEY,
  TEMPLATE_API,
  UPDATE_HASHKEY,
} from 'apis/constants';
import { DO_NOTHING, READ_ONLY, DEFAULT_MAILTO_LINK_TEXT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import TextField from 'components/Inputs/TextField/index';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { AssignedOrganiser } from 'smartComponents/Node/parts/AssignedOrganiser';
import DescriptionHashkey from 'smartComponents/Node/parts/DescriptionHashkey';
import DisableRyi from 'smartComponents/Node/parts/DisableRyi';
import { TourBannerUploader } from 'smartComponents/Node/parts/TourBanner';
import Dialog from 'ugcomponents/Dialog';
import { isEmptyString } from 'utils/stringAdditions';
import Button from 'viewComponents/Button';
import { Facebook, Mail, Twitter, WhatsApp } from 'viewComponents/ShareButtons';
import { H5 } from 'viewComponents/Typography';
import classnames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG, TEMPLATE_ID } from './defines/config';
import inputs from './defines/inputs';
import m from './defines/message';
import styles from './style';

export class CopyDialog extends PureComponent {
  state = {
    copied: false,
    disableRyi: false,
  };

  onSuccessGeneratetoken = () => {
    const { templateId } = this.props;
    const { disableRyi } = this.state;
    if (disableRyi) {
      return this.props.resaga.dispatchTo(TEMPLATE_API, UPDATE_HASHKEY, {
        payload: {
          id: templateId,
          disableRYI: disableRyi,
        },
      });
    }
    return DO_NOTHING;
  };

  resetState = () => this.setState({ disableRyi: false });

  onClickDisableRYI = () => {
    const { disableRyi } = this.state;
    this.setState({ disableRyi: !disableRyi });
  };

  copy = () => {
    this.setState({ copied: true });
  };

  toolTipClose = () => {
    setTimeout(() => {
      this.setState({ copied: false });
    }, 500);
  };

  resetCopy = () => {
    this.setState({ copied: false });
  };

  closeCopyLinkDialog = () => {
    this.props.resaga.setValue({
      showCopyLinkDialog: false,
    });
    this.resetState();
  };

  removeHashToken = () => {
    this.props.resaga.dispatchTo(TEMPLATE_API, REMOVE_HASHKEY, {
      payload: { id: this.props.templateId },
      onSuccess: this.resetState,
    });
  };

  generateHashToken = () => {
    this.props.resaga.dispatchTo(TEMPLATE_API, POST_HASHKEY, {
      payload: { id: this.props.templateId },
      onSuccess: this.onSuccessGeneratetoken,
    });
  };

  generatePublicTemplateLink = hashkey => {
    const { origin } = window.location;
    return `${origin}/public/template/${hashkey}`;
  };

  generateCopyButton = url => {
    const { classes } = this.props;
    const toolTipTitle = this.state.copied ? 'Copied' : '';
    const tooltipProps = { title: toolTipTitle };

    return (
      <CopyToClipboard text={url} onCopy={this.copy}>
        <Button
          color="primary"
          tooltipProps={tooltipProps}
          className={classes.copy}
          onMouseLeave={this.resetCopy}
        >
          Copy Link to Clipboard
        </Button>
      </CopyToClipboard>
    );
  };

  generateShareFooter = url => {
    const { classes, title } = this.props;
    if (!url) {
      return null;
    }

    const body = `${title || DEFAULT_MAILTO_LINK_TEXT}: ${url}`;

    return (
      <div className={classes.share}>
        <H5>Share this link directly to your social accounts or email: </H5>
        <div className={classes.shareButtons}>
          <Facebook
            link={url}
            message={title}
            tooltipProps={{
              title: 'Post to Facebook',
            }}
          />
          <Twitter
            link={url}
            message={title}
            tooltipProps={{
              title: 'Post to Twitter',
            }}
          />
          <WhatsApp
            link={url}
            message={title}
            tooltipProps={{
              title: 'Post to WhatsApp',
            }}
          />
          <Mail
            link={body}
            message={title}
            tooltipProps={{
              title: 'Send email',
            }}
          />
        </div>
      </div>
    );
  };

  // region Dialog Sub Component Render
  dialogContent = url => {
    const { classes, disableRYI } = this.props;

    if (isEmptyString(url)) {
      return (
        <GridContainer className={classes.emptyContent}>
          <GridItem>
            <DisableRyi
              id={this.props.templateId}
              disableRYI={this.state.disableRyi}
              onClick={this.onClickDisableRYI}
            />
          </GridItem>
        </GridContainer>
      );
    }

    return (
      <GridContainer className={classes.content}>
        <GridItem xs={12}>
          <FormLabel className={classes.label}>
            <M {...m.label} />
          </FormLabel>
          <TextField
            className={classes.textFieldRoot}
            InputProps={{
              classes: {
                input: classes.textFieldInput,
              },
            }}
            {...inputs.TITLE}
            value={url}
            disabled
          />
        </GridItem>
        <GridItem xs={12}>
          <GridContainer direction="column">
            <GridItem>
              <JText bold md gray>
                Assigned Organiser
              </JText>
            </GridItem>
            <GridItem>
              <AssignedOrganiser id={this.props.templateId} />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12}>
          <GridContainer direction="column">
            <GridItem>
              <JText bold md gray>
                Banner
              </JText>
            </GridItem>
            <GridItem>
              <TourBannerUploader id={this.props.templateId} />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12}>
          <DescriptionHashkey
            id={this.props.templateId}
            readOnly={disableRYI}
            variant={LOGIC_HELPERS.ifElse(disableRYI, READ_ONLY)}
          />
        </GridItem>
        <GridItem>
          <DisableRyi id={this.props.templateId} />
        </GridItem>
      </GridContainer>
    );
  };

  dialogBox = (url, props) => {
    const { classes } = this.props;
    const customChildren = {
      content: this.dialogContent(url),
      footer: this.generateShareFooter(url),
    };
    const customClassnames = {
      content: classnames(classes.noHr, !url && classes.paddingButtom),
      headline: classes.greenIcon,
      cancelButton: classes.removeLink,
    };
    return (
      <Dialog
        {...props}
        customChildren={customChildren}
        customClassnames={customClassnames}
      />
    );
  };

  dialogBoxState = () => {
    let button = 2;
    let url = this.generatePublicTemplateLink(this.props.hashkey);
    let confirmButtonNode = this.generateCopyButton(url);

    if (isEmptyString(this.props.hashkey)) {
      url = '';
      button = 1;
      confirmButtonNode = null;
    }

    return { url, button, confirmButtonNode };
  };
  // endregion

  render() {
    const template = 'add';
    const headlineIcon = 'lnr-link';
    const cancelFunc = this.removeHashToken;
    const confirmFunc = this.generateHashToken;
    const headlineTitle = <M {...m.tourLink} />;
    const headlineText = <M {...m.copyMessage} />;
    const cancelButton = <M {...m.removeButton} />;
    const confirmButton = <M {...m.generateButton} />;

    const { url, button, confirmButtonNode } = this.dialogBoxState();
    const { title, showCopyLinkDialog: open, loading: disabled } = this.props;
    const dialogTitle = !isEmptyString(title) ? title : <M {...m.tourLink} />;

    return this.dialogBox(url, {
      open,
      disabled,
      button,
      template,
      dialogTitle,
      headlineIcon,
      headlineText,
      headlineTitle,
      cancelButton,
      confirmButton,
      confirmFunc,
      cancelFunc,
      confirmButtonNode,
      onCloseFunc: this.closeCopyLinkDialog,
    });
  }
}

CopyDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object,
  showCopyLinkDialog: PropTypes.bool,
  title: PropTypes.string,
  hashkey: PropTypes.string,
  hashkeyDescription: PropTypes.string,
  templateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
  disableRYI: PropTypes.bool,
};

CopyDialog.defaultProps = {
  showCopyLinkDialog: false,
  loading: false,
  disableRYI: false,
};

export default compose(
  withStyles(styles, { name: 'CopyDialog' }),
  resaga(TEMPLATE_ID),
  resaga(CONFIG),
)(CopyDialog);
