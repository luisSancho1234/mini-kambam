import { faAdd, faAngleDown, faArchive, faFilter, faGear, faLayerGroup, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import foto from './assets/foto.png';
import { getStorage, setStorage } from './services/StorageService';
import TicketInfo from './components/TicketComponent';
import TicketComponent from './components/TicketComponent';

function App() {
  const [lista, setLista] = useState(getStorage() as TicketInfo);
  const columns = [{key:"A fazer", value:"todo"}, {key:"Fazendo", value:"doing"}, {key:"Feito", value:"done"}];
  useEffect(() => { setStorage(lista) }, [lista])
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const roles = useRef(["Designer", "Front-end"])

  const dragData = useRef(null);

  const onDrop = (indexColDestino: number) => {
    const lista$ = [...lista];
    const novaTarefa = {name: dragData.current[2].name, description: dragData.current[2].description,  prioridade: dragData.current[2].prioridade}
    lista$[dragData.current[0]] = lista[dragData.current[0]].filter((_, i) => i !== dragData.current[1])
    lista$[indexColDestino] = [novaTarefa, ...lista$[indexColDestino]]
    setLista(lista$)
    if(indexColDestino==lista$.length-1){
      const last = lista$[indexColDestino].length-2;
      console.log(last);
      console.table(lista$);
      setTimeout(()=>{
        excluir(last, lista$[indexColDestino]);
      }, 200)
    }
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
    dragData.current = [index, indexJ, item];
  }


  return (
    <div id="screen" className='relative w-screen h-screen flex flex-col'>
      <div id="nav" className='md:mx-20 mx-5 h-fit flex justify-between md:justify-center w-100vw items-center gap-5 my-10'>
        <div className='flex-none w-14 h-14 md:w-20 md:h-20 bg-white overflow-hidden rounded-2xl'>
          <img src={foto} className='w-14 h-14 md:w-20 md:h-20'/>
        </div>
        <div className='flex flex-col items-center md:items-start'>
          <div className='flex items-baseline gap-2'>
            <p className='text-2xl font-bold'>Luis Fernando</p>
            <FontAwesomeIcon icon={faSignOut} className='text-red-600'/>
          </div>
          <p className='text-nowrap'>MMS - SOLUÇÕES E CONSULTORIA</p>
          <div className='flex gap-2'>
            {roles.current.map((item, i)=>(<p key={i}>{item}{i >= roles.current.length -1 ? '' : ','}</p>))}
          </div>

        </div>
        <div id='spacer' className='w-0 flex-none md:flex-grow md:block hidden'/>
        
        <div id='button' className='flex-none'>
          <div id='button' className='flex justify-center items-center bg-gray-400 hover:bg-gray-500 text-lg md:text-2xl rounded-2xl md:rounded-3xl w-14 h-14 md:w-20 md:h-20 text-white'>
            <FontAwesomeIcon icon={faLayerGroup}/>
          </div>
        </div>

      </div>

      <div id='board' className='pt-6 mx-0 md:mx-10 min-h-0 rounded-none md:rounded-t-[40px] flex-grow flex gap-5 flex-col bg-[#313131] border-t-1 border-x-1 border-white'>
       
        <div id='head' className='mx-8 gap-4 items-center text-2xl flex'>
          <FontAwesomeIcon icon={faArchive}/>
          <div className='rounded-full flex-none w-fit items-center px-3 font-bold bg-[#151515]'>
            Quadro 1
            <FontAwesomeIcon icon={faAngleDown}/>
          </div>
          <div id="spacer" className='flex-grow'></div>
          <div className='flex justify-center items-center gap-4'>
            <input placeholder='Pesquise' className='rounded-lg sm:block hidden bg-[#D9D9D9] text-[16px] pl-2 text-[#151515] p-1'/>
            <FontAwesomeIcon icon={faFilter}/>
          </div>
        </div>

        <div id="line" className='w-full h-[1px] bg-white'></div>

        {/* mapeamento das colunas */}
        <div id='columns-box' className='flex ml-5 min-h-0 overflow-x-auto flex-grow gap-4'>{
          columns.map((coluna, indexCol) => (
            <div id='column' onDrop={ (e)=>{ onDrop(indexCol, e);
              console.log('drop', indexCol, e.nativeEvent.toElement.innerText)}} 
              onDragOver={(e) => e.preventDefault()}
              key={ indexCol } className='bg-[#f3f3f3] rounded-t-lg min-w-44 max-w-80 w-xs flex-grow items-start flex flex-col '> 

              <p className='text-[#4C4C4C] w-full text-start border-[#4C4C4C] py-1 px-2 border-b-[1px]'>{coluna.key}</p>
              {/* mapeamento dos itens das colunas */}
              <div className='flex flex-col flex-grow overflow-y-auto pb-20 gap-1 pt-1 w-full custom-scrollbar'>
                {
                  lista[indexCol].map((item, indexRow) => (
                    <TicketComponent
                      ticketInfo={ ...item }
                      draggable
                      onDragStart={() => onDragStart(indexCol, indexRow, item)}
                      key={ indexRow }  
                    >
                    </TicketComponent>
                  ))
                }
                
              </div>
            </div>
          ))}
          <p className='mt-1 pr-4 text-nowrap hover:bg-white/20'>{'Adicionar coluna +'}</p>
        </div>
      </div>

      <div id='toolbar' className='absolute bottom-5 w-full flex justify-center items-center h-10 z-10'>
          <div className=' bg-white/60 backdrop-blur-md flex shadow-md hover:shadow-amber-50/10 w-[70%] p-1.5 gap-1 h-full rounded-2xl'>
            <div className=' bg-white/30 flex justify-start items-center shadow-md hover:bg-white/50 hover:bg-gradient-to-b w-full px-2 h-full rounded-[10px]'>
              <input value={name} onChange={(e)=>setName(e.target.value)} className='text-sm text-[#4C4C4C] focus:outline-none focus:ring-0 focus:border-transparent w-full' placeholder='Digite o nome da nova tarefa'/>
            </div>
            <div className=' bg-white/30 flex justify-center shadow-md hover:bg-white/50 hover:bg-gradient-to-b w-7 items-center px-2 h-full flex-none rounded-[10px]'>
                <FontAwesomeIcon icon={faAdd} onClick={onSubmit} title='Excluir' />
            </div>
            <div className=' bg-white/30 flex justify-center shadow-md hover:bg-white/50 hover:bg-gradient-to-b w-7 items-center px-2 h-full flex-none rounded-[10px]'>
                <FontAwesomeIcon icon={faGear} onClick={() => console.log('em desenvolvimento')} title='Excluir' />
            </div>
          </div>
      </div>
    </div>
  )
}

    // <div className='w-100vw h-100vh flex flex-col pt-14'>
    //   <form className='flex flex-col gap-4 p-4 border rounded-lg shadow-xl 
    //     hover:shadow-2xl transition-shadow duration-300 ease-in-out'
    //     onSubmit={onSubmit}
    //   >
    //     <h1 className='py-9'>Lista de Tarefas</h1>
    //     <InputComponent
    //       id="name"
    //       label="Nome"
    //       placeholder="Ex: Comprar pão"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <InputComponent
    //       id="description"
    //       label="Descrição"
    //       placeholder="Ex: Pão francês, 10 unidades"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //     />
    //     <button type='submit'>{'Adicionar+'}</button>
    //   </form>
   
    //   <div className='flex gap-4'>
    //   { columns.map((coluna, indexJ) => (
    //     <div onDrop={(e)=>{
    //       onDrop(indexJ)
    //       console.log('drop', indexJ, e.nativeEvent.toElement.innerText)}} onDragOver={(e) => e.preventDefault()}
    //       key={ indexJ } className='mt-4 rounded-lg w-2xs h-fit border boder flex flex-col gap-4 p-4'>
    //       <h2> { coluna.key } </h2>
    //       {
    //       lista[indexJ].map((item, index) => (
    //         <div draggable id='card' key={ index } onDragStart={() => onDragStart(indexJ, index, item)}
    //         className='flex w-full flex-col gap-2 text-start px-3 py-2 border bg-gray-500 rounded-md shadow-md'>
    //           <div className='flex justify-between items-center'>
    //             <h2>{ item.name ? item.name : 'No Name' }</h2>
    //             <div className='bg-gray-300 rounded-sm border border-red-950 hover:border-red-800 flex justify-center items-center h-[22px] w-[22px] shadow-2xs text-red-950 hover:text-red-800'>
    //               <FontAwesomeIcon icon={faTrashAlt} onClick={() => excluir(index, indexJ)} title='Excluir' />
    //             </div>
    //           </div>
    //           <p>{ item.description ? item.description : '-------' }</p>
    //           <div className='flex flex-col gap-0'>
    //             <p className='text-sm ml-1'>Prioridade</p>
    //             <select id='status'
    //               value={ item.prioridade }
    //               onChange={(e)=>(setPrioridade(e,index,indexJ))}
    //               className={ `p-1 border rounded-lg
    //                 ${ item.prioridade === 'low' ? 'bg-blue-500' :
    //                 item.prioridade === 'normal' ? 'bg-green-500' :
    //                 item.prioridade === 'high' ? 'bg-orange-400' : ''}
    //                 ` 
    //                 }>
    //               <option value='low'>Baixa</option>
    //               <option value='normal'>Normal</option>
    //               <option value='high'>Alta</option>
    //             </select>
    //           </div>
              
              

    //         </div>
    //       ))
    //     } </div>
    //     ))
    //   } </div>
    //  </div>
  

export default App
