const Manager = (sequelize, DataTypes) => {
  return sequelize.define('manager', {
    id_manager: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nama_manager: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_manager: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_hp_manager: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_manager: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat_manager: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level_manager: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })
}

export default Manager