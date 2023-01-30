import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT, TEXT, PERSON_DATA_STORE, VALUE, LINK } from 'appConstants';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import { VARIANTS } from 'variantsConstants';
import { STRING_ADDITIONS } from 'utils/stringAdditions';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import {
  Avatar as PersonAvatar,
  Name as PersonName,
} from 'ugcomponents/Person';
import m from './messages';
import Editable from './components/Editable';
import { CONFIG } from './config';

export class Name extends React.PureComponent {
  getUserId = () => {
    const { nodeUserId, userId } = this.props;
    return nodeUserId || userId;
  };

  getAvatarProps = () => {
    const { className, AvatarProps, tooltipText } = this.props;
    return {
      className,
      tooltipText,
      tooltipPlacement: 'bottom',
      imageSize: IMAGE_SIZES_CONSTANTS.XS,
      [SIZE_CONSTANTS.SM]: true,
      ...AvatarProps,
    };
  };

  renderEditable = () => {
    const { id, personId, userId, readOnly } = this.props;
    return (
      <Editable
        id={id}
        personId={personId}
        userId={userId}
        dataStore={PERSON_DATA_STORE}
        renderAvatar={this.renderAvatar}
        readOnly={readOnly}
        label={<M {...m.editableLabel} />}
      />
    );
  };

  renderTextOnly = () => {
    const {
      renderValue,
      personId,
      firstName,
      lastName,
      valueOnly,
      isEllipsis,
    } = this.props;
    const userId = this.getUserId();
    if (userId) {
      return renderValue(<PersonName id={userId} variant={TEXT} />, userId);
    }
    if (personId) {
      return renderValue(
        <PersonName
          id={personId}
          dataStore={PERSON_DATA_STORE}
          variant={valueOnly ? VALUE : TEXT}
        />,
      );
    }
    if (isEllipsis) {
      return (
        <div className="j-text-ellipsis">
          {renderValue(
            STRING_ADDITIONS.renderName({ firstName, lastName }, 'Unnamed'),
          )}
        </div>
      );
    }
    return renderValue(
      STRING_ADDITIONS.renderName({ firstName, lastName }, 'Unnamed'),
    );
  };

  renderLink = () => {
    const {
      renderValue,
      personId,
      firstName,
      lastName,
      className,
      boldFromNode,
    } = this.props;
    const userId = this.getUserId();
    if (userId) {
      return renderValue(
        <PersonName id={userId} className={className} />,
        userId,
      );
    }
    if (personId) {
      return renderValue(
        <PersonName
          id={personId}
          dataStore={PERSON_DATA_STORE}
          className={className}
          bold={boldFromNode}
        />,
      );
    }

    return renderValue(
      STRING_ADDITIONS.renderName({ firstName, lastName }, 'Unnamed'),
    );
  };

  renderProp = () => {
    const { children } = this.props;

    return children({ userId: this.getUserId() });
  };

  renderAvatar = () => {
    const {
      personId,
      firstName,
      lastName,
      PersonAvatarProps,
      personEmail,
    } = this.props;
    const userId = this.getUserId();

    if (userId) {
      return (
        <PersonAvatar
          sm
          userId={userId}
          {...this.getAvatarProps()}
          {...PersonAvatarProps}
        />
      );
    }
    if (personId) {
      return (
        <PersonAvatar
          sm
          userId={personId}
          dataStore={PERSON_DATA_STORE}
          {...this.getAvatarProps()}
          {...PersonAvatarProps}
        />
      );
    }

    return (
      <PersonAvatar
        userId={-1}
        personEmail={personEmail}
        updatedEmail={personEmail}
        fullName={STRING_ADDITIONS.renderName({ firstName, lastName })}
        {...this.getAvatarProps()}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderTextOnly,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [VARIANTS.AVATAR]: this.renderAvatar,
      [LINK]: this.renderLink,
    });
  };
}

Name.propTypes = {
  // parent
  id: PropTypes.number,
  userId: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  AvatarProps: PropTypes.object,
  renderValue: PropTypes.func,
  tooltipText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  valueOnly: PropTypes.bool,
  boldFromNode: PropTypes.bool,
  PersonAvatarProps: PropTypes.object,

  // resaga value
  nodeUserId: PropTypes.number,
  personId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  personEmail: PropTypes.string,
  isEllipsis: PropTypes.bool,
};

Name.defaultProps = {
  id: null,
  userId: null,
  children: null,
  className: null,
  variant: null,
  readOnly: false,
  AvatarProps: {},
  renderValue: value => value,
  tooltipText: '',
  valueOnly: false,

  nodeUserId: null,
  personId: null,
  firstName: '',
  lastName: '',
  boldFromNode: true,
  personEmail: '',
  PersonAvatarProps: {},
  isEllipsis: false,
};

export default compose(
  resaga(CONFIG),
  selectLinkedUserData({ nodeIdProp: 'id', outputProp: 'nodeUserId' }), // TODO: Filter by role
)(Name);
