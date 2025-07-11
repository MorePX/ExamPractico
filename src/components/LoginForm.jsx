import { useState } from "react";
import usersData from "../data/user.json";
import { useNavigate } from "react-router-dom";

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
            navigate("/dashboard");
        } else {
            setError("Credenciales inválidas, intenta de nuevo.");
        }
    };

    return (
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded -p8 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold">Correo</label>
                <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block mb-1 text-sm font-semibold">Contraseña</label>
                <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">Iniciar</button>
        </form>
    );
};

export default LoginForm;
