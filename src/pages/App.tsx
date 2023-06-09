import React, { useState } from 'react';
import Cronometro from '../components/Cronometro';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import { ITarefa } from '../types/tarefa';
import style from './App.module.scss';

//codigo main


function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();
  
//laço de condição para verificar se a tarefa está selecionada

  function selecionaTarefas(tarefaSelecionada: ITarefa){
    setSelecionado(tarefaSelecionada);
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false
    })));
  }

  function finalizarTarefa(){
    if(selecionado){
      setSelecionado(undefined);
      setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa =>{
        if(tarefa.id === selecionado.id) {
          return{
            ...tarefa,
            selecionado: false,
            completado: true
          }
        } 
        return tarefa;
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={setTarefas} />
      <Lista 
      tarefas={tarefas}
      selecionaTarefa={selecionaTarefas} />
      <Cronometro 
      selecionado={selecionado}
      finalizarTarefa={finalizarTarefa}/>
    </div>
  );
}

export default App;