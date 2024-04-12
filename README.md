Experimento 2:
Este é um experimento que simula o processamento de pedidos em uma loja online utilizando Node.js e RabbitMQ. O objetivo é demonstrar como integrar diferentes sistemas usando filas de mensagens para garantir a confiabilidade e escalabilidade da aplicação.

Descrição do Experimento
O experimento consiste em três partes principais:

1-Produtor de Mensagens (Loja Online Simulada):
Um programa Node.js que simula uma loja online.
Gera pedidos de clientes e os envia para uma fila no RabbitMQ.

2-Consumidores de Mensagens:
Dois programas Node.js que atuam como consumidores de mensagens.
O primeiro consumidor recebe os pedidos da fila da loja online, processa-os e os registra no banco de dados da loja.
O segundo consumidor recebe os pedidos processados da fila e os envia para o sistema de envio/logística.

3-Integração com Banco de Dados e Sistema de Envio:
Implementa a integração dos consumidores com o banco de dados da loja e o sistema de envio/logística.

Pré-requisitos
RabbitMQ instalado e em execução na máquina local ou em um servidor acessível

Testes e Avaliação
Simule o envio de pedidos através do produtor de mensagens.
Verifique se os pedidos são corretamente processados e registrados no banco de dados da loja.
Verifique se os pedidos processados são corretamente enviados para o sistema de envio/logística.
