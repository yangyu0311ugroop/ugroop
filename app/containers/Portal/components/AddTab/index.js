import { CREATE_NEXT_NODE, NODE_API } from 'apis/constants';
import { PRIVACY_OPTIONS } from 'appConstants';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import inputs from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabHeader/components/EditTab/inputs';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { Select } from 'smartComponents/Inputs';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import Icon from 'ugcomponents/Icon';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TAB_OTHER } from 'utils/modelConstants';
import JButton from 'viewComponents/Button/variants/JButton';
import { FormattedMessage as M } from 'react-intl';
import {
  ONLY_ME,
  ORGANISERS,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import { CONFIG } from './config';
import styles from './styles';
import m from './messages';

export class AddTab extends PureComponent {
  state = {
    creating: false,
  };

  handleClose = () => {
    PORTAL_HELPERS.close(this.props);
  };

  handleValidSubmit = form => {
    const { creating } = this.state;

    if (creating) return null;

    return this.setState(
      {
        creating: true,
      },
      this.createTab(form),
    );
  };

  createTab = ({ content, customData, sharedWith }) => () => {
    const { templateId, parentId } = this.props;

    const node = {
      content,
      sharedWith,
      customData,
      type: TAB_OTHER,
    };

    this.props.resaga.dispatchTo(NODE_API, CREATE_NEXT_NODE, {
      payload: {
        nodeId: parentId,
        node,
        templateId,
      },
      onSuccess: this.handleCreateSuccess,
    });
  };

  handleCreateSuccess = ({ node: { id } }) => {
    this.setState({ creating: false });

    this.handleClose();

    this.openNewTab(id);
  };

  openNewTab = id => {
    const { history, location } = this.props;
    const { pathname } = location;

    return history.push(`${pathname}?tabId=${id}`);
  };

  renderFormButtons = () => {
    const { creating } = this.state;

    return (
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem>
            <JButton
              block
              bg="gray"
              padding="lg"
              bold
              onClick={this.handleClose}
            >
              Cancel
            </JButton>
          </GridItem>
          <GridItem xs>
            <JButton
              disabled={creating}
              block
              bg="green"
              padding="lg"
              bold
              type="submit"
            >
              Add
            </JButton>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderContent = () => {
    const { sharedWith } = this.state;

    return (
      <Formsy onValidSubmit={this.handleValidSubmit}>
        <GridContainer direction="column" spacing={3}>
          <Hr halfMarginBottom />

          <GridItem>
            <GridContainer direction="column" spacing={2}>
              <GridItem>
                <GridContainer direction="column">
                  <GridItem>
                    <FText {...inputs.NAME} />
                  </GridItem>

                  <GridItem>
                    <SimpleRTE
                      name="customData.description"
                      placeholder="Add a tab description"
                      filled
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer direction="column">
                  <GridItem>
                    <Select
                      name="sharedWith"
                      value=""
                      required
                      label="Tab Privacy"
                      helperText="You can change this setting later in Manage Tabs."
                      options={PRIVACY_OPTIONS}
                      component={FilledTextField}
                      SelectProps={{ native: true }}
                      onChange={value => this.setState({ sharedWith: value })}
                    />
                  </GridItem>

                  {LOGIC_HELPERS.ifElse(
                    [sharedWith, sharedWith === ORGANISERS],
                    <GridItem>
                      <JText warning nowrap={false}>
                        <Icon
                          icon="lnr-users"
                          size="small"
                          className={this.props.classes.rBlue}
                        />{' '}
                        You have selected a Organisers tab privacy, thus this
                        tab will be hidden to non-organisers.
                      </JText>
                    </GridItem>,
                  )}
                  {LOGIC_HELPERS.ifElse(
                    [sharedWith, sharedWith === ONLY_ME],
                    <GridItem>
                      <JText warning nowrap={false}>
                        <Icon icon="lnr-lock" size="small" color="danger" /> You
                        have selected a Non-Public tab privacy, thus this tab
                        will be hidden to other persons.
                      </JText>
                    </GridItem>,
                  )}
                  {LOGIC_HELPERS.ifElse(
                    [sharedWith, sharedWith === 'public'],
                    <GridItem>
                      <JText success nowrap={false}>
                        Everyone will be able to see this tab in the Tabs bar.
                      </JText>
                    </GridItem>,
                  )}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>

          <Hr half />

          {this.renderFormButtons()}
        </GridContainer>
      </Formsy>
    );
  };

  render = () => (
    <Dialog maxWidth="xs" fullWidth open onClose={this.handleClose}>
      <DialogTitle noPaddingBottom>
        <Title heading="Add Tab" subheading={<M {...m.titleAddTab} />} />
        <CloseButton onClick={this.handleClose} />
      </DialogTitle>
      <DialogContent halfPaddingTop>{this.renderContent()}</DialogContent>
    </Dialog>
  );
}

AddTab.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,
  parentId: PropTypes.number,

  // resaga props
};

AddTab.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'AddTab' }),
  withRouter,
  resaga(CONFIG),
)(AddTab);
