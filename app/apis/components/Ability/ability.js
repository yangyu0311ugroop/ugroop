import { Ability, AbilityBuilder } from '@casl/ability';

// manage is default alias, which includes [create, retrieve, update, delete]
Ability.addAlias('execute', ['manage', 'move']);

// logic to extract subject name from subject instances
// It's important to handle case when `subject` is undefined or string!
// Otherwise you will not be able to check abilities on class names (e.g., `ability.can('read', 'Post')`)
export const subjectName = subject =>
  !subject || typeof subject === 'string' ? subject : subject.type;

// init an empty ability (cannot do anything)
export const ability = AbilityBuilder.define({ subjectName }, () => {});
