import {createHash} from 'crypto';

const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

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

export function logToTelegram(options) {
    const {
        notificationName,
        type,
        message,
        data,
        topicId,
        successStatus,
        sensitiveKeys = ['phrase_value', 'password', 'token']
    } = options;

    const timestamp = new Date().toISOString();
    let fullMessage = `<b>[${notificationName}]</b>
<b>Тип запроса</b>: ${type}
<b>Статус</b>: ${successStatus === true ? "✅️ ОК" : "❌ Ошибка"}
<b>Сообщение</b>: ${message}

<i>Время события: ${timestamp}\n</i>`;

    if (data) {
        const jsonData = JSON.parse(JSON.stringify(data));
        fullMessage += `<pre>${JSON.stringify(jsonData, null, 2)}</pre>`;
    }

    sendToTelegram(fullMessage, topicId);
}