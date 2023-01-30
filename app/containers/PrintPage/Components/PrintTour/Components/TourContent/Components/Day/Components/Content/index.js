import React, { PureComponent } from 'react';
import { TEXT } from 'appConstants';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import Image from 'containers/Templates/TemplateManagement/components/Image';
import DayTitleLocationContent from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/Day/components/dayTitleLocationContent';
import { CONFIG } from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/Day/components/defines/contentConfig';
import GridItem from 'components/GridItem/index';
import GridContainer from 'components/GridContainer/index';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import Url from 'smartComponents/Node/parts/URL';
import H2 from 'components/H2';
import { H4 } from 'viewComponents/Typography';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { PRINT_TOUR_HELPER } from 'containers/PrintPage/Components/PrintTour/utils';
import styles from './styles';
import m from '../../../../../../messages';
export class Content extends PureComponent {
  imageBlock() {
    const { classes } = this.props;
    return (
      <GridContainer direction="column" alignItems="flex-end">
        <GridItem>
          <div className={classes.bringToTop}>
            <Image
              photoId={this.props.dayPhotoId}
              imgClassName={classes.image}
              isLazyLoad={false}
            />
          </div>
        </GridItem>
      </GridContainer>
    );
  }

  render = () => {
    const {
      content,
      location,
      description,
      dayId,
      classes,
      index,
      icon,
      placeId,
      dayPhotoId,
    } = this.props;

    const descr = PRINT_TOUR_HELPER.handleVideo(description);
    const dayNum = `Day ${index}`;

    const displayDescription = (
      <RichTextEditor
        readOnly
        initContent={descr}
        toolBarId={`dayToolBar${dayId}`}
        wrapperClassname={classes.video}
      />
    );
    const dayTitle = content || m.dayNoTitle.defaultMessage;
    const url = (
      <Url
        variant={TEXT}
        id={dayId}
        editable={false}
        viewingClassName={classes.urlStyles}
      />
    );
    return (
      <GridContainer spacing={0}>
        <GridItem xs={1} className={classes.col1}>
          <GridContainer direction="column">
            <GridItem>
              <H2 className={classes.h2TextDay}> {dayNum} </H2>
            </GridItem>
            {dayPhotoId && <GridItem>{this.imageBlock()}</GridItem>}
          </GridContainer>
        </GridItem>
        <GridItem className={classes.line} xs={9}>
          <DayTitleLocationContent
            title={dayTitle}
            location={location}
            displayDescription={displayDescription}
            placeId={placeId}
            icon={icon}
            showDescr={false}
            url={url}
            isPublic
          />
          <H4 className={classes.dayDescription}>{displayDescription}</H4>
        </GridItem>
      </GridContainer>
    );
  };
}

Content.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  dayId: PropTypes.number,
  index: PropTypes.number,
  dayPhotoId: PropTypes.string,
  // resaga props
  content: PropTypes.string,
  location: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeId: PropTypes.string,
};

Content.defaultProps = {
  dayId: 0,
  index: 0,
  dayPhotoId: '',
  description: '',
  placeId: '',
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(Content);
