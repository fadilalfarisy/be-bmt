import db from '../models/index.js'

const { Manager, Admin, AdminMaster, AccountOfficer, Anggota } = db

const createAnggota = async (req, res, next) => {
  try {
    const {
      username,
      password_anggota,
      nama_anggota,
      nik,
      jenis_kelamin,
      no_hp_anggota,
      alamat_anggota,
      pekerjaan_anggota,
      no_rekening,
      status_perkawinan,
      email_anggota
    } = req.body;

    //check duplicate email
    const accountOfficer = await AccountOfficer.findOne({ where: { email_account_officer: email_anggota } });
    if (accountOfficer) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const manager = await Manager.findOne({ where: { email_manager: email_anggota } });
    if (manager) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const admin = await Admin.findOne({ where: { email_admin: email_anggota } });
    if (admin) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const adminMaster = await AdminMaster.findOne({ where: { email_admin_master: email_anggota } });
    if (adminMaster) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const anggota = await Anggota.findOne({ where: { email_anggota: email_anggota } });
    if (anggota) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }

    const newAnggota = await Anggota.create({
      username,
      password_anggota,
      nama_anggota,
      nik,
      jenis_kelamin,
      no_hp_anggota,
      alamat_anggota,
      pekerjaan_anggota,
      no_rekening,
      status_perkawinan,
      email_anggota
    });

    res.status(201).json({
      code: 201,
      status: 'CREATED',
      data: newAnggota
    });

  } catch (error) {
    next(error)
  }
};

const getAllAnggota = async (req, res, next) => {
  try {
    const anggota = await Anggota.findAll();
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: anggota
    })
  } catch (error) {
    next(error)
  }
}

const getAnggotaById = async (req, res, next) => {
  const { id } = req.params
  try {
    const anggota = await Anggota.findByPk(id)
    if (anggota == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'anggota not found' }]
      throw err
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: anggota
    })
  } catch (error) {
    next(error)
  }
}

const updateAnggota = async (req, res, next) => {
  const { id } = req.params
  const {
    username,
    password_anggota,
    nama_anggota,
    nik,
    jenis_kelamin,
    no_hp_anggota,
    alamat_anggota,
    pekerjaan_anggota,
    no_rekening,
    status_perkawinan,
    email_anggota
  } = req.body;
  try {
    const anggota = await Anggota.findByPk(id)
    if (anggota == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'anggota not found' }]
      throw err
    }

    await Anggota.update({
      username,
      password_anggota,
      nama_anggota,
      nik,
      jenis_kelamin,
      no_hp_anggota,
      alamat_anggota,
      pekerjaan_anggota,
      no_rekening,
      status_perkawinan,
      email_anggota
    }, {
      where: {
        id_anggota: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success updated anggota' }]
    })
  } catch (error) {
    next(error)
  }
}

const deleteAnggota = async (req, res, next) => {
  const { id } = req.params
  try {
    const anggota = await Anggota.findByPk(id)
    if (anggota == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'anggota not found' }]
      throw err
    }

    await Anggota.destroy({
      where: {
        id_anggota: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success deleted anggota' }]
    })
  } catch (error) {
    next(error)
  }
}


const anggotaController = {
  createAnggota,
  getAllAnggota,
  getAnggotaById,
  updateAnggota,
  deleteAnggota
}

export default anggotaController