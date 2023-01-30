import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import Editable from 'viewComponents/Editable';
import { H4, H6 } from 'viewComponents/Typography';
import Node from 'smartComponents/Node';
import { CreatedAt, Status } from 'smartComponents/Invitation/Share/parts';
import { CONFIG_1, CONFIG_2, CONFIG_3 } from './config';
import m from './messages';

export class InvitationListItem extends React.PureComponent {
  getRestProps = () => _.omit(this.props, ['resaga', 'id', 'nodeId']);

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

  handleRenderRowTail = () => (
    <GridItem>
      <Editable onClick={this.handleShareStatusClick}>
        <H4 dense weight="light" transform="capitalize">
          {this.renderSharePart(Status)}
        </H4>
      </Editable>
    </GridItem>
  );

  renderSharePart = (Component, variant, props = {}) => {
    const { id } = this.props;
    return <Component id={id} variant={variant} {...props} />;
  };

  render = () => {
    const { nodeId } = this.props;
    return (
      <Node
        id={nodeId}
        variant={VARIANTS.ROW}
        onRenderRowSubtitle={this.handleRenderRowSubtitle}
        onRenderRowTail={this.handleRenderRowTail}
        {...this.getRestProps()}
      />
    );
  };
}

InvitationListItem.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.string, // share token

  // resaga value
  nodeId: PropTypes.number,
};

InvitationListItem.defaultProps = {
  id: null,

  nodeId: null,
};

export default compose(
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
  resaga(CONFIG_3()),
)(InvitationListItem);
