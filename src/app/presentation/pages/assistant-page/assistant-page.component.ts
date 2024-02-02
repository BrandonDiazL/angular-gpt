import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { GptMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interfaces';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './assistant-page.component.html',
  styleUrl: './assistant-page.component.css'
})
export default class AssistantPageComponent implements OnInit {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  private threadId = signal<string|undefined>(undefined);

  ngOnInit(): void {
    this.openAiService.createThread().subscribe( id => {
      this.threadId.set(id);
    });
  }

  handleMessage(question:string){
    
    this.isLoading.set(true);

    this.messages.update(prev => [...prev, {text: question, isGpt: false}]);
    
    this.openAiService.postQuestion(question, this.threadId()!).subscribe(replie => {
      this.isLoading.set(false);

      this.messages.update(prev => [
        ...prev,
        {
          text:replie.content[0],
          isGpt: true
        }
      ]);

      // for(const reply of replies){
      //   for(const message of reply.content){
      //     this.messages.update(prev => [
      //       ...prev,
      //       {
      //         text:message,
      //         isGpt: reply.role === 'assistant'
      //       }
      //     ]);
      //   }
      // }
    });
  }
}
