const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));
const ultimaInteracao = {};
const TEMPO_LIMITE_MS = 1000 * 60 * 10;

client.on('message', async msg => {
    if (
        msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|oie|ola|Ola)/i) &&
        msg.from.endsWith('@c.us')
    ) {
        const agora = Date.now();
        const ultima = ultimaInteracao[msg.from] || 0;

        if (agora - ultima > TEMPO_LIMITE_MS) {
            ultimaInteracao[msg.from] = agora;

            const chat = await msg.getChat();
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            const contact = await msg.getContact();
            const name = contact.pushname;
            await client.sendMessage(msg.from, 'Oi! ' + name.split(" ")[0] + '! ♡𐙚⋆°｡ Sou o assistente virtual da Lizz! Como posso ajudá-lo hoje? por favor, para que eu possa te auxiliar, digite uma das opções abaixo:\\n\\n1 - Como comprar?\\n2 - Quando tem reposição?\\n3 - Formas de Pagamento\\n4 - Quanto tempo demora pra chegar?\\n5 - Outras perguntas');
        }
    }
});
