const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('../config/database');
const app = express();
const multer = require('multer');
const path = require('path');
const url = require('url');
const userId = 2


const GetDashboard = async (req, res, next) => {
    try {
        // Panggil fungsi checkUser untuk memeriksa apakah pengguna ada atau tidak
        const data = await checkUser(userId, res);

        // Render template sesuai kondisi
        if (data.items.length > 0) {
            // Jika ada items, render dashboard
            if (userId != 1) {
                const querySearch = `
            SELECT COUNT(p.id) AS count
            FROM permohonan_ukt p
            JOIN mahasiswa m ON p.id_mahasiswa = m.id
            JOIN user u ON m.id_user = u.id
            WHERE p.status = ? AND u.id = ?
        `;

                const processQuery = new Promise((resolve, reject) => {
                    koneksi.query(querySearch, [0, userId],  (err, rows, field) => {
                        if (err) {
                            console.error('Error executing query:', err);
                            return reject(err); // Tolak dengan error query
                        }
                        resolve(rows[0].count);
                    });
                });

                const approveQuery = new Promise((resolve, reject) => {
                    koneksi.query(querySearch, [1, userId], (err, rows, field) => {
                        if (err) {
                            console.error('Error executing query:', err);
                            return reject(err); // Tolak dengan error query
                        }
                        resolve(rows[0].count);
                    });
                });

                const rejectQuery = new Promise((resolve, reject) => {
                    koneksi.query(querySearch, [2, userId], (err, rows, field) => {
                        if (err) {
                            console.error('Error executing query:', err);
                            return reject(err); // Tolak dengan error query
                        }
                        resolve(rows[0].count);
                    });
                });

                const [processCount, approveCount, rejectCount] = await Promise.all([processQuery, approveQuery, rejectQuery]);

                data.items = {
                    process: processCount,
                    approve: approveCount,
                    reject: rejectCount
                };

                res.render('dashboard', data);

            } else {
                const querySearch = `
            SELECT m.nim, m.nama, u.username, u.email
            FROM mahasiswa m
            JOIN user u ON m.id_user = u.id
            WHERE u.role != ?
        `;

                koneksi.query(querySearch, 1, (err, rows, field) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        return reject(err); // Tolak dengan error query
                    }
                    //console.log(rows)
                    data.items = rows
                    res.render('mahasiswa', data);
                });
            }
        }
        // Jika tidak ada items, maka render err sudah ditangani di dalam checkUser
    } catch (err) {
        console.error('Error in GetDashboard:', err);
        next(err); // Lewatkan error ke middleware error handling
    }
};


const GetFileSurat = async (req, res) => {
    try {
        // Panggil fungsi checkUser untuk memeriksa apakah pengguna ada atau tidak
        const data = await checkUser(userId, res);
        res.render('surat_pengajuan', data);

    } catch (err) {
        console.error('Error', err);
        next(err); // Lewatkan error ke middleware error handling
    }
}

const GetRiwayatPengajuan = async (req, res) => {
    try {
        // Panggil fungsi checkUser untuk memeriksa apakah pengguna ada atau tidak
        const data = await checkUser(userId, res);
        const querySearch = `
            SELECT *
            FROM permohonan_ukt p
            JOIN mahasiswa m ON p.id_mahasiswa = m.id
            JOIN user u ON m.id_user = u.id
            JOIN jenis_ukt ju ON p.id_keringanan = ju.id
            WHERE u.id = ?
        `;

        koneksi.query(querySearch, userId, (err, rows, field) => {
            if (err) {
                console.error('Error executing query:', err);
                return reject(err); // Tolak dengan error query
            }
            //console.log(rows)
            data.items = rows
            res.render('riwayat_pengajuan', data);
        });

    } catch (err) {
        console.error('Error', err);
        next(err); // Lewatkan error ke middleware error handling
    }

}

const checkUser = (userId, res) => {
    return new Promise((resolve, reject) => {
        const querySearch = 'SELECT * FROM `user` WHERE id=?';
        koneksi.query(querySearch, userId, (err, rows1, field) => {
            if (err) {
                console.error('Error executing query:', err);
                return reject(err); // Tolak dengan error query
            }

            let data = {
                title: "Dashboard",
                id: userId,
                email: "",
                items: [],
                error: "",
            };

            if (rows1.length === 0) {
                // Jika tidak ada data pengguna ditemukan, atur pesan error
                data.error = "User tidak ditemukan";
                res.render("err", data);
                return resolve(data); // Resolve dengan data kosong
            } else {
                // Jika data pengguna ditemukan, atur data items
                data.items = rows1;
                data.email = rows1[0].email
                return resolve(data); // Resolve dengan data yang berisi items
            }
        });
    });
};


module.exports = { GetDashboard, GetFileSurat, GetRiwayatPengajuan }