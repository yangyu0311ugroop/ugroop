import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Icon from 'ugcomponents/Icon';
import { ToastContainer, toast } from './index';

const stories = storiesOf('Toast', module);

stories.addDecorator(withKnobs);

const iconOpts = ['none', 'default', 'Test icon', 'Sample Image'];

const handleClick = () => {
  alert('onClick()'); // eslint-disable-line no-alert
};

const makeIcon = opt => {
  let ret = null;

  switch (opt) {
    case 'Test icon':
      ret = <Icon icon="lnr-list3" />;
      break;

    case 'default':
      ret = undefined;
      break;

    default:
      ret = null;
      break;
  }

  return ret;
};

const imgStyle = { width: 'auto', height: 40, borderRadius: '50%' };

const notifyInfo = () => {
  const iconField = document.getElementById('toast-sample-icon').value;
  let icon = makeIcon(iconField);
  if (iconField === 'Sample Image') {
    icon = (
      <img
        style={imgStyle}
        src="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"
        alt="sample"
      />
    );
  }
  toast.info(document.getElementById('toast-sample-text').value, {
    icon,
    onClick: handleClick,
  });
};

const notifySuccess = () => {
  const iconField = document.getElementById('toast-sample-icon').value;
  let icon = makeIcon(iconField);
  if (iconField === 'Sample Image') {
    icon = (
      <img
        style={imgStyle}
        src="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"
        alt="sample"
      />
    );
  }
  toast.success(document.getElementById('toast-sample-text').value, {
    icon,
    onClick: handleClick,
  });
};

const notifyCritical = () => {
  const iconField = document.getElementById('toast-sample-icon').value;
  let icon = makeIcon(iconField);
  if (iconField === 'Sample Image') {
    icon = (
      <img
        style={imgStyle}
        src="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"
        alt="sample"
      />
    );
  }
  toast.critical(document.getElementById('toast-sample-text').value, {
    icon,
    onClick: handleClick,
  });
};

stories.add(
  'basic usage ',
  withInfo({
    text: `The Toast component. Use the following import:

    import { toast } from 'ugcomponents/Toast';
    import { messageType } from 'utils/constant';
    
    // Basic usage:
    
    toast.info('An activation code has been sent to your email address.');
    toast.success('You have successfully uploaded a photo.');
    toast.critical('Your post has been deleted.');
    toast.error('Unable to upload your photo.');  // Alias for toast.critical()
    
    // Usage with options
    
    const infoOpts = {
      icon: (<img src="/some/icon.png" alt="Some description" />),
      onClick: (e) => { e.preventDefault(); alert('Some info'); }, // Will get triggered if the icon or content is clicked
    };
    
    toast.info('You have received a notification.', infoOpts);
    
    const notifyOpts = {
      icon: (<img src="/some/icon.png" alt="Some description" />),
      type:  messageType.INFO,   // Other types are: messageType.SUCCESS and messageType.CRITICAL
    };
    
    toast.notify('Some generic info', notifyOpts); // Or you could have used \`toast.info()\` instead
    
    const critOpts = {
      icon: null,   // No icon at all
    };
    
    toast.critical('You have deleted your file.', critOpts);
`,
    inline: false,
    propTables: [ToastContainer],
  })(() => (
    <div>
      <div>
        <input
          id="toast-sample-text"
          type="hidden"
          value={text('Message', 'This is a sample message')}
        />
        <input
          id="toast-sample-icon"
          type="hidden"
          value={select('Icon', iconOpts)}
        />
      </div>
      <div>
        <input type="button" value="Notify Info" onClick={notifyInfo} />{' '}
        <input type="button" value="Notify Success" onClick={notifySuccess} />{' '}
        <input type="button" value="Notify Critical" onClick={notifyCritical} />
      </div>
      <ToastContainer />
    </div>
  )),
);
