import type {APIRoute} from 'astro';
import {supabase} from '../../lib/supabase';

export const GET: APIRoute = async ({request}) => {
    try {
        const {data: phrases, error} = await supabase
            .from('phrases')
            .select('category, subcategory, phrase_key, tag');

        if (error) {
            throw error;
        }

        const categories = [...new Set(phrases.map(p => p.category))];
        const subcategories = [...new Set(phrases.map(p => p.subcategory))];
        const phraseKeys = [...new Set(phrases.map(p => p.phrase_key))];
        const tags = [...new Set(phrases.map(p => p.tag))];

        return new Response(JSON.stringify({
            categories,
            subcategories,
            phraseKeys,
            tags
        }), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error('Error fetching phrases metadata:', error);
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
};