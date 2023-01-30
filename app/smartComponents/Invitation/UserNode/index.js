import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import {
  Role,
  ShareFrom,
  // UpdatedAt,
  CreatedAt,
} from 'smartComponents/Invitation/UserNode/parts';
import UserNodeActions from 'containers/Templates/Modals/TourConnection/components/Dialog/components/UserNodeActions';
import { VARIANTS } from 'variantsConstants';
import { compose } from 'redux';

const styles = {
  shareFrom: {
    display: 'inline-block',
    float: 'none',
    width: 'inherit',
    marginRight: 'inherit',
  },
};

export class UserNode extends React.PureComponent {
  renderPart = (Component, variant, props = {}) => {
    const { id } = this.props;
    return <Component id={id} variant={variant} {...props} />;
  };

  renderRemoveButton = () => (
    <GridItem>
      <UserNodeActions
        id={this.props.id}
        variant={VARIANTS.ICON}
        onRemoveUser={this.handleRemoveUser}
        removeAll={false}
      />
    </GridItem>
  );

  addedOwn = () => this.props.userId === this.props.shareFrom;

  renderRow = () => {
    const { roleInstead } = this.props;
    const action = LOGIC_HELPERS.ifElse(this.addedOwn(), 'joined', 'invited');
    const addedBy = (
      <JText bold gray>
        by{' '}
        {this.renderPart(ShareFrom, null, {
          NameProps: { shouldRenderNewLink: true },
        })}
      </JText>
    );
    return (
      <GridContainer alignItems="baseline" wrap="nowrap">
        <GridItem>
          <JText component="p" ellipsis>
            <JText bold gray>
              {roleInstead || this.renderPart(Role)}
            </JText>
            , {action} {this.renderPart(CreatedAt)}{' '}
            {!this.addedOwn() && addedBy}
          </JText>
        </GridItem>
        {this.props.showRemove && this.renderRemoveButton()}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderRow,
    });
  };
}

UserNode.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  showRemove: PropTypes.bool,
  roleInstead: PropTypes.string,
  shareFrom: PropTypes.number,
  userId: PropTypes.number,
};

UserNode.defaultProps = {
  id: 0,
  variant: null,
  showRemove: true,
};

// export default withStyles(styles, { name: 'UserNode' })(UserNode);
export default compose(
  withStyles(styles, { name: 'UserNode' }),
  INVITATION_STORE_HOC.selectUserNodeProp({
    path: 'shareFrom',
    outputProp: 'shareFrom',
  }),
  INVITATION_STORE_HOC.selectUserNodeProp({
    path: 'userId',
    outputProp: 'userId',
  }),
)(UserNode);
