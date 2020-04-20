const xsession = require('./services/xsession');

const templates = xsession.templates;
const desktop = xsession.inject.combined(templates, {
    env: {
        chromium: {
            window: "800,480",
            url: "https://google.com"
        }
    }
});

xsession.write(desktop);