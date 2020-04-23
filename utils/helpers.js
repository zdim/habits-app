exports.getLocalTimeFormatted = () => {
    var offset = new Date().getTimezoneOffset() * 60000;
    var localIsoTime = new Date(Date.now() - offset).toISOString().slice(0, 10);
    return localIsoTime;
}

exports.getCurrentTime = () => {
    var offset = new Date().getTimezoneOffset() * 60000;
    var localIsoTime = new Date(Date.now() - offset).toISOString().slice(11, 16);
    return localIsoTime;
}