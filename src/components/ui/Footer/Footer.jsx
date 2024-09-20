const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-500 text-white p-6 mt-8 rounded-lg shadow-lg">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-lg font-semibold mb-4">
          Want to stay updated? Sign up for free!
        </p>
        <button
          type="button"
          className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 transition-all"
        >
          Sign up!
        </button>
      </div>
      <div className="border-t border-gray-400 mt-6 pt-4 w-full text-center">
        <p className="text-sm">
          © 2024 Copyright:{" "}
          <a
            href="https://github.com/Propalik/React-work"
            className="text-indigo-300 hover:underline"
          >
            Petrov
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
