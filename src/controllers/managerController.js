import db from '../models/index.js'

const { Manager, Admin, AdminMaster, AccountOfficer, Anggota } = db

const createManager = async (req, res, next) => {
  try {
    const {
      username,
      nama_manager,
      password_manager,
      no_hp_manager,
      jenis_kelamin,
      email_manager,
      alamat_manager,
      level_manager
    } = req.body;

    //check duplicate email
    const accountOfficer = await AccountOfficer.findOne({ where: { email_account_officer: email_manager } });
    if (accountOfficer) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const manager = await Manager.findOne({ where: { email_manager: email_manager } });
    if (manager) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const admin = await Admin.findOne({ where: { email_admin: email_manager } });
    if (admin) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const adminMaster = await AdminMaster.findOne({ where: { email_admin_master: email_manager } });
    if (adminMaster) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const anggota = await Anggota.findOne({ where: { email_anggota: email_manager } });
    if (anggota) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }

    const newManager = await Manager.create({
      username,
      nama_manager,
      password_manager,
      no_hp_manager,
      jenis_kelamin,
      email_manager,
      alamat_manager,
      level_manager
    });

    res.status(201).json({
      code: 201,
      status: 'CREATED',
      data: newManager
    });

  } catch (error) {
    next(error)
  }
};

const getAllManager = async (req, res, next) => {
  try {
    const manager = await Manager.findAll();
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: manager
    })
  } catch (error) {
    next(error)
  }
}

const getManagerById = async (req, res, next) => {
  const { id } = req.params
  try {
    const manager = await Manager.findByPk(id)
    if (manager == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'manager not found' }]
      throw err
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: manager
    })
  } catch (error) {
    next(error)
  }
}

const updateManager = async (req, res, next) => {
  const { id } = req.params
  const {
    username,
    nama_manager,
    password_manager,
    no_hp_manager,
    jenis_kelamin,
    email_manager,
    alamat_manager,
    level_manager
  } = req.body;
  try {
    const manager = await Manager.findByPk(id)
    if (manager == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'manager not found' }]
      throw err
    }

    await Manager.update({
      username,
      nama_manager,
      password_manager,
      no_hp_manager,
      jenis_kelamin,
      email_manager,
      alamat_manager,
      level_manager
    }, {
      where: {
        id_manager: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success updated manager' }]
    })
  } catch (error) {
    next(error)
  }
}

const deleteManager = async (req, res, next) => {
  const { id } = req.params
  try {
    const manager = await Manager.findByPk(id)
    if (manager == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'manager not found' }]
      throw err
    }

    await Manager.destroy({
      where: {
        id_manager: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success deleted manager' }]
    })
  } catch (error) {
    next(error)
  }
}


const managerController = {
  createManager,
  getAllManager,
  getManagerById,
  updateManager,
  deleteManager
}

export default managerController