import db from '../models/index.js'

const { Manager, Admin, AdminMaster, AccountOfficer, Anggota } = db

const createAdminMaster = async (req, res, next) => {
  try {
    const {
      username,
      nama_admin_master,
      password_admin_master,
      no_hp_admin_master,
      jenis_kelamin,
      email_admin_master,
      alamat_admin_master,
      level_admin_master
    } = req.body;

    //check duplicate email
    const accountOfficer = await AccountOfficer.findOne({ where: { email_account_officer: email_admin_master } });
    if (accountOfficer) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const manager = await Manager.findOne({ where: { email_manager: email_admin_master } });
    if (manager) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const admin = await Admin.findOne({ where: { email_admin: email_admin_master } });
    if (admin) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const adminMaster = await AdminMaster.findOne({ where: { email_admin_master: email_admin_master } });
    if (adminMaster) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const anggota = await Anggota.findOne({ where: { email_anggota: email_admin_master } });
    if (anggota) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }

    const newAdminMaster = await AdminMaster.create({
      username,
      nama_admin_master,
      password_admin_master,
      no_hp_admin_master,
      jenis_kelamin,
      email_admin_master,
      alamat_admin_master,
      level_admin_master
    });

    res.status(201).json({
      code: 201,
      status: 'CREATED',
      data: newAdminMaster
    });

  } catch (error) {
    next(error)
  }
};

const getAllAdminMaster = async (req, res, next) => {
  try {
    const adminMaster = await AdminMaster.findAll();
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: adminMaster
    })
  } catch (error) {
    next(error)
  }
}

const getAdminMasterById = async (req, res, next) => {
  const { id } = req.params
  try {
    const adminMaster = await AdminMaster.findByPk(id)
    if (adminMaster == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'admin master not found' }]
      throw err
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: adminMaster
    })
  } catch (error) {
    next(error)
  }
}

const updateAdminMaster = async (req, res, next) => {
  const { id } = req.params
  const {
    username,
    nama_admin_master,
    password_admin_master,
    no_hp_admin_master,
    jenis_kelamin,
    email_admin_master,
    alamat_admin_master,
    level_admin_master
  } = req.body;
  try {
    const adminMaster = await AdminMaster.findByPk(id)
    if (adminMaster == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'admin master not found' }]
      throw err
    }

    await AdminMaster.update({
      username,
      nama_admin_master,
      password_admin_master,
      no_hp_admin_master,
      jenis_kelamin,
      email_admin_master,
      alamat_admin_master,
      level_admin_master
    }, {
      where: {
        id_admin_master: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success updated admin master' }]
    })
  } catch (error) {
    next(error)
  }
}

const deleteAdminMaster = async (req, res, next) => {
  const { id } = req.params
  try {
    const adminMaster = await AdminMaster.findByPk(id)
    if (adminMaster == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'admin master not found' }]
      throw err
    }

    await AdminMaster.destroy({
      where: {
        id_admin_master: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success deleted admin master' }]
    })
  } catch (error) {
    next(error)
  }
}


const adminMasterController = {
  createAdminMaster,
  getAllAdminMaster,
  getAdminMasterById,
  updateAdminMaster,
  deleteAdminMaster
}

export default adminMasterController