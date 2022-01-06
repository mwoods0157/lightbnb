const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'Vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(`SELECT * FROM users WHERE email = $1`, [email])
  .then((result) => result.rows)
  .catch((e) => {
    console.log(e.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`SELECT * FROM users WHERE id = $1`, [id])
  .then((result) => result.rows)
  .catch((e) => {
    console.log(e.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const values = [user[0], user[1], user[2]];
  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, values)
  .then((result) => result.rows)
  .catch((e) => {
    console.log(e.message);
  });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  let values = [guest_id, limit];
  return pool
  .query(`SELECT * FROM reservations WHERE guest_id = $1 LIMIT $2`, values)
  .then((result) => result.rows)
  .catch((e) => {
    console.log(e.message);
  });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const value = property;
  let queryString = `
  INSERT INTO 
  properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`;

  return pool
  .query(queryString, value)
  .catch((e) => {
    console.log(e.message);
  })
}
exports.addProperty = addProperty;

const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.* , AVG(property_reviews.rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    createTag();
    queryString += `city LIKE ${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);
    createTag();
    queryString += `owner_id = ${owner_id}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`%${options.minimum_price_per_night}%`);
    createTag();
    queryString += `cost_per_night > ${minimum_price_per_night}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`%${options.maximum_price_per_night}%`);
    createTag();
    queryString += `cost_per_night < ${maximum_price_per_night}`;
  }

  if (options.minimum_rating) {
    queryParams.push(`%${options.minimum_rating}`);
    createTag();
    queryString += 'propery_reviews.rating > minimum_rating';
  }
  
  const createTag = function() {
    if (queryParams.length > 0) {
      queryString += ' AND ';
    } else {
      queryString += ' WHERE ';
    }
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}`;

  console.log(queryString, queryParams);

  return pool
  .query(queryString, queryParams)
  .then((result) => result.rows)
  .catch((e) => {
    console.log(e.message);
  });
};
exports.getAllProperties = getAllProperties;