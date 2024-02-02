import { ProsConsResponse } from "@interfaces/index";
import { environment } from "environments/environment";

export const prosConsUseCase = async (prompt: string) => {

    try{
        const resp = await fetch(`${environment.backenApi}/pros-cons-discusser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        });

        if(!resp.ok) throw new Error('No se pudo realizar la correción');

        const data = await resp.json() as ProsConsResponse;

        return {
            ok: true,
            ...data
        }

    } catch(error){
        console.log(error);
        return {
            ok: false,
            role: '',
            content:''
        }
    }
}