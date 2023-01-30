import dotProp from 'dot-prop-immutable';

// immutable function
const update = (templateId, newTitle, newCustomData) => (templates = {}) => {
  const updatedContent = dotProp.set(
    templates,
    `${templateId}.content`,
    newTitle,
  );
  return dotProp.merge(
    updatedContent,
    `${templateId}.customData`,
    newCustomData,
  );
};

// immutable function
const insertTabId = (parentId, id) => templates =>
  dotProp.merge(templates, `${parentId}.children`, id);

// immutable function
const removeTabId = (parentId, id) => templates =>
  dotProp.delete(templates, `${parentId}.children.${id}`);

const upsertPhoto = (templateId, photoId) => templates =>
  dotProp.set(templates, `${templateId}.photos`, [photoId]);

export default {
  update,
  insertTabId,
  removeTabId,
  upsertPhoto,
};
