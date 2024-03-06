const mongoose = require('mongoose');

const gedungSchema = new mongoose.Schema({
    nama: {
        type: String,
        require: true,
    },
    luas: {
        type: Number,
        require: true,
    },
    tingkat: {
        type: Number,
        require: true,
    },
    kondisi: {
        type: String,
        enum: ['dipakai umum', 'dipakai khusus', 'tidak dipakai'],
        require: true,
    },
    parkir: {
        type: String,
        enum: ['luas', 'sedang', 'sempit', 'sangat sempit'],
        require: true,
    },
});

module.exports = mongoose.model('Gedung', gedungSchema);