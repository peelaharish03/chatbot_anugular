/**
 * Interface for chat messages
 * Represents a single message in the chat conversation
 */
export interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}
