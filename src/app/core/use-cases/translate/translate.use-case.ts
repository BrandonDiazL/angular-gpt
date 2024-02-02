import type { TranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment";

export const translateUseCase = async (prompt: string, lang: string) => {

    try{
        const resp = await fetch(`${environment.backenApi}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt, lang})
        });

        if(!resp.ok) throw new Error('No se pudo realizar la traduccion');

        const data = await resp.json() as TranslateResponse;

        return {
            ok: true,
            ...data
        }

    } catch(error){
        console.log(error);
        return {
            ok: false,
            role: '',
            content: 'No se pudo realizar la correción'
        }
    }
}