import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageboxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TextMessageBoxEvent } from '@components/index';
import { AudioToTextResponse } from '@interfaces/audio-text.response';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageboxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './audio-to-text-page.component.html',
  styleUrl: './audio-to-text-page.component.css'
})
export default class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessageWithFile({file, prompt}:TextMessageEvent){
    
    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt:false,
        text: `Se converitra el siguiente audio ${file.name} a texto`
      }
    ]);

    this.openAiService.audioToText(file, prompt).subscribe(resp => this.handleResponse(resp));
    
  }

  handleResponse(resp: AudioToTextResponse | null){
    this.isLoading.set(false);

    if(!resp) return;

    const text = `## Transcripcion:
__Duracion:__ ${Math.round(resp.duration)} segundos.

## El texto es:
${resp.text}`;

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt:true,
        text: text
      }
    ]);

    for( const segment of resp.segments){
      const segmentMessage = `
__De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__${segment.text}`;

      this.messages.update( (prev) => [
      ...prev,
        {
          isGpt:true,
          text: segmentMessage
        }
      ]);
    }
  }
}
