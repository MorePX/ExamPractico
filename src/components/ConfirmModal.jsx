import React from "react";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirmar" }) => {
    // Renderizar el modal solo si isOpen es true
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
