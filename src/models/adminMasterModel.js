const AdminMaster = (sequelize, DataTypes) => {
  return sequelize.define('admin_master', {
    id_admin_master: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nama_admin_master: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_admin_master: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_hp_admin_master: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_admin_master: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat_admin_master: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level_admin_master: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })
}

export default AdminMaster