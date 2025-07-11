import UserList from "../components/UserList";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2x1 font-bold">Bienvenido, {user.name}</h1>
                <button
                    onClick = {logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Cerrar Sesión
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
            <UserList />
        </div>
    );
};

export default Dashboard;
