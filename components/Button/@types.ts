import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: boolean;
    variant?: "contained" | "outlined" | "icon"
}