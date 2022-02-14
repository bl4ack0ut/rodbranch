import React from "react";

export const Container: React.FunctionComponent<{ transparent?: boolean }> = ({
  children,
  transparent = true,
}) => {
  return (
    <div
      className="w-full h-full relative flex p-1 md:p-5 flex justify-center overflow-hidden"
      style={{
        borderWidth: "30px",
        background: `rgba(237, 227, 209, ${transparent ? 0.8 : 1.0})`,
      }}>
      <div
        className="absolute"
        style={{
          width: "120%",
          height: "120%",
          top: "-20px",
          left: "-20px",
          opacity: transparent ? "8%" : "4%",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 268px",
        }}
      />
      <div className="w-full h-full z-index:5 relative">{children}</div>
    </div>
  );
};
