import { TOKEN_BOT, CHAT_ID } from "./key.js"

const TG_URL = `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage`

async function sendData(order) {
    try {
        return await fetch(TG_URL, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: order,
                parse_mode: "html"
            })
        })
    } catch (error) {
        return error
    }
}

export default sendData