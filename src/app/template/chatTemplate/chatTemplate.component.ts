import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageEvent, TextMessageboxFileComponent, TypingLoaderComponent, TextMessageBoxSelectComponent, TextMessageBoxEvent } from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
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
  templateUrl: './chatTemplate.component.html',
  styleUrl: './chatTemplate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([{text: 'Hola Mundo', isGpt: true}]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(message:string){
    console.log(message);
  }

  handleMessageWithFile(event:TextMessageEvent){
    console.log(event);
  }

  handleMessageWithSelect(event:TextMessageBoxEvent){
    console.log(event);
  }
 }
