import UserForm from '../components/UserForm';

const CreateUserPage = () => {
  return (
    <div className="p-6 mt-20 bg-gradient-to-br from-indigo-100 to-blue-200 min-h-screen">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Registrar Nuevo Usuario</h1>
        <UserForm />
      </div>
    </div>
  );
};

export default CreateUserPage;
