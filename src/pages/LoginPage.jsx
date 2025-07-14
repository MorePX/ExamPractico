import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    // Rederisa el componente de la página de inicio de sesión
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px4">
            <div className="w-full max-w-6xl bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 mb-6 md-mb-0 md:pr-10">
                    <img
                        src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg"
                        alt="login illustration"
                        className="w-full rounded-lg"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
