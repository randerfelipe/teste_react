import React, { useState } from "react";
import { ITarefa } from "../../types/tarefa";
import Botao from "../Botao";
import style from './Formulario.module.scss';
import {v4 as uuidv4} from 'uuid';

interface Props{
    setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}


function Formulario({setTarefas}: Props){
    const [tarefa, setTarefa] = useState("");
    const [tempo, setTempo] = useState("00:00");
    //Função para salvar os dados preenchidos de um formulario
    function salvarTarefa(evento: React.FormEvent<HTMLFormElement>){
        evento.preventDefault();
        setTarefas(tarefasAntigas =>
             [...tarefasAntigas, 
                {tarefa,
                 tempo,
                 selecionado:false, completado: false,id: uuidv4()}])
        
        setTarefa("");
        setTempo("00:00");
    }
    return(
        //a parte de .bind(this) só deve ser usada caso não seja no formato Function
        <form className={style.novaTarefa} onSubmit={salvarTarefa}>
                <div className={style.inputContainer}>
                    <label htmlFor="tarefa">
                        Adicione um novo estudo

                    </label>
                    <input type="text" 
                            name="tarefa"
                            id="tarefa" 
                            //Inserção do campo de texto
                            value={tarefa}
                            onChange={evento => setTarefa(evento.target.value)}
                            placeholder="O que voce quer estudar" 
                            required/>

                </div>

                <div className={style.inputContainer}>
                    <label>
                        Tempo
                    </label>
                   
                    <input type="time"
                            step="1"
                            id="tempo"
                            value={tempo}
                            onChange={evento => setTempo(evento.target.value)}
                            //O onChange faz a alteração do horário a ser fixado no reloginho
                           
                            min="00:00:00"
                            max="01:30:00"
                            required/>
                </div>
                <Botao type='submit'>Inserir</Botao> 
            </form>
    )
    
}




export default Formulario;