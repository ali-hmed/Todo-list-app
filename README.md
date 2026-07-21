# Todo List App

A modern, full-featured React Native **Todo List App** built with **Expo (SDK 54)**, **TypeScript**, **Expo Router (v6)**, and **NativeWind (Tailwind CSS)**. It features persistent on-device storage, custom priority levels, due date tracking, rich todo notes, dark/light theme customization, and an architecture based on the repository pattern.

---

## Key Features

- **Todo Management**: Create, edit, view, toggle completion status, and delete todo items with real-time updates.
- **Rich Todo Details**:
  - **Title**: Required todo title (1–200 characters).
  - **Notes / Description**: Detailed context for todo items.
  - **Priority Levels**: Categorize todos by **Low**, **Medium**, or **High** priority with visual badges.
  - **Due Date Selector**: Attach due dates to todos with visual date badges (Today, Tomorrow, Overdue, etc.).
- **Filtering & Counters**: Instantly filter todos by **All**, **Active**, or **Completed**, with live todo counters.
- **Persistent Local Storage**: Todos are automatically saved on-device using `@react-native-async-storage/async-storage` via a decoupled Repository pattern (`AsyncStorageTodoRepository`).
- **Theme Modes**: Supports **Light**, **Dark**, and **System** appearance modes.
- **Cross-Platform**: Runs natively on Android, iOS, and Web.

---

## Tech Stack & Architecture

