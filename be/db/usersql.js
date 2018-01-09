var UserSQL = {
                insert:'INSERT INTO user VALUES(?,?,?)',
                queryAll:'SELECT * FROM user',
                getUserById:'SELECT * FROM User WHERE uid = ? ',
              };
module.exports = UserSQL;
