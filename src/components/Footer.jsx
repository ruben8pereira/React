export default function Footer({ author, year }) {
  return (
    <footer className="footer">
      <div className="text-center">
        {author} © {year}
      </div>
    </footer>
  );
}
