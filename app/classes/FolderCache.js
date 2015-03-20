var fs = require('fs'),
    Promise = require('promise'),
    uuid = require('node-uuid'),
    FileCache = require('./FileCache'),
    FolderCache;

FolderCache = function (folder, fileMatch) {
    this._cache  = [];
    this.folder = folder;
    this.fileMatch = fileMatch || /\.json$/;

    this.createCache()
        .then(function (cache) {
            this._cache = cache;
        }.bind(this));
};

FolderCache.prototype.getReccords = function () {
    return this._cache;
};

FolderCache.prototype.fileReader = function (name) {
    return new Promise(function (fufill, reject) {
        var fileCache = new FileCache(name, this.folder, true, function () {
            fufill(fileCache);
        });
    }.bind(this));
};

FolderCache.prototype.newFile = function (data) {
    return new Promise(function (fufill, reject) {
        var name = uuid.v1(),
            fileCache = new FileCache(name + '.json', this.folder);

        fileCache.setData(data).then(function () {
            this._cache.push(fileCache);
            fufill();
        }.bind(this));
    }.bind(this));
};

FolderCache.prototype.createCache = function () {
    return new Promise(function (fufill, reject) {
        fs.readdir(this.folder, function (err, folderContent) {
            if (err) {
                reject(err);
            } else {
                var files = [];

                folderContent.forEach(function (name) {
                    if (name.match(this.fileMatch)) {
                        files.push(this.fileReader(name));
                    }
                }.bind(this));

                Promise.all(files)
                    .then(function (data) {
                        fufill(data);
                    });
            }
        }.bind(this));
    }.bind(this));
};

FolderCache.prototype.getFile = function (property, match) {
    var cache = this._cache,
        i;

    for (i = 0; i < cache.length; i++) {
        if (cache[i].data[property] === match) {
            return cache[i];
        }
    }
};

FolderCache.prototype.getFiles = function (property, match) {
    if (!property || match === undefined) {
        return this._cache;
    }

    var matches = [];

    this._cache.forEach(function (file) {
        if (file.data[property] === match) {
            matches.push(file);
        }
    });

    return matches;
};

module.exports = FolderCache;