const path = require('path')

class Utils {
  static isPathRelative(path) {
    return path.normalize(path) !== path.resolve(path)
  }

  static splitCommandLine(cmd) {
    if (!cmd) {
      return []
    }

    return cmd.match(/([^\s"']+|["'][^"']*["'])+/g)
              .map(s => s.replace(/["']/g, ''))
  }
}

module.exports = Utils;
