const sleep = async timeMS => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, timeMS);
});

module.exports = sleep;
