import { Hidden } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import { Can } from 'apis/components/Ability/components/Can';
import { CARD, CONTENT, HEADING } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DeleteNode from 'smartComponents/Node/components/DeleteNode';
import Hazards from 'smartComponents/Node/components/Hazards';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Risks from 'smartComponents/Node/components/Risks';
import Description from 'smartComponents/Node/parts/Description';
import LayoutSelect from 'smartComponents/Node/types/TabTimeline/components/LayoutSelect';
import AddButton from 'ugcomponents/Buttons/AddButton';
import Headx from 'ugcomponents/Headx';
import { HAZARD, RISK } from 'utils/modelConstants';
import { CONFIG, PARENT_CONFIG } from './config';
import styles from './styles';

export class TabRiskAssessment extends PureComponent {
  componentWillMount = () => {
    const { createdBy } = this.props;

    this.risk = {
      type: RISK,
      createdBy,
    };
  };

  canEdit = () => {
    const { editable } = this.props;

    return editable && ability.can('execute', this.risk);
  };

  openAdd = () => {
    const { selectedRiskId } = this.props;

    PORTAL_HELPERS.openAddHazard({ parentNodeId: selectedRiskId }, this.props);
  };

  handleDeleteRisk = () => {
    this.props.resaga.setValue({
      selectedRiskId: 0,
    });
  };

  // renderLabels = () => {
  //   const { classes } = this.props;
  //
  //   return (
  //     <GridItem>
  //       <GridContainer card direction="column">
  //         <GridItem>
  //           <GridContainer alignItems="center">
  //             <GridItem xs>
  //               <Headx>Labels</Headx>
  //             </GridItem>
  //             <GridItem>
  //               <AddButton card>Label</AddButton>
  //             </GridItem>
  //           </GridContainer>
  //         </GridItem>
  //
  //         <GridItem>
  //           <GridContainer alignItems="center">
  //             <GridItem>
  //               <Icon size="xsmall" icon="lnr-check-square" />
  //             </GridItem>
  //             <GridItem xs>Transportation</GridItem>
  //             <GridItem className={classes.badge}>9</GridItem>
  //           </GridContainer>
  //         </GridItem>
  //
  //         <GridItem>
  //           <GridContainer alignItems="center">
  //             <GridItem>
  //               <Icon size="xsmall" icon="lnr-check-square" />
  //             </GridItem>
  //             <GridItem xs>Student well-being</GridItem>
  //             <GridItem className={classes.badge}>15</GridItem>
  //           </GridContainer>
  //         </GridItem>
  //
  //         <GridItem>
  //           <GridContainer alignItems="center">
  //             <GridItem>
  //               <Icon size="xsmall" icon="lnr-check-square" />
  //             </GridItem>
  //             <GridItem xs>General</GridItem>
  //             <GridItem className={classes.badge}>12</GridItem>
  //           </GridContainer>
  //         </GridItem>
  //       </GridContainer>
  //     </GridItem>
  //   );
  // };

  renderLeft = () => {
    const { templateId } = this.props;

    return (
      <GridContainer direction="column">
        {/* <GridItem> */}
        {/*  <GridContainer card alignItems="center"> */}
        {/*    <GridItem xs> */}
        {/*      <Headx>Tour Overall Risk Rating</Headx> */}
        {/*    </GridItem> */}
        {/*    <GridItem> */}
        {/*      <RatingButton value={2} text="MEDIUM" active disabled /> */}
        {/*    </GridItem> */}
        {/*  </GridContainer> */}
        {/* </GridItem> */}

        <GridItem>
          <Risks variant={CARD} id={templateId} />
        </GridItem>

        {/* {this.renderLabels()} */}
      </GridContainer>
    );
  };

