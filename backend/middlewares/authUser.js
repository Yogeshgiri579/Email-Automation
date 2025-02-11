import jwt from 'jsonwebtoken';



const authUser = async (req, res, next) => {
  try {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
        return res.status(401).json({ message: 'No cookies found' });
    }

    // Extract the token from the Cookie header
    const token = cookieHeader
        .split('; ')
        .find(cookie => cookie.startsWith('token='))
        ?.split('=')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized:  token is not provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      email: decoded.email,
      id: decoded.id,
    };

    next();
  } catch (error) {
    console.error(error);
    let errorMessage = 'Unauthorized !!!!';

    if (error.name === 'JsonWebTokenError') {
      errorMessage = error.message; // JWT specific errors (e.g., invalid token, expired token)
    }

    res.status(401).json({ success: false, message: errorMessage });
  }
};

export default authUser;