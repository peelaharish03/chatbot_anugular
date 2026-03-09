import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * ChatbotComponent - Main chatbot interface component
 * Handles message display, query selection, and auto-scroll functionality
 */
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  
  // Current messages from the service
  public messages: ChatMessage[] = [];
  
  // Available query options
  public queryOptions: string[] = [];
  
  // Flag to control auto-scroll
  private shouldAutoScroll: boolean = false;
  
  // Flag to show typing indicator
  public isTyping: boolean = false;
  
  constructor(
    private chatService: ChatService,
    private destroyRef: DestroyRef
  ) {}
  
  ngOnInit(): void {
    // Subscribe to messages from the service
    this.chatService.messages$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(messages => {
        this.messages = messages;
        this.shouldAutoScroll = true;
      });
    
    // Get query options from service
    this.queryOptions = this.chatService.queryOptions;
  }
  
  ngAfterViewChecked(): void {
    // Auto-scroll to bottom when new messages are added
    if (this.shouldAutoScroll) {
      this.scrollToBottom();
      this.shouldAutoScroll = false;
    }
  }
  
  /**
   * Handle query selection from user
   * Shows typing indicator and processes the query
   * @param query The selected query string
   */
  public onQuerySelect(query: string): void {
    // Show typing indicator
    this.isTyping = true;
    
    // Process the query through the service
    this.chatService.selectQuery(query);
    
    // Hide typing indicator after bot response delay
    setTimeout(() => {
      this.isTyping = false;
    }, 1000);
  }
  
  /**
   * Scroll chat container to bottom
   * Ensures latest messages are always visible
   */
  private scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
  
  /**
   * Check if query buttons should be shown
   * Only show after initial bot messages are displayed
   */
  public get shouldShowQueryButtons(): boolean {
    return this.messages.length >= 2;
  }
  
  /**
   * Get CSS class for message bubble based on sender
   * @param message The chat message
   * @returns CSS class string
   */
  public getMessageClass(message: ChatMessage): string {
    return message.sender === 'bot' ? 'bot-message' : 'user-message';
  }
}
