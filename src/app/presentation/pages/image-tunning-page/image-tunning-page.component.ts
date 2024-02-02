import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, GptMessageEditableImageComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageEditableImageComponent
  ],
  templateUrl: './image-tunning-page.component.html',
  styleUrl: './image-tunning-page.component.css'
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public originalImage = signal<string|undefined>(undefined);
  public maskImage = signal<string|undefined>(undefined);

  handleMessage(prompt:string){
    this.isLoading.set(true);

    this.messages.update(prev => [...prev, {isGpt:false, text: prompt}]);

    this.openAiService.imageGeneration(prompt, this.originalImage(), this.maskImage()).subscribe( resp => {
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

  generarVariacion(){

    if(!this.originalImage()) return;

    this.isLoading.set(true);

    this.openAiService.imageVariation(this.originalImage()!).subscribe(resp => {

      this.isLoading.set(false);

      if(!resp) return;

      this.messages.update( prev => [
        ...prev,
        {
          isGpt: true,
          text: resp.alt,
          imageInfo: resp
        }
      ]);
    });
  }

  handleImageChange(newImage: string, originalImage: string){
    this.originalImage.set(originalImage);
    this.maskImage.set(newImage);

    //todo: mask
  }
}
