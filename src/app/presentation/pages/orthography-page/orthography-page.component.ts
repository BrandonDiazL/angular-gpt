import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageboxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TextMessageBoxEvent, GptMessageOrthographyComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageOrthographyComponent
  ],
  templateUrl: './orthography-page.component.html',
  styleUrl: './orthography-page.component.css'
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt:string){
    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.orthographyCheck(prompt).subscribe( resp => {
      this.isLoading.set(false);
      //console.log(resp);

      this.messages.update ( prev => [
        ...prev,
        {
          isGpt: true,
          text: resp.message,
          info: resp
        }
      ]);
    });
  }

}
