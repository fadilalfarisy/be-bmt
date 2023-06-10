import db from '../models/index.js'
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../helpers/token.js'
import user from '../routes/user.js';

const { Manager, Admin, AdminMaster, AccountOfficer, Anggota } = db

const login = async (req, res, next) => {
  try {
    //check required field
    const { email, password } = req.body;

    let userData = null

    //check username user is exist
    const accountOfficer = await AccountOfficer.findOne({ where: { email_account_officer: email } });
    if (accountOfficer) {
      userData = {
        id: accountOfficer.id_account_officer,
        password: accountOfficer.password_account_officer,
        role: 'ACCOUNT_OFFICER',
        ...accountOfficer.dataValues
      }
    }
    const manager = await Manager.findOne({ where: { email_manager: email } });
    if (manager) {
      userData = {
        id: manager.id_manager,
        password: manager.password_manager,
        role: 'MANAGER',
        ...manager.dataValues
      }
    }

    const admin = await Admin.findOne({ where: { email_admin: email } });
    if (admin) {
      userData = {
        id: admin.id_admin,
        password: admin.password_admin,
        role: 'ADMIN',
        ...admin.dataValues
      }
    }

    const adminMaster = await AdminMaster.findOne({ where: { email_admin_master: email } });
    if (adminMaster) {
      userData = {
        id: adminMaster.id_admin_master,
        password: adminMaster.password_admin_master,
        role: 'ADMIN_MASTER',
        ...adminMaster.dataValues
      }
    }
    const anggota = await Anggota.findOne({ where: { email_anggota: email } });
    if (anggota) {
      userData = {
        id: anggota.id_anggota,
        password: anggota.password_anggota,
        role: "ANGGOTA",
        ...anggota.dataValues
      }
    }


    if (!userData) {
      const err = new Error('Invalid request')
      err.code = 404
      err.errors = [{ id: 'user not found' }]
      throw err
    }

    if (userData.password != password) {
      const err = new Error('Invalid request')
      err.code = 400
      err.errors = [{ id: 'invalid password' }]
      throw err
    }

    //create access token and refresh token
    const accessToken = createAccessToken({
      id: userData.id,
      role: userData.role
    });
    const refreshToken = createRefreshToken({
      id: userData.id,
      role: userData.role
    })

    //send refresh token as a cookie
    res.cookie("token", refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1d
    });

    res.status(200).json({
      code: 200,
      status: 'OK',
      accessToken: accessToken,
      data: userData
    });

  } catch (error) {
    next(error)
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('token', { path: '/' })
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ message: 'success logout' }]
    })
  } catch (error) {
    next(error)
  }
}

const checkRefreshToken = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      const err = new Error('Invalid request')
      err.code = 403
      err.errors = [{ cookie: 'cookie is null' }]
      throw err
    }

    const { error, decoded } = verifyRefreshToken(token)
    if (error != null) {
      const err = new Error('Invalid request')
      err.code = 403
      err.errors = [{ token: 'invalid refresh token' }]
      throw err
    }

    const accessToken = createAccessToken({ id: decoded.id })
    res.status(200).json({
      code: 200,
      status: 'OK',
      data: [{ accessToken: accessToken }]
    });

  } catch (error) {
    next(error)
  }
}

const userController = {
  login,
  logout,
  checkRefreshToken
}

export default userController