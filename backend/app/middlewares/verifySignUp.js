const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const query = {
      $or: [
        {
          username: req.body.username,
        },
        {
          email: req.body.email,
        },
      ],
    };

    const userInfo = await User.findOne(query);
    console.log(userInfo);
    if (userInfo) {
      return res.json({
        success: true,
        statusCode: 409,
        message: "User already exists",
      });
    } else return true;
  } catch (error) {
    return next(error);
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
