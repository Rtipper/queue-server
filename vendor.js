'use strcit';

const io = require('socket.io-client');
const host = 'http://localhost:3000'

const caps = io.connect(host);
const faker = require('faker');

caps.on('connect', (socket) => {
  caps.emit('join', 'flower delievery')
  console.log(`joined 'flower delievery'`)
})

setInterval(() => {
  let mockOrder = {
    storeName: '1-206-flowers',
    orderId: faker.address.zipCode(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  }

  caps.emit('pickup', mockOrder)
}, 5000)

caps.emit('catchupQueue', 'flowers')
caps.on('delievered', itemDelievered)

function itemDelievered(payload) {
  console.log(`Delievery Complete. Package ${payload.orderID} on ${new Date()}`)
}

module.exports = {
  itemDelievered: itemDelievered
}
