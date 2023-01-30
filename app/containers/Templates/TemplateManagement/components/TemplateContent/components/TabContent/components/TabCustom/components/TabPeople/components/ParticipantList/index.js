import { Hidden } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import { DEFAULT, PEOPLE_TAB_OPTIONS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import { withStyles } from '@material-ui/core/styles';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import WrapperParticipantList from 'smartComponents/Node/components/ParticipantList';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PARTICIPANT } from 'utils/modelConstants';
import { VARIANTS, PRINT_FORM_VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import P from 'viewComponents/Typography';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import AddGroupButton from 'smartComponents/Node/components/AddGroupButton';

import Sorters from './components/Sorters';
import { CONFIG } from './config';
import styles from './styles';
import AddParticipantFromContact from '../AddParticipantFromContact';

export class ParticipantList extends PureComponent {
  getTabSelected = () => {
    const { peopleTabOptionSelected, paxLabel } = this.props;

    return LOGIC_HELPERS.switchCase(peopleTabOptionSelected, {
      [PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS]: 'Maybe',
      [PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS]: 'Not Going',
      [PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS]: 'Going',
      [DEFAULT]: `ALL ${paxLabel}`, // 'All PAX',
    });
  };

  handleCreateClick = () => {
    const { templateId } = this.props;
    this.props.resaga.setValue({
      participantCreateOpen: true,
      participantCreateParentNodeId: templateId,
      participantCreateMode: null,
    });
  };

  openPrintForm = () => {
    const { templateId } = this.props;
    return PORTAL_HELPERS.openPrintPdfForm(
      {
        prtinType: PRINT_FORM_VARIANTS.PEOPLE_PARTICIPANTS,
        id: templateId,
      },
      this.props,
    );
  };

  renderPrint = () => {
    const { classes } = this.props;
    return (
      <GridItem>
        <Button
          size="small"
          dense
          title="Open print view"
          iconButton
          icon="lnr-printer"
          noMargin
          square
          color="inline"
          onClick={this.openPrintForm}
          className={classes.fontColor}
        />
      </GridItem>
    );
  };

  renderParticipants = () => {
    const { templateId, paxLabel } = this.props;
    const addParticipantBtn = LOGIC_HELPERS.ifElse(
      ability.can('execute', PARTICIPANT),
      <AddParticipantFromContact
        addParticipant={this.handleCreateClick}
        templateId={templateId}
        paxLabel={paxLabel}
      />,
      null,
    );

    return (
      <GridContainer direction="column">
        <GridItem>
          <Hidden xsDown>
            <GridContainer
              justify="space-between"
              alignItems="center"
              card
              spacing={0}
            >
              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem>
                    <P dense color="gray">
                      Participants:
                    </P>
                  </GridItem>
                  <GridItem>
                    <P dense weight="bold" color="black">
                      {this.getTabSelected()}
                    </P>
                  </GridItem>
                  {ability.can('execute', PARTICIPANT) && (
                    <GridItem>{this.renderPrint()}</GridItem>
                  )}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer>
                  <GridItem>
                    <Sorters templateId={templateId} />
                  </GridItem>
                  <GridItem>{addParticipantBtn}</GridItem>
                  {ability.can('execute', PARTICIPANT) && (
                    <GridItem>
                      <AddGroupButton id={templateId} />
                    </GridItem>
                  )}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </Hidden>
          <Hidden smUp>
            <GridContainer direction="column" card spacing={0}>
              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem>
                    <P dense color="gray">
                      Participants:
                    </P>
                  </GridItem>
                  <GridItem>
                    <P dense weight="bold" color="black">
                      {this.getTabSelected()}
                    </P>
                  </GridItem>
                  {ability.can('execute', PARTICIPANT) && (
                    <GridItem>{this.renderPrint()}</GridItem>
                  )}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer
                  justify="space-between"
                  alignItems="center"
                  wrap="nowrap"
                >
                  <GridItem>
                    <Sorters templateId={templateId} />
                  </GridItem>
                  <GridItem>{addParticipantBtn}</GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </Hidden>
        </GridItem>
        <GridItem>
          <WrapperParticipantList variant={VARIANTS.CONTENT_ONLY} />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => this.renderParticipants();
}

ParticipantList.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object,

  // parent props
  templateId: PropTypes.number,

  // resaga props
  peopleTabOptionSelected: PropTypes.string,
  paxLabel: PropTypes.string,
};

ParticipantList.defaultProps = {
  paxLabel: 'PAX',
};

export default compose(
  withStyles(styles, { name: 'ParticipantList' }),
  resaga(CONFIG),
)(ParticipantList);
