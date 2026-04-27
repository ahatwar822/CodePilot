import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", form);
      setUser(res.data.data.user);
      navigate("/editor");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg hover:border-blue-900 hover:border-s">
        <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 border-b border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400 placeholder:italic"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-800 border-b border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400 placeholder:italic"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors p-3 rounded text-white font-medium cursor-pointer"
        >
          LOG IN
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Forgot Password? <Link to="/forgot-password" className="text-indigo-400">Click Here</Link>
        </p>

        <p className="mt-2 text-center text-gray-400 text-sm">
          No account? <Link to="/register" className="text-indigo-400 font-medium">Create One</Link>
        </p>
      </div>
    </div>
  )
}

export default Login