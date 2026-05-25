// middleware for generating logs


export const reqLogger = (req, res, next) => {
  console.log(req.method, req.url, new Date().toLocaleString());
  next()
};
