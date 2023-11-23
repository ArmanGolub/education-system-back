const db = require("./../models/index")
const asyncHandler = require("./../middlewares/asyncHandler");

exports.getUsers = asyncHandler(async (req, res, next) => {

    const users = await db.User.findAll();
    
    
    if (!users) {
      return next({
        message: `Server error - ${req.params.id}`,
        statusCode: 404,
      });
    }
  
    return res.status(200).json({ success: true, data: users });
    
  });   
