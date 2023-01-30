import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import Form, { TextField } from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import { RISK } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { CONFIG, TEMPLATE_CONFIG } from './config';
import styles from './styles';

export const CONTENT = {
  id: 'content',
  name: 'content',
  label: 'What is the risk?',
  placeholder: 'i.e. Travel by Coach',
  type: 'text',
  required: true,
  autoFocus: true,
};

export class AddRisk extends PureComponent {
  state = {};

  handleClose = () => {
    PORTAL_HELPERS.close(this.props);
  };

  handleCreateSuccess = ({ node }) => {
    this.handleClose();

    this.props.resaga.setValue({
      selectedRiskId: node.id,
      layout: 'risk',
    });
  };

  handleValidSubmit = ({ content, description }) => {
    const { id } = this.props;

    const node = {
      type: RISK,
      parentNodeId: id,
      content,
      customData: {
        description,
      },
    };

    return NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId: id,
        childKey: 'risks',
        onSuccess: this.handleCreateSuccess,
      },
      this.props,
    );
  };

  renderSaveCancelButton = () => (
    <GridContainer alignItems="center">
      <GridItem xs />

      <GridItem>
        <Button size="xs" color="gray" onClick={this.handleClose}>
          Discard
        </Button>
      </GridItem>

      <GridItem>
        <Button size="xs" color="primary" type="submit">
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>Continue</GridItem>
            <GridItem>
              <Icon icon="lnr-chevron-right" size="xsmall" paddingLeft />
            </GridItem>
          </GridContainer>
        </Button>
      </GridItem>
    </GridContainer>
  );

  renderContent = () => {
    const { classes } = this.props;

    return (
      <Form onValidSubmit={this.handleValidSubmit}>
        <GridContainer direction="column">
          <GridItem>
            <TextField {...CONTENT} />
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
                  placeholder="Short description (optional)"
                  lines={2}
                  className={classes.rte}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <Hr half />
          <GridItem>{this.renderSaveCancelButton()}</GridItem>
        </GridContainer>
      </Form>
    );
  };

  render = () => (
    <Dialog maxWidth="xs" fullWidth open onClose={this.handleClose}>
      <DialogTitle noPaddingBottom>
        <Title heading="Risk Activity" />
        <CloseButton onClick={this.handleClose} />
      </DialogTitle>
      <DialogContent halfPaddingTop>{this.renderContent()}</DialogContent>
    </Dialog>
  );
}

AddRisk.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
};

AddRisk.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'AddRisk' }),
  resaga(TEMPLATE_CONFIG),
  resaga(CONFIG),
)(AddRisk);
