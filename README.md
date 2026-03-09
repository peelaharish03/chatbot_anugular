# Manual Chatbot App

A modern Angular 17 standalone chatbot application with manual query selection.

## Features

- **Angular 17 Standalone Components** - No NgModules required
- **Modern UI** - Clean, responsive design with animations
- **Manual Query Selection** - Users select from predefined queries
- **Real-time Chat** - Smooth message flow with typing indicators
- **Responsive Design** - Works perfectly on mobile and desktop
- **Auto-scroll** - Automatically scrolls to latest messages
- **Fade-in Animations** - Smooth message appearance

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── chatbot/
│   │       ├── chatbot.component.ts
│   │       ├── chatbot.component.html
│   │       └── chatbot.component.css
│   ├── models/
│   │   └── chat-message.model.ts
│   ├── services/
│   │   └── chat.service.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── index.html
├── main.ts
├── styles.css
└── test.ts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Chat Flow

1. **Initial Greeting**: Bot welcomes the user
2. **Query Prompt**: After 1 second, bot asks if user has queries
3. **Query Selection**: User selects from predefined options
4. **Instant Response**: Bot replies with mapped response
5. **Typing Indicator**: Shows while bot is "thinking"

## Available Queries

- "What are your business hours?"
- "Where are you located?"
- "How can I contact support?"
- "What services do you provide?"

## Technical Implementation

### ChatMessage Model
```typescript
interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}
```

### ChatService Features
- BehaviorSubject for reactive message management
- Manual query-to-reply mapping
- Automatic initialization with welcome messages
- Clean separation of concerns

### Component Features
- Auto-scroll to bottom on new messages
- Typing indicator animation
- Responsive query buttons
- Smooth fade-in animations

## Styling

- Modern gradient backgrounds
- Rounded chat bubbles
- Smooth transitions and hover effects
- Mobile-first responsive design
- Custom scrollbar styling

## Development

### Running Tests

```bash
npm test
```

### Code Linting

The project uses Angular's built-in linting. Run:

```bash
ng lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
# chatbot_anugular
