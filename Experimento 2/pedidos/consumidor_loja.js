const amqp = require('amqplib');
const { MongoClient } = require('mongodb');

const rabbitMQUrl = 'amqp://localhost';
const lojaQueueName = 'pedidos_loja'; 


const mongoUrl = 'mongodb://localhost:27017'; 
const dbName = 'minha_loja'; 
const collectionName = 'pedidos';

async function inserirPedidoNoBanco(pedido) {
    const client = new MongoClient(mongoUrl);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertOne(pedido);
        console.log('Pedido registrado no banco de dados:', pedido);
    } finally {
        await client.close();
    }
}

async function main() {
    try {
        const connection = await amqp.connect(rabbitMQUrl);
        const channel = await connection.createChannel();

        await channel.assertQueue(lojaQueueName);
        channel.consume(lojaQueueName, async (msg) => {
            const pedido = JSON.parse(msg.content.toString());
            await inserirPedidoNoBanco(pedido);
            channel.ack(msg);
        });

        console.log('Aguardando pedidos da loja...');
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

main();
