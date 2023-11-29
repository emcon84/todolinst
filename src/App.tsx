import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { FloatButton, ModalNewToDo, ToDoList } from './components';
import useApi from './hook/useApi';
import { MyData } from './types/api';
import { API_URL_TASK } from './constApi';


const theme = createTheme();

function App() {

  //satates
  const [openModal, setOpenModal] = useState(false)
  const [trigger, setTrigger] = useState(false)
  //Fetching
  const { data, isLoading, error } = useApi<MyData[]>({ url: API_URL_TASK, trigger });


  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <h2>Lista de tareas</h2>
          <ToDoList
            dataToDo={data}
            trigger={trigger}
            setTrigger={setTrigger}
          />
          <FloatButton
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
          <ModalNewToDo
            openModal={openModal}
            setOpenModal={setOpenModal}
            setTrigger={setTrigger}
            trigger={trigger}
          />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
