import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import { Title } from 'ugcomponents/DialogForm/Complex';
import m from '../../defines/messages';
import stylesheet from './styles';

export const TitleOfAddTemplateModal = ({ classes }) => (
  <Title
    className={classes.root}
    heading={<M {...m.ugAddTemplateModalHeader} />}
    subheading={<M {...m.ugAddTemplateModalSub} />}
    headingBackground="TOUR"
  />
);

TitleOfAddTemplateModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
TitleOfAddTemplateModal.defaultProps = {};

export default withStyles(stylesheet, { name: 'TitleOfAddTemplateModal' })(
  TitleOfAddTemplateModal,
);
