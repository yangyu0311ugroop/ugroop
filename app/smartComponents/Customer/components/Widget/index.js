import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React from 'react';

export const Widget = ({ title, renderContent, renderAction }) => {
  const widgetContent = renderContent();
  const widgetAction = renderAction();

  return (
    <>
      <GridContainer
        direction="column"
        justify="center"
        alignItems="center"
        card
        elevation={1}
      >
        <GridItem>
          <JText lg bold>
            {title}
          </JText>
        </GridItem>
        <GridItem>{widgetContent}</GridItem>
        <GridItem>{widgetAction}</GridItem>
      </GridContainer>
    </>
  );
};

Widget.propTypes = {
  title: PropTypes.string,
  renderContent: PropTypes.func.isRequired,
  renderAction: PropTypes.func.isRequired,
};

Widget.defaultProps = {
  title: '',
};

export default React.memo(Widget);
