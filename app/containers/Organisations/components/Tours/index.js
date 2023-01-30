import OrganisationTemplates from 'containers/Templates/OrganisationTemplates';
import React, { PureComponent } from 'react';
import { compose } from 'redux';

export class Tours extends PureComponent {
  render = () => <OrganisationTemplates showHeader={false} {...this.props} />;
}

Tours.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // parent props
  // resaga props
};

Tours.defaultProps = {};

export default compose()(Tours);
// withStyles(styles, { name: 'Tours' }),
