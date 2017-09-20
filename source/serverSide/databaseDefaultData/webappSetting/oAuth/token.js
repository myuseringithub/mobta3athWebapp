let data = [
    {
        key: 'exampleAccessToken',
        type: 'accessToken',
        token: '',
        expiresAt: '',
        scope: '',
        clientId: '',
        userId: '',
    },
    {
        key: 'exampleRefreshToken',
        type: 'refreshToken',
        token: '',
        expiresAt: '',
        scope: '',
        clientId: '',
        userId: '',
    },
    {
        key: 'exampleAuthorizationCode',
        type: 'authorizationCode',
        token: '',
        expiresAt: '',
        redirectUri: '',
        scope: '',
        clientId: '',
        userId: '',
    }
];

module.exports = {
    databaseTableName: 'oAuth_token',
    data: data
}