// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://domainname.praktikum.nomoredomains.monster',
  'https://domainname.praktikum.nomoredomains.monster',
];

// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }

  return next();
};
