const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    //* 1 Validando si el correo del usuario ya existe en la bd
    let user = await User.findOne({ email });
    
    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario ya existe con ese correo'
      });
    }
    
    user = new User( req.body );

    //* 2 Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    //* 3 Grabacion en la BD
    await user.save();

    //* 4 Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
    
  } catch (error) {
    
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
  
}

const loginUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    //* 1 Validando si el correo del usuario ya existe en la bd
    const user = await User.findOne({ email });
    
    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario con ese correo'
      });
    }
    
    //* 2 Confirmar las contraseñas
    const validPassword = bcrypt.compareSync(password, user.password);

    if( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      });
    }

    //* 3 Generar JWT
    const token = await generateJWT(user.id, user.name);
    
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {

    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const revalidateToken = async (req, res = response) => {

  const { uid, name } = req;

   //* 1 Generar nuevo JWT
   const newToken = await generateJWT(uid, name);

  res.json({
    ok: true,
    newToken
  })
}

module.exports = {
  createUser,
  loginUser,
  revalidateToken
}