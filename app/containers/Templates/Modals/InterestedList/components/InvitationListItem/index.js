import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Editable from 'viewComponents/Editable';
import { H4, H6 } from 'viewComponents/Typography';
import { PeopleListRow } from 'viewComponents/People';
import Node from 'smartComponents/Node';
import { CreatedAt, Status } from 'smartComponents/Invitation/Share/parts';
import { CONFIG_1, CONFIG_2, CONFIG_3 } from './config';
import m from './messages';

export class InvitationListItem extends React.PureComponent {
  getRestProps = () => _.omit(this.props, ['id', 'onClick', 'nodeId']);

  handleClick = () => {
    const { nodeId, onClick } = this.props;
    onClick(nodeId);
  };

  handleShareStatusClick = () => {
    const { id } = this.props;
    this.props.resaga.setValue({ invitationDetailOpen: id });
  };

  handleRenderRowSubtitle = () => (
    <H6 dense>
      <M
        {...m.subtitleCreatedAt}
        values={{ at: this.renderSharePart(CreatedAt) }}
      />
    </H6>
  );

  renderSharePart = (Component, variant, props = {}) => {
    const { id } = this.props;
    return <Component id={id} variant={variant} {...props} />;
  };

  render = () => {
    const { nodeId, statusHidden } = this.props;
    return (
      <GridItem>
        <PeopleListRow>
          <GridContainer>
            <GridItem xs>
              <Editable onClick={this.handleClick}>
                <Node
                  id={nodeId}
                  variant={VARIANTS.ROW}
                  onRenderRowSubtitle={this.handleRenderRowSubtitle}
                  {...this.getRestProps()}
                />
              </Editable>
            </GridItem>
            {!statusHidden && (
              <GridItem>
                <Editable onClick={this.handleShareStatusClick}>
                  <H4 dense weight="light" transform="capitalize">
                    {this.renderSharePart(Status)}
                  </H4>
                </Editable>
              </GridItem>
            )}
          </GridContainer>
        </PeopleListRow>
      </GridItem>
    );
  };
}

InvitationListItem.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.string, // share token
  onClick: PropTypes.func,
  statusHidden: PropTypes.bool,

  // resaga value
  nodeId: PropTypes.number,
};

InvitationListItem.defaultProps = {
  id: null,
  onClick: () => {},

  nodeId: null,
};

export default compose(
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
  resaga(CONFIG_3()),
)(InvitationListItem);
