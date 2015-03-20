var fs = require('fs'),
    Promise = require('promise'),
    FileCache;

FileCache = function (fileName, folder, loadFromFile, onLoaded) {
    this._fileName = fileName;
    this._folder = folder;
    this.data = null;

    if (loadFromFile) {
        this._loadData()
            .then(function (data) {
                this._setCache(data);

                if (onLoaded) {
                    onLoaded();
                }
            }.bind(this));
    } else {
        this._saveData()
            .then(function () {
                if (onLoaded) {
                    onLoaded();
                }
            });
    }
};

FileCache.prototype._setCache = function (newData, strict) {
    if (!this.data) {
        this.data = newData;
    } else {
        var keys = Object.keys(this.newData);

        strict = strict === undefined ? true : strict;

        keys.forEach(function (key) {
            if (this.data.hasOwnProperty(key) || !strict) {
                this.data[key] = newData[key];
            }
        }.bind(this));
    }

    return this;
};

FileCache.prototype.setData = function (newData) {
    this._setCache(newData);
    return this._saveData();
};

FileCache.prototype._saveData = function () {
    return new Promise(function (fufill, reject) {
        var data = JSON.stringify(this.data, null, 4);

        fs.writeFile(this._folder + '/' + this._fileName, data, {flag: 'w'}, function (err) {
            if (err) {
                reject();
            } else {
                fufill();
            }
        });
    }.bind(this));
};

FileCache.prototype._loadData = function () {
    return new Promise(function (fufill, reject) {
        fs.readFile(this._folder + '/' + this._fileName, {encoding: 'utf8'}, function (err, data) {
            if (err) {
                reject(err);
            } else {
                fufill(JSON.parse(data));
            }
        }.bind(this));
    }.bind(this));
};

module.exports = FileCache;