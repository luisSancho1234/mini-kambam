import { faAdd, faAngleDown, faArchive, faCircle, faDatabase, faFilter, faGear, faLayerGroup, faSignOut, faSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import foto from './assets/foto.png';
import { getStorage, setStorage } from './services/StorageService';

function App() {
  const [lista, setLista] = useState(getStorage());
  const columns = [{key:"A fazer", value:"todo"}, {key:"Fazendo", value:"doing"}, {key:"Feito", value:"done"}];
  useEffect(() => { setStorage(lista) }, [lista])
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const roles = useRef(["Designer", "Front-end"])

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
          <div id='button' className='flex justify-center items-center bg-gray-400 hover:bg-gray-500 text-lg rounded-2xl w-14 h-14 text-white'>
            <FontAwesomeIcon icon={faLayerGroup}/>
          </div>
        </div>

      </div>
        

      <div id='board' className='pt-6 mx-0 md:mx-5 min-h-0 rounded-t-3xl md:rounded-t-[40px] flex-grow flex gap-5 flex-col bg-[#313131] border border-white'>
        <div id='head' className='mx-8 gap-4 items-center text-2xl flex'>
          <FontAwesomeIcon icon={faArchive}/>
          <div className='rounded-full flex-none w-fit items-center px-3 font-bold bg-[#151515]'>
            Quadro 1
            <FontAwesomeIcon icon={faAngleDown}/>
          </div>
          <div id="spacer" className='flex-grow'></div>
          <div className='flex justify-center gap-4'>
            <input placeholder='Pesquise' className='rounded-lg sm:block hidden bg-[#D9D9D9] text-[16px] pl-2 text-[#151515] p-1'/>
            <FontAwesomeIcon icon={faFilter}/>
          </div>
        </div>
        <div id="line" className='w-full h-[1px] bg-white'></div>
        <div id='columns-box' className='flex ml-5 min-h-0 overflow-x-auto flex-grow gap-4'>{
          columns.map((coluna, indexJ) => (
            <div id='column' onDrop={ (e)=>{ onDrop(indexJ);
              console.log('drop', indexJ, e.nativeEvent.toElement.innerText)}} 
              onDragOver={(e) => e.preventDefault()}
              key={ indexJ } className='bg-[#D9D9D9] rounded-t-lg min-w-44 max-w-80 w-xs flex-grow items-start flex flex-col '> 

              <p className='text-[#4C4C4C] w-full text-start border-[#4C4C4C] py-1 px-2 border-b-[1px]'>{coluna.key}</p>
              
              <div className='flex flex-col flex-grow overflow-y-auto pb-20 gap-1 pt-1 w-full custom-scrollbar'>
                {
                  lista[indexJ].map((item, index) => (
                    <div draggable id='card' key={ index } onDragStart={()  => onDragStart(indexJ, index, item)}
                    className={`flex w-full flex-col shadow-sm gap-1 text-start pt-1 px-1 bg-[#C3C1C1]`} >
                      <div className='flex gap-1 flex-wrap'>
                        <p className='text-xs text-[#4C4C4C]  '>{ item.code ? item.code : 'CB-123' }</p>
                        <p className='text-xs font-semibold text-black  '>{ item.name ? item.name : 'No Name' }</p>
                      </div>
                      <p className='text-xs font-extralight text-black line-clamp-3'>{ item.description ? item.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut ligula in elit efficitur imperdiet viverra at eros. Sed tincidunt enim vel sapien eleifend sagittis. Integer luctus, justo et ' }</p>
                      <div className='flex gap-2 flex-wrap'>
                        {item.prioridade &&
                          <div className='flex items-center justify-start text-xs gap-0.5'>
                            <FontAwesomeIcon icon={faCircle} className={ ` text-[10px]
                              ${ item.prioridade === 'low' ? 'text-blue-500' :
                              item.prioridade === 'normal' ? 'text-green-500' :
                              item.prioridade === 'high' ? 'text-orange-400' : ''}
                            `}/> 
                            <p className=' font-extralight text-[#4C4C4C] line-clamp-3'>{ item.prioridade }</p>
                          </div>
                        }
                        {!item.projeto &&
                          <div className='flex items-center justify-start text-xs gap-0.5'>
                            <FontAwesomeIcon icon={faDatabase} className={ ` text-[10px]
                              ${ item.prioridade === 'low' ? 'text-blue-500' :
                              item.prioridade === 'normal' ? 'text-blue-500' :
                              item.prioridade === 'high' ? 'text-orange-400' : ''}
                            `}/> 
                            <p className=' font-extralight text-[#4C4C4C] line-clamp-3'>{ 'database' }</p>
                          </div>
                        }  
                      </div>
                    </div>
                  ))
                }
                
              </div>
            </div>
          ))}
          <p className='mt-1 pr-4 text-nowrap hover:bg-white/20'>{'Adicionar coluna +'}</p>
        </div>
      </div>
      <div id='toolbar' className='absolute bottom-5 w-full flex justify-center items-center h-10 z-10'>
          <div className=' bg-white/40 backdrop-blur-md flex shadow-md hover:shadow-amber-50/10 w-[70%] p-1.5 gap-1 h-full rounded-2xl'>
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
