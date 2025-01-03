# Tap App

This is a simple yet engaging React + TypeScript app built with Vite. The app challenges players to achieve the highest score by tapping as quickly as possible within a time limit. It includes a leaderboard to display top scores and allows players to restart games or view their results in a modal interface.

## Features

- **React + TypeScript**: Developed using modern React practices and TypeScript for robust type checking.
- **Vite**: Built with Vite for a fast and efficient development experience.
- **Leaderboard**: Displays the top 5 scores with dynamic ranking.
- **Game Timer**: Tracks and updates the remaining game time in real-time.
- **Dynamic Modal**: Uses ShadCN's Dialog component to display game-over results in an elegant modal.
- **Custom Styles**: TailwindCSS for responsive and visually appealing design.

## Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/tap-app.git
   cd tap-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to see the app in action.

## File Structure

```plaintext
src/
├── components/
│   ├── GameOver.tsx        // Displays the game-over modal
│   ├── Leaderboard.tsx     // Renders the leaderboard
│   ├── GameControls.tsx    // Handles start, reset, and game interactions
│   ├── TapButton.tsx       // The main tap button for gameplay
│   └── TimerDisplay.tsx    // Displays the timer and current score
├── App.tsx                 // Main app component
├── main.tsx                // ReactDOM rendering
├── styles/                 // TailwindCSS setup
└── vite-env.d.ts           // TypeScript environment declaration
```

## Configuration

### ESLint Setup

This app uses ESLint for linting and follows the recommended rules for React and TypeScript. You can expand the configuration for type-aware lint rules as needed.

1. Update `parserOptions` in `eslint.config.js`:

   ```js
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ["./tsconfig.node.json", "./tsconfig.app.json"],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```

2. Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
3. Add stylistic rules using `...tseslint.configs.stylisticTypeChecked`.
4. Install and configure `eslint-plugin-react` for additional React-specific linting:

   ```js
   import react from "eslint-plugin-react";

   export default tseslint.config({
     settings: { react: { version: "detect" } },
     plugins: { react },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs["jsx-runtime"].rules,
     },
   });
   ```

## Contribution

Contributions are welcome! Please fork the repository, make changes, and submit a pull request. Ensure your code follows the linting and formatting guidelines.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [TailwindCSS](https://tailwindcss.com/)
