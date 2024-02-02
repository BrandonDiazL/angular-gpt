import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageboxFileComponent, TextMessageBoxSelectComponent, TextMessageBoxEvent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './text-to-audio-page.component.html',
  styleUrl: './text-to-audio-page.component.css'
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public voices = [
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ];

  handleMessageWithSelect({prompt, selectedOptions: voice}:TextMessageBoxEvent){

    const message = `${voice} - ${prompt}`;
    this.messages.update( prev => [...prev, {text:message, isGpt: false}]);
    this.isLoading.set(true);

    this.openAiService.textToAudio(prompt, voice).subscribe( ({message, audioUrl}) => {
      this.isLoading.set(false);

      this.messages.update(prev => [
        ...prev,
        {
          isGpt: true,
          text: message,
          audioUrl: audioUrl
        }
      ]);
    });

  }
}
