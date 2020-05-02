const fs = require('fs');
const exec = require('child_process').execSync;
const _ = require('lodash');

function execOnDisplay(args) {
    return exec(`DISPLAY=:0 ${args}`);
}

module.exports = {
    templates: [
        fs.readFileSync('templates/.Xsession'),
        fs.readFileSync('templates/.chromium')
    ],
    inject: {
        combined: (templates, vars) => {
            let chromium = _.template(templates[1])(vars);
            return `${templates[0]}\n${chromium}`;
        },
        chromium: (template, vars) => {
            return _.template(template)(vars);
        }
    },
    write: (file) => {
        return fs.writeFileSync('/home/lazr-pck-webkiosk/.Xsession', file);
    },
    set: (chromium) => {
        return execOnDisplay(chromium);
    },
    screenshot: () => {
        return execOnDisplay(`import -window root image.png`);
    }
};