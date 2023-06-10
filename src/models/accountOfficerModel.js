const AccountOfficer = (sequelize, DataTypes) => {
  return sequelize.define('account_officer', {
    id_account_officer: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nama_account_officer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_account_officer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_hp_account_officer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_account_officer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat_account_officer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level_account_officer: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })
}

export default AccountOfficer