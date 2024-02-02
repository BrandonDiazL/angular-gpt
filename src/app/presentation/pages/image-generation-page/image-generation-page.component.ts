import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageboxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TextMessageBoxEvent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './image-generation-page.component.html',
  styleUrl: './image-generation-page.component.css'
})
export default class ImageGenerationPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt:string){
    this.isLoading.set(true);

    this.messages.update(prev => [...prev, {isGpt:false, text: prompt}]);

    this.openAiService.imageGeneration(prompt).subscribe( resp => {
      if(!resp) return;

      this.isLoading.set(false);

      this.messages.update(prev => [
        ...prev,
        {
          isGpt: true,
          text: resp.alt,
          imageInfo: resp
        }
      ]);
    });
  }
}
