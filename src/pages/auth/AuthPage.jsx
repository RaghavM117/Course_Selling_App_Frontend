import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    adminSignin,
    adminSignup,
    userSignin,
    userSignup,
} from "../../api/courseApi";
import FormField from "../../components/ui/FormField";
import { ButtonSpinner } from "../../components/ui/Spinner";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
    const { role } = useParams(); // 'user' | 'admin'
    const navigate = useNavigate();
    const { login } = useAuth();
    const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const update = (k) => (e) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const isAdmin = role === "admin";

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            let res;
            if (mode === "signup") {
                res = isAdmin
                    ? await adminSignup({
                          username: form.username,
                          email: form.email,
                          password: form.password,
                      })
                    : await userSignup({
                          username: form.username,
                          email: form.email,
                          password: form.password,
                      });
            } else {
                const creds = {
                    identifiers: form.email,
                    password: form.password,
                };
                res = isAdmin
                    ? await adminSignin(creds)
                    : await userSignin(creds);
            }
            const token = res.data?.accessToken || res.data?.token;
            const userRole = res.data?.user?.role || role;
            login(token, userRole);
            navigate(isAdmin ? "/admin/courses" : "/user/courses", {
                replace: true,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function toggleMode() {
        setMode((m) => (m === "signin" ? "signup" : "signin"));
        setError("");
    }

    return (
        <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px]"
                />
            </div>

            <div className="relative w-full max-w-[420px] animate-fade-up">
                {/* Back */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 text-ink-muted text-[13px] hover:text-ink-secondary
                     transition-colors flex items-center gap-1.5"
                >
                    ← Back
                </button>

                {/* Header */}
                <div className="mb-7">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2 font-medium">
                        {isAdmin ? "Instructor Portal" : "Student Portal"}
                    </p>
                    <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight">
                        {mode === "signin" ? "Welcome back" : "Create account"}
                    </h1>
                </div>

                {/* Card */}
                <div className="card">
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Error */}
                        {error && (
                            <div
                                className="mb-4 px-4 py-3 rounded-lg bg-red-950/50 border border-red-900/40
                              text-red-400 text-[13px] animate-fade-in"
                            >
                                {error}
                            </div>
                        )}

                        {/* Signup-only fields */}
                        {mode === "signup" && (
                            <FormField label="Username">
                                <input
                                    className="input-field"
                                    value={form.username}
                                    onChange={update("username")}
                                    placeholder="e.g. raghav123"
                                />
                            </FormField>
                        )}

                        <FormField label="Email">
                            <input
                                className="input-field"
                                type="email"
                                value={form.email}
                                onChange={update("email")}
                                placeholder="you@example.com"
                                required
                            />
                        </FormField>

                        <FormField label="Password">
                            <div className="relative">
                                <input
                                    className="input-field pr-10"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={update("password")}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted
                                             hover:text-ink-secondary transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={15} />
                                    ) : (
                                        <Eye size={15} />
                                    )}
                                </button>
                            </div>
                        </FormField>

                        <button
                            type="submit"
                            className="btn-primary w-full py-3 mt-1 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading && <ButtonSpinner />}
                            {mode === "signin" ? "Sign in" : "Create account"}
                        </button>
                    </form>

                    {/* Toggle mode */}
                    <p className="mt-5 text-center text-[13px] text-ink-muted">
                        {mode === "signin"
                            ? "Don't have an account? "
                            : "Already have one? "}
                        <button
                            onClick={toggleMode}
                            className="text-gold hover:underline transition-all"
                        >
                            {mode === "signin" ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
