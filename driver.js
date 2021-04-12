'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000'
const caps = io.connect(host)

caps.on('connect', (socket) => {
  caps.emit('join', 'pickup')
  console.log(`joined 'pickup'`)
})

caps.emit('pickupQueue', 'flowers')
caps.emit('pickupQueue', 'acme')

caps.on('newPickup', itemPickUp)
caps.on('relayMessage', notified)

function itemPickUp(payload) {
  console.log(`Package For ${payload.customerName} Ready For Pick Up!`)
  setTimeout(() => {
    caps.emit('in-transit', payload)
  }, 1000)
}

function notified(payload) {
  caps.emit('delievered', payload)
}

module.exports = {
  itemPickUp: itemPickUp
}