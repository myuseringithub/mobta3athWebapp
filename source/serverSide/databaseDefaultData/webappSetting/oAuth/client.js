let data = [
    {
        key: 'example',
        clientSecret: 'example',
        redirectUri: 'https://google.com/example',
        grantType: ['authorization_code', 'client_credentials', 'password', 'refresh_token'],
        scope: 'all',
        accessTokenLifetime: '',
        refreshTokenLifetime: ''
    }
];

module.exports = {
    databaseTableName: 'oAuth_client',
    data: data
}