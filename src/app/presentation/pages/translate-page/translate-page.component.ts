import { Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageboxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TextMessageBoxEvent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './translate-page.component.html',
  styleUrl: './translate-page.component.css'
})
export default class TranslatePageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public languages = [
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ];

  handleMessageWithSelect(event:TextMessageBoxEvent){

    const message = `Traduce a ${event.selectedOptions}: ${event.prompt}`;
    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: message
      }
    ]);

    this.openAiService.translatetext(event.prompt, event.selectedOptions).subscribe( resp => {
      this.isLoading.set(false);
      //console.log(resp);

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
