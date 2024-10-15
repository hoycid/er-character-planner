const Button = props => {
  const { name, handleOnClick, children, isDisabled } = props;

  return (
    <>
      {isDisabled ? (
        <button name={name} disabled>
          {children}
        </button>
      ) : (
        <button name={name} onClick={handleOnClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
