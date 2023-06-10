import db from '../models/index.js'

const { Manager, Admin, AdminMaster, AccountOfficer, Anggota } = db

const createAdmin = async (req, res, next) => {
  try {
    const {
      username,
      nama_admin,
      password_admin,
      no_hp_admin,
      jenis_kelamin,
      email_admin,
      alamat_admin,
      level_admin
    } = req.body;

    //check duplicate email
    const accountOfficer = await AccountOfficer.findOne({ where: { email_account_officer: email_admin } });
    if (accountOfficer) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const manager = await Manager.findOne({ where: { email_manager: email_admin } });
    if (manager) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const admin = await Admin.findOne({ where: { email_admin: email_admin } });
    if (admin) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const adminMaster = await AdminMaster.findOne({ where: { email_admin_master: email_admin } });
    if (adminMaster) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const anggota = await Anggota.findOne({ where: { email_anggota: email_admin } });
    if (anggota) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }

    const newAdmin = await Admin.create({
      username,
      nama_admin,
      password_admin,
      no_hp_admin,
      jenis_kelamin,
      email_admin,
      alamat_admin,
      level_admin
    });

    res.status(201).json({
      code: 201,
      status: 'CREATED',
      data: newAdmin
    });

  } catch (error) {
    next(error)
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findAll();
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: admin
    })
  } catch (error) {
    next(error)
  }
}

const getAdminById = async (req, res, next) => {
  const { id } = req.params
  try {
    const admin = await Admin.findByPk(id)
    if (admin == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'admin not found' }]
      throw err
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: admin
    })
  } catch (error) {
    next(error)
  }
}

const updateAdmin = async (req, res, next) => {
  const { id } = req.params
  const {
    username,
    nama_admin,
    password_admin,
    no_hp_admin,
    jenis_kelamin,
    email_admin,
    alamat_admin,
    level_admin
  } = req.body;
  try {
    const admin = await Admin.findByPk(id)
    if (admin == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'admin not found' }]
      throw err
    }

    await Admin.update({
      username,
      nama_admin,
      password_admin,
      no_hp_admin,
      jenis_kelamin,
      email_admin,
      alamat_admin,
      level_admin
    }, {
      where: {
        id_admin: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success updated admin' }]
    })
  } catch (error) {
    next(error)
  }
}

const deleteAdmin = async (req, res, next) => {
  const { id } = req.params
  try {
    const admin = await Admin.findByPk(id)
    if (admin == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'admin not found' }]
      throw err
    }

    await Admin.destroy({
      where: {
        id_admin: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success deleted admin' }]
    })
  } catch (error) {
    next(error)
  }
}


const adminController = {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin
}

export default adminController