- **Framework**: [Expo (SDK 54)](https://expo.dev/) with [Expo Router v6](https://docs.expo.dev/router/introduction) (file-based navigation)
- **UI & Styling**: [React Native](https://reactnative.dev/), [NativeWind v4](https://www.nativewind.dev/) / Tailwind CSS 3, `@expo/vector-icons`
- **State & Storage**: React Context API (`TodoContext`, `ThemeContext`) + `@react-native-async-storage/async-storage`
- **Architecture**:
  - `Domain & Types`: Core model definitions in `src/features/todos/types.ts`.
  - `Repository Pattern`: Abstracted storage logic (`TodoRepository.ts`, `AsyncStorageTodoRepository.ts`, `InMemoryTodoRepository.ts`).
  - `Feature Modules`: Isolated components and hooks under `src/features/todos/`.
  - `Reusable UI`: Custom primitives in `src/components/ui/`.

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v18.0.0 or higher
- **npm** (comes with Node.js) or **yarn** / **pnpm**
- *(Optional)* **Expo Go** app installed on your physical mobile device ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- *(Optional)* **Android Studio** (for Android Emulator) or **Xcode** (macOS only, for iOS Simulator)

---

## Installation

1. **Clone or navigate to the repository**:
   ```bash
   git clone <repository-url>
   cd Todo-list-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## How to Run the App

### 1. Start the Expo Development Server

```bash
npm start
```
*Or run `npx expo start`.*

This starts the Expo bundler and displays an interactive menu in your terminal.

### 2. Launch on Target Platform

- **Web Browser**:
  ```bash
  npm run web
  ```
  *(Or press `w` in the running terminal)*

- **Android Emulator / Device**:
  ```bash
  npm run android
  ```
  *(Or press `a` in the running terminal)*

- **iOS Simulator** (macOS required):
  ```bash
  npm run ios
  ```
  *(Or press `i` in the running terminal)*

- **Physical Device**:
  Scan the terminal QR code using the **Expo Go** app on Android or the native Camera app on iOS.

---

## Available Scripts

The following scripts are defined in `package.json`:

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm start` | `expo start` | Starts the Expo development server. |
| `npm run web` | `expo start --web` | Runs the Todo List App in your web browser. |
| `npm run android` | `expo start --android` | Runs the Todo List App on an Android emulator or device. |
| `npm run ios` | `expo start --ios` | Runs the Todo List App on the iOS simulator. |
| `npm run lint` | `expo lint` | Runs ESLint to check for code formatting and quality issues. |
| `npm run build:android:apk` | `eas build --platform android --profile preview` | Builds a standalone Android preview APK via EAS Build. |
| `npm run build:android:local` | `eas build --platform android --profile preview --local` | Builds an Android preview APK locally using EAS CLI. |
| `npm run reset-project` | `node ./scripts/reset-project.js` | Utility script to reset starter template files. |

---

## How to Use the App

1. **Viewing Todos**:
   - Open the **Todos** tab (`My Todos`).
   - Use the filter header to switch between **All**, **Active**, and **Completed** todo lists.
2. **Adding a New Todo**:
   - Tap the **+** button (Floating Action Button) at the bottom right of the **Todos** tab.
   - Fill in the todo title (required) and optional notes/description.
   - Select a priority level (**Low**, **Medium**, or **High**).
   - Assign an optional due date using the custom date picker.
   - Tap **Create Todo** to save.
3. **Managing Todos**:
   - **Toggle Completion**: Tap the checkbox next to any todo in the list or the status toggle button in the detail view.
   - **View & Edit**: Tap any todo card to view full details. Tap **Edit Note** to update title, notes, priority, or due date, then tap **Save Note Changes**.
   - **Delete Todo**: Open the todo detail screen, tap **Delete Todo**, and confirm deletion.
4. **Changing Appearance**:
   - Navigate to the **Settings** tab.
   - Select **Light**, **Dark**, or **System** mode. Your selection is automatically persisted.

---

## Project Structure

```
Todo-list-app/
├── app/                           # Expo Router file-based screens
│   ├── (tabs)/                    # Bottom tab bar navigation
│   │   ├── _layout.tsx            # Tab navigator configuration
│   │   ├── index.tsx              # "My Todos" tab screen
│   │   └── settings.tsx           # "Settings" tab screen
│   ├── todo/                      # Todo modal & detail routes
│   │   ├── [id].tsx               # "Todo Details" & "Edit Note" screen
│   │   └── new.tsx                # "New Todo" creation modal
│   ├── _layout.tsx                # Root layout & providers (Theme & TodoContext)
│   └── +not-found.tsx             # 404 fallback screen
├── assets/
│   └── images/                    # Icons, splash images, and logos
├── components/                    # Core navigation & theme component helpers
│   ├── external-link.tsx          # Link component
│   ├── haptic-tab.tsx             # Tab button with haptics
│   ├── hello-wave.tsx             # Animated wave component
│   ├── parallax-scroll-view.tsx   # Parallax scroll container
│   ├── themed-text.tsx            # Theme-aware Text component
│   └── themed-view.tsx            # Theme-aware View component
├── constants/
│   └── theme.ts                   # Palette & typography constants
├── hooks/                         # Color scheme hooks
│   ├── use-color-scheme.ts        # Native color scheme hook
│   ├── use-color-scheme.web.ts    # Web color scheme hook
│   └── use-theme-color.ts        # Theme color helper hook
├── scripts/
│   └── reset-project.js           # Starter reset utility script
├── src/                           # Main application source code
│   ├── components/ui/             # Reusable UI component primitives
│   │   ├── Badge.tsx              # Priority & status badges
│   │   ├── Button.tsx             # Action buttons
│   │   ├── Card.tsx               # Content card container
│   │   ├── DateSelector.tsx       # Date picker visual component
│   │   ├── EmptyState.tsx         # Empty todo list state component
│   │   ├── Input.tsx              # Text input field component
│   │   └── LoadingSpinner.tsx     # Activity spinner
│   ├── context/                   # Global React state context
│   │   ├── ThemeContext.tsx       # Theme state manager
│   │   └── TodoContext.tsx        # Todo state manager & CRUD action dispatcher
│   ├── features/todos/            # Todo feature module
│   │   ├── components/
│   │   │   ├── TodoForm.tsx       # Add/Edit todo form component
│   │   │   ├── TodoItem.tsx       # Todo list item row
│   │   │   ├── TodoList.tsx       # Todo list container
│   │   │   ├── TodoListHeader.tsx # Header with counters & filter tabs
│   │   │   └── TodoNoteView.tsx   # Todo note detail reader component
│   │   ├── hooks/
│   │   │   └── useTodoForm.ts     # Form state & validation hook
│   │   └── types.ts               # Todo domain TypeScript types
│   ├── repository/                # Data storage repository layer
│   │   ├── TodoRepository.ts     # Storage interface contract
│   │   ├── AsyncStorageTodoRepository.ts # On-device AsyncStorage implementation
│   │   └── InMemoryTodoRepository.ts     # In-memory storage implementation
│   └── utils/                     # Utility helpers
│       ├── dateUtils.ts           # Date formatting & comparison utilities
│       └── validation.ts         # Title & description validation helpers
├── app.json                       # Expo configuration
├── babel.config.js                # Babel configuration
├── eas.json                       # EAS Build profile configuration
├── eslint.config.js               # ESLint configuration
├── global.css                     # Global CSS & Tailwind styles
├── metro.config.js                # Metro bundler configuration
├── nativewind-env.d.ts            # NativeWind environment types
├── package.json                   # Project dependencies & npm scripts
├── package-lock.json              # Lockfile
├── tailwind.config.js             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

---

## License

This project is open source and available under the [MIT License](LICENSE).

