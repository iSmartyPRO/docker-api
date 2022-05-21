module.exports = {
  APP_NAME: "iSmarty API",
  share: {
          address: "//192.168.0.1/shara$",
          username: "./localuser",
          password: "you-password-here",
          maxProtocol: 'SMB3',
          maskCmd: true,
          folder: "/"
  },
  tokens: [
      {
          name: "Ilias Aidar",
          iToken: "some-token-here",
          resources: [
              {
                name: "iFolder",
                type: "backup"
              },
              {
                name: "iFolder",
                type: "credential"
              },
              {
                name: "iFolder",
                type: "script"
              }
            ]
      }
  ]
}