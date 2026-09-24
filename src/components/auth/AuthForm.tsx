"use client";

import { useState, useActionState } from "react";
import {
  loginWithCredentialsAction,
  registerUserAction,
  loginWithGoogleAction,
} from "@/actions/auth.actions";
import { Eye, EyeOff, Loader2, LogIn, UserPlus, AlertCircle } from "lucide-react";

interface AuthFormProps {
  callbackUrl?: string;
}

export default function AuthForm({ callbackUrl }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [loginState, loginFormAction, isLoginPending] = useActionState(
    loginWithCredentialsAction,
    null
  );

  const [registerState, registerFormAction, isRegisterPending] = useActionState(
    registerUserAction,
    null
  );

  return (
    <div className="space-y-5">
      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-2xl border border-zinc-200">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            mode === "login"
              ? "bg-white text-black shadow-xs font-extrabold"
              : "text-zinc-500 hover:text-black"
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Masuk</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            mode === "register"
              ? "bg-white text-black shadow-xs font-extrabold"
              : "text-zinc-500 hover:text-black"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Daftar Warga</span>
        </button>
      </div>

      {/* LOGIN TAB */}
      {mode === "login" && (
        <div className="space-y-4 text-left">
          {loginState?.error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="leading-snug font-medium">{loginState.error}</p>
            </div>
          )}

          <form action={loginFormAction} className="space-y-3.5">
            <input type="hidden" name="callbackUrl" value={callbackUrl || ""} />

            <div>
              <label
                htmlFor="identifier"
                className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 mb-1.5"
              >
                Username / Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                autoComplete="username email"
                placeholder="Masukkan username atau email Anda..."
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-hidden focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-black placeholder:text-zinc-400 font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-[11px] font-black uppercase tracking-wider text-zinc-700"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-hidden focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-black placeholder:text-zinc-400 font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoginPending}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoginPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk ke Akun</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-zinc-400">
              <span className="bg-white px-3">atau</span>
            </div>
          </div>

          {/* Google Sign-in */}
          <form
            action={async () => {
              await loginWithGoogleAction(callbackUrl || "/dashboard");
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-black text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Lanjutkan dengan Google</span>
            </button>
          </form>
        </div>
      )}

      {/* REGISTER TAB */}
      {mode === "register" && (
        <div className="space-y-4 text-left">
          {registerState?.error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="leading-snug font-medium">{registerState.error}</p>
            </div>
          )}

          <form action={registerFormAction} className="space-y-3.5">
            <input type="hidden" name="callbackUrl" value={callbackUrl || ""} />

            <div>
              <label
                htmlFor="register-name"
                className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 mb-1.5"
              >
                Nama Lengkap
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Nama asli atau nama pena Anda"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-hidden focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-black placeholder:text-zinc-400 font-medium"
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="nama@email.com"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-hidden focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-black placeholder:text-zinc-400 font-medium"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-[11px] font-black uppercase tracking-wider text-zinc-700 mb-1.5"
              >
                Buat Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Minimal 6 karakter..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-hidden focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-black placeholder:text-zinc-400 font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 font-medium">
                Gunakan kombinasi huruf dan angka agar akun Anda tetap aman.
              </p>
            </div>

            <button
              type="submit"
              disabled={isRegisterPending}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isRegisterPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-red-200" />
                  <span>Mendaftarkan...</span>
                </>
              ) : (
                <span>Daftar sebagai Warga Belokan</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-zinc-400">
              <span className="bg-white px-3">atau</span>
            </div>
          </div>

          {/* Google Sign-in */}
          <form
            action={async () => {
              await loginWithGoogleAction(callbackUrl || "/dashboard");
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-black text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Daftar dengan Google</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
