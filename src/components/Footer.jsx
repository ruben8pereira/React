export default function Footer({ author, year }) {
  return (
    <footer className="footer py-3 bg-light mt-5">
      <div className="container">
        <div className="row">
            <p className="mb-0">
              &copy; {year} {author}. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}