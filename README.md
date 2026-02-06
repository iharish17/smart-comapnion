# 🧠 Smart Companion (MicroWins AI)

Smart Companion is an **AI-powered productivity assistant** designed to help users break down overwhelming tasks into **small achievable steps (MicroWins)**.  
It is built specially to support **neurodivergent users** by reducing cognitive overload, improving focus, and providing a clean distraction-free experience.

---

## ✨ Features

✅ **MicroWins Task Breakdown**  
Breaks big goals into small, actionable steps.

✅ **Step-by-Step Guidance with Time Estimates**  
Each step includes an estimated time to reduce **time blindness**.

✅ **Overwhelm Mode**  
If a step feels too hard, users can simplify it into even smaller micro-actions.

✅ **Neurodiversity-Friendly UI**
- Clean layout  
- Proper spacing  
- Minimal distractions  
- Readable fonts  
- Accessible design  

✅ **Motivational Prompts**  
Encouraging messages appear after a few steps to keep users confident.

✅ **Decision Fatigue Reduction**  
Pre-defined options and suggestions to avoid overthinking.

✅ **Text-to-Speech (Voice Read)**  
Reads steps aloud for better accessibility.

✅ **Font Toggle Support**  
Switch between:
- **Lexend**
- **OpenDyslexic**

✅ **Progressive Loading + Latency Handling**  
Shows instant steps first while loading more progressively.

---

## 🏗️ Tech Stack

### Frontend
- **React.js**
- **CSS (Neurodiversity-friendly styling)**

### Backend
- **Node.js**
- **Express.js**

### AI Integration
- **OpenAI API (LLM-based step generation)**

---

## 📂 Project Structure

```bash
smart-companion/
│
├── frontend/               # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/                # Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── index.js
│   └── package.json
│
└── README.md




##⚙️ Installation & Setup
#1️⃣ Clone the Repository
git clone https://github.com/your-username/smart-companion.git
cd smart-companion

#2️⃣ Setup Backend
cd backend
npm install
npm start

#3️⃣ Setup Frontend
cd frontend
npm install
npm start

##🔑 Environment Variables

#Create a .env file inside the backend folder:
GEMINI_API_KEY=your_api_key_here
PORT=5000

##🚀 How It Works

User enters a large task/goal
AI breaks it into MicroWins
Each step shows:
Description
Estimated time
If user feels overwhelmed → enable Overwhelm Mode
AI simplifies the step into smaller micro-actions
Motivational prompts keep user engaged

##🎯 Use Cases

Students managing assignments
Developers breaking down projects
People with ADHD managing daily routines
Productivity planning
Mental overwhelm reduction
