module.exports = {
    "port": 3000,
    "appEndpoint": 'https://api-shamserrand.herokuapp.com:3000',
    "apiEndpoint": 'https://api-shamserrand.herokuapp.com:3000',
    "jwt_secret": "s3CuR3P45sw0R6",
    "jwt_expiration_in_seconds": 36000,
    "environment": "prod",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    }
}