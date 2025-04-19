export default function Footer({ author, year }) {
  return (
    <footer className="footer py-3 mt-5">
      <div className="container">
        <div className="footer-bottom">
          <p className="text-sm">
            &copy; {year} {author}. All rights reserved.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="social-link">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}