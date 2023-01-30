export const historyPushWithState = ({ history, path, state }) => {
  history.push({
    pathname: path,
    state,
  });
};
