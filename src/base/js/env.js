function envProperties() {
  const serverDomain = '';
  const serverPort = 80;

  const serverConfig = {
    serverConfig: {
      SERVER_URL: 'https://' + serverDomain + '/kai/api/v2/capi',
      SERVER_AUTH_CODE: 'secret',
      SERVER_ENTERPRISE_TOKEN: 'TEMP_ENTERPRISE_TOKEN',
      SERVER_TYPE: 'conversational'
    }
  };

  return serverConfig;
}

if (typeof module !== 'undefined') {
  module.exports = envProperties;
}
