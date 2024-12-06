/**
 * Represents Shake report file.
 */
class ShakeFile {
  name: string = '';
  path: string = '';

  /**
   * Used to create new shake file.
   * @param filePath file path
   * @param fileName file name
   * @returns {ShakeFile} new shake file
   */
  static create(filePath: string, fileName: string = '') {
    const fileDetails = this._parseFilePath(filePath);
    if (!fileName) {
      fileName = fileDetails.name + fileDetails.ext;
    } else {
      fileName = fileName + fileDetails.ext;
    }

    let shakeFile = new ShakeFile();
    shakeFile.path = filePath;
    shakeFile.name = fileName;

    return shakeFile;
  }

  static _parseFilePath(path: string) {
    let obj: any = {},
      tmp;
    const components = path.split(/\//g);
    obj.base = components.pop();
    obj.dir = components.join('/');
    if (/^\//.test(obj.dir)) {
      obj.root = '/';
    }
    if (obj.base !== undefined) {
      tmp = obj.base.replace(/^[.]+/, '');
      if (/\./.test(tmp)) {
        obj.ext = tmp.match(/\.[^.]*$/)[0];
        obj.name = obj.base.slice(0, -obj.ext.length);
      } else {
        obj.name = obj.base;
      }
    } else {
      delete obj.base;
    }
    return obj;
  }
}

export default ShakeFile;
