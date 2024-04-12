const amqp = require('amqplib');

const rabbitMQUrl = 'amqp://localhost'; 
const lojaQueueName = 'pedidos_loja';

function gerarPedido() {
    return {
        cliente: 'Nome do cliente',
        produto: 'Nome do produto',
        quantidade: 1, 
        endereco: 'Endereço de entrega'
    
    };
}

async function enviarPedidoParaLojaChannel(channel) {
    const pedido = gerarPedido();
    await channel.assertQueue(lojaQueueName);
    await channel.sendToQueue(lojaQueueName, Buffer.from(JSON.stringify(pedido)));
    console.log('Pedido enviado para a fila da loja:', pedido);
}


async function main() {
    try {
        const connection = await amqp.connect(rabbitMQUrl);
        const channel = await connection.createChannel();

  
        setInterval(async () => {
            await enviarPedidoParaLojaChannel(channel);
        }, 5000); 

        console.log('Simulando envio de pedidos...');
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

main();
