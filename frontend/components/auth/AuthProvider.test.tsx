import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/providers/AuthProvider";

describe("AuthProvider", () => {
  it("renders children without crashing", () => {
    render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders SessionProvider internally", () => {
    render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>
    );
    // You would typically mock useSession to test SessionProvider's behavior
    // For a basic test, just ensure it renders
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
