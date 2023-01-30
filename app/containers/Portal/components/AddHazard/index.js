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
import RatingForm, {
  IMPACT_LEVELS,
  LIKELIHOOD_LEVELS,
} from 'smartComponents/Node/components/Rating/components/RatingForm';
import RiskRating from 'smartComponents/Node/components/Rating/components/RiskRating';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import Form, { TextField } from 'ugcomponents/Form';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import { HAZARD } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export const CONTENT = {
  id: 'content',
  name: 'content',
  label: 'Types and Causes',
  placeholder: 'i.e. Travel sickness',
  type: 'text',
  required: true,
  autoFocus: true,
};

export const RESPONSIBILITY = {
  id: 'responsibility',
  name: 'responsibility',
  label: 'Responsibility',
  placeholder: 'Who is responsible?',
  type: 'text',
};

export const WHEN = {
  id: 'when',
  name: 'when',
  label: 'When',
  placeholder: 'When does this apply?',
  type: 'text',
};

export const DONE = {
  id: 'done',
  name: 'done',
  label: 'Done',
  placeholder: 'Any notes about completion?',
  type: 'text',
};

export class AddHazard extends PureComponent {
  state = {
    likelihood: 0,
    impact: 0,
  };

  handleClose = () => {
    PORTAL_HELPERS.close(this.props);
  };

  handleCreateSuccess = () => {
    this.handleClose();
  };

  selectLikelihood = likelihood => this.setState({ likelihood });

  selectImpact = impact => this.setState({ impact });

  handleValidSubmit = ({ content, ...customData }) => {
    const { parentNodeId } = this.props;

    const node = {
      type: HAZARD,
      parentNodeId,
      content,
      customData,
    };

    return NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId,
        onSuccess: this.handleCreateSuccess,
      },
      this.props,
    );
  };

  renderSaveCancelButton = () => {
    const { classes } = this.props;
    const { likelihood, impact } = this.state;

    return (
      <GridContainer alignItems="center">
        <GridItem xs>
          <GridContainer alignItems="center">
            <GridItem>
              <GridContainer alignItems="center" spacing={0}>
                <GridItem>
                  <div className={classes.heading}>Risk Rating</div>
                </GridItem>
                <GridItem>
                  <RiskRating help />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <RiskRating impact={impact} likelihood={likelihood} />
            </GridItem>
            <GridItem />
          </GridContainer>
        </GridItem>

        <GridItem>
          <Button size="xs" color="gray" onClick={this.handleClose}>
            Discard
          </Button>
        </GridItem>

        <GridItem>
          <Button size="xs" color="primary" type="submit">
            Save
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

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
                <div className={classes.heading}>Control Measures</div>
              </GridItem>
              <GridItem>
                <SimpleRTE
                  name="control"
                  value=""
                  placeholder="i.e. Instruct individuals to report any signs of illness to staff when travelling."
                  lines={2}
                  className={classes.rte}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>What is the likelihood of this occurring?</GridItem>
              <GridItem>
                <RatingForm
                  name="likelihood"
                  levels={LIKELIHOOD_LEVELS}
                  onChange={this.selectLikelihood}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>How severe could the impact be?</GridItem>
              <GridItem>
                <RatingForm
                  name="impact"
                  levels={IMPACT_LEVELS}
                  onChange={this.selectImpact}
                />
              </GridItem>
            </GridContainer>
          </GridItem>

          <GridItem>
            <TextField {...RESPONSIBILITY} />
          </GridItem>

          <GridItem>
            <TextField {...WHEN} />
          </GridItem>

          <GridItem>
            <TextField {...DONE} />
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
        <Title heading="Risks and Hazards" />
        <CloseButton onClick={this.handleClose} />
      </DialogTitle>
      <DialogContent halfPaddingTop>{this.renderContent()}</DialogContent>
    </Dialog>
  );
}

AddHazard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  parentNodeId: PropTypes.number,

  // resaga props
};

AddHazard.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'AddHazard' }),
  resaga(CONFIG),
)(AddHazard);
