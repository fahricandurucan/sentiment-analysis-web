export default function Footer() {
    return (
      <footer className="bg-transparent backdrop-blur-sm bg-white-200 text-black py-6 px-6 text-center ">
        <div className="container mx-auto">
          <p className="text-sm mb-2">© 2025 GlobaLens. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition">Twitter</a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400 transition">LinkedIn</a>
            <a href="mailto:contact@climateinsights.com" className="hover:text-blue-400 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    );
  }