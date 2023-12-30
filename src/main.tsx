import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.tsx";
import { CloseProvider } from "./context/CloseContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<CloseProvider>
				<App />
			</CloseProvider>
		</AuthProvider>
	</React.StrictMode>
);
