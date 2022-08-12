const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mdb.db');


db.serialize(() => {
    db.run("CREATE TABLE accounts(id INTEGER PRIMARY KEY, email TEXT, password TEXT)", (err) => { });
    db.run("CREATE TABLE orders(id INTEGER PRIMARY KEY, email TEXT, pair TEXT, type TEXT, actionType TEXT, amount DOUBLE, price DOUBLE, totalAmount DOUBLE, stages TEXT, status TEXT)", (err) => { });
});




export const insertStageOrder = async (data) => {
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO orders(email, pair, type, actionType, totalAmount, stages, status) VALUES (?,?,?,?,?,?,?)");
        stmt.run(data.email, data.pair, data.type, "stages", data.totalAmount, JSON.stringify(data.stages), "active");
        stmt.finalize();
    });
}



export const insertNormalOrder = async (data) => {
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO orders(email, pair, type, actionType, amount, price, status) VALUES (?,?,?,?,?,?,?)");
        stmt.run(data.email, data.pair, data.type, "normal", data.amount, data.price, "active");
        stmt.finalize();
    });
}




export const getOrdersList = async (email) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all("SELECT * from orders where email=" + email, (err, rows) => {
                resolve(rows)
            });
        });
    })
}