  // renderRight = () => {
  //   const { classes } = this.props;
  //
  //   return (
  //     <div className={classes.right}>
  //       <GridContainer direction="column">
  //         <GridItem>
  //           <GridContainer card direction="column" spacing={0}>
  //             <GridItem>Sort, filter and search</GridItem>
  //           </GridContainer>
  //         </GridItem>
  //
  //         <GridItem>
  //           <GridContainer card direction="column">
  //             <GridItem>
  //               <Headx>Risk Rating</Headx>
  //             </GridItem>
  //
  //             <GridItem>
  //               <GridContainer alignItems="center">
  //                 <GridItem>
  //                   <Icon size="xsmall" icon="lnr-check-square" />
  //                 </GridItem>
  //                 <GridItem xs>
  //                   <RatingButton
  //                     value={0}
  //                     text="LOW"
  //                     title="Risk Rating: Low"
  //                     active
  //                   />
  //                 </GridItem>
  //                 <GridItem className={classes.badge}>7</GridItem>
  //               </GridContainer>
  //             </GridItem>
  //             <GridItem>
  //               <GridContainer alignItems="center">
  //                 <GridItem>
  //                   <Icon size="xsmall" icon="lnr-check-square" />
  //                 </GridItem>
  //                 <GridItem xs>
  //                   <RatingButton value={2} text="MEDIUM" active />
  //                 </GridItem>
  //                 <GridItem className={classes.badge}>12</GridItem>
  //               </GridContainer>
  //             </GridItem>
  //             <GridItem>
  //               <GridContainer alignItems="center">
  //                 <GridItem>
  //                   <Icon size="xsmall" icon="lnr-check-square" />
  //                 </GridItem>
  //                 <GridItem xs>
  //                   <RatingButton value={3} text="HIGH" active />
  //                 </GridItem>
  //                 <GridItem className={classes.badge}>5</GridItem>
  //               </GridContainer>
  //             </GridItem>
  //             <GridItem>
  //               <GridContainer alignItems="center">
  //                 <GridItem>
  //                   <Icon size="xsmall" icon="lnr-check-square" />
  //                 </GridItem>
  //                 <GridItem xs>
  //                   <RatingButton value={4} text="EXTREME" active />
  //                 </GridItem>
  //                 <GridItem className={classes.badge}>2</GridItem>
  //               </GridContainer>
  //             </GridItem>
  //           </GridContainer>
  //         </GridItem>
  //
  //         <GridItem>
  //           <FooterLinks />
  //         </GridItem>
  //       </GridContainer>
  //     </div>
  //   );
  // };

  renderContent = () => {
    const { risks, selectedRiskId, classes, parentNodeId } = this.props;

    if (!selectedRiskId || risks.indexOf(selectedRiskId) === -1) {
      return (
        <div className={classes.body}>
          <GridContainer direction="column">
            <Hidden mdUp>
              <GridItem>{this.renderLeft()}</GridItem>
            </Hidden>
            <GridItem>
              <GridContainer card direction="column" spacing={0}>
                <GridItem>Select a risk activity</GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      );
    }

    return (
      <div className={classes.body}>
        <GridContainer direction="column">
          <Hidden mdUp>
            <GridItem>{this.renderLeft()}</GridItem>
          </Hidden>
          <GridItem>
            <GridContainer card direction="column" spacing={0}>
              <GridItem>
                <NodeProp
                  id={selectedRiskId}
                  variant={HEADING}
                  valueKey={CONTENT}
                  isCustomData={false}
                  className={classes.content}
                  editable={this.canEdit()}
                />
              </GridItem>

              <Description
                id={selectedRiskId}
                placeholder="Describe this risk activity if needed"
                editable={this.canEdit()}
              >
                {this.renderDescription}
              </Description>

              {this.canEdit() && (
                <GridItem>
                  <DeleteNode
                    id={selectedRiskId}
                    parentId={parentNodeId}
                    childKey="risks"
                    onSuccess={this.handleDeleteRisk}
                  />
                </GridItem>
              )}
            </GridContainer>
          </GridItem>

          <GridItem>
            <GridContainer alignItems="center">
              <GridItem xs>
                <Headx>Risks and Hazards</Headx>
              </GridItem>

              <Can do="create" on={HAZARD}>
                <GridItem>
                  <AddButton onClick={this.openAdd} card>
                    Risk and Hazard
                  </AddButton>
                </GridItem>
              </Can>
            </GridContainer>
          </GridItem>

          <GridItem>
            <Hazards id={selectedRiskId} component={GridItem} />
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <Hidden smDown>
            <LayoutSelect row />
          </Hidden>
          <Hidden mdUp>
            <LayoutSelect />
          </Hidden>
        </GridItem>
        <GridItem>
          <GridContainer
            justify="space-between"
            className={classes.root}
            wrap="nowrap"
          >
            <Hidden smDown>
              <GridItem>
                <div className={classes.left}>{this.renderLeft()}</div>
              </GridItem>
            </Hidden>
            <GridItem
              className={classnames(
                classes.grow,
                classes.content,
                classes.contentMaxWidth,
              )}
            >
              {this.renderContent()}
            </GridItem>
            {/* <Hidden smDown> */}
            {/*  <GridItem>{this.renderRight()}</GridItem> */}
            {/* </Hidden> */}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

TabRiskAssessment.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  selectedRiskId: PropTypes.number,
  templateId: PropTypes.number,

  // resaga props
  createdBy: PropTypes.number,
  parentNodeId: PropTypes.number,
  editable: PropTypes.bool,
  risks: PropTypes.array,
};

TabRiskAssessment.defaultProps = {
  risks: [],
};

export default compose(
  withStyles(styles, { name: 'TabRiskAssessment' }),
  resaga(CONFIG),
  resaga(PARENT_CONFIG),
)(TabRiskAssessment);
