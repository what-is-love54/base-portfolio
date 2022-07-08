export const log = (text, data = '') => {
  const time = new Date();

  console.log('[' + time.toLocaleTimeString() + '] ==> ' + text + ' <==', data);
};

export const logInfo = (text, data = '') => {
  const time = new Date();

  console.info(
    '[' + time.toLocaleTimeString() + '] ==> ' + text + ' <==',
    data,
  );
};

export const logError = (text, error = '') => {
  const time = new Date();

  console.error(
    '[' + time.toLocaleTimeString() + '] ==> ' + text + ' <==',
    error,
  );
  console.trace();
};
