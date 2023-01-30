import React from 'react';
import PropTypes from 'prop-types';
import FollowerList from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCustom/components/TabPeople/components/FollowerList';
import { VARIANTS } from 'variantsConstants';

export const withFollowers = Component => {
  const FollowersHOC = props => (
    <FollowerList templateId={props.templateId} variant={VARIANTS.RENDER_PROP}>
      {({ followers }) => <Component {...props} followers={followers} />}
    </FollowerList>
  );

  FollowersHOC.propTypes = {
    templateId: PropTypes.number,
  };

  FollowersHOC.defaultProps = {};

  return React.memo(FollowersHOC);
};
