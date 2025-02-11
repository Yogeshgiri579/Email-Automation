// middleware/validateContact.js
const validateContact = (req, res, next) => {
  const { email, company, name } = req.body;

  if (!email  || !company || !name ) {
    return res.status(400).json({ success: false, message: 'Email and company are required' });
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  next();
};

export default validateContact;
