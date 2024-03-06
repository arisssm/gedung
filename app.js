const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const gedungC = require('./controllers/GedungController');
const Gedung = require('./models/Gedung');

mongoose.connect('mongodb://localhost:27017/gedung');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('hello from simple server YEAH :)')
});

app.post('/post-gedung', async (req, res) =>{
    try {
        const { nama, luas, tingkat, kondisi, parkir } = req.body;
        console.log(req.body);
        const createGedung = await Gedung.create({
            nama,
            luas,
            tingkat,
            kondisi,
            parkir
        });
        res.status(200).json(
            { 
                message: 'data tersimpan sebagai berikut:', 
                gedung: createGedung 
            }
        );
    } catch (error) {
        res.status(400).json({ message: 'Maaf, data tidak tersimpan', error });
    }
});

app.get('/gedung', async (req, res)=>{
    try{
        const daftarGedung = await Gedung.find();
        res.status(200).json(
            {
                mesage: 'Berikut data gedung', 
                gedung: daftarGedung
            }
        );
    } catch(error){
        res.status(400).json({message: 'Maaf, data belum ada', error});
    }
});

app.put('/update-gedung', async (req, res)=>{
    try{
        const {id, nama, luas, tingkat, kondisi, parkir } = req.body;
        const gedung = await Gedung.findOne({_id:id});
        const updateGedung = await Gedung.findOneAndUpdate(
            {_id:id},
            {
                nama: nama,
                luas: luas,
                tingkat: tingkat,
                kondisi: kondisi,
                parkir: parkir
            },
            { new: true } 
        );
        if (updateGedung) { res.status(200).json(
            { 
                message: 'data berhasil diubah',
                gedung: gedung,
                updateGedung: updateGedung
            });
        } else {
            res.status(404).json({ message: 'gedung tidak ada' });
        }
    } catch(error){
        res.status(400).json({message: 'data gagal di ubah', error});
    }
});

app.delete('/gedung/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const delGedung = await Gedung.findOneAndDelete({ _id: id });
        if (delGedung) {
            res.status(200).json({
                message: 'data berhasil dihapus',
                gedung: delGedung
            });
        } else {
            res.status(404).json(
                { 
                    message: 'gedung tidak ditemukan' 
                }
            );
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/detail-gedung/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const data = await Gedung.findOne({_id:id});
        console.log(req.params);
        if (!data) {
            return res.status(404).json(
                { 
                    message: "data dalam pencarian tim SAR" 
                }
            );
        }
        res.status(200).json(
            {
                message: 'data berhasil di ambil', data
            }
        );
    } catch(error){
        res.status(400).json({ message: error.message});
    }
});

// app.get('/gedung', gedungC.index);
// app.post('/post-gedung', gedungC.create);
// app.get('/gedung/:id', gedungC.read);
// app.put('/update-gedung', gedungC.update);
// app.delete('/gedung/:id', gedungC.delete);

app.listen(port, () => {
    console.log(`> Server is up and running on port http://localhost:${port}`);
});

// module.exports = app;
