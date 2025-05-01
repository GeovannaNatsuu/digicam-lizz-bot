// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Controle de tempo de última interação para menu
const ultimaInteracao = {};
const TEMPO_LIMITE_MS = 1000 * 60 * 10; // 10 minutos

client.on('message', async msg => {

    if (
        msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|oie|ola|Ola)/i) &&
        msg.from.endsWith('@c.us')
    ) {
        // ...
    }
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
            await client.sendMessage(msg.from,' Oi!  '+ name.split(" ")[0] + '! ♡𐙚⋆°｡ Sou o assistente virtual da Lizz! Como posso ajudá-lo hoje? por favor, para que eu possa te auxiliar, digite uma das opções abaixo:\n\n1 - Como comprar?\n2 - Quando tem reposição?\n3 - Formas de Pagamento\n4 - Quanto tempo demora pra chegar?\n5 - Outras perguntas');
        }
    }

    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'COMO FUNCIONA O DROP?\n✮ Nossos drops são lançamentos com câmeras selecionadas a dedo, que ficam disponíveis em datas e horários específicos sempre acompanhe os stories!\nO Clubinho recebe acesso antecipado sempre com senha exclusiva, enquanto o restante do público acessa em horário normal.\nAs vendas são feitas *somente* pelo site, por ordem de chegada, e os estoques são super limitados — acabou, acabou! 📦⋆𐙚₊˚⊹♡ Para garantir a sua, esteja online no horário certinho e com os dados prontos!');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'COMO COMPRAR? É muito simples ✮ \n1º Passo: Acesse nosso site (link abaixo) e escolha o modelo de câmera que mais combina com você.\n2º Passo: Adicione ao carrinho e selecione a forma de pagamento\n. 3º Passo: Finalize a compra preenchendo seus dados de envio. Após o pagamento, seu pedido será processado e será enviado um código de rastreio no seu email nos próximos dias.\n 📦 Todas as câmeras são testadas antes do envio e vão embaladinhas com carinho ♡𐙚⋆°｡⋆');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '✮ Link da loja: https://digicambylizz.com.br');
    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'QUANDO TEM REPOSIÇÃO? ✮\nAs reposições são variáveis e os modelos que entram em cada drop são sempre surpresa! Pode ser que um modelo volte já no próximo, ou só daqui a dois drops… nada é garantido 📷 \n𖦹 Por isso, é importante acompanhar os stories da loja — é lá que a Lizz avisa com antecedência a data certinha do próximo drop! ⋆𐙚₊˚⊹♡');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'FORMAS DE PAGAMENTO ✮\n Aceitamos Pix e cartão de crédito. Pagando no Pix, você ganha 5% de desconto e a confirmação é imediata 💸\n⋆ Já no cartão, dá pra parcelar, mas tem uma pequena taxinha da nuvem 💳\n Tudo isso é calculado automaticamente no site na hora de fechar sua compra! ♡𐙚⋆°｡');
    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'PRAZO DE ENTREGA ✮\n  O tempo de entrega varia de acordo com o seu CEP! Assim que você coloca seu endereço no site, o frete e o prazo aparecem automaticamente 🛫\n ⋆ Os envios são feitos pelos Correios com rastreio, e a maioria chega entre 3 a 10 dias úteis após o envio, dependendo da região 📦𐙚⋆°｡');
    }

    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'DÚVIDAS MAIS ESPECÍFICAS? ✮ Vou te passar agora pra Lizz, a mente brilhante por trás de tudo isso 📷\n Talvez ela demore um pouquinho pra responder porque tá correndo pra embalar câmeras, tirar foto, cuidar dos posts e ainda lembrar de tomar café (às vezes ela esquece kkk) \n⋆𐙚₊˚⊹♡ Mas logo logo ela te responde com todo carinho, tá bem? ⸜(｡˃ ᵕ ˂ )⸝');
    }

    // Verificar se a câmera está disponível
    if (
        msg.body.match(/(dispon[ií]vel|ainda tem|tem essa|essa.*c[aâ]mera.*tem|essa.*dispon[ií]vel)/i) &&
        msg.from.endsWith('@c.us')
    ) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Sobre disponibilidade ✮⋆𐙚₊˚⊹♡\n\nA loja funciona por ordem de chegada, então se a câmera estiver **esgotada no site**, infelizmente não tem mais mesmo 😢📸\n\nMas temos sempre drops novos com modelos incríveis! Fica de olho nos stories que a Lizz avisa tudinho lá ✮');
    }

});
