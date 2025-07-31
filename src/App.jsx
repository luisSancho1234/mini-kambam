import { useEffect, useState, useRef } from 'react';
import './App.css';
import InputComponent from './components/InputComponent';
import { getStorage, setStorage } from './services/StorageService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

function App() {
  const [lista, setLista] = useState(getStorage());
  const columns = [{key:"A fazer", value:"todo"}, {key:"Fazendo", value:"doing"}, {key:"Feito", value:"done"}];
  useEffect(() => { setStorage(lista) }, [lista])
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const dragData = useRef(null);

  const onDrop = (indexJfinal) => {
    const lista$ = [...lista];
    const novaTarefa = {name: dragData.current[2].name, description: dragData.current[2].description,  prioridade: dragData.current[2].prioridade}
    lista$[dragData.current[0]] = lista[dragData.current[0]].filter((_, i) => i !== dragData.current[1])
    lista$[indexJfinal] = [...lista$[indexJfinal], novaTarefa]
    setLista(lista$)
    
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const novaTarefa = {name, description,  prioridade: 'normal'}
    const lista$ = [...lista];
    lista$[0] = [...lista$[0], novaTarefa]
    setLista(() => lista$)
    setName('')
    setDescription('')
  };
  const excluir = (index, indexJ) => {
    const lista$ = [...lista];
    lista$[indexJ] = lista[indexJ].filter((_, i) => i !== index)
    setLista(lista$)
  }
  const setPrioridade = (event, index, indexJ) =>{
    const lista$ = [...lista];
    lista$[indexJ][index].prioridade = event.target.value;
    setLista(lista$);
  } 
  const onDragStart =  (index, indexJ, item) => {
    dragData.current =[index, indexJ, item];
  }


  return (
    <div className='w-100vw h-100vh flex flex-col pt-14'>
      <form className='flex flex-col gap-4 p-4 border rounded-lg shadow-xl 
        hover:shadow-2xl transition-shadow duration-300 ease-in-out'
        onSubmit={onSubmit}
      >
        <h1 className='py-9'>Lista de Tarefas</h1>
        <InputComponent
          id="name"
          label="Nome"
          placeholder="Ex: Comprar pão"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputComponent
          id="description"
          label="Descrição"
          placeholder="Ex: Pão francês, 10 unidades"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type='submit'>{'Adicionar+'}</button>
      </form>
   
      <div className='flex gap-4'>
      { columns.map((coluna, indexJ) => (
        <div onDrop={(e)=>{
          onDrop(indexJ)
          console.log('drop', indexJ, e.nativeEvent.toElement.innerText)}} onDragOver={(e) => e.preventDefault()}
          key={ indexJ } className='mt-4 rounded-lg w-2xs h-fit border boder flex flex-col gap-4 p-4'>
          <h2> { coluna.key } </h2>
          {
          lista[indexJ].map((item, index) => (
            <div draggable id='card' key={ index } onDragStart={() => onDragStart(indexJ, index, item)}
            className='flex w-full flex-col gap-2 text-start px-3 py-2 border bg-gray-500 rounded-md shadow-md'>
              <div className='flex justify-between items-center'>
                <h2>{ item.name ? item.name : 'No Name' }</h2>
                <div className='bg-gray-300 rounded-sm border border-red-950 hover:border-red-800 flex justify-center items-center h-[22px] w-[22px] shadow-2xs text-red-950 hover:text-red-800'>
                  <FontAwesomeIcon icon={faTrashAlt} onClick={() => excluir(index, indexJ)} title='Excluir' />
                </div>
              </div>
              <p>{ item.description ? item.description : '-------' }</p>
              <div className='flex flex-col gap-0'>
                <p className='text-sm ml-1'>Prioridade</p>
                <select id='status'
                  value={ item.prioridade }
                  onChange={(e)=>(setPrioridade(e,index,indexJ))}
                  className={ `p-1 border rounded-lg
                    ${ item.prioridade === 'low' ? 'bg-blue-500' :
                    item.prioridade === 'normal' ? 'bg-green-500' :
                    item.prioridade === 'high' ? 'bg-orange-400' : ''}
                    ` 
                    }>
                  <option value='low'>Baixa</option>
                  <option value='normal'>Normal</option>
                  <option value='high'>Alta</option>
                </select>
              </div>
              
              

            </div>
          ))
        } </div>
        ))
      } </div>
     </div>
  )
}

export default App
