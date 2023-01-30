import classnames from 'classnames';
import { OTHER } from 'containers/Templates/Modals/ShareList/components/Invitee/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { InlineRadioGroup } from 'ugcomponents/Inputs/index';
import { CONFIG_ORGANISATION_ID, CONFIG } from './config';
import style from './style';

export class Organisation extends PureComponent {
  componentWillMount = () => {
    const { myOrganisationName } = this.props;

    this.organisationOptions = {
      true: myOrganisationName,
      false: OTHER,
    };
  };

  renderEditing = () => {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <InlineRadioGroup
          required
          name="inviteToOrganisation"
          label="From which organisation?"
          valueLabel="From"
          className={classes.newOrganisation}
          options={this.organisationOptions}
        />
      </div>
    );
  };

  renderReadonly = name => {
    const { id, myOrganisationName } = this.props;
    if (!id) return null;

    return name || myOrganisationName;
  };

  render = () => {
    const {
      classes,
      className,
      theirOrganisationName,
      isOrgEditable,
    } = this.props;

    let content;

    // registered user
    if (theirOrganisationName) {
      // render org if known
      content = this.renderReadonly(theirOrganisationName);
    } else {
      if (!isOrgEditable) {
        return null;
      }
      content = this.renderEditing();
    }

    return (
      <span className={classnames(classes.root, className)}>{content}</span>
    );
  };
}

Organisation.propTypes = {
  classes: PropTypes.object.isRequired,

  // from parent
  className: PropTypes.string,
  isOrgEditable: PropTypes.bool,

  // from resaga
  id: PropTypes.number, // org id
  myOrganisationName: PropTypes.string,
  theirOrganisationName: PropTypes.string,
};

Organisation.defaultProps = {
  id: 0,
  className: '',
  myOrganisationName: 'your organisation',
  theirOrganisationName: '',
  isOrgEditable: true,
};

export default compose(
  withStyles(style, { name: 'Organisation' }),
  resaga(CONFIG_ORGANISATION_ID),
  resaga(CONFIG),
)(Organisation);
