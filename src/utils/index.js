module.exports = {
  isDev(envName) {
    return !(envName) || (envName === 'development');
  },
};
