export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-2 sm:py-4">
      <div className="sm:flex sm:justify-between text-center sm:px-10">
        <p>&copy; 2024 Matoppslaget</p>
        <p>
          <a
            href="mailto:hallo@matoppslaget.no"
            className="text-blue-400 hover:underline"
          >
            Kontakt oss
          </a>
        </p>
      </div>
    </footer>
  );
}
