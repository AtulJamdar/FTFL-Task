import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import AuthLayout from "../components/layout/AuthLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Field, FieldGroup, FieldLabel } from "../components/ui/field";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      await register(name.trim(), email.trim(), password);
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <AuthLayout
      isDarkMode={isDarkMode}
      eyebrow="Get started"
      title="Create your BookNest account"
      subtitle="Join as a student to browse the catalog, request titles, and track loans in real time."
    >
      <div
        className={`w-full p-8 sm:p-9 rounded-2xl border shadow-xl shadow-indigo-900/5 transition-all ${
          isDarkMode
            ? "bg-gray-800/80 border-gray-700 backdrop-blur-sm"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="mb-8 text-center">
          <h2
            className={`text-xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Registration
          </h2>
          <p
            className={`text-sm mt-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            All fields are required.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel
                className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              >
                Full name
              </FieldLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className={`w-full rounded-xl transition-all ${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-600 text-white focus-visible:ring-indigo-500"
                    : "bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                }`}
              />
            </Field>

            <Field>
              <FieldLabel
                className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              >
                Email address
              </FieldLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@institution.edu"
                className={`w-full rounded-xl transition-all ${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-600 text-white focus-visible:ring-indigo-500"
                    : "bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                }`}
              />
            </Field>

            <Field>
              <FieldLabel
                className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              >
                Password
              </FieldLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={`w-full rounded-xl transition-all ${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-600 text-white focus-visible:ring-indigo-500"
                    : "bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                }`}
              />
            </Field>

            <Field>
              <FieldLabel
                className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              >
                Confirm password
              </FieldLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={`w-full rounded-xl transition-all ${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-600 text-white focus-visible:ring-indigo-500"
                    : "bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                }`}
              />
            </Field>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/25 mt-2 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </FieldGroup>
        </form>

        <p
          className={`mt-8 text-center text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Already registered?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
