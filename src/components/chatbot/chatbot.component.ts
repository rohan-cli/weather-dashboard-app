import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  @Output() cityRequested = new EventEmitter<{ city: string }>();
  input = '';
  chatLog: string[] = [];

  handleChat() {
    this.chatLog.push('User: ' + this.input);

    const matched = this.input.match(/(?:weather\s+for\s+)([a-zA-Z\s]+)/i);
    if (matched) {
      const city = matched[1].trim();
      this.chatLog.push(`Bot: Fetching weather for ${city}`);
      this.cityRequested.emit({ city });
    } else {
      this.chatLog.push('Bot: Sorry, I did not understand.');
    }

    this.input = '';
  }
}
