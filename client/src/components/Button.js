const Button = props => {
  const { name, onClick, children, isDisabled } = props;

  return (
    <>
      {isDisabled ? (
        <button name={name} disabled>
          {children}
        </button>
      ) : (
        <button className="Button" name={name} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
