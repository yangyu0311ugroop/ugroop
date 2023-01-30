import React from 'react';
import { isEmptyString } from '../../../../../utils/stringAdditions';
import Avatar from '../../../../../ugcomponents/Avatar';
import LetterAvatar from '../../../../../ugcomponents/LetterAvatar';

export function RenderAvatar(photo, name, showName = true, size = 'xs') {
  if (!isEmptyString(photo)) {
    return (
      <Avatar
        name={name}
        avatarUrl={photo}
        className="small"
        showName={showName}
      />
    );
  }
  return <LetterAvatar name={name || '?'} displayName={showName} size={size} />;
}

export default RenderAvatar;
