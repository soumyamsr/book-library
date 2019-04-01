module.exports = {
  generateId: () => Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15),
  setCookie: (res, name, value, days) => res.cookie(name, value, { expire: (days * 24 * 60 * 60 * 1000) + Date.now() }),
  clearCookie: (res, name) => res.clearCookie(name),
};
