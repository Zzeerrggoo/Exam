const userQueries = require('./queries/userQueries');

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }

    const updatedUser = await userQueries.updateUser(
      req.body,
      req.params.userId,
    );

    const data = {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    };

    res.status(200).send({
      data,
    });
  } catch (err) {
    next(err);
  }
};
