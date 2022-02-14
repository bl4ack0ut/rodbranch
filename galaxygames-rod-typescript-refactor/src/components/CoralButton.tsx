import React from "react";

type ICoralButtonProps = {
  width: number;
  height: number;
  fontSize?: number;
  title: string;
  onClick: (ev?: MouseEvent) => void;
  loading?: boolean;
  disabled?: boolean;
};
export const CoralButton = ({
  width,
  height,
  fontSize,
  title,
  onClick,
  loading,
  disabled,
}: ICoralButtonProps) => {
  if (!title) return null;
  return (
    <button
      className={`${!loading && !disabled && "cursor-pointer btn-secondary"} ${
        disabled && "cursor-not-allowed btn-secondary"
      }`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={() => {
        if (loading) return;
        onClick();
      }}>
      {!loading ? (
        <span style={{ fontSize: fontSize || `${(height / 3) * 2}px` }}>{title}</span>
      ) : (
        <span style={{ fontSize: fontSize || `${(height / 3) * 2}px` }}>...</span>
      )}
    </button>
  );
};
