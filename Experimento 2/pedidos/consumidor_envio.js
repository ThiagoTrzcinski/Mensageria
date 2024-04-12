const amqp = require('amqplib');

const rabbitMQUrl = 'amqp://localhost'; 
const envioQueueName = 'pedidos_envio';

async function enviarPedidoParaEnvio(pedido) {
    console.log('Pedido enviado para o sistema de envio/logística:', pedido);
}

async function main() {
    try {

        const connection = await amqp.connect(rabbitMQUrl);
        const channel = await connection.createChannel();

        await channel.assertQueue(envioQueueName);
        channel.consume(envioQueueName, async (msg) => {
            const pedido = JSON.parse(msg.content.toString());
            await enviarPedidoParaEnvio(pedido);
            channel.ack(msg); // Confirma o recebimento da mensagem
        });

        console.log('Aguardando pedidos para envio...');
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}
main();
