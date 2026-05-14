"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email atau password salah");
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #1B4D3E 0%, #2D7A5F 100%)"
    }}>
      <div style={{ 
        background: "white", 
        borderRadius: 16, 
        padding: 40, 
        width: 400, 
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ color: "#1B4D3E", marginBottom: 8 }}>KSP Mulia Dana</h1>
          <p style={{ color: "#6b7280", fontSize: 14 }}>Masuk ke sistem KSP</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: "100%", 
                padding: "12px 16px", 
                borderRadius: 8, 
                border: "1px solid #ddd",
                fontSize: 14
              }}
              placeholder="admin@kspmulia.com"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                width: "100%", 
                padding: "12px 16px", 
                borderRadius: 8, 
                border: "1px solid #ddd",
                fontSize: 14
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div style={{ 
              background: "#fef2f2", 
              color: "#dc2626", 
              padding: "12px 16px", 
              borderRadius: 8, 
              marginBottom: 20,
              fontSize: 14
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              background: "#1B4D3E", 
              color: "white", 
              border: "none", 
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 12, color: "#9ca3af" }}>
          <p>Akun demo: admin@kspmulia.com / password: admin123</p>
        </div>
      </div>
    </div>
  );
}