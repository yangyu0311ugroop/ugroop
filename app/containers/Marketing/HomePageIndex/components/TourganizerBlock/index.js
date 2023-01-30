import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import GroupIcon from '@material-ui/icons/GroupWork';
import SharedIcon from '@material-ui/icons/FolderShared';
import Header from 'containers/Marketing/Components/Header';
import GridContainer from 'components/GridContainer';
import Container from 'components/Container';
import UnderlineWrapper from 'containers/Marketing/Components/UnderlineWrapper';
import Description from 'containers/Marketing/Components/Description';
import GridItem from 'components/GridItem/index';

import stylesheet from './style';

export const TourganizerBlock = ({ classes }) => (
  <div className={classes.root}>
    <Container>
      <Header as="h2" color="offwhite" className={classes.header}>
        Tourganizer
      </Header>
      <Description isBold size={16}>
        Let uGroop organise it for you
      </Description>
      <UnderlineWrapper>
        <Header as="h2" className={classes.secondHeader}>
          We are your very first school <span>tourganizer</span>
        </Header>
      </UnderlineWrapper>
      <GridContainer className={classes.tourList}>
        <GridItem className={classes.tourDescItems} xs={12} sm={4}>
          <FileIcon className={classes.iconStyle} />
          <Header as="h4" className={classes.noMarginTopBottom}>
            Create Tours For Schools
          </Header>
          <Description size={14}>
            Create that educational or leisure tour that you have been planning
            for the students, teachers, or for anyone in the school community
          </Description>
        </GridItem>
        <GridItem className={classes.tourDescItems} xs={12} sm={4}>
          <GroupIcon className={classes.iconStyle} />
          <Header as="h4" className={classes.noMarginTopBottom}>
            Create Tours For Schools
          </Header>
          <Description size={14}>
            Create that educational or leisure tour that you have been planning
            for the students, teachers, or for anyone in the school community
          </Description>
        </GridItem>
        <GridItem className={classes.tourDescItems} xs={12} sm={4}>
          <SharedIcon className={classes.iconStyle} />
          <Header as="h4" className={classes.noMarginTopBottom}>
            Create Tours For Schools
          </Header>
          <Description size={14}>
            Create that educational or leisure tour that you have been planning
            for the students, teachers, or for anyone in the school community
          </Description>
        </GridItem>
      </GridContainer>
    </Container>
  </div>
);

TourganizerBlock.propTypes = {
  classes: PropTypes.object,
};
TourganizerBlock.defaultProps = {};

export default withStyles(stylesheet, { name: 'TourganizerBlock' })(
  TourganizerBlock,
);
