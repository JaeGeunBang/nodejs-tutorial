/**
 * This function comment is parsed by doctrine
 * @route GET /{name}
 * @group collection - test
 * @param {string} name.path.required - 이름
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /
 * @group collection
 * @param {InsertCollection.model} collection.body.required - collections 정보
 * @produces application/json
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

/**
 * This function comment is parsed by doctrine
 * @route DELETE /{name}
 * @group collection
 * @param {string} name.path.required - 이름
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

/**
 * This function comment is parsed by doctrine
 * @route PUT /{name}
 * @group collection
 * @param {string} name.path.required - 이름
 * @param {UpdateCollection.model} collection.body.required - collections 정보
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */


/**
 * @typedef InsertCollection
 * @property {integer} age.required
 * @property {string} name.required
 */

/**
 * @typedef UpdateCollection
 * @property {integer} age.required
 */