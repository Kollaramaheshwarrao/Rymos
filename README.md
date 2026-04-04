# Rymos - AI-Powered Learning Mentor

> **"Decode Errors, Discover Brilliance"**

Rymos is an intelligent AI mentor that transforms your coding mistakes and misconceptions into powerful learning opportunities. Built with cutting-edge AI technology, it provides personalized feedback across multiple learning domains.

## 🎯 What Rymos Does

### **Core Functionality**

**🔍 Multi-Domain Analysis Platform**
- **Code Analyzer**: Analyzes programming code for errors, bugs, and improvements
- **MCQ Practice**: Interactive multiple-choice questions with intelligent feedback
- **Text Analyzer**: Analyzes written content for comprehension and learning

**🤖 AI-Powered Feedback System**
- Uses Google Gemini 2.5 Flash for intelligent analysis
- Provides step-by-step explanations in human-friendly language
- Identifies error types and misconceptions
- Offers practical tips and recommendations

**📝 Interactive MCQ System**
- Manual question editing and creation
- Dynamic answer choices (add/remove options)
- Correct answer selection and validation
- Real-time AI-powered feedback on student responses

## 🚀 Key Features

### **1. Code Analysis Engine**
```typescript
// Analyzes code snippets across multiple programming languages
- Error detection and explanation
- Code quality assessment
- Best practices recommendations
- Performance optimization suggestions
```

### **2. Intelligent MCQ System**
- **Create Custom Questions**: Build your own multiple-choice questions
- **Edit Mode**: Modify questions, answers, and correct options in real-time
- **AI Feedback**: Get detailed explanations for incorrect answers
- **Error Classification**: Identifies logic flaws, concept misunderstandings, and wrong assumptions

### **3. Text Analysis Capabilities**
- Content comprehension analysis
- Writing quality assessment
- Learning objective alignment
- Personalized improvement suggestions

### **4. Advanced UI/UX**
- **Modern Design**: Built with Tailwind CSS and Radix UI
- **Dark/Light Theme**: Automatic theme switching
- **Responsive Layout**: Works seamlessly on all devices
- **Interactive Components**: Smooth animations and transitions

## 🛠️ Technology Stack

### **Frontend Architecture**
- **Next.js 15.3.8** - React framework with App Router
- **React 18.3.1** - Component-based UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### **AI & Backend**
- **Google Gemini 2.5 Flash** - Advanced language model
- **Firebase Genkit** - AI development framework
- **Zod** - Schema validation and type safety
- **Judge0 API** - Code execution and evaluation

### **Development Tools**
- **Turbopack** - Fast bundler for development
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
src/
├── ai/                          # AI Processing Engine
│   ├── flows/                   # AI Analysis Flows
│   │   ├── analyze-code-and-provide-explanation.ts
│   │   ├── analyze-mcq-and-provide-explanation.ts
│   │   └── analyze-text-and-provide-explanation.ts
│   ├── genkit.ts               # AI Configuration
│   └── dev.ts                  # Development Setup
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root Layout
│   ├── page.tsx                # Landing Page
│   └── globals.css             # Global Styles
├── components/                 # React Components
│   ├── rymos/                  # Core Rymos Components
│   │   ├── rymos-app.tsx       # Main Application
│   │   ├── mcq-analyzer.tsx    # MCQ System
│   │   ├── code-analyzer.tsx   # Code Analysis
│   │   ├── text-analyzer.tsx   # Text Analysis
│   │   └── feedback-display.tsx # AI Feedback UI
│   └── ui/                     # Reusable UI Components
├── lib/                        # Utility Functions
│   ├── actions.ts              # Server Actions
│   ├── utils.ts                # Helper Functions
│   └── mock-data.ts            # Sample Data
└── services/                   # External Services
    └── judge0.ts               # Code Execution Service
