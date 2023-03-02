function bodyParser(req, next) {
  req.body = '';
  req.on('data', (data) => {
    req.body += data;
  });
  req.on('end', () => {
    next();
  });
}

module.exports = bodyParser;
