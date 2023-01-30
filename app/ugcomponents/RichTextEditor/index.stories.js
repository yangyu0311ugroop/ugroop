import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UGButton from 'ugcomponents/Buttons/Button';
import UGRichTextEditor from './index';

const sampleJSONString = '<div><p>Hello World 1234</p></div>';

storiesOf('RichTextEditor', module)
  .add('with no props passed', () => <UGRichTextEditor />)
  .add('with initialContent normal string', () => (
    <UGRichTextEditor initContent="Hello World!" />
  ))
  .add('with initialContent as json string', () => (
    <UGRichTextEditor initContent={sampleJSONString} />
  ))
  .add('with onChangeProps', () => (
    <UGRichTextEditor onChange={action('UGRichTextEditor-action')} />
  ))
  .add('with changing value of richTextEditor', () => {
    class SampleEditor extends React.Component {
      state = {
        value: null,
      };

      onSetVal = () => {
        this.setState({
          value: sampleJSONString,
        });
      };

      onChange = value => {
        this.setState({
          value,
        });
      };

      render = () => (
        <div>
          <UGButton onClick={this.onSetVal}>On change text</UGButton>
          <UGRichTextEditor
            initContent={this.state.value}
            onChange={this.onChange}
          />
        </div>
      );
    }

    return <SampleEditor />;
  })
  .add('read only richTextEditor', () => (
    <UGRichTextEditor readOnly initContent={sampleJSONString} />
  ));
