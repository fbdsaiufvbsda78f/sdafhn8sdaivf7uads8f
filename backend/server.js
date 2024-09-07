const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Usersssssssss', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

const secretKey = 'test';

app.post('/api/registerEvent', async (req, res) => {
    //не успел
    res.status(200);
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'uje est' });

        user = new User({ name, email, password });

        await user.save();

        const payload = { userId: user.id };
        const token = jwt.sign({ id: user._id }, secretKey, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'bad1' });

        const isMatch = password == user.password;
        if (!isMatch) return res.status(400).json({ msg: 'bad2' });

        const payload = { userId: user.id };
        const token = jwt.sign({ id: user._id }, secretKey, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err });
    }
});

app.listen(5000, () => console.log(`Server runned`));
