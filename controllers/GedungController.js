const Gedung = require('../models/Gedung');

module.exports = {
    index: async (req, res) => {
        try{
            const daftarGedung = await Gedung.find();
            res.status(200).json({mesage: 'Berikut data gedung', daftarGedung});
        } catch(error){
            res.status(400).json({message: 'Maaf, data belum ada', error});
        }
    },
    create: async (req, res) => {
        try {
            console.log(req.body);
            // const { nama, luas, tingkat, kondisi, parkir } = req.body;
            // if (!nama || !luas || !tingkat || !kondisi || !parkir) {
            //     return res.status(400).json({ message: 'Payload tidak valid' });
            // }
            // const createGedung = await Gedung.create({
            //     nama,
            //     luas,
            //     tingkat,
            //     kondisi,
            //     parkir
            // });
            // res.status(200).json({ message: 'data tersimpan sebagai berikut:', createGedung });
        } catch (error) {
            res.status(400).json({ message: 'Maaf, data tidak tersimpan', error });
        }
    },    
    read: async(req, res) => {
        try{
            const {id} = req.params;
            const daftar = await Gedung.findOne({_id:id});
            if (!data) {
                return res.status(404).json({ message: "data dalam pencarian tim SAR" });
            }
            res.status(200).json({message: 'data berhasil di ambil', daftar});
        } catch(error){
            res.status(400).json({ message: error.message});
        }
    },
    update: async(req, res) => {
        try{
            const {id, nama, luas, tingkat, kondisi, parkir } = req.body;
            await Gedung.updateOne({_id:id},{
                nama: nama,
                luas: luas,
                tingkat: tingkat,
                kondisi: kondisi,
                parkir: parkir
            });
            res.status(200).json({message: 'data berhasil di ubah, terima kasih'});
        } catch(error){
            res.status(400).json({message: 'data gagal di ubah', error});
        }
    },
    delete: async(req, res) => {
        try{
            const {id} = req.params;
            const daftar = await Gedung.deleteOne({_id:id});
            res.status(200).json({message: 'berhasil di hapus.. yahh..', daftar});    
        } catch(error){
            res.status(200).json({message: error.message});    
        }
    }
}