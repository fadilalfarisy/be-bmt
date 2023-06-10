const Admin = (sequelize, DataTypes) => {
  return sequelize.define('admin', {
    id_admin: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nama_admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_hp_admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat_admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level_admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })
}

export default Admin