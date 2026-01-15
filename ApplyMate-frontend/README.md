# ApplyMate - Frontend 🎨

A premium, AI-powered cover letter generator built with **React** and **Glassmorphism** design principles.

![ApplyMate UI](https://via.placeholder.com/800x400?text=ApplyMate+Preview) 
*(Replace with actual screenshot)*

## ✨ Features

*   **Glassmorphism UI**: Modern, translucent card design with dynamic mesh gradients.
*   **Resume Parsing**: Upload a PDF resume to auto-contextualize the output.
*   **AI Integration**: Connects to Groq (Llama-3) for generating high-quality text.
*   **3 Styling Options**: Professional, Creative, and Concise variations.
*   **Mobile Responsive**: Fully optimized for touch devices.
*   **Auto-Save**: Inputs persist via LocalStorage.
*   **PDF Export**: Download generated letters as formatted PDFs.

## 🛠️ Tech Stack

*   **Framework**: React 18 + Vite
*   **Styling**: CSS Modules (Custom Glassmorphism)
*   **State Management**: React Hooks + LocalStorage
*   **PDF Generation**: `jspdf`
*   **Icons**: standard SVGs

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   ApplyMate Backend running (typically on port 8000)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/vishxesh10/Applymate-Frontend.git
    cd Applymate-Frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment:
    Create a `.env` file (or rename `.env.development`):
    ```env
    VITE_API_URL="http://localhost:8000/api"
    ```

4.  Run Development Server:
    ```bash
    npm run dev
    ```

## 📦 Deployment

This project is optimized for deployment on **Vercel** or **Netlify**.

1.  Connect your GitHub repo to Vercel/Netlify.
2.  Set the Environment Variable `VITE_API_URL` to your production backend URL.
3.  Deploy!
