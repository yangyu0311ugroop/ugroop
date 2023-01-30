import React from 'react';
import { RTE_IMAGE_ACCEPT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import { Popper, Paper, ClickAwayListener } from 'components/material-ui';
import Icon from 'ugcomponents/Icon';
import { withStyles } from '@material-ui/core/styles';
import Attachment from 'smartComponents/Inputs/Attachments';
import Tooltip from '@material-ui/core/Tooltip';
/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */

export function undo() {
  this.quill.history.undo();
}

export function redo() {
  this.quill.history.redo();
}

/*
 * Custom toolbar component including insertStar button and dropdowns
 */

export const EmoijLists = [
  '😀',
  '😁',
  '😂',
  '😃',
  '😉',
  '😋',
  '😎',
  '😍',
  '😗',
  '🤗',
  '🤔',
  '😣',
  '😫',
  '😴',
  '😌',
  '🤓',
  '😛',
  '😜',
  '😠',
  '😇',
  '😷',
  '💪',
  '👈',
  '👉',
  '👆',
  '👇',
  '🖖',
  '🖐',
  '👌',
  '👍',
  '👎',
  '✊',
  '👊',
  '👏',
  '🙌',
  '🙏',
  '🎉',
  '💯',
];

export const styleSheet = {
  popUpContainer: {
    width: 200,
    height: 150,
  },
  iconSize: {
    fontSize: 20,
  },
  imageBtn: {
    /* fontSize: '10px !important',
    paddingTop: '0px !important', */
    marginTop: '8 px !important',
  },
  emojiBtn: {
    paddingTop: '1px !important',
  },
  align: {
    marginTop: '-2px !important',
  },
  indent: {
    marginTop: '-2px !important',
  },
  hyperlink: {
    marginTop: '4px !important',
  },
  bgColor: {
    marginTop: '2px !important',
    paddingTop: '8px !important',
  },
  clearStyle: {
    paddingTop: '6px !important',
  },
  history: {
    paddingTop: '4px !important',
    marginTop: '-2px !important',
  },
  unorderedList: {
    paddingTop: '2px !important',
  },
  header: {
    paddingTop: '8px !important',
  },
  highlight: {
    paddingTop: '8px !important',
  },
  popperContainer: {
    padding: 16,
    width: 240,
  },
  discussionPopperContainer: {
    width: 217,
    height: 291,
    padding: 16,
  },
  popper: {
    marginTop: 4,
    zIndex: 9999,
    fontWeight: 400,
    width: 300,
  },
  dropzone: {
    '& > input': {
      width: 0,
    },
  },
};

export class CustomToolbar extends React.PureComponent {
  state = {
    anchorEl: null,
    clickAway: true,
  };

  buttonRef = node => {
    this.button = node;
  };

  openPopper = event => {
    const { anchorEl } = this.state;
    this.setState({ anchorEl: anchorEl ? null : event.currentTarget });
  };

  closePopper = () => {
    this.popperClose = this.setState({ anchorEl: null });
  };

  handlePopperClickAway = () => {
    const { clickAway } = this.state;
    if (clickAway) {
      this.closePopper();
    }
  };

  handleEmojiClick = index => event => {
    event.preventDefault();
    this.closePopper();
    this.insertEmoij(index);
  };

  header = () => (
    <Tooltip title="Header" placement="top">
      <GridItem className={this.props.classes.header}>
        <select className="ql-header" defaultValue={7}>
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="7" />
        </select>
      </GridItem>
    </Tooltip>
  );

  hyperLink = () => (
    <Tooltip title="Create Link" placement="top">
      <div className={this.props.classes.hyperlink}>
        <button type="button" className="ql-link" />
      </div>
    </Tooltip>
  );

  fontSize = () => (
    <Tooltip title="Size" placement="top">
      <div className="ql-formats">
        <select className="ql-size">
          <option value="small" />
          <option value="" />
          <option value="large" />
          <option value="huge" />
        </select>
      </div>
    </Tooltip>
  );

  fontStyle = () => (
    <GridItem className="ql-formats">
      <Tooltip title="Bold" placement="top">
        <button type="button" className="ql-bold" />
      </Tooltip>
      <Tooltip title="Italic" placement="top">
        <button type="button" className="ql-italic" />
      </Tooltip>
      <Tooltip title="Underline" placement="top">
        <button type="button" className="ql-underline" />
      </Tooltip>
    </GridItem>
  );

  list = () => (
    <GridItem className="ql-formats">
      <GridContainer>
        <GridItem>
          <Tooltip title="Ordered List" placement="top">
            <button type="button" className="ql-list" value="ordered" />
          </Tooltip>
        </GridItem>
        <GridItem className={this.props.classes.unorderedList}>
          <Tooltip title="Unordered List" placement="top">
            <button type="button" className="ql-list" value="bullet" />
          </Tooltip>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  textHighLight = () => (
    <Tooltip title="Text Color" placement="top">
      <GridItem className={this.props.classes.highlight}>
        <select className="ql-color">
          <option value="#000000" />
          <option value="#FFFFFF" />
          <option value="#417fe8" />
          <option value="#459249" />
          <option value="#5d5acc" />
          <option value="#d4587c" />
          <option value="#ff7a00" />
          <option value="#b3bcc5" />
          <option value="#595F6F" />
          <option value="#023B2A" />
        </select>
      </GridItem>
    </Tooltip>
  );

  bgHighLight = () => (
    <Tooltip title="Background Color" placement="top">
      <GridItem className={this.props.classes.bgColor}>
        <select className="ql-background">
          <option value="#000000" />
          <option value="#FFFFFF" />
          <option value="#458aff" />
          <option value="#57b35c" />
          <option value="#7370e8" />
          <option value="#fd6f97" />
          <option value="orange" />
          <option value="#b3bcc5" />
          <option value="#595F6F" />
          <option value="#023B2A" />
          <option value="transparent" title="transparent" />
        </select>
      </GridItem>
    </Tooltip>
  );

  video = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.hyperlink}>
        <Tooltip title="Video" placement="top">
          <button type="button" className="ql-video" />
        </Tooltip>
      </GridItem>
    );
  };

  photo = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.hyperlink}>
        <Tooltip title="Image" placement="top">
          <button
            type="button"
            ref={this.buttonRef}
            className={classes.imageBtn}
          >
            <Icon icon="lnr-file-image" size="normal" />
          </button>
        </Tooltip>
      </GridItem>
    );
  };

  handleValueRef = r => {
    this.attachments = r;
  };

  renderDropZone = () => {
    const { disableImgUpload } = this.props;
    if (disableImgUpload) return null;
    return (
      <Attachment
        onUpload={this.insertImage}
        valueRef={this.handleValueRef}
        uploadLabel="Uploading..."
        simple
        accept={RTE_IMAGE_ACCEPT}
      >
        {this.photo()}
      </Attachment>
    );
  };

  align = () => (
    <GridItem className={this.props.classes.align}>
      <Tooltip title="Left Align" placement="top">
        <button type="button" className="ql-align" />
      </Tooltip>
      <Tooltip title="Center Align" placement="top">
        <button type="button" className="ql-align" value="center" />
      </Tooltip>
      <Tooltip title="Right Align" placement="top">
        <button type="button" className="ql-align" value="right" />
      </Tooltip>
      <Tooltip title="Justify" placement="top">
        <button type="button" className="ql-align" value="justify" />
      </Tooltip>
    </GridItem>
  );

  indent = () => (
    <GridItem className={this.props.classes.indent}>
      <Tooltip title="Decrease Indent" placement="top">
        <button type="button" className="ql-indent" value="-1" />
      </Tooltip>
      <Tooltip title="Increase Indent" placement="top">
        <button type="button" className="ql-indent" value="+1" />
      </Tooltip>
    </GridItem>
  );

  emoij = () => {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <GridItem className="ql-formats">
        <button
          type="button"
          ref={this.buttonRef}
          onClick={this.openPopper}
          className={classes.emojiBtn}
        >
          <Icon icon="lnr-smile" size="small" />
        </button>
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          disablePortal
        >
          {this.renderPopperContent()}
        </Popper>
      </GridItem>
    );
  };

  renderPopperContent = () => {
    const emoijItems = this.emoijItems();
    const { classes, discussion } = this.props;
    return (
      <ClickAwayListener onClickAway={this.handlePopperClickAway}>
        <Paper
          className={
            discussion
              ? classes.discussionPopperContainer
              : classes.popperContainer
          }
        >
          <GridContainer className={classes.popUpContainer} spacing={0}>
            {emoijItems}
          </GridContainer>
        </Paper>
      </ClickAwayListener>
    );
  };

  insertEmoij = index => {
    const { toolBarAction } = this.props;
    toolBarAction.insertEmoij(EmoijLists[index]);
  };

  insertImage = (id, file) => {
    const { toolBarAction } = this.props;
    toolBarAction.insertImage(id, file);
  };

  emoijItems = () =>
    EmoijLists.map((icon, index) => (
      <GridItem key={icon}>
        <button type="button" onClick={this.handleEmojiClick(index)}>
          <span className={this.props.classes.iconSize}>{icon}</span>
        </button>
      </GridItem>
    ));

  clearStyle = () => (
    <GridItem className={this.props.classes.clearStyle}>
      <Tooltip title="Clear Format" placement="top">
        <button type="button" className="ql-clean" />
      </Tooltip>
    </GridItem>
  );

  history = () => (
    <GridItem className={this.props.classes.history}>
      <Tooltip title="Undo" placement="top">
        <button type="button" className="ql-undo">
          <Icon icon="lnr-undo2" size="small" />
        </button>
      </Tooltip>
      <Tooltip title="Redo" placement="top">
        <button type="button" className="ql-redo">
          <Icon icon="lnr-redo2" size="small" />
        </button>
      </Tooltip>
    </GridItem>
  );

  render() {
    const { emojiOnly, readOnly, toolBarId } = this.props;
    const emoij = this.emoij();

    if (emojiOnly) {
      return <div id={toolBarId}>{emoij}</div>;
    }

    if (!readOnly) {
      const fontStyle = this.fontStyle();
      const list = this.list();
      const align = this.align();
      const indent = this.indent();
      const history = this.history();
      const header = this.header();
      const link = this.hyperLink();
      const video = this.video();
      const clearStyle = this.clearStyle();
      const highlight = this.textHighLight();
      const bghighlight = this.bgHighLight();
      const photo = this.renderDropZone();
      return (
        <GridContainer id={toolBarId}>
          {fontStyle}
          {list}
          {align}
          {indent}
          {emoij}
          {link}
          {video}
          {header}
          {highlight}
          {bghighlight}
          {clearStyle}
          {history}
          {photo}
        </GridContainer>
      );
    }
    return <div id={toolBarId} style={{ display: 'none' }} />;
  }
}

CustomToolbar.propTypes = {
  toolBarId: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  emojiOnly: PropTypes.bool,
  toolBarAction: PropTypes.object,
  classes: PropTypes.object.isRequired,
  discussion: PropTypes.bool,
  disableImgUpload: PropTypes.bool,
};

CustomToolbar.defaultProps = {
  discussion: false,
  disableImgUpload: false,
};

export default withStyles(styleSheet, { name: 'CustomToolbar' })(CustomToolbar);
