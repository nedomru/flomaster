import {createHash} from 'crypto';

const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

const TOPICS = {
    GET: 3,
    POST: 3,
    PUT: 3,
    DELETE: 3,
    ERROR: 3
};

async function sendToTelegram(message, topicId) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const body = JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        message_thread_id: topicId,
        parse_mode: 'HTML'
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body
        });
        if (!response.ok) {
            console.error('Failed to send message to Telegram:', await response.text());
        }
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
    }
}

export function logToTelegram(action, data, error = null) {
    const topic = TOPICS[action] || TOPICS.ERROR;
    const timestamp = new Date().toISOString();
    let message = `<b>[${action}]</b> ${timestamp}\n\n`;

    if (error) {
        message += `<b>Error:</b> ${error.message}\n\n`;
    }

    if (data) {
        const safeData = JSON.parse(JSON.stringify(data));
        if (safeData.phrase_value) {
            safeData.phrase_value = createHash('sha256').update(safeData.phrase_value).digest('hex');
        }
        message += `<pre>${JSON.stringify(safeData, null, 2)}</pre>`;
    }

    sendToTelegram(message, topic);
}