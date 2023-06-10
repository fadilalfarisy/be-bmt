import { Sequelize, DataTypes } from "sequelize"
import config from '../config/db.js'
import mysql2 from 'mysql2'
import Anggota from './anggotaModel.js'
import Admin from './adminModel.js'
import AdminMaster from "./adminMasterModel.js"
import accountOfficer from './accountOfficerModel.js'
import manager from './managerModel.js'

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT,
    dialectModule: mysql2
  }
);

try {
  await sequelize.authenticate();
  console.log('connect to db');
} catch (error) {
  console.error(error.message);
}

const db = {}

db.Anggota = Anggota(sequelize, DataTypes)
db.Admin = Admin(sequelize, DataTypes)
db.AdminMaster = AdminMaster(sequelize, DataTypes)
db.AccountOfficer = accountOfficer(sequelize, DataTypes)
db.Manager = manager(sequelize, DataTypes)

// db.users.hasMany(db.tracker, {
//   foreignKey: 'user_id',
//   as: 'tracker'
// })
// db.tracker.belongsTo(db.users, {
//   foreignKey: 'user_id',
//   as: 'user'
// })

sequelize.sync({ force: false })
  .then(() => console.log("All models were synchronized successfully."))

export default db