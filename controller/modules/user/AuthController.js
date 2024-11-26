'use strict';

const db = require('../../../connection/conn'); // Koneksi ke database
const bcrypt = require('bcryptjs'); // Untuk hashing password
const jwt = require('jsonwebtoken'); // Untuk JWT token
const response = require('../../../response/response'); // Utilitas response
const SECRET_KEY = 'a4d62e1cf3c8ab7f9e8f6e5c3a2b1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0';

// **Helper untuk mapping gender**
const genderMap = {
    L: 'Laki-laki',
    P: 'Perempuan',
};

// **Register User**
exports.registerUser = async (req, res) => {
    const { name, email, password, gender, UrlProfile } = req.body;

    // Validasi input
    if (!name || !email || !password || !gender) {
        return res.status(400).json({
            status: 400,
            message: 'Name, email, password, and gender are required',
        });
    }

    // Validasi gender
    if (!['L', 'P'].includes(gender)) {
        return res.status(400).json({
            status: 400,
            message: 'Gender must be L (Laki-laki) or P (Perempuan)',
        });
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid email format',
        });
    }

    try {
        // Periksa apakah email sudah terdaftar
        const checkQuery = 'SELECT * FROM user_tb WHERE email = ?';
        db.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error('Database error (checking email):', err);
                return res.status(500).json({
                    status: 500,
                    message: 'Error checking email in the database',
                    error: err.message,
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    status: 409,
                    message: 'Email already registered',
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Simpan user ke database
            const insertQuery = 'INSERT INTO user_tb (name, email, password, gender, UrlProfile) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [name, email, hashedPassword, gender, UrlProfile], (err, result) => {
                if (err) {
                    console.error('Database error (inserting user):', err);
                    return res.status(500).json({
                        status: 500,
                        message: 'Error registering user',
                    });
                }

                res.status(201).json({
                    status: 201,
                    message: 'User registered successfully',
                    data: {
                        name,
                        email,
                        gender: genderMap[gender],
                        UrlProfile,
                    },
                });
            });
        });
    } catch (error) {
        console.error('Unexpected error (register):', error);
        return res.status(500).json({
            status: 500,
            message: 'Unexpected server error',
        });
    }
};

// **Login User**
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: 'Email and password are required',
        });
    }

    const query = 'SELECT * FROM user_tb WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Database error (fetching user):', err);
            return res.status(500).json({
                status: 500,
                message: 'Error fetching user',
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid email or password',
            });
        }

        const user = results[0];

        try {
            // Verifikasi password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid email or password',
                });
            }

            // Buat token JWT
            const token = jwt.sign(
                { id: user.userid, name: user.name, email: user.email },
                SECRET_KEY,
                { expiresIn: '1h' } 
            );

            res.status(200).json({
                status: 200,
                message: 'Login successful',
                token,
            });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({
                status: 500,
                message: 'Error processing login',
            });
        }
    });
};

// **Logout User**
exports.logoutUser = (req, res) => {
    // Logout endpoint instructs the client to clear its token
    res.status(200).json({
        status: 200,
        message: 'User successfully logged out.',
    });
};

// **Middleware untuk Melindungi Endpoint**
exports.authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Token required',
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verifikasi token
        req.user = decoded; // Simpan data user ke dalam request
        next();
    } catch (err) {
        console.error('Token error:', err);
        return res.status(403).json({
            status: 403,
            message: 'Invalid or expired token',
        });
    }
};
