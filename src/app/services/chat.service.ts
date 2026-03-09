import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

/**
 * Chat service to manage chat messages and handle query responses
 * Uses BehaviorSubject to maintain message state reactively
 */
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // BehaviorSubject to hold the current list of messages
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  
  // Observable for components to subscribe to message updates
  public messages$: Observable<ChatMessage[]> = this.messagesSubject.asObservable();
  
  // Available query options for the user
  public readonly queryOptions = [
    'What are your business hours?',
    'Where are you located?',
    'How can I contact support?',
    'What services do you provide?'
  ];
  
  // Manual reply mapping for queries
  private readonly replyMapping: { [key: string]: string } = {
    'What are your business hours?': 'We are open from 9 AM to 6 PM, Monday to Saturday.',
    'Where are you located?': 'We are located in Hyderabad, India.',
    'How can I contact support?': 'You can contact support at support@example.com.',
    'What services do you provide?': 'We provide POS solutions, billing software, and business automation services.'
  };
  
  constructor() {
    // Initialize chat with welcome messages
    this.initializeChat();
  }
  
  /**
   * Initialize the chat with welcome messages
   * Shows greeting and query options after a delay
   */
  private initializeChat(): void {
    const initialMessages: ChatMessage[] = [
      {
        sender: 'bot' as const,
        text: 'Hello 👋 How are you doing today? Have a nice day!'
      }
    ];
    
    // Set initial messages
    this.messagesSubject.next(initialMessages);
    
    // Add second message after 1 second delay
    setTimeout(() => {
      const currentMessages = this.messagesSubject.value;
      const updatedMessages: ChatMessage[] = [
        ...currentMessages,
        {
          sender: 'bot' as const,
          text: 'Do you have a query? Please select one of the options below.'
        }
      ];
      this.messagesSubject.next(updatedMessages);
    }, 1000);
  }
  
  /**
   * Handle user query selection
   * Adds user message and corresponding bot reply
   * @param query The selected query from the user
   */
  public selectQuery(query: string): void {
    const currentMessages = this.messagesSubject.value;
    
    // Add user message
    const userMessage: ChatMessage = {
      sender: 'user' as const,
      text: query
    };
    
    // Get bot reply based on query
    const botReply = this.replyMapping[query] || 'I apologize, but I don\'t have information about that query.';
    
    const botMessage: ChatMessage = {
      sender: 'bot' as const,
      text: botReply
    };
    
    // Update messages with user query
    this.messagesSubject.next([...currentMessages, userMessage]);
    
    // Add bot reply after a short delay to simulate typing
    setTimeout(() => {
      const updatedMessages = this.messagesSubject.value;
      this.messagesSubject.next([...updatedMessages, botMessage]);
    }, 1000);
  }
  
  /**
   * Get current messages array
   * @returns Current array of chat messages
   */
  public getCurrentMessages(): ChatMessage[] {
    return this.messagesSubject.value;
  }
}
