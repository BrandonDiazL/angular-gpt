import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageboxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TextMessageBoxEvent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-cons-page.component.html',
  styleUrl: './pros-cons-page.component.css'
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(message:string){
    
    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: message
      }
    ]);

    this.openAiService.prosCons(message).subscribe( resp => {
      this.isLoading.set(false);
      this.messages.update ( prev => [
        ...prev,
        {
          isGpt: true,
          text: resp.content
        }
      ]);
    });
  }
}
