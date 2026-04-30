const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ueh_event"
});

db.connect(err => {
    if (err) {
        console.error("❌ Lỗi kết nối DB:", err);
        return;
    }
    console.log("✅ Connected to MySQL");
});

app.get("/", (req, res) => {
    res.send("Server đang chạy 🚀");
});

app.post('/create-order', (req, res) => {
    console.log("📥 Nhận dữ liệu:", req.body);

    const { order_id, name, email, phone, amount, payment_method } = req.body;

    const sql = `
        INSERT INTO orders (order_id, name, email, phone, amount, payment_method)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [order_id, name, email, phone, amount, payment_method], (err, result) => {
        if (err) {
            console.error("❌ Lỗi SQL:", err);
            return res.status(500).json({ error: "Lỗi database" });
        }

        console.log("✅ Insert thành công!");
        res.json({ message: "Đặt vé thành công" });
    });
});

app.listen(3000, () => {
    console.log("🚀 Server chạy tại http://localhost:3000");
});