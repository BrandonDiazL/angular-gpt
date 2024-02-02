
import { environment } from "environments/environment";

type GeneratedImage = Image | null;

interface Image{
    url:string;
    alt:string;
}

export const imageVariationUseCase = async (originalImage?: string): Promise<GeneratedImage> =>{

    try {
        const resp = await fetch(`${environment.backenApi}/image-variation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({baseImage: originalImage})
        });

        if(!resp.ok) throw new Error('No se pudo generar la imagen');

        const {url, revised_prompt:alt} = await resp.json();

        return {url, alt};
        
    } catch (error) {
        console.log(error);
        return null;
    }
}