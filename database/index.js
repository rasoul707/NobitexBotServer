const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mdb.db');


db.serialize(() => {
    db.run("CREATE TABLE stagesOrder(id INTEGER PRIMARY KEY, email TEXT, token TEXT, type TEXT, pair TEXT, amount DOUBLE, price DOUBLE)", (err) => { });
});




export const insertStageOrder = (data) => {
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO stagesOrder(token, type, pair, amount, price) VALUES (?,?,?,?,?)");
        stmt.run(data.token, data.type, data.pair, data.amount, data.price);
        stmt.finalize();
    });
}




