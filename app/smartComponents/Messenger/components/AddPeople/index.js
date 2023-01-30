import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from '../../../../viewComponents/Button';
import { VARIANTS } from '../../../../variantsConstants';
import Icon from '../../../../ugcomponents/Icon';
import { Span } from '../../../../viewComponents/Typography';
import { CONFIG, CONFIG2, CONFIG3 } from './config';
import { PORTAL_HELPERS } from '../../../../containers/Portal/helpers';

function AddPeople(props) {
  const onClickAddPeople = () => {
    /*
    combine id and roles together. [23,24,25,24] [role1, role2, role3, role4] => {
      23: {
        userId: 23,
        roles: [role1]
      }
    }
    * */
    const data = props.userIds.reduce((arg, current, currentIndex) => {
      const ref = arg;
      if (!props.members.includes(current)) {
        if (current !== props.loginUserId) {
          if (current in ref) {
            if (current === props.createdBy) {
              ref[current].roles.push('tour_owner');
            } else {
              ref[current].roles.push(props.userRoles[currentIndex]);
            }
          } else {
            ref[current] = {
              userId: current,
              name: props.names[currentIndex],
              email: props.emails[currentIndex],
              photo: props.photos[currentIndex],
              roles: [],
            };
            if (current === props.createdBy) {
              ref[current].roles.push('tour_owner');
            } else {
              ref[current].roles.push(props.userRoles[currentIndex]);
            }
          }
        }
      }
      return ref;
    }, {});
    if (
      props.loginUserId !== props.createdBy &&
      !props.members.includes(props.createdBy)
    ) {
      // login user is not owner
      data[props.createdBy] = {
        userId: props.createdBy,
        roles: ['tour_owner'],
        name: props.loginUserName,
        email: props.loginUseEmail,
        photo: props.loginUserPhoto,
      };
    }
    PORTAL_HELPERS.openAddPeopleInChannel(
      {
        userRoles: props.userRoles,
        userIds: props.userIds,
        templateId: props.templateId,
        channelId: props.channelId,
        loginUserId: props.loginUserId,
        createdBy: props.createdBy,
        data,
      },
      { resaga: props.resaga },
    );
  };

  const showIcon = () => {
    if (props.iconHidden) {
      return <Icon icon="lnr-user-plus" paddingRight />;
    }
    return null;
  };
  return (
    <Button
      variant={props.variant}
      color={props.colors}
      tooltipProps={{
        title: 'Add People',
      }}
      weight="light"
      noMargin={props.noMargin}
      noPadding={props.noPadding}
      onClick={onClickAddPeople}
      size={props.size}
    >
      {showIcon()}
      <Span>{props.text}</Span>
    </Button>
  );
}

AddPeople.propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string,
  colors: PropTypes.string,
  resaga: PropTypes.object,
  userRoles: PropTypes.array,
  userIds: PropTypes.array,
  templateId: PropTypes.number,
  channelId: PropTypes.string,
  loginUserId: PropTypes.number,
  createdBy: PropTypes.number,
  names: PropTypes.array,
  emails: PropTypes.array,
  photos: PropTypes.array,
  members: PropTypes.array,
  loginUserPhoto: PropTypes.string,
  loginUserName: PropTypes.string,
  loginUseEmail: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  iconHidden: PropTypes.bool,
  noMargin: PropTypes.bool,
  noPadding: PropTypes.bool,
  size: PropTypes.string,
};

AddPeople.defaultProps = {
  variant: VARIANTS.INLINE,
  iconHidden: true,
  noMargin: true,
  noPadding: true,
  size: 'base',
};

export default compose(
  resaga(CONFIG),
  resaga(CONFIG2),
  resaga(CONFIG3),
)(AddPeople);
