import React from 'react';
import { withKnobs, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import sb, { withTheme, withInfo } from 'utils/helpers/storybook';
import Button from 'viewComponents/Button';
import GridContainer from 'components/GridContainer/';
import GridItem from 'components/GridItem/';
import { Text } from 'ugcomponents/Inputs';
import { Number } from 'smartComponents/Inputs';
import PopoverForm, { PopoverForm as PopoverFormComponent } from '.';

PopoverForm.displayName = 'PopoverForm';
Button.displayName = 'Button';

const DEFAULT_CHILDREN_TEXT = 'Some form inputs';

const render = (p = {}, opts = {}) => {
  const {
    children = DEFAULT_CHILDREN_TEXT,
    open = PopoverFormComponent.defaultProps.open,
    popoverProps = PopoverFormComponent.defaultProps.popoverProps,
    ...rest
  } = p;
  return (
    <PopoverForm
      {...sb.props(
        [
          sb.makeProp('open', open, boolean),
          sb.makeProp('popoverProps', popoverProps, object),
        ],
        opts,
      )}
      onClose={action('onClose')}
      onValid={action('onValid')}
      onInvalid={action('onInvalid')}
      {...sb.prop('rest', rest, object, opts)}
    >
      {children}
    </PopoverForm>
  );
};

const usage = {
  info: {
    propTables: [PopoverFormComponent],
    propTablesExclude: [PopoverForm],
  },
  render: () => render({ open: true }, { knob: true }),
};

class Demo extends React.PureComponent {
  state = {};

  render = props => (
    <React.Fragment>
      <Button
        buttonRef={ref => {
          this.setState({ buttonRef: ref });
        }}
        onClick={() => {
          this.setState({ open: true });
        }}
      >
        Open Popover
      </Button>
      {render({
        open: this.state.open,
        onClose: () => {
          this.setState({ open: false });
        },
        popoverProps: {
          anchorEl: this.state.buttonRef,
        },
        children: (
          <Number
            name="numberDemo"
            label="Some number field"
            value="15"
            helperText="Valid values: 10-20"
            min={10}
            max={20}
          />
        ),
        ...props,
      })}
    </React.Fragment>
  );
}

const demos = {
  info: {
    propTablesExclude: [
      GridContainer,
      GridItem,
      Button,
      Text,
      PopoverForm,
      Demo,
    ],
  },
  render: () => (
    <GridContainer>
      <GridItem>
        <Demo />
      </GridItem>
    </GridContainer>
  ),
};

sb.viewComponentsStoriesOf('PopoverForm')
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  // .add('Usage', withInfo(usage.info)(usage.render)) // SK: It's not very useful
  .add('Demos', withInfo(demos.info)(demos.render));

export default {
  usage,
  demos,
};
