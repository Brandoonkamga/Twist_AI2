export const Footer = () => (
  <footer className="mt-16 border-t border-border/60 bg-white py-8">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-subtext md:flex-row md:items-center md:justify-between">
      <p>© {new Date().getFullYear()} AfroConnect — Marketplace confiance parents & coiffeuses.</p>
      <div className="flex flex-wrap gap-4">
        <a href="#" className="hover:text-primary">
          Besoin d’aide ?
        </a>
        <a href="#" className="hover:text-primary">
          Politique de confidentialité
        </a>
        <a href="#" className="hover:text-primary">
          Conditions générales
        </a>
      </div>
    </div>
  </footer>
);
