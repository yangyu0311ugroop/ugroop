import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Description from 'smartComponents/Node/parts/Description';
import { READ_ONLY } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import resaga from 'resaga';
import TemplateHeader from 'containers/Templates/TemplateManagement/components/TemplateHeader';
import classNames from 'classnames';
import { CONFIG, METAINFO_CONFIG } from './config';
import styles from './styles';

export class TourPrintHeader extends PureComponent {
  renderHelmet = () => {
    const { title } = this.props;
    return (
      <Helmet
        title={title}
        meta={[{ name: 'description', content: 'Print Tour' }]}
      />
    );
  };

  renderHeader = () => {
    const { templateId, classes } = this.props;
    return (
      <GridContainer spacing={0}>
        <GridItem className={classes.grow} xs={12} md={9}>
          <TemplateHeader id={templateId} publicView printView />
        </GridItem>
      </GridContainer>
    );
  };

  renderDetail = () => {
    const { classes, templateId } = this.props;

    return (
      <GridContainer spacing={0}>
        <GridItem className={classNames(classes.ugTemplateDescription)}>
          <Description
            renderSeeMore={false}
            id={templateId}
            showHeader={false}
            showEmpty={false}
            className={classes.description}
            variant={READ_ONLY}
          />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes } = this.props;
    return (
      <GridContainer direction="column" spacing={0} className={classes.root}>
        {this.renderHelmet()}
        {this.renderHeader()}
        <GridItem>
          <GridContainer spacing={0}>
            <GridItem xs={1} className={classes.col1} />
            <GridItem xs={9}>{this.renderDetail()}</GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

TourPrintHeader.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  // parent props
  title: PropTypes.string,
  // resaga props
};

TourPrintHeader.defaultProps = {
  title: '',
};

export default compose(
  withStyles(styles, { name: 'TourPrintHeader' }),
  resaga(CONFIG),
  resaga(METAINFO_CONFIG),
)(TourPrintHeader);
