# Task Management Frontend

A React 19 frontend application for the Task Management API, built with TypeScript and Ant Design. 


## Overview

This frontend application provides a comprehensive web interface for the Task Management API, allowing users to:

- **Create Tasks** - Add new shell command tasks with validation
- **View Tasks** - Display all tasks in a responsive card layout
- **Search Tasks** - Find tasks by name with real-time filtering
- **Execute Commands** - Run tasks and view real-time output
- **Delete Tasks** - Remove tasks with confirmation dialogs
- **Track History** - View complete execution history with timestamps


## Implementation

- **Create New Task**
  ![WhatsApp Image 2025-10-19 at 17 07 15_5e714c22](https://github.com/user-attachments/assets/41b865ca-a037-4ae1-a12e-00e0fb8c0a8d)
  ![WhatsApp Image 2025-10-19 at 17 07 50_d7fa4b36](https://github.com/user-attachments/assets/4e89f643-0750-42a1-ba3c-99372fe9d944)
  
- **Get All Tasks**
  ![WhatsApp Image 2025-10-19 at 17 14 51_8e44c1e9](https://github.com/user-attachments/assets/7b4af334-c737-4518-bffc-1644fae2d641)

- **Search Task By Name**
  ![WhatsApp Image 2025-10-19 at 17 12 32_c0a3e2fd](https://github.com/user-attachments/assets/fddd796a-af5b-4c67-9192-423328cc01a3)

- **Execute Tasks**
  ![WhatsApp Image 2025-10-19 at 17 19 37_9d0b8253](https://github.com/user-attachments/assets/426df8e4-45ed-414c-acbc-009e8017f4f8)
  ![WhatsApp Image 2025-10-19 at 17 20 02_c6d56573](https://github.com/user-attachments/assets/7bca2fe1-47a8-4f96-847c-e0b794005698)
  ![WhatsApp Image 2025-10-19 at 17 20 27_e6ca3c56](https://github.com/user-attachments/assets/f64ba5f3-bb44-4898-993c-53a0a7f34243)

- **Delete Task**
  ![WhatsApp Image 2025-10-19 at 17 21 01_f36a5bc4](https://github.com/user-attachments/assets/8757c38f-a659-4181-b975-d65ed25c472c)
  ![WhatsApp Image 2025-10-19 at 17 21 23_04d693e0](https://github.com/user-attachments/assets/2087fdfa-c5c5-45db-a790-e39003cb55f0)

- **MongoDB Image**
  ![WhatsApp Image 2025-10-19 at 18 00 09_1a450bbc](https://github.com/user-attachments/assets/8f25b1a0-054b-411a-a099-19c643012c93)



## 🛠️ Technology Stack

### **Core Technologies**
- **React 19** - Latest React with modern features and concurrent rendering
- **TypeScript 5.6** - Full type safety and enhanced developer experience
- **Ant Design 5.21** - Modern UI component library with comprehensive design system
- **Vite 5.4** - Fast build tool and development server


## 📋 Prerequisites

Before running this application, ensure you have the following installed:

### **Required Software**
- **Node.js 18+** - JavaScript runtime
- **npm 9+** - Package manager (comes with Node.js)
- **Backend API** - Spring Boot backend running on `http://localhost:8080`

### **System Requirements**
- **RAM**: Minimum 4GB available memory
- **Disk Space**: At least 1GB free space
- **Network**: Port 3000 available for the frontend
- **Browser**: Modern browser with ES2020 support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## 🚀 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/zeusXtruealpha/Kaiburr_Task_3
cd frontend
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Start Backend API**
Make sure your Spring Boot backend is running:
```bash
# From the root directory
mvn spring-boot:run
```
Backend should be available at: `http://localhost:8080`

### **4. Start Frontend Development Server**
```bash
npm run dev
```

### **5. Open in Browser**
Navigate to: `http://localhost:3000`


### **Development Workflow**

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files in `src/` directory
   - Changes are automatically reflected in browser

3. **Type Checking**
   ```bash
   npm run type-check
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```


## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── TaskCard.tsx    # Individual task display with actions
│   │   ├── TaskForm.tsx    # Task creation form
│   │   ├── TaskList.tsx    # Task list container
│   │   └── SearchBar.tsx   # Search functionality
│   ├── services/           # API communication
│   │   └── taskService.ts  # Backend API integration
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # Type interfaces and models
│   ├── utils/              # Utility functions
│   │   └── index.ts        # Helper functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration     
└── README.md              
```


## 🔄 API Integration

### **Backend Communication**

The frontend communicates with the Spring Boot backend at `http://localhost:8080`:

```typescript
// API Endpoints
GET    /tasks              // Get all tasks
GET    /tasks?id={id}      // Get task by ID
GET    /tasks/search?name={name}  // Search tasks by name
PUT    /tasks              // Create or update task
DELETE /tasks/{id}         // Delete task
PUT    /tasks/{id}/execute // Execute task
```

### **Request/Response Flow**

1. **User Action** → Frontend Component
2. **API Call** → TaskService
3. **HTTP Request** → Backend API
4. **Response** → Frontend Component
5. **UI Update** → User Interface

### **Error Handling**

- **Network Errors** - Connection issues and timeouts
- **Validation Errors** - Invalid input data
- **Security Errors** - Malicious command detection
- **Server Errors** - Backend processing errors

