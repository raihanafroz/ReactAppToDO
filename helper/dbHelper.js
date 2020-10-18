import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SQLite.db' });

export const dropTable = () => {
    console.log("Delete Table : ")
    db.transaction(function (txn) {
        txn.executeSql(`DROP TABLE IF EXISTS table_todo`, []);
        // txn.executeSql( sql, []  );
    });
}

export const createToDoTable = () => {
    console.log("create table : ")
    db.transaction(function (txn) {
        txn.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='table_todo'`,
            [],
            function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                    // CREATE TABLE IF NOT EXISTS ${tableName}(id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, status INTEGER DEFAULT 0)
                    txn.executeSql(`DROP TABLE IF EXISTS table_todo`, []);
                    txn.executeSql('CREATE TABLE IF NOT EXISTS table_todo(id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, status INTEGER DEFAULT 0)', []);
                }
            }
        );
    });
}

export const insertData = (data) => {
    console.log("insert data: " + data)
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO table_todo (data) VALUES (?)',
                    [data],
                    (tx, results) => {
                        // console.log(typeof results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }
                );
            });
        } catch (e) {
            resolve(false)
        }
    });
}

export const deleteData = (id) => {
    console.log("Delete data: " + id)
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM table_todo where id=${id}`,
                    [],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }
                );
            });
        } catch (e) {
            resolve(false)
        }
    });
}

export const getData = async () => {
    console.log("Getting All Data: ")
    return new Promise((resolve, reject) => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM table_todo', [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i) {
                                temp.push(results.rows.item(i));
                            }
                            resolve({ data: temp })
                        } else {
                            resolve({ data: [] });
                        }
                    }
                );
            }, null, null);
        } catch (e) {
            resolve(e)
        }
    });
}



export const updateData = (id, text) => {
    console.log("update data: Id = " + id + ", text: " + text)
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE table_todo SET data = ? WHERE id=?`,
                    [text, id],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }
                );
            });
        } catch (e) {
            resolve(false)
        }
    });
}