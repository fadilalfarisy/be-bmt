import db from '../models/index.js'

const { Manager, Admin, AdminMaster, AccountOfficer, Anggota } = db

const createAccountOfficer = async (req, res, next) => {
  try {
    const {
      username,
      nama_account_officer,
      password_account_officer,
      no_hp_account_officer,
      jenis_kelamin,
      email_account_officer,
      alamat_account_officer,
      level_account_officer
    } = req.body;

    //check duplicate email
    const accountOfficer = await AccountOfficer.findOne({ where: { email_account_officer: email_account_officer } });
    if (accountOfficer) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const manager = await Manager.findOne({ where: { email_manager: email_account_officer } });
    if (manager) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const admin = await Admin.findOne({ where: { email_admin: email_account_officer } });
    if (admin) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const adminMaster = await AdminMaster.findOne({ where: { email_admin_master: email_account_officer } });
    if (adminMaster) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }
    const anggota = await Anggota.findOne({ where: { email_anggota: email_account_officer } });
    if (anggota) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ email: 'duplicate value' }]
      throw err
    }

    const newAccountOfficer = await AccountOfficer.create({
      username,
      nama_account_officer,
      password_account_officer,
      no_hp_account_officer,
      jenis_kelamin,
      email_account_officer,
      alamat_account_officer,
      level_account_officer
    });

    res.status(201).json({
      code: 201,
      status: 'CREATED',
      data: newAccountOfficer
    });

  } catch (error) {
    next(error)
  }
};

const getAllAccountOfficer = async (req, res, next) => {
  try {
    const accountOfficer = await AccountOfficer.findAll();
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: accountOfficer
    })
  } catch (error) {
    next(error)
  }
}

const getAccountOfficerById = async (req, res, next) => {
  const { id } = req.params
  try {
    const accountOfficer = await AccountOfficer.findByPk(id)
    if (accountOfficer == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'account officer not found' }]
      throw err
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: accountOfficer
    })
  } catch (error) {
    next(error)
  }
}

const updateAccountOfficer = async (req, res, next) => {
  const { id } = req.params
  const {
    username,
    nama_account_officer,
    password_account_officer,
    no_hp_account_officer,
    jenis_kelamin,
    email_account_officer,
    alamat_account_officer,
    level_account_officer
  } = req.body;
  try {
    const accountOfficer = await AccountOfficer.findByPk(id)
    if (accountOfficer == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'account officer not found' }]
      throw err
    }

    await AccountOfficer.update({
      username,
      nama_account_officer,
      password_account_officer,
      no_hp_account_officer,
      jenis_kelamin,
      email_account_officer,
      alamat_account_officer,
      level_account_officer
    }, {
      where: {
        id_account_officer: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success updated account officer' }]
    })
  } catch (error) {
    next(error)
  }
}

const deleteAccountOfficer = async (req, res, next) => {
  const { id } = req.params
  try {
    const accountOfficer = await AccountOfficer.findByPk(id)
    if (accountOfficer == null) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'account officer not found' }]
      throw err
    }

    await AccountOfficer.destroy({
      where: {
        id_account_officer: id
      }
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success deleted account officer' }]
    })
  } catch (error) {
    next(error)
  }
}


const accountOfficerController = {
  createAccountOfficer,
  getAllAccountOfficer,
  getAccountOfficerById,
  updateAccountOfficer,
  deleteAccountOfficer
}

export default accountOfficerController