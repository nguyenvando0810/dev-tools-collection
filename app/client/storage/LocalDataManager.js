const APP_NAME = 'dev-tools-collection';
const getKeyForGame = key => `${APP_NAME}_${key}`;

/**
 * Get a string to local storage
 * @param {string} key 
 * @param {string} defaultValue 
 */
export const getStringForKey = (key, defaultValue) => {
  const value = localStorage.getItem(getKeyForGame(key));
  return value || defaultValue;
};

/**
 * Save a string from local storage
 * @param {string} key 
 * @param {string} value 
 */
export const setStringForKey = (key, value) => {
  localStorage.setItem(getKeyForGame(key), value);
};

/**
 * Get an integer number from local storage
 * @param {string} key 
 * @param {number} defaultValue 
 */
export const getIntForKey = (key, defaultValue) => {
  const value = getStringForKey(key);
  if (!value) {
    return defaultValue;
  }
  return parseInt(value, 10);
};

/**
 * Save an integer number from local storage
 * @param {string} key 
 * @param {number} value 
 */
export const setIntForKey = (key, value) => {
  setStringForKey(key, `${value}`);
};

/**
 * Get a float number from local storage
 * @param {string} key 
 * @param {number} value 
 */
export const getFloatForKey = (key, defaultValue) => {
  const value = getStringForKey(key);
  if (!value) {
    return defaultValue;
  }
  return parseFloat(value);
};

/**
 * Save a float number from local storage
 * @param {string} key 
 * @param {number} value 
 */
export const setFloatForKey = (key, value) => {
  setStringForKey(key, `${value}`);
};

/**
 * Get an object from local storage
 * @param {string} key 
 * @param {number} value 
 */
export const getObjectForKey = (key, defaultValue) => {
  const value = getStringForKey(key);
  if (!value) {
    return defaultValue;
  }
  return JSON.parse(value);
};

/**
 * Save an object from local storage
 * @param {string} key 
 * @param {object} value 
 */
export const setObjectForKey = (key, value) => {
  setStringForKey(key, JSON.stringify(value));
};

/**
 * Get a bool from local storage
 * @param {string} key 
 * @param {boolean} value 
 */
export const getBoolForKey = (key, defaultValue) => {
  const value = getStringForKey(key);
  if (!value) {
    return defaultValue;
  }
  return value === 'true';
};

/**
 * Save a bool from local storage
 * @param {string} key 
 * @param {boolean} value 
 */
export const setBoolForKey = (key, value) => {
  setStringForKey(key, value);
};