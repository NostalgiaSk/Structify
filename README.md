
Turn product ideas into backend architecture in seconds.

## Features

- **AI-Powered Architecture Generation**: Uses Groq AI (Llama 3.3 70B) to analyze your project description and generate a complete backend architecture.
- **Multiple Diagram Types**:
  - **Entity-Relationship Diagrams**: Visualizes the database schema with entities, attributes, and relationships.
  - **Class Diagrams**: Generates class diagrams to represent the object-oriented structure of your application.
  - **Sequence Diagrams**: Shows the flow of requests and responses between system components.
  - **System Architecture Diagrams**: High-level structural flowchart of your service integration.
- **Export Capabilities**: Export any generated diagram natively as **SVG** or high-resolution **PNG**.
- **Architecture Notes**: Provides detailed insights and recommendations for your architecture.
- **Modern UI**: Clean, intuitive interface built with React and Ant Design.
- **Fast & Responsive**: Built with Vite for a snappy development experience.

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **Groq AI** (Llama 3.3 70B)
- **TypeScript**

### Frontend
- **React**
- **Ant Design**
- **Mermaid** (for multiple diagram types)
- **TypeScript**

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Structify
   ```

2. **Backend Setup**
   ```bash
   cd StructifyBack
   npm install
   ```
   Create a `.env` file in the `StructifyBack` directory with your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   PORT=4000
   ```

3. **Frontend Setup**
   ```bash
   cd ../StructifyFront
   npm install
   ```
   Create a `.env` file in the `StructifyFront` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd StructifyBack
   npm run dev
   ```
   The backend will start on `http://localhost:4000`.

2. **Start the Frontend**
   ```bash
   cd ../StructifyFront
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## Usage

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Enter a project description in the text area.
3. Click **Generate Architecture**.
4. View the generated ER Diagram, Class Diagram, Sequence Diagram, Architecture Diagram, and Notes in the output tabs.
5. Use the **Export Diagram** button above any diagram to save it as SVG or PNG.

## License

ISC
