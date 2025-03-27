const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Створюємо потік для запису логів у файл (флаг 'a' — додавання)
const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' });

// Middleware для логування запитів
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
    logStream.write(logEntry); // Запис у файл
    console.log(logEntry.trim()); // Вивід у консоль (не обов’язково)
    next();
});

// Маршрут /users повертає масив студентів
app.get('/users', (req, res) => {
    const users = [
        { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phone: "123-456-7890" },
        { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", phone: "987-654-3210" }
    ];
    res.json(users);
});

// Маршрут /users/:id повертає одного студента або 404
app.get('/users/:id', (req, res) => {
    const users = [
        { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phone: "123-456-7890" },
        { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", phone: "987-654-3210" }
    ];
    
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).send({ error: "User not found" });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
