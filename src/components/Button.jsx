export default function Button({ onClick, text, type = "submit", className }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
    </button>
  );
}
