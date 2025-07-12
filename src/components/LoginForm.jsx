import { useState } from "react";
import usersData from "../data/user.json";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const user = usersData.find(
            (user) => user.email === email && user.password === password
        )

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/welcome");
        } else {
            setError("Credenciales inválidas, intenta de nuevo.");
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="bg-white shadow-2x1 rounded-2x1 p-8 w-full max-w-md mx-auto animate-fade-in"
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Bienvenido</h2>

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Correo</label>
                <div className="flex items-center border rounded px-3 py-2">
                    <EmailIcon className="text-gray-500 mr-2" />
                    <input
                        type="email"
                        className="w-full outline-none flex"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="correo@example.com"
                        required
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold mb-1">Contraseña</label>
                <div className="flex items-center border rounded px-3 py-2">
                    <LockIcon className="text-gray-500 mr-2" />
                    <input
                        type="password"
                        className="w-full outline-none flex"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-transform duration-200 hover:scale-105"
            >
                Iniciar Sesión
            </button>
        </form>
    );
};

export default LoginForm;
