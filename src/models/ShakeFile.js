class ShakeFile {
    name;
    path;

    static create(filePath, fileName = "") {
        if (!fileName) {
            fileName = this._parseFilePath(filePath).name;
        }

        let shakeFile = new ShakeFile();
        shakeFile.path = filePath;
        shakeFile.name = fileName;

        console.log(shakeFile);

        return shakeFile;
    }

    static _parseFilePath(path) {
        let obj = {}, tmp;
        const components = path.split(/\//g);
        obj.base = components.pop();
        obj.dir = components.join('/');
        if (/^\//.test(obj.dir)) {
            obj.root = '/';
        }
        if (obj.base !== undefined) {
            tmp = obj.base.replace(/^[\.]+/, '');
            if (/\./.test(tmp)) {
                obj.ext = tmp.match(/\.[^.]*$/)[0];
                obj.name = obj.base.slice(0, -obj.ext.length);
            } else {
                obj.name = obj.base
            }
        } else {
            delete obj.base
        }
        return obj;
    }
}

export default ShakeFile;