# PlanVibe - Modern Task & Goal Management

PlanVibe is a sleek, modern, and cheerful web application for managing tasks and goals. Built with React and styled with Tailwind CSS, it offers a beautiful user interface and powerful features to help users stay organized and productive.

## Features

- 🔐 **Secure Authentication**
  - Email/Password login
  - OAuth integration (Google, GitHub)
  - JWT-based security

- 📋 **Task Management**
  - Multiple view options (List, Calendar, Kanban)
  - Priority levels and categories
  - Task dependencies and recurring tasks
  - Time tracking

- 🎯 **Goal Setting**
  - Weekly, monthly, and yearly goals
  - Progress tracking
  - Task-to-goal mapping
  - Pre-built goal templates

- 📊 **Analytics**
  - Productivity insights
  - Time distribution analysis
  - Category-wise breakdown
  - Progress tracking

- 🎨 **Modern UI/UX**
  - Responsive design
  - Smooth animations
  - Cheerful color scheme
  - Intuitive navigation

## Tech Stack

- **Frontend:**
  - React
  - Tailwind CSS
  - Framer Motion
  - Chart.js
  - Heroicons

- **Authentication:**
  - JWT
  - OAuth

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/planvibe.git
   cd planvibe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── SignUp.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   ├── tasks/
│   │   └── TaskView.jsx
│   ├── goals/
│   │   └── GoalView.jsx
│   ├── analytics/
│   │   └── Analytics.jsx
│   └── common/
│       └── Layout.jsx
├── hooks/
├── services/
├── utils/
└── assets/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern task management applications
- Icons from Heroicons
- Fonts from Google Fonts (Poppins & Inter)
