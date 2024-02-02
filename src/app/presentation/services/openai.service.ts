
import { Injectable } from '@angular/core';
import { audioToTextUseCase, createThreadUseCase, imageGenerationUseCase, imageVariationUseCase, orthographyUseCase, postQuestionUseCase, prosConsStreamUseCase, prosConsUseCase, textToAudioUseCase, translateUseCase } from '@use-cases/index';
import { Observable, from, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    constructor() { }
    
    orthographyCheck(prompt: string){
        return from(orthographyUseCase(prompt));
    }

    prosCons(prompt: string){
        return from(prosConsUseCase(prompt));
    }

    prosConsStream(prompt: string, abortSignal: AbortSignal){
        return prosConsStreamUseCase(prompt, abortSignal);
    }

    translatetext(prompt: string, lang:string){
        return from(translateUseCase(prompt, lang));
    }

    textToAudio(prompt: string, voice: string){
        return from(textToAudioUseCase(prompt, voice));
    }

    audioToText(audioFile: File, prompt?: string | null){
        return from(audioToTextUseCase(audioFile, prompt));
    }

    imageGeneration(prompt: string, originalImage?: string, maskImage?: string){
        return from(imageGenerationUseCase(prompt, originalImage, maskImage));
    }

    imageVariation(originalImage: string){
        return from(imageVariationUseCase(originalImage));
    }

    createThread():Observable<string>{
       
        if(localStorage.getItem('thread')) {
            return of(localStorage.getItem('thread')!);
        }

        return from(createThreadUseCase())
            .pipe(
                tap(thread => {
                    localStorage.setItem('thread',thread)
                })
            );
    }

    postQuestion(question: string, threadId: string){
        return from(postQuestionUseCase(threadId, question));
    }
}