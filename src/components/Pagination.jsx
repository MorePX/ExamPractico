import { ChevronLeft, ChevronRight } from 'lucide-react';

// Componente de paginación para navegar entre páginas
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Genera los números de página visibles
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2)); // Calcula la página inicial para mostrar
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1); // Calcula la página final para mostrar

    // Ajusta el rango de páginas si se sale de los límites
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Asegura que siempre haya un rango válido de páginas
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 px-3 py-1 rounded-full ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  // Renderiza los botones de paginación
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="mx-1 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="mx-1 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;