const Footer = () => {
  return (
    <footer className="bg-primary text-muted py-8 mt-0 border-t border-secondary">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
        <h3 className="text-light font-heading text-lg tracking-wider">CONNECT US ON</h3>
        <div className="flex space-x-4 font-bold">
          <a href="#" className="hover:text-highlight transition-colors px-2">
            Facebook
          </a>
          <a href="#" className="hover:text-highlight transition-colors px-2">
            Instagram
          </a>
        </div>
        <div className="text-xs pt-6 border-t border-secondary w-full max-w-3xl px-4 mt-6 leading-relaxed">
          <p>© 2026 IMAGINE MARKETING LIMITED.</p>
          <p>ALL RIGHTS RESERVED.</p>
          <p className="mt-2 text-[10px] uppercase text-gray-500">
            For queries contact us: Manager, Imagine Marketing Limited Unit No. 204 & 205, <br/>
            2nd Floor, D-Wing & E-Wing, Corporate Avenue, Andheri Ghatkopar Link Road, <br/>
            Mumbai, Maharashtra-400093, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
