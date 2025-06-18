import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show bot error if input is unrecognized', () => {
    component.input = 'hello there';
    component.handleChat();
    expect(component.chatLog[1]).toContain('Sorry');
  });

  it('should emit city if correct command is typed', () => {
    spyOn(component.cityRequested, 'emit');
    component.input = 'show weather for London';
    component.handleChat();
    expect(component.cityRequested.emit).toHaveBeenCalledWith({ city: 'London' });
    expect(component.chatLog).toContain('Bot: Fetching weather for London');
  });
});
