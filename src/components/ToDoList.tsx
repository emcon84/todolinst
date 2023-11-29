

import { MyCategories, MyData, ToDoListProps } from '../types/api';
import useApi from '../hook/useApi';
import { API_URL_CAT } from '../constApi';
import { Card, CardContent, Checkbox, Stack } from '@mui/material';


export const ToDoList: React.FC<ToDoListProps> = ({ dataToDo, trigger, setTrigger }) => {

    const cardStyle = {
        marginTop: 10,
        marginBottom: 10,
    }

    const title = {
        fontSize: 16,
        padding: 0,
        margin: 0,
    }

    const description = {
        fontSize: 14,
        padding: 0,
        margin: 0,
    }

    const { data, isLoading, error } = useApi<MyCategories[]>({ url: API_URL_CAT });

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const handleCheckboxChange = async (id: string) => {
        const todoIndex = dataToDo ? dataToDo.findIndex((item) => item.id === id) : -1;
        if (todoIndex !== -1 && dataToDo) {

            const updatedCompleted = !dataToDo[todoIndex].completed;

            try {
                await fetch(`http://localhost:3000/tasks/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: id,
                        title: dataToDo[todoIndex].title,
                        description: dataToDo[todoIndex].description,
                        category_id: dataToDo[todoIndex].category_id,
                        completed: updatedCompleted,
                    }),
                });

                setTrigger(!trigger);
            } catch (error) {
                console.error('Error al actualizar el estado en el servidor:', error);
            }
        }
    };

    const pendingData = dataToDo ? dataToDo.filter((item) => !item.completed) : [];
    const completedData = dataToDo ? dataToDo.filter((item) => item.completed) : [];

    return (
        <div>
            <h4>Pendientes</h4>
            {pendingData && pendingData.map((item: MyData) => {

                return (
                    <div key={item.id}>
                        {data?.map((cat: MyCategories) => {
                            if (cat.id === item.category_id) {
                                return (
                                    <Card style={{ ...cardStyle, backgroundColor: `${cat.color}` }} key={cat.id}>
                                        <CardContent>
                                            <Stack
                                                direction="row"
                                                justifyContent="start"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <div>
                                                    <Checkbox
                                                        checked={item.completed}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </div>
                                                <div>
                                                    <p style={title} >{cat.name}: {item.title}</p>
                                                    <p style={description}>{item.description}</p>
                                                </div>
                                            </Stack>

                                        </CardContent>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                )
            })}
            <h4>Finalizados</h4>
            {completedData.map((item) => (
                <div key={item.id}>
                    {data?.map((cat: MyCategories) => {
                        if (cat.id === item.category_id) {
                            return (
                                <Card style={{ ...cardStyle, backgroundColor: `${cat.color}` }} key={cat.id}>
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            justifyContent="start"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <div>
                                                <Checkbox
                                                    checked={item.completed}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </div>
                                            <div>
                                                <p style={title} >{cat.name}: {item.title}</p>
                                                <p style={description}>{item.description}</p>
                                            </div>
                                        </Stack>

                                    </CardContent>
                                </Card>
                            )
                        }
                    })}
                </div>
            ))}
        </div>
    );
};
