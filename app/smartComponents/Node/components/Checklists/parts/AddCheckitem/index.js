import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DO_NOTHING, OUTSTANDING } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { ClickAwayListener, Fade } from 'components/material-ui';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'ugcomponents/Buttons/Button';
import Form from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import { InlineText } from 'ugcomponents/Inputs';
import { CHECKITEM, CHECKLISTS } from 'utils/modelConstants';
import { CONFIG } from './config';
import styles from './styles';

export class AddCheckitem extends PureComponent {
  state = {
    addItemHover: false,
    focusAddItem: false,
    content: '',
    loading: false,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.inputProps = {
      classes: {
        underline: classes.underline,
        focused: classes.focused,
        error: classes.error,
        disabled: classes.disabled,
      },
    };
  };

  onErrorHandle = () => this.setState({ loading: false });

  handleTextChange = content => this.setState({ content });

  createNode = ({ content }, resetForm) => {
    const { parentNodeId, lastNodeId, insertLocation, hashkey } = this.props;

    if (!content) {
      this.discardAddItem();
      return DO_NOTHING;
    }

    // create 1 node at a time
    if (this.creatingNode()) {
      return DO_NOTHING;
    }

    this.setState({ loading: true });

    const node = { content, type: CHECKITEM, status: OUTSTANDING };

    return NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId,
        lastNodeId,
        childKey: CHECKLISTS,
        onSuccess: this.createNodeSuccess(resetForm, parentNodeId, hashkey),
        onError: this.onErrorHandle,
        insertLocation,
      },
      this.props,
    );
  };

  createNodeSuccess = (resetForm, parentNodeId, hashkey) => () => {
    this.setState({ content: '', loading: false });
    resetForm();
    this.content.focus();

    if (hashkey) {
      NODE_API_HELPERS.deleteTempNode(
        {
          nodeId: hashkey,
          childKey: CHECKLISTS,
          parent: parentNodeId,
          onSuccess: this.props.resaga.setValue({ editingCheckItem: false }),
        },
        this.props,
      );
    }
  };

  creatingNode = () => {
    const { creatingChild, creatingNext } = this.props;
    const { loading } = this.state;

    return creatingChild || creatingNext || loading;
  };

  focusAddItem = () => {
    this.setState({ focusAddItem: true });
  };

  discardAddItem = () => {
    const { hashkey, parentNodeId } = this.props;
    if (hashkey) {
      NODE_API_HELPERS.deleteTempNode(
        {
          nodeId: hashkey,
          childKey: 'checklists',
          parent: parentNodeId,
          onSuccess: this.props.resaga.setValue({ editingCheckItem: false }),
        },
        this.props,
      );
    }
    this.setState({ focusAddItem: false, loading: false }, this.form.resetForm);
    this.content.blur();
  };

  clickAwayAddItem = () => {
    const { content } = this.state;

    if (!content) {
      return this.discardAddItem();
    }

    return DO_NOTHING;
  };

  handleRef = key => ref => {
    this[key] = ref;
  };

  mouseEnterAddItem = () => this.setState({ addItemHover: true });

  mouseLeaveAddItem = () => this.setState({ addItemHover: false });

  renderAddCheckButtons = () => {
    const { classes, hashkey } = this.props;
    const { focusAddItem, content } = this.state;

    if (!content) {
      return null;
    }

    if ((!focusAddItem || !content) && !hashkey) {
      return null;
    }

    return (
      <Fade in={focusAddItem}>
        <div className={classes.buttons}>
          <Button
            disabled={this.creatingNode()}
            inline
            type="submit"
            size="xsmall"
            color="green"
          >
            Save
          </Button>
          <Button inline size="xsmall" onClick={this.discardAddItem}>
            Cancel
          </Button>
        </div>
      </Fade>
    );
  };

  render = () => {
    const { classes } = this.props;
    const { addItemHover, focusAddItem } = this.state;

    return (
      <GridItem className={classes.addItem}>
        <ClickAwayListener onClickAway={this.clickAwayAddItem}>
          <GridContainer>
            <GridItem className={classes.addItemIcon}>
              <Fade in={addItemHover || focusAddItem}>
                <div>
                  <Icon size="small" color="success" icon="lnr-plus" />
                </div>
              </Fade>
            </GridItem>
            <GridItem className={classes.grow}>
              <Form
                onValidSubmit={this.createNode}
                ref={this.handleRef('form')}
              >
                <div
                  className={classnames(classes.addItemText)}
                  onMouseEnter={this.mouseEnterAddItem}
                  onMouseLeave={this.mouseLeaveAddItem}
                >
                  <InlineText
                    fullWidth
                    inputRef={this.handleRef('content')}
                    onChange={this.handleTextChange}
                    name="content"
                    placeholder="Add new task"
                    onFocus={this.focusAddItem}
                    InputProps={this.inputProps}
                  />
                </div>
                {this.renderAddCheckButtons()}
              </Form>
            </GridItem>
          </GridContainer>
        </ClickAwayListener>
      </GridItem>
    );
  };
}

AddCheckitem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  parentNodeId: PropTypes.number,
  lastNodeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  insertLocation: PropTypes.string,
  hashkey: PropTypes.string,

  // resaga props

  creatingChild: PropTypes.bool,
  creatingNext: PropTypes.bool,
};

AddCheckitem.defaultProps = {
  parentNodeId: 0,
  lastNodeId: 0,

  creatingChild: false,
  creatingNext: false,
};

export default compose(
  withStyles(styles, { name: 'AddCheckitem' }),
  resaga(CONFIG),
)(AddCheckitem);
