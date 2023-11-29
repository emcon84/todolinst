import { Autocomplete, Button, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { API_URL_CAT, API_URL_POST_TODO } from "../constApi";
import useApi from "../hook/useApi";
import { MyCategories } from "../types/api";
import { ModalProps } from "../types/modal";

import { v4 as uuidv4 } from 'uuid';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

export const ModalNewToDo: React.FC<ModalProps> = ({ openModal, setOpenModal, setTrigger, trigger }) => {
    const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useApi<MyCategories[]>({ url: API_URL_CAT });
    const { postData: postTodo } = useApi<any>({ url: API_URL_POST_TODO });
    const [_, setAddToDo] = useState<Array<{ id: string, title: string; description: string; category_id: string, completed: boolean }>>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [value, setValue] = React.useState<MyCategories | null>(null);

    const defaultProps = {
        options: categoriesData || [],
        getOptionLabel: (option: MyCategories) => option.name,
    };


    const handleClose = () => {
        setOpenModal(!openModal);
    };

    const handleSaveToDo = async () => {

        const uniqueId = uuidv4();

        const newToDo = {
            id: uniqueId,
            title,
            description,
            category_id: value?.id || "",
            completed: false,
        };

        // Agregar la nueva tarea al estado
        setAddToDo((prevToDo) => [...prevToDo, newToDo]);

        await postTodo(newToDo);

        // Cerrar el modal
        handleClose();
        setTrigger(!trigger);

    };

    if (categoriesLoading) {
        return <p>Cargando categorías...</p>;
    }

    if (categoriesError) {
        return <p>Error al cargar categorías: {categoriesError.message}</p>;
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3>Nueva tarea</h3>
                    <TextField
                        label="Título"
                        value={title}
                        variant="standard"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField
                        label="Descripción"
                        value={description}
                        variant="standard"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Autocomplete
                        {...defaultProps}
                        style={{ marginTop: 15 }}
                        id="category-autocomplete"
                        value={value}
                        onChange={(_, newValue) => setValue(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Categoría" variant="standard" />
                        )}
                    />

                    <Grid container spacing={2} marginTop={3}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Button variant="outlined" onClick={handleClose}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" onClick={handleSaveToDo}>Guardar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};
