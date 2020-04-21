const ipc = require('./services/ipc');
const xsession = require('./services/xsession');

let client;
let clientName = 'webkiosk';

async function processMQTTMessage(data) {
    console.log('Received MQTT message', data);

    /* expecting data to be something like
    {
        "chromium": {
            "url": "https://...",
            "window": "800,480"
        }
    }*/
    

    if (!data.chromium || !data.chromium.url) return console.error('Missing data parameters');
    if (!data.chromium.window) data.chromium.window = "800,480";

    const templates = xsession.templates;
    const desktop = xsession.inject.combined(templates, {
        env: data
    });
    const chromium = xsession.inject.chromium(templates[1], {
        env: data
    });
    xsession.write(desktop);
    xsession.set(chromium);
    client.emit('state', JSON.stringify({
        package: clientName,
        state: data
    }));
}

async function start() {
    client = await ipc.client(clientName);

    client
        .on('connect', () => console.log('connected'))
        .on(`mqtt`, processMQTTMessage);
}

start();