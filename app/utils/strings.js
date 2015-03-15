var stringUtils = {};

stringUtils.camelCase = function (string, reg) {
    string = string.split(reg || /[\s\-]+?/);

    string.forEach(function (word, index, arr) {
        if (index > 0) {
            arr[index] = word[0].toUpperCase() + word.substr(1).toLowerCase();
        } else {
            arr[index] = word.toLowerCase();
        }
    });

    return string.join('');
};

stringUtils.urlSafe = function (string) {
    return string.replace(/[^\w\s\-]/gi, '');
};

stringUtils.toUrl = function (string) {
    return this.urlSafe(string).replace(/\s/g, '-').toLowerCase();
};

module.exports = stringUtils;