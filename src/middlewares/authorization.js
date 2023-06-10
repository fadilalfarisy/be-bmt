const authorizationAnggota = async (req, res, next) => {
  const userData = req.token
  try {
    const { role } = userData

    if (role != 'ADMIN' || role != 'ADMIN_MASTER') {
      const err = new Error('Unauthorized')
      err.code = 401
      err.errors = [{ 'access token': 'user not allowed edited data' }]
      throw err
    }

    next()
  } catch (error) {
    next(error)
  }
};

const authorizationAdmin = async (req, res, next) => {
  const userData = req.token
  try {
    const { role } = userData

    if (role != 'ADMIN_MASTER') {
      const err = new Error('Unauthorized')
      err.code = 401
      err.errors = [{ 'access token': 'user not allowed edited data' }]
      throw err
    }

    next()
  } catch (error) {
    next(error)
  }
};

export { authorizationAnggota, authorizationAdmin }