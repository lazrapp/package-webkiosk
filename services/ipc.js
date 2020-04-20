const ipc = require('node-ipc');
const serverName = 'lazr-control';

module.exports = {
    client: (clientName) => {
        let ipcClient = new ipc.IPC;
        let client;

        ipcClient.config.id = clientName;
        ipcClient.config.retry = 5000;

        return new Promise((resolve, reject) => {
            ipcClient.connectTo(serverName, () => {
                client = ipcClient.of[serverName];

                client.on('connect', () => client.emit('ident', clientName));

                resolve(client);
            });
        });
    }
};