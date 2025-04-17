export default function Button({
  onClick,
  text,
  type = "submit",
  className = "btn btn-primary",
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