```

## 🎮 How to Use Rymos

### **For Students**

**1. Code Analysis**
```javascript
// Paste your code snippet
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}
```
- Select programming language
- Get AI-powered error analysis
- Receive optimization suggestions
- Learn best practices

**2. MCQ Practice**
- Answer multiple-choice questions
- Get instant AI feedback on wrong answers
- Understand error types and reasoning
- Learn from detailed explanations

**3. Text Analysis**
- Submit written content
- Receive comprehension feedback
- Get improvement suggestions
- Enhance learning outcomes

### **For Educators**

**1. Create Custom MCQs**
- Click "Edit MCQ" button
- Write custom questions
- Add/remove answer choices
- Set correct answers
- Save and use immediately

**2. Monitor Learning**
- Track student progress
- Analyze common mistakes
- Customize content difficulty
- Provide targeted feedback

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

1. **Clone Repository**
   ```bash
   git clone https://github.com/Kollaramaheshwarrao/Rymos.git
   cd Rymos
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure API Keys**
   ```env
   # Add to .env file
   GEMINI_API_KEY=your_gemini_api_key_here
   JUDGE0_API_KEY=your_judge0_api_key_here
   JUDGE0_API_HOST=https://judge0-ce.p.rapidapi.com
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Browser**
   ```
   http://localhost:3000
   ```

## 🔑 API Keys Setup

### **Google Gemini AI**
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create new project
3. Generate API key
4. Add to `.env` file

### **Judge0 API**
1. Go to [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Subscribe to service
3. Copy API key
4. Add to `.env` file

## 🎨 User Interface

### **Landing Page**
- Hero section with compelling messaging
- Call-to-action buttons
- Gradient backgrounds with grid patterns
- Responsive design for all devices

### **Main Application**
- **Tabbed Interface**: Code, MCQ, and Text analyzers
- **Interactive Forms**: Dynamic input fields and controls
- **Real-time Feedback**: Instant AI-powered responses
- **Modern Styling**: Clean, professional appearance

### **MCQ System Features**
- **Edit Mode**: Toggle between view and edit modes
- **Dynamic Choices**: Add/remove answer options
- **Correct Answer Selection**: Mark correct answers
- **Large Solution Display**: Enhanced readability
- **Copy Functionality**: Easy solution copying

## 🧠 AI Analysis Capabilities

### **Error Type Detection**
- **Logic Flaws**: Identifies reasoning errors
- **Concept Misunderstandings**: Spots knowledge gaps
- **Wrong Assumptions**: Catches incorrect premises

### **Feedback Structure**
```json
{
  "error_type": "Logic flaw",
  "explanation": "Step-by-step explanation in simple language",
  "correct_solution": "The right answer with reasoning",
  "pro_tip": "Practical advice to avoid similar mistakes"
}
```

### **Analysis Features**
- **Human-friendly Language**: Clear, encouraging explanations
- **Step-by-step Breakdown**: Detailed reasoning process
- **Practical Tips**: Actionable improvement advice
- **Motivational Tone**: Positive, learning-focused feedback

## 🌐 Deployment

### **Vercel Deployment (Recommended)**
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy with one click
4. Automatic deployments on git push

### **Environment Variables for Production**
```env
GEMINI_API_KEY=your_production_gemini_key
JUDGE0_API_KEY=your_production_judge0_key
JUDGE0_API_HOST=https://judge0-ce.p.rapidapi.com
```

## 📊 Performance Features

- **Fast Loading**: Optimized with Next.js and Turbopack
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Analysis**: Quick AI response times
- **Efficient Caching**: Optimized data fetching
- **Progressive Enhancement**: Works without JavaScript

## 🔒 Security & Privacy

- **API Key Protection**: Environment variables for sensitive data
- **Input Validation**: Zod schema validation
- **Error Handling**: Graceful error management
- **Type Safety**: TypeScript for runtime safety

## 🎯 Use Cases

### **Educational Institutions**
- Supplement traditional teaching methods
- Provide instant feedback to students
- Create custom assessment materials
- Track learning progress

### **Individual Learners**
- Practice coding skills
- Test knowledge with MCQs
- Get personalized feedback
- Learn from mistakes

### **Corporate Training**
- Employee skill development
- Technical assessment
- Knowledge validation
- Performance tracking

## 🚀 Future Enhancements

### **Planned Features**
- **Multi-language Support**: International accessibility
- **Advanced Analytics**: Detailed learning insights
- **Collaborative Learning**: Peer-to-peer features
- **Mobile App**: Native mobile applications
- **Voice Integration**: Speech-to-text capabilities

### **Technical Improvements**
- **Database Integration**: Persistent data storage
- **User Authentication**: Account management
- **Progress Tracking**: Learning analytics
- **Real-time Collaboration**: Live editing features

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kollaramaheshwarrao**
- GitHub: [@Kollaramaheshwarrao](https://github.com/Kollaramaheshwarrao)
- Project: [Rymos](https://github.com/Kollaramaheshwarrao/Rymos)

## 🙏 Acknowledgments

- **Google Gemini AI** - Advanced language model capabilities
- **Judge0** - Code execution and evaluation services
- **Next.js Team** - Excellent React framework
- **Vercel** - Seamless deployment platform
- **Open Source Community** - Amazing tools and libraries

---

**Built with ❤️ using Next.js, TypeScript, and AI**

*Transform your mistakes into learning opportunities with Rymos - Your AI Learning Mentor*