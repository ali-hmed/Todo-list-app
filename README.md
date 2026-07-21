# Simple Todo List App 📝

> **Developer's Note:**  
> Welcome! This is a simple **Todo List App** that I built as my very first mobile project. It represents my first steps using **React Native** and **Expo**. My goal with this project was to learn the fundamentals of cross-platform development, state management, and building clean interfaces. This is just the beginning of my journey as I explore building more apps in the future!

---

## 📱 Platform Availability

- **Android**: Available! You can run the app directly via Expo Go or build an Android APK preview.
- **iOS**: Currently in development for future releases as I expand my build setup.

---

## 🌟 Key Features

- **Todo Management**: Easily create, view, edit, toggle completion, and delete your daily todo items.
- **Todo Details & Notes**:
  - **Title**: Simple, clear title for each todo.
  - **Notes**: Add optional descriptions or notes to keep track of details.
  - **Priority Levels**: Set priority to **Low**, **Medium**, or **High**.
  - **Due Dates**: Select optional due dates with helpful status tags (e.g., Today, Tomorrow).
- **Filtering**: Easily filter your list by **All**, **Active**, or **Completed** todos.
- **On-Device Storage**: Your todos are automatically saved locally on your phone using `@react-native-async-storage/async-storage`.
- **Theme Modes**: Supports **Light**, **Dark**, and **System** appearance modes.

---

## 🛠️ Tech Stack & Tools

- **Framework**: [Expo (SDK 54)](https://expo.dev/) & [React Native](https://reactnative.dev/)
- **Routing**: [Expo Router v6](https://docs.expo.dev/router/introduction) (file-based navigation)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Storage**: `@react-native-async-storage/async-storage`

---

## 🚀 How to Install and Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Expo Go** app installed on your Android phone, or an Android Emulator / Web Browser

### 1. Clone & Install
```bash
git clone <repository-url>
cd Todo-list-app
npm install
```

### 2. Run the App
Start the Expo development server:
```bash
npm start
```
*Or run `npx expo start`.*

In the terminal menu, choose where to open the app:
- Press `a` or run `npm run android` for **Android**
- Press `w` or run `npm run web` for **Web**
- Scan the QR code with **Expo Go** on your Android device

---

## 📦 Building for Android (APK)

To build a downloadable Android APK preview file locally or via cloud:

- **Build APK via EAS Cloud**:
  ```bash
  npm run build:android:apk
  ```
- **Build APK Locally**:
  ```bash
  npm run build:android:local
  ```

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm start` | `expo start` | Starts the Expo development server. |
| `npm run android` | `expo start --android` | Launches the app on an Android device or emulator. |
| `npm run web` | `expo start --web` | Runs the app in your web browser. |
| `npm run ios` | `expo start --ios` | Launches the app on an iOS simulator (macOS). |
| `npm run lint` | `expo lint` | Checks code formatting and quality. |
| `npm run build:android:apk` | `eas build --platform android --profile preview` | Builds Android preview APK via EAS Cloud. |
| `npm run build:android:local` | `eas build --platform android --profile preview --local` | Builds Android preview APK locally. |
| `npm run reset-project` | `node ./scripts/reset-project.js` | Utility script to reset starter template code. |

---

## 📁 Project Structure

```
Todo-list-app/
├── app/                           # Navigation screens & pages (Expo Router)
│   ├── (tabs)/                    # Main tab bar navigator
│   │   ├── _layout.tsx            # Tab bar layout & options
│   │   ├── index.tsx              # "My Todos" list screen
│   │   └── settings.tsx           # "Settings" screen (Themes & info)
│   ├── todo/                      # Todo sub-routes
│   │   ├── [id].tsx               # Todo detail & edit screen
│   │   └── new.tsx                # Create new todo screen
│   ├── _layout.tsx                # App root layout & providers
│   └── +not-found.tsx             # Fallback route
├── components/                    # Navigation & theme layout helpers
├── constants/                     # Color palette & font definitions
├── hooks/                         # Theme & color scheme hooks
├── scripts/                       # Maintenance scripts
├── src/                           # Core source code
│   ├── components/ui/             # Reusable UI elements (Button, Input, Badge, DateSelector)
│   ├── context/                   # React Context (TodoContext, ThemeContext)
│   ├── features/todos/            # Todo components, form hooks, and types
│   ├── repository/                # Storage layer (AsyncStorageTodoRepository)
│   └── utils/                     # Date formatting & validation helpers
├── app.json                       # Expo configuration
├── package.json                   # Project dependencies & npm scripts
```

---

## 🔮 Future Roadmap & Next Steps

This simple Todo List App is my first step into mobile app development with React Native & Expo! Here is what's planned next:
- Release and support for **iOS**.
- Continue learning and exploring new mobile app projects in the future!

---

building android app


