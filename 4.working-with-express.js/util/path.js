const path = require("path");

module.exports = path.dirname(require.main.filename);
//basically give the dirname of the file which is responsible for the fact that our application is running and this file name into dirname in order to ge the path to the directory.

