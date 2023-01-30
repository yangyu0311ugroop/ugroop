import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import Image from 'containers/Templates/TemplateManagement/components/Image';
import ActivityViewMode from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/RenderActivity/components/ActivityViewMode';
import GridItem from 'components/GridItem/index';
import GridContainer from 'components/GridContainer/index';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { CONFIG } from './config';
import styles from './styles';
export class RenderActivity extends PureComponent {
  imageBlock() {
    const { classes, photoId } = this.props;
    const photoContent = !photoId ? (
      <div className={classes.noPhoto} />
    ) : (
      <GridContainer direction="column" alignItems="flex-end">
        <GridItem>
          <div className={classes.bringToTop}>
            <Image
              photoId={this.props.photoId}
              imgClassName={classes.image}
              isLazyLoad={false}
            />
          </div>
        </GridItem>
      </GridContainer>
    );
    return photoContent;
  }

  renderContent = () => {
    const { classes, activityId, dayId, readOnly, print } = this.props;
    return (
      <GridContainer spacing={0}>
        <GridItem xs={1} className={classes.col1}>
          {' '}
          {this.imageBlock()}{' '}
        </GridItem>
        <GridItem xs={10} className={classes.line}>
          <GridContainer className={classes.section}>
            <GridItem className={classes.sectionItem}>
              <ActivityViewMode
                parentId={dayId}
                activityId={activityId}
                attachmentId=""
                photoId={0}
                readOnly={readOnly}
                print={print}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const content = this.renderContent();
    return <GridItem>{content}</GridItem>;
  };
}

RenderActivity.propTypes = {
  classes: PropTypes.object.isRequired,
  activityId: PropTypes.number.isRequired,
  dayId: PropTypes.number,
  readOnly: PropTypes.bool,
  print: PropTypes.bool,
  // resaga
  photoId: PropTypes.string,
};

RenderActivity.defaultProps = {
  dayId: 0,
  photoId: '',
  readOnly: false,
  print: false,
};

export default compose(
  withStyles(styles, { name: 'RenderActivity' }),
  resaga(CONFIG),
)(RenderActivity);
