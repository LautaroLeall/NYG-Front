const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-nyg-blue mb-4">
        Bienvenido al{" "}
        <span className="text-nyg-red">Club Natación y Gimnasia</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl">
        (Acá irá el Hero interactivo 3D que desarrollaremos en la Épica 2)
      </p>
    </div>
  );
};

export default Home;
