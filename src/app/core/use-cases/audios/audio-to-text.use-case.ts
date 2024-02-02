

import { AudioToTextResponse } from "@interfaces/index";
import { environment } from "environments/environment";

export const audioToTextUseCase = async (audioFile: File, prompt?: string | null) => {

    try{
        const formData = new FormData();

        formData.append('file', audioFile);

        if(prompt){
            formData.append('prompt', prompt);
        }

        const resp = await fetch(`${environment.backenApi}/audio-to-text`, {
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error('No se pudo generar el texto');

        const data = await resp.json() as AudioToTextResponse;

        return data;

    } catch(error){
        console.log(error);
        return null;
    }
}