import type {APIRoute} from 'astro';
import {supabase} from '../../lib/supabase';
import {logToTelegram} from '../../lib/telegram-logger';

// Define your custom topic IDs
const TOPIC_IDS = {
    PHRASES_OPS: 3,  // For general phrase operations
    ERRORS: 3,       // For all errors
};

export const GET: APIRoute = async ({request}) => {
    const {data: phrases, error} = await supabase
        .from('phrases')
        .select('*')
        .order('id', {ascending: true});

    if (error) {
        logToTelegram({
            notificationName: 'Получить список РМов',
            message: 'Ошибка получения РМов',
            successStatus: false,
            type: "🙋🏻‍♂️ GET",
            data: {error: error.message},
            topicId: TOPIC_IDS.ERRORS
        });
        return new Response(JSON.stringify(error.message), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        });
    }

    // logToTelegram({
    //     notificationName: 'Получить список РМов',
    //     message: 'Список РМов успешно выгружен из Supabase',
    //     successStatus: true,
    //     type: "🙋🏻‍♂️ GET",
    //     topicId: TOPIC_IDS.PHRASES_OPS
    // });
    return new Response(JSON.stringify(phrases), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });
};

export const POST: APIRoute = async ({request}) => {
    const {category, subcategory, phrase_key, phrase_value, tag, created_by, last_edit_time} = await request.json();

    const {data, error} = await supabase.from('phrases').insert([
        {
            category,
            subcategory,
            phrase_key,
            phrase_value,
            tag: tag === "" ? "default" : tag,
            created_by,
            last_edit_time
        },
    ]);
    if (error) {
        logToTelegram({
            notificationName: 'Создание РМа',
            message: 'Ошибка при создании РМа',
            successStatus: false,
            type: "📝 POST",
            data: {
                category,
                subcategory,
                phrase_key,
                phrase_value,
                tag: tag === "" ? "default" : tag,
                created_by,
                error: error.message
            },
            topicId: TOPIC_IDS.ERRORS
        });
        return new Response(JSON.stringify(error.message), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        });
    }

    logToTelegram({
        notificationName: 'Создание РМа',
        message: 'Новый РМ успешно создан',
        successStatus: true,
        type: "📝 POST",
        data: {category, subcategory, phrase_key, phrase_value, tag, created_by},
        topicId: TOPIC_IDS.PHRASES_OPS
    });
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });
};

export const PUT: APIRoute = async ({request}) => {
    const {id, phrase_key, phrase_value, tag, edited_by, last_edit_time} = await request.json();

    const {data, error} = await supabase
        .from('phrases')
        .update({phrase_value, tag, edited_by, last_edit_time})
        .eq('id', id);

    if (error) {
        logToTelegram({
            notificationName: 'Обновление РМа',
            message: 'Ошибка обновления РМа',
            successStatus: false,
            type: "✏️ PUT",
            data: {id, phrase_key, phrase_value, tag, edited_by, error: error.message},
            topicId: TOPIC_IDS.ERRORS
        });
        return new Response(JSON.stringify(error.message), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        });
    }

    logToTelegram({
        notificationName: 'Обновление РМа',
        message: 'РМ успешно обновлен',
        successStatus: true,
        type: "✏️ PUT",
        data: {id, phrase_key, phrase_value, tag, edited_by, last_edit_time},
        topicId: TOPIC_IDS.PHRASES_OPS
    });
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });
};

export const DELETE: APIRoute = async ({request}) => {
    const {id, category, subcategory, phrase_key, phrase_value, tag} = await request.json();

    const {data, error} = await supabase.from('phrases').delete().eq('id', id);

    if (error) {
        logToTelegram({
            notificationName: 'Удаление РМа',
            message: 'Ошибка удаления РМа',
            successStatus: false,
            type: "🗑️ DELETE",
            data: {id, category, subcategory, phrase_key, phrase_value, tag, error: error.message},
            topicId: TOPIC_IDS.ERRORS
        });
        return new Response(JSON.stringify(error.message), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        });
    }

    logToTelegram({
        notificationName: 'Удаление РМа',
        message: 'РМ успешно удален',
        successStatus: true,
        type: "🗑️ DELETE",
        data: {id, category, subcategory, phrase_key, phrase_value, tag},
        topicId: TOPIC_IDS.PHRASES_OPS
    });
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });
};