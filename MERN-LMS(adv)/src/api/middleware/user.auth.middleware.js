import logger from "../../util/logger";

const authenticate = (req, res, next) => {
  logger.info(req.isAuthenticated());
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(400).json({ message: 'Unauthorized' });
    logger.error('Unauthorized');
    // console.log('Unauthorized');
  }
};

export { authenticate };