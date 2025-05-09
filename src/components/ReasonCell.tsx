import { Popover, Typography } from "@mui/material";
import React, { useState } from "react";

type ReasonCellProps = {
  text: string;
};

export default function ReasonCell({ text }: Readonly<ReasonCellProps>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="text-slate-700 font-medium py-2 text-xs max-w-[180px] truncate cursor-pointer bg-transparent border-none p-0 m-0 text-left"
    >
      {text}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus
        slotProps={{
          paper: {
            sx: {
              p: 1.5,
              maxWidth: 300,
              bgcolor: "#f9fafb",
              boxShadow: 2,
              borderRadius: 2,
            },
          },
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {text}
        </Typography>
      </Popover>
    </button>
  );
}
