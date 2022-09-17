const express = require('express');
const mongoose = require('mongoose');
const { TimeoutError } = require('sequelize/types');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// to use mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:227017/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// to log executing mongo queries:
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
