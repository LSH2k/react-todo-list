import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import { Botao, BotaoSalvar } from '../../styles'

import { remover, editar, alterarStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'

import * as enums from '../../utils/enums/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(e: ChangeEvent<HTMLInputElement>) {
    dispatch(alterarStatus({ id, finalizado: e.target.checked }))
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
          id={titulo}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag $parametro="prioridade" $prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag $parametro="status" $status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        id="descricao"
        onChange={(e) => setDescricao(e.target.value)}
      ></S.Descricao>
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
