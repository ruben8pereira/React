export default function Button({
  onClick,
  text,
  type = "submit",
  className = "btn",
  disabled = false,
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}