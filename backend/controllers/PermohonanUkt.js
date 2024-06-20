import PermohonanUkt from "../models/PermohonanUktModel.js";

export const getPermohonanUkt = async (req, res) => {
  try {
    const response = await PermohonanUkt.findAll({
      attributes: [
        "id_permohonan",
        "id_keringanan",
        "id_mahasiswa",
        "status_permohonan",
        "semester_tujuan",
        "sks",
        "ktm",
        "ktp_mhs",
        "ktp_ortu",
        "kk",
        "doc_permohonan",
        "slip_gaji",
        "rumah",
        "transkrip",
      ],
    });
    // console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPermohonanUktsByID = async (req, res) => {
  try {
    const response = await PermohonanUkt.findOne({
      attributes: [
        "id_permohonan",
        "id_keringanan",
        "id_mahasiswa",
        "status_permohonan",
        "semester_tujuan",
        "ktm",
        "ktp_mhs",
        "ktp_ortu",
        "kk",
        "doc_permohonan",
        "slip_gaji",
        "rumah",
        "transkrip",
      ],
      where: {
        id_permohonan: req.params.id,
      },
    });
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPermohonanUkt = async (req, res) => {
  const {
    id_keringanan,
    id_mahasiswa,
    status_permohonan,
    semester_tujuan,
    sks,
    ktm,
    ktp_mhs,
    ktp_ortu,
    kk,
    doc_permohonan,
    slip_gaji,
    rumah,
    transkrip,
  } = req.body;

  try {
    await PermohonanUkt.create({
      id_keringanan: id_keringanan,
      id_mahasiswa: id_mahasiswa,
      status_permohonan: status_permohonan,
      semester_tujuan: semester_tujuan,
      sks: sks,
      ktm: ktm,
      ktp_mhs: ktp_mhs,
      ktp_ortu: ktp_ortu,
      kk: kk,
      doc_permohonan: doc_permohonan,
      slip_gaji: slip_gaji,
      rumah: rumah,
      transkrip: transkrip,
    });
    res.status(201).json({ msg: "Permohonan UKT Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// export const createPermohonanUkts = async (req, res) => {
//   const {
//     id_keringanan,
//     id_mahasiswa,
//     status_permohonan,
//     semester_tujuan,
//     sks,
//     ktm,
//     ktp_mhs,
//     ktp_ortu,
//     kk,
//     doc_permohonan,
//     slip_gaji,
//     rumah,
//     transkrip,
//   } = req.body;

//   //   console.log(
//   //     id_keringanan,
//   //     id_mahasiswa,
//   //     status_permohonan,
//   //     semester_tujuan,
//   //     sks,
//   //     ktm,
//   //     ktp_mhs,
//   //     ktp_ortu,
//   //     kk,
//   //     doc_permohonan,
//   //     slip_gaji,
//   //     rumah,
//   //     transkrip
//   //   );
//   try {
//     await PermohonanUkt.create({
//       id_keringanan: id_keringanan,
//       id_mahasiswa: id_mahasiswa,
//       status_permohonan: status_permohonan,
//       semester_tujuan: semester_tujuan,
//       sks: sks,
//       ktm: ktm,
//       ktp_mhs: ktp_mhs,
//       ktp_ortu: ktp_ortu,
//       kk: kk,
//       doc_permohonan: doc_permohonan,
//       slip_gaji: slip_gaji,
//       rumah: rumah,
//       transkrip: transkrip,
//     });
//     res.status(201).json({ msg: "Permohonan Ukt Berhasil!" });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

export const updatePermohonanUkt = async (req, res) => {
  const permohonan_ukt = await PermohonanUkt.findOne({
    where: {
      id_permohonan: req.params.id,
    },
  });

  if (!permohonan_ukt)
    return res.status(404).json({ msg: "Permohonan UKT tidak ditemukan!" });
  const {
    id_keringanan,
    id_mahasiswa,
    status_permohonan,
    semester_tujuan,
    sks,
    ktm,
    ktp_mhs,
    ktp_ortu,
    kk,
    doc_permohonan,
    slip_gaji,
    rumah,
    transkrip,
  } = req.body;

  try {
    await PermohonanUkt.update(
      {
        id_keringanan: id_keringanan,
        id_mahasiswa: id_mahasiswa,
        status_permohonan: status_permohonan,
        semester_tujuan: semester_tujuan,
        sks: sks,
        ktm: ktm,
        ktp_mhs: ktp_mhs,
        ktp_ortu: ktp_ortu,
        kk: kk,
        doc_permohonan: doc_permohonan,
        slip_gaji: slip_gaji,
        rumah: rumah,
        transkrip: transkrip,
      },
      {
        where: {
          id: permohonan_ukt.id,
        },
      }
    );
    res.status(201).json({ msg: "Permohonan Ukt Berhasil Update!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePermohonanUkt = async (req, res) => {
  const permohonanukt = await PermohonanUkt.findOne({
    where: {
      id_permohonan: req.params.id,
    },
  });
  if (!permohonanukt)
    return res.status(404).json({ msg: "Permohonan UKT tidak ditemukan" });
  try {
    await PermohonanUkt.destroy({
      where: {
        id: permohonanukt.id,
      },
    });
    res.status(200).json({ msg: "Permohonan UKT terhapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
