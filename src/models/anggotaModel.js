const Anggota = (sequelize, DataTypes) => {
  return sequelize.define('anggota', {
    id_anggota: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_anggota: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_anggota: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_hp_anggota: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat_anggota: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pekerjaan_anggota: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_rekening: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_perkawinan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_anggota: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })
}

export default Anggota