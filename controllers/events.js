const {response} = require('express');

const getEvents = (req, res = response) => {

  res.status(200).json({
    ok: true,
    msg: 'getEvents'
  })
}

const createEvent = (req, res = response) => {

  //* 1 Verificar que tenga el evento
  console.log(req.body);

  res.status(200).json({
    ok: true,
    msg: 'createEvent'
  })
}

const updateEvent = (req, res = response) => {

  res.status(200).json({
    ok: true,
    msg: 'updateEvent'
  })
}

const deleteEvent = (req, res = response) => {

  res.status(200).json({
    ok: true,
    msg: 'deleteEvent'
  })
}


module.exports = { getEvents, createEvent, updateEvent, deleteEvent }