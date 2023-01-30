import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import { DEFAULT, DROPPED_PHOTO, PHOTO_CARD } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { TRUNCATE_LENGTH } from 'sizeConstants';
import Content from 'smartComponents/Node/parts/Content';
import Description from 'smartComponents/Node/parts/Description';
import Type from 'smartComponents/Node/parts/Type';
import UpdatedAt from 'smartComponents/Node/parts/UpdatedAt';
import DayIndex from 'smartComponents/Node/types/Day/parts/DayIndex';
import OrganisationName from 'smartComponents/Organisation/parts/Name';

import KnownAs from 'smartComponents/Person/parts/KnownAs';
import UserCard from 'ugcomponents/Person/UserCard';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Hover from 'viewComponents/Hover';
import TableCell from 'viewComponents/Table/components/TableCell';
import TableRow from 'viewComponents/Table/components/TableRow';
import Tooltip from 'viewComponents/Tooltip';
import DroppedPhoto from './components/DroppedPhoto';
import PhotoCard from './components/PhotoCard';

import { CONFIG, USER_USERS_CONFIG } from './config';
import styles from './styles';

export class Activity extends PureComponent {
  handleClick = () => {
    const isTab = this.props.parentType.includes('tab');
    const parentId = isTab ? this.props.parentIndex : this.props.parentNodeId;
    LOGIC_HELPERS.ifFunction(this.props.onClick, [
      this.props.parentType,
      parentId,
    ])();
  };

  renderDefault = () => this.renderRow();

  renderRow = () => {
    const {
      id,
      parentNodeId,
      parentType,
      userId,
      orgId,
      description,
    } = this.props;
    const isDay = parentType.includes('day');
    const isTab = parentType.includes('tab');

    let addonText = isTab ? <strong>(Tab)</strong> : '';
    if (isDay) {
      addonText = (
        <React.Fragment>
          <strong>
            (Day <DayIndex id={parentNodeId} />)
          </strong>
        </React.Fragment>
      );
    }

    const desc = isEmptyString(description) ? (
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
    ) : (
      <Tooltip
        placement="left"
        title={<Description id={id} variant={VARIANTS.READ_ONLY} />}
        isLight
      >
        <Button
          textAlign="left"
          onClick={this.handleClick}
          noPadding
          variant={VARIANTS.INLINE}
          size="extraSmall"
          color="black"
        >
          <Content
            hasTruncate
            truncateLength={TRUNCATE_LENGTH.MD}
            id={id}
            variant={VARIANTS.TEXT_ONLY}
          />
        </Button>
      </Tooltip>
    );

    const separator = LOGIC_HELPERS.ifElse(orgId, ' - ', null);

    return (
      <TableRow key={id}>
        <TableCell isCapitalized>{desc}</TableCell>
        <TableCell isCapitalized>
          <Type id={id} />
        </TableCell>
        <TableCell isCapitalized>
          <Button
            textAlign="left"
            onClick={this.handleClick}
            noPadding
            variant={VARIANTS.INLINE}
            size="extraSmall"
            color="black"
          >
            <span>
              {addonText}{' '}
              <Content
                truncateLength={TRUNCATE_LENGTH.MD}
                id={parentNodeId}
                variant={VARIANTS.TEXT_ONLY}
                addonText={addonText}
              />
            </span>
          </Button>
        </TableCell>
        <TableCell>
          <UpdatedAt id={id} />
        </TableCell>
        <TableCell isCapitalized>
          <Hover>
            {hover =>
              userId ? (
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
              ) : (
                ''
              )
            }
          </Hover>
        </TableCell>
      </TableRow>
    );
  };

  renderPhotoCard = () => <PhotoCard {...this.props} />;

  renderDroppedPhoto = () => <DroppedPhoto {...this.props} />;

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TABLE]: this.renderRow,
      [PHOTO_CARD]: this.renderPhotoCard,
      [DROPPED_PHOTO]: this.renderDroppedPhoto,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Activity.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  parentNodeId: PropTypes.number,
  onClick: PropTypes.func,
  isPublic: PropTypes.bool,

  // resaga props
  parentType: PropTypes.node,
  parentIndex: PropTypes.number,
  userId: PropTypes.number,
  orgId: PropTypes.number,
  description: PropTypes.any,
};

Activity.defaultProps = {
  variant: '',
  id: 0,
  parentNodeId: 0,
  parentType: '',
  parentIndex: 0,
  userId: 0,
  orgId: 0,
  description: PropTypes.string,
  isPublic: false,
};

export default compose(
  withStyles(styles, { name: 'Activity' }),
  resaga(CONFIG),
  resaga(USER_USERS_CONFIG),
)(Activity);
