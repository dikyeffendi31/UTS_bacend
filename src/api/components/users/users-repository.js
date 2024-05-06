const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers(
  pageNumber = 1,
  pageSize = 10,
  searchKey = '',
  sortField = 'email',
  sortOrder = 'asc'
) {
  const skip = (pageNumber - 1) * pageSize;
  let query = {};

  // Buat query untuk pencarian
  if (searchKey) {
    query = {
      $or: [
        { name: { $regex: searchKey, $options: 'i' } }, // i adalah case-insensitive
        { email: { $regex: searchKey, $options: 'i' } },
      ],
    };
  }

  // Lakukan pengurutan data
  const sortOption = {};
  sortOption[sortField] = sortOrder === 'asc' ? 1 : -1;

  return User.find(query).sort(sortOption).skip(skip).limit(pageSize);
}

async function getTotalCount() {
  return User.countDocuments();
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  getTotalCount,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
