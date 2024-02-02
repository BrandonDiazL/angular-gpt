import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Option {
  id:string;
  text:string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOptions: string;
}

@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBoxSelect.component.html',
  styleUrl: './textMessageBoxSelect.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {
  @Input()
  placeholder: string = '';
  @Input({required:true})
  options!: Option[];

  @Output()
  onMessage = new EventEmitter<TextMessageBoxEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOptions: ['', Validators.required]
  });

  handleSubmit(){
    if(this.form.invalid) return;

    const {prompt, selectedOptions} = this.form.value;
    //console.log(prompt);
    this.onMessage.emit({prompt: prompt!, selectedOptions: selectedOptions!});
    this.form.reset();
  }
 }
