import type {APIRoute} from 'astro';
import {supabase} from '../../lib/supabase';
import {logToTelegram} from '../../lib/telegram-logger';

export const GET: APIRoute = async ({request}) => {
  const {data: phrases, error} = await supabase
      .from('phrases')
      .select('*')
      .order('id', {ascending: true});

  if (error) {
    logToTelegram('GET', null, error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    });
  }

  logToTelegram('GET', {count: phrases.length});
  return new Response(JSON.stringify(phrases), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  });
};

export const POST: APIRoute = async ({request}) => {
  const {category, subcategory, phrase_key, phrase_value, created_by, last_edit_time} = await request.json();

  const {data, error} = await supabase.from('phrases').insert([
    {
      category,
      subcategory,
      phrase_key,
      phrase_value,
      created_by,
      last_edit_time
    },
  ]);

  if (error) {
    logToTelegram('POST', {category, subcategory, phrase_key}, error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    });
  }

  logToTelegram('POST', {category, subcategory, phrase_key});
  return new Response(JSON.stringify(data), {
    status: 201,
    headers: {'Content-Type': 'application/json'},
  });
};

export const PUT: APIRoute = async ({request}) => {
  const {id, category, subcategory, phrase_key, phrase_value, edited_by, last_edit_time} = await request.json();

  const {data, error} = await supabase
      .from('phrases')
      .update({category, subcategory, phrase_key, phrase_value, edited_by, last_edit_time})
      .eq('id', id);

  if (error) {
    logToTelegram('PUT', {id, category, subcategory, phrase_key}, error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    });
  }

  logToTelegram('PUT', {id, category, subcategory, phrase_key});
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  });
};

export const DELETE: APIRoute = async ({request}) => {
  const {id} = await request.json();

  const {data, error} = await supabase.from('phrases').delete().eq('id', id);

  if (error) {
    logToTelegram('DELETE', {id}, error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    });
  }

  logToTelegram('DELETE', {id});
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  });
};