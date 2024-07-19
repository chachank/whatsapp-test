const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const wwebVersion = '2.2412.50'

const client = new Client({
  authStrategy: new LocalAuth(), // your authstrategy here
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  },
  webVersionCache: {
    type: 'remote',
    remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`
  }
})

client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready!')
})

client.on('message', msg => {
  console.log(msg)
  if (msg.body === '!ping') {
    const chat = msg.getChat()
    chat.sendSeen()
    msg.reply('pong')
  }
})

client.initialize()
