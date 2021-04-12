'use strict';

const Queue = require('./queue.js');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
const queue = {
  vendorID: {
    flowers: new Queue('Flowers'),
    acme: new Queue('ACME Inc.')
  }
}

io.on('connection', (socket) => {
  console.log(`${socket.id} is now connected!`)
  socket.on('join', (payload) => {
    socket.join(payload)
    console.log(`User ${socket.id} has joined '${payload}'`)
  })

  socket.on('delievered', (payload) => {
    if (payload.storeName === '1-206-flowers') {
      console.log(`Successful Delieverey: Order Number: ${payload.orderId}\n`)
      queues.vendorId.flowers.transit.shift()
      queues.vendorID.flowers.delievered.push(payload)
      io.to('flower delievery').emit('delievered', payload)
    } else if (payload.storeName === 'ACME Inc.') {
      console.log(`Successful Delieverey: Order Number: ${payload.orderId}\n`)
      queues.vendorId.acme.transit.shift()
      queues.vendorId.acme.delievered.push(payload)
      io.to('acme delievery').emit('delievered', payload)
    };
  })

  socket.on('catchupQueue', (payload) => {
    queues.vendorID[payload].delievered.forEach(value => {
      if (payload === 'flowers') {
        io.to('flower delievery').emit('delievered', value)
      } else if (payload === 'acme') {
        io.to('acme delievery').emit('delievered', value)
      }
    })
  })

  socket.on('pickupQueue', (payload) => {
    queues.vendorID[payload].pickup.forEach(value => {
      socket.emit('newPickup', value)
      console.log(`Catching up on ${value}`)
    })
  })

  socket.on('pickup', (payload) => {
    if (payload.storeName === '1-206-flowers') {
      queues.vendorID.flowers.pickup.push(payload)
      console.log(`New Pickup: Item Ready for Pick Up \n
      ${payload.storeName}\n
      ${payload.orderID}\n
      ${payload.customerName}\n
      ${payload.address}\n`);
      socket.broadcast.emit('newPickup', payload);

    }else if (payload.storeName === 'ACME Inc.') {
      queues.vendorID.acme.pickup.push(payload)
      console.log(`New Pickup: Item Ready for Pick Up \n
      ${payload.storeName}\n 
      ${payload.orderId}\n
      ${payload.customerName}\n
      ${payload.address}\n`);
    io.to('pickup').emit('newPickup', payload);
    }
  })

  socket.on('in-transit', (payload) => {
    if (payload.storeName === '1-206-flowers') {
      setTimeout(() => {
        console.log(`Successful Pick Up: Order Number: ${payload.orderId}\n`)
        queues.vendorID.flowers.pickup.shift()
        console.log(`Now in Transit: Order Number: ${payload.orderId}`)
        queues.vendorID.flowers.transit.push(payload)
        socket.emit('relayMessage', payload)
      }, 3000)
    } else if (payload.storeName === 'ACME Inc.') {
      setTimeout(() => {
        console.log(`Item Picked Up: Order Number: ${payload.orderId}`)
        queues.vendorId.acme.pickup.shift()
        console.log(`Item In-Transit: Order Number: ${payload.orderID}\n`)
        queues.vendorID.acme.transit.push(payload)
        socket.emit('relayMessage', payload)
      }, 3000)
    }
  })

  socket.on('received', (payload) => {
    if (payload.storeName === '1-206-flowers') {
      queues.vendorID.flowers.delievered.shift()
    } else if (payload.storeName === 'ACME Inc') {
      queues.vendorID.acme.delievered.shift()
    }
  })
})