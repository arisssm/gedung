const Gedung = require('../models/Gedung');

module.exports = {
    index: async (req, res) => {
        try{
            const daftarGedung = await Gedung.find();
            res.status(200).json({mesage: 'Data berhasil tampil, berikut data gedung', daftarGedung});
        } catch(error){
            res.status(400).json({message: error.message});
        }
    },
    create: async (req, res) => {
        try {
            const { nama, luas, tingkat, kondisi, parkir } = req.body;
            console.log(req.body);
            if (!nama || !luas || !tingkat || !kondisi || !parkir) {
                return res.status(400).json({ message: 'Req body tidak valid' });
            }
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
            res.status(400).json({ message: error.message });
        }
    },    
    read: async(req, res) => {
        try{
            const {id} = req.params;
            const data = await Gedung.findOne({_id:id});
            if (!data) {
                return res.status(404).json({ message: "data dalam pencarian tim SAR" });
            }
            res.status(200).json({message: 'data berhasil di ambil', data});
        } catch(error){
            res.status(400).json({ message: error.message});
        }
    },
    update: async(req, res) => {
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
            res.status(200).json({message: 'data berhasil di ubah', gedung: gedung, update: updateGedung});
        } catch(error){
            res.status(400).json({message: error.message});
        }
    },
    delete: async(req, res) => {
        try{
            const {id} = req.params;
            const delGedung = await Gedung.findOneAndDelete({_id:id});
            if (delGedung) {
                res.status(200).json({
                    message: 'data berhasil dihapus',
                    gedung: delGedung
                });
            } else {
                res.status(404).json({message: 'gedung tidak ditemukan'});
            }    
        } catch(error){
            res.status(200).json({message: error.message});    
        }
    }
}