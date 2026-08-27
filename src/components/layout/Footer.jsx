const Footer = () => {
  return (
    <footer className="bg-nyg-blue text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4 text-nyg-gold">
              Club Natación y Gimnasia
            </h3>
            <p className="text-gray-300 text-sm">
              Más de 100 años formando personas a través del deporte. Valores,
              familia y pasión.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-nyg-white">Ubicación</h3>
            <p className="text-gray-300 text-sm">Av. Benjamín Aráoz 700</p>
            <p className="text-gray-300 text-sm">San Miguel de Tucumán</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-nyg-white">Contacto</h3>
            <p className="text-gray-300 text-sm">Email: info@clubnyg.com.ar</p>
            <p className="text-gray-300 text-sm">Teléfono: (0381) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Club Natación y Gimnasia. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;