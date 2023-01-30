import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import GridItem from 'components/GridItem/index';
import GridContainer from 'components/GridContainer/index';
import { withStyles } from '@material-ui/core/styles';
import { TemplateDetailReadMode } from 'containers/Templates/TemplateManagement/components/TemplateHeader/components/TemplateDetails/templateDetailReadMode';

import { CONFIG } from './config';
import styles from './styles';

export class TourDetail extends PureComponent {
  render = () => {
    const { classes, templateId, title, description } = this.props;

    return (
      <GridContainer card direction="column" spacing={0}>
        <GridItem>
          <TemplateDetailReadMode
            classes={classes}
            templateId={templateId}
            templateTitleVal={title}
            templateDescriptionVal={description}
            publicView
            hidePeople
            readOnly
          />
        </GridItem>
      </GridContainer>
    );
  };
}

TourDetail.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  templateId: PropTypes.number,

  // resaga props
  title: PropTypes.string,
  description: PropTypes.string,
};

TourDetail.defaultProps = {
  title: '',
  description: '',
};

export default compose(
  withStyles(styles, { name: 'TourDetail' }),
  resaga(CONFIG),
)(TourDetail);
