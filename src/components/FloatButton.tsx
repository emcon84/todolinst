
import React from "react";
import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import './styles.css';
import { FloatButtonProps } from "../types/floatbutton";

export const FloatButton: React.FC<FloatButtonProps> = ({ setOpenModal, openModal }) => {
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <div className="floating" onClick={handleOpenModal}>
            <Fab size="medium" color="primary" aria-label="add">
                <Add />
            </Fab>
        </div>
    );
};
