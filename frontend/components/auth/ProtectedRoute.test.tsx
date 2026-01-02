import { render, screen, waitFor } from "@testing-library/react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock next-auth/react and next/navigation
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ProtectedRoute", () => {
  const mockUseSession = useSession as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockPush = jest.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
  });

  it("renders children when authenticated", () => {
    mockUseSession.mockReturnValue({ data: { user: { email: "test@example.com" } }, status: "authenticated" });
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("redirects to login when unauthenticated", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("shows loading state when session status is loading", () => {
    mockUseSession.mockReturnValue({ data: null, status: "loading" });
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );
    expect(screen.getByText("Loading or not authenticated...")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
