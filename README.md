
# Structify

Turn product ideas into backend architecture in seconds — then refine them interactively.

## Features

- **AI-Powered Architecture Generation**: Uses Groq AI (Llama 3.3 70B) to analyze your project description and generate a complete backend architecture.
- **Multi-Diagram Visualizations**: ER Diagrams, Class Diagrams, Sequence Diagrams, and Architecture Diagrams — all rendered with Mermaid.js.
- **Interactive Architecture Editor**: Toggle Edit Mode to modify the generated architecture directly in the UI.
  - Rename entities
  - Add, edit, and remove attributes (name, type, primary key)
  - Add, edit, and delete entities
  - Add, edit, and remove relationships (from, to, type)
  - Entity name changes automatically cascade to all related relationships
- **Save & Reset Workflow**: Changes are applied to diagrams only when you click **Save Changes**. Click **Reset** to revert to the original generated architecture.
- **Diagram Export**: Export any diagram as SVG or PNG.
- **Architecture Notes**: AI-generated insights and recommendations for your architecture.
- **Modern UI**: Clean, dark-themed interface built with React and Ant Design.

## Tech Stack

### Backend
- **Node.js** + **Express.js**
- **Groq AI** (Llama 3.3 70B)
- **TypeScript**

### Frontend
- **React 18** + **TypeScript**
- **Ant Design** (UI components)
- **Mermaid.js** (diagram rendering)
- **Vite** (build tool)

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
   Create a `.env` file in the `StructifyBack` directory:
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
2. Enter a project description and click **Generate Architecture**.
3. View the generated diagrams (ER, Class, Sequence, Architecture) and notes in the output tabs.
4. Toggle **Edit Mode** to modify the architecture:
   - Edit entity names, attributes, and relationships using the editor panels.
   - Click **Save Changes** to apply edits to all diagrams.
   - Click **Reset** to revert to the original generated architecture.
5. Export any diagram as SVG or PNG using the **Export** dropdown.

## Project Structure

```
Structify/
├── StructifyBack/          # Express + Groq AI backend
│   └── src/
│       └── server.ts
├── StructifyFront/         # React + Vite frontend
│   └── src/
│       ├── components/
│       │   └── diagram/
│       │       └── MermaidRenderer.tsx
│       ├── pages/
│       │   └── Dashboard/
│       │       ├── DashboardPage.tsx
│       │       ├── types.ts
│       │       └── components/
│       │           ├── InputPanel.tsx
│       │           ├── OutputTabs.tsx
│       │           ├── EntityEditor.tsx
│       │           ├── RelationshipEditor.tsx
│       │           └── TopNavbar.tsx
│       ├── services/
│       └── utils/
│           ├── classDiagramGenerator.ts
│           ├── erDiagramGenerator.ts
│           ├── sequenceDiagramGenerator.ts
│           └── architectureDiagramGenerator.ts
└── README.md
```

## License

ISC

