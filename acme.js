'use strict';

const io = require('socket.io-client');

const host = 'http://localhost:3000'
const caps = io.connect(host)

const faker = require('faker');

caps.on('connect', (socket) => {
  // subscribes to 'delievered'
  caps.emit('join', 'acme delievery')
  console.log(`joined 'acme delievered'`)
})

setInterval(() => {
  let mockOrder = {
    storeName: 'ACME Inc.',
    orderId: faker.address.zipCode(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  }

  caps.emit('pickup', mockOrder)
}, 5000)

caps.emit('catchup', 'acme')

caps.on('delievered', itemDelievered)

function itemDelievered(payload) {
  console.log(`Item Delievery Completed: Package ${payload.orderId} delievered on ${new Date()}`)
  caps.emit('received', payload)
}

module.exports = {
  itemDelievered: itemDelievered
}