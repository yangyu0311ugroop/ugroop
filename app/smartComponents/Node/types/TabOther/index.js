import Popover from '@material-ui/core/Popover';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { TRUNCATE_LENGTH } from 'sizeConstants';
import UserCard from 'ugcomponents/Person/UserCard';
import { TAB_OTHER } from 'utils/modelConstants';
import TableCell from 'viewComponents/Table/components/TableCell';
import Content from 'smartComponents/Node/parts/Content';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import OrganisationName from 'smartComponents/Organisation/parts/Name';
import Type from 'smartComponents/Node/parts/Type';
import UpdatedAt from 'smartComponents/Node/parts/UpdatedAt';
import Hover from 'viewComponents/Hover';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import TableRow from 'viewComponents/Table/components/TableRow';
import Button from 'viewComponents/Button';
import { CONFIG, USER_USERS_CONFIG } from './config';
import styles from './styles';

export class TabOther extends PureComponent {
  handleClick = () =>
    LOGIC_HELPERS.ifFunction(this.props.onClick, [
      TAB_OTHER,
      this.props.index,
    ])();

  renderDefault = () => this.renderRow();

  renderRow = () => {
    const { id, variant, parentNodeId, userId, orgId } = this.props;

    const separator = LOGIC_HELPERS.ifElse(orgId, ' - ', null);

    return (
      <TableRow key={id}>
        <TableCell isCapitalized>
          <Button
            textAlign="left"
            onClick={this.handleClick}
            noPadding
            variant={VARIANTS.INLINE}
            size="extraSmall"
            color="black"
          >
            <Content
              truncateLength={TRUNCATE_LENGTH.MD}
              id={id}
              variant={VARIANTS.TEXT_ONLY}
            />
          </Button>
        </TableCell>
        <TableCell isCapitalized>
          <Type id={id} variant={variant} />
        </TableCell>
        <TableCell isCapitalized>
          <span>
            <strong>
              (<Type id={parentNodeId} />)
            </strong>
            &nbsp;
            <Content
              truncateLength={TRUNCATE_LENGTH.MD}
              id={parentNodeId}
              variant={VARIANTS.TEXT_ONLY}
            />
          </span>
        </TableCell>
        <TableCell>
          <UpdatedAt id={id} variant={variant} />
        </TableCell>
        <TableCell isCapitalized>
          <Hover>
            {hover => (
              <React.Fragment>
                <Button
                  textAlign="left"
                  onClick={hover.handleMouseEnter}
                  noPadding
                  variant={VARIANTS.INLINE}
                  size="extraSmall"
                  color="black"
                >
                  <span>
                    <KnownAs id={userId} variant={VARIANTS.STRING_ONLY} />
                    {separator}
                    <OrganisationName
                      id={orgId}
                      variant={VARIANTS.STRING_ONLY}
                    />
                  </span>
                </Button>
                <Popover
                  anchorEl={hover.anchorEl}
                  onClose={hover.handleMouseLeave}
                  open={hover.entered}
                >
                  <UserCard id={userId} orgId={orgId} />
                </Popover>
              </React.Fragment>
            )}
          </Hover>
        </TableCell>
      </TableRow>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TABLE]: this.renderRow,
      [DEFAULT]: this.renderDefault,
    });
  };
}

TabOther.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  onClick: PropTypes.func,
  parentNodeId: PropTypes.number,
  id: PropTypes.number,

  // resaga props
  index: PropTypes.number,
  userId: PropTypes.number,
  orgId: PropTypes.number,
};

TabOther.defaultProps = {
  variant: '',
  parentNodeId: 0,
  index: 0,
  id: 0,
  orgId: 0,
};

export default compose(
  withStyles(styles, { name: 'TabOther' }),
  resaga(CONFIG),
  resaga(USER_USERS_CONFIG),
)(TabOther);
