function Auth({ children, className, list, rounded }) {
  return (
    <div>
      <>
        {list.map((item) => {
          return (
            <div className="flex flex-col" key={item.id}>
              <p className=""> {item?.name}</p>
              <input
                className={`bg-amber-50  text-black p-2 m-3 rounded-${rounded} ${className}`}
                type={item.type}
                name={item.name}
              />
              <label htmlFor={item.name} className="text-black">
                {item.label}
              </label>
            </div>
          );
        })}
      </>
      {children}
    </div>
  );
}

export default Auth;
