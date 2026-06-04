import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Switch, Alert } from 'react-native';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('Home');

  const [novoAviso, setNovoAviso] = useState('');
  const [listaAvisos, setListaAvisos] = useState([
    'Não se esqueça de revisar a matéria de hoje!',
  ]);

  const [novaMateria, setNovaMateria] = useState('');
  const [novoDia, setNovoDia] = useState('');
  const [novoHorario, setNovoHorario] = useState('');
  const [gradeHoraria, setGradeHoraria] = useState([
    { id: 1, dia: 'Segunda-feira', nome: 'Códigos de Alta Performance', horario: '18:30 às 21:00' },
    { id: 2, dia: 'Terça-feira', nome: 'Redes de Computadores', horario: '18:30 às 22:00' },
    { id: 3, dia: 'Quarta-feira', nome: 'Sistemas Operacionais', horario: '18:30 às 21:00' },
    { id: 4, dia: 'Quinta-feira', nome: 'Database Application', horario: '18:30 às 21:00' },
    { id: 5, dia: 'Sexta-feira', nome: 'Mobile Coding', horario: '18:30 às 21:00' },
  ]);

  const [tempoPomodoro, setTempoPomodoro] = useState(25 * 60);
  const [timerAtivo, setTimerAtivo] = useState(false);

  const [novaTarefa, setNovaTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState([
    { id: 1, titulo: 'Entregar projeto de Mobile Coding', concluida: false },
    { id: 2, titulo: 'Estudar para prova de Redes', concluida: true },
  ]);

  const [nomeUsuario, setNomeUsuario] = useState('Estudante Silva');
  const [raUsuario, setRaUsuario] = useState('20261104-01');
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  useEffect(() => {
    let intervalo = null;

    if (timerAtivo && tempoPomodoro > 0) {
      intervalo = setInterval(() => {
        setTempoPomodoro((tempoAnterior) => tempoAnterior - 1);
      }, 1000);
    } else if (tempoPomodoro === 0) {
      setTimerAtivo(false);
      Alert.alert("Pomodoro", "Hora de descansar! Ciclo de foco concluído.");
    }

    return () => clearInterval(intervalo);
  }, [timerAtivo, tempoPomodoro]);

  const formatarTempo = (segundosTotais) => {
    const minutos = Math.floor(segundosTotais / 60);
    const segundos = segundosTotais % 60;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
    return `${minutosFormatados}:${segundosFormatados}`;
  };

  const adicionarAviso = () => {
    if (novoAviso.trim() !== '') {
      setListaAvisos([...listaAvisos, novoAviso]);
      setNovoAviso('');
    }
  };

  const adicionarMateria = () => {
    if (novaMateria && novoDia && novoHorario) {
      const novaDescricao = {
        id: Date.now(),
        dia: novoDia,
        nome: novaMateria,
        horario: novoHorario,
      };
      setGradeHoraria([...gradeHoraria, novaDescricao]);
      setNovaMateria('');
      setNovoDia('');
      setNovoHorario('');
    }
  };

  const alternarStatusTarefa = (id) => {
    setListaTarefas(
      listaTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setListaTarefas([
        ...listaTarefas,
        { id: Date.now(), titulo: novaTarefa, concluida: false },
      ]);
      setNovaTarefa('');
    }
  };

  const totalTarefas = listaTarefas.length;
  const tarefasConcluidas = listaTarefas.filter((t) => t.concluida).length;
  const porcentagemConcluida = totalTarefas > 0 ? Math.round((tarefasConcluidas / totalTarefas) * 100) : 0;

  const renderizarConteudoDaTela = () => {
    if (telaAtual === 'Home') {
      return (
        <View style={styles.areaConteudo}>
          <View style={styles.cartaoBoasVindas}>
            <Text style={styles.saudacao}>Olá, {nomeUsuario}!</Text>
            <Text style={styles.subtitulo}>Bem-vindo ao seu app de rotina.</Text>
          </View>

          <Text style={styles.subtituloSecao}>Quadro de Avisos</Text>
          
          <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={false}>
            {listaAvisos.map((aviso, index) => (
              <View key={index} style={[styles.cartaoAviso, { marginBottom: 10 }]}>
                <Text style={styles.tituloAviso}>Aviso Importante:</Text>
                <Text style={styles.textoAviso}>{aviso}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.formularioComplemento}>
            <TextInput
              style={styles.inputCampocomplemento}
              placeholder="Adicionar novo lembrete/aviso..."
              value={novoAviso}
              onChangeText={setNovoAviso}
            />
            <TouchableOpacity style={styles.botaoComplemento} onPress={adicionarAviso}>
              <Text style={styles.textoBotaoComplemento}>Fixar Aviso</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (telaAtual === 'Horario') {
      return (
        <ScrollView style={styles.areaConteudo} showsVerticalScrollIndicator={false}>
          <Text style={styles.tituloSecundario}>Minha Grade Horária</Text>
          
          {gradeHoraria.map((materia) => (
            <View key={materia.id} style={styles.cartaoMateria}>
              <Text style={styles.diaSemana}>{materia.dia}</Text>
              <Text style={styles.nomeMateria}>{materia.nome}</Text>
              <Text style={styles.horarioMateria}>Horário: {materia.horario}</Text>
            </View>
          ))}

          <View style={[styles.formularioComplemento, { marginTop: 10, marginBottom: 30 }]}>
            <Text style={styles.subtituloSecao}>Inserir Disciplina na Grade</Text>
            <TextInput
              style={styles.inputCampocomplemento}
              placeholder="Dia (ex: Segunda-feira)"
              value={novoDia}
              onChangeText={setNovoDia}
            />
            <TextInput
              style={styles.inputCampocomplemento}
              placeholder="Nome da Matéria"
              value={novaMateria}
              onChangeText={setNovaMateria}
            />
            <TextInput
              style={styles.inputCampocomplemento}
              placeholder="Horário (ex: 18:30 às 21:00)"
              value={novoHorario}
              onChangeText={setNovoHorario}
            />
            <TouchableOpacity style={styles.botaoComplemento} onPress={adicionarMateria}>
              <Text style={styles.textoBotaoComplemento}>Salvar na Agenda</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    if (telaAtual === 'Timer') {
      return (
        <View style={styles.areaConteudo}>
          <Text style={styles.tituloSecundario}>Timer Pomodoro</Text>
          <View style={styles.cartaoTimer}>
            {/* Agora exibe formatado dinamicamente */}
            <Text style={styles.contadorTexto}>{formatarTempo(tempoPomodoro)}</Text>
            <Text style={styles.subtituloTimer}>
              {timerAtivo ? 'Foco total nos estudos rodando!' : 'Hora de focar nos estudos!'}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity 
              style={[styles.botaoComplemento, { flex: 1, marginRight: 5, backgroundColor: timerAtivo ? '#FF3B30' : '#34C759' }]}
              onPress={() => setTimerAtivo(!timerAtivo)}
            >
              <Text style={styles.textoBotaoComplemento}>{timerAtivo ? 'Pausar' : 'Iniciar Foco'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.botaoComplemento, { flex: 1, marginLeft: 5, backgroundColor: '#8E8E93' }]}
              onPress={() => {
                setTimerAtivo(false);
                setTempoPomodoro(25 * 60); // Reseta de forma limpa voltando para 1500 segundos
              }}
            >
              <Text style={styles.textoBotaoComplemento}>Resetar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (telaAtual === 'Tarefas') {
      return (
        <View style={styles.areaConteudo}>
          <Text style={styles.tituloSecundario}>Minhas Tarefas</Text>
          
          <ScrollView style={{ maxHeight: 260 }} showsVerticalScrollIndicator={false}>
            {listaTarefas.map((tarefa) => (
              <TouchableOpacity key={tarefa.id} style={styles.cartaoTarefaItem} onPress={() => alternarStatusTarefa(tarefa.id)}>
                <Text style={styles.tituloTarefa}>• {tarefa.titulo}</Text>
                <Text style={tarefa.concluida ? styles.statusTarefaConcluida : styles.statusTarefaPendente}>
                  Status: {tarefa.concluida ? 'Concluído' : 'Pendente'} (Toque para mudar)
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.formularioComplemento}>
            <TextInput
              style={styles.inputCampocomplemento}
              placeholder="Escreva uma nova tarefa pendente..."
              value={novaTarefa}
              onChangeText={setNovaTarefa}
            />
            <TouchableOpacity style={styles.botaoComplemento} onPress={adicionarTarefa}>
              <Text style={styles.textoBotaoComplemento}>Adicionar Lista</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (telaAtual === 'Perfil') {
      return (
        <View style={styles.areaConteudo}>
          <Text style={styles.tituloSecundario}>Meu Perfil</Text>
          
          <View style={styles.cartaoUsuario}>
            <View style={styles.avatarSimulado}>
              <Text style={styles.avatarTexto}>
                {nomeUsuario ? nomeUsuario.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'EX'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput 
                style={[styles.nomeUsuario, { borderBottomWidth: 1, borderBottomColor: '#E0E0E0', padding: 2 }]} 
                value={nomeUsuario}
                onChangeText={setNomeUsuario}
              />
              <TextInput 
                style={[styles.registroUsuario, { borderBottomWidth: 1, borderBottomColor: '#E0E0E0', padding: 2 }]} 
                value={raUsuario}
                onChangeText={setRaUsuario}
              />
            </View>
          </View>

          <Text style={styles.subtituloSecao}>Seu Progresso Atualizado</Text>
          <View style={styles.containerEstatistica}>
            <View style={styles.caixaMetrica}>
              <Text style={styles.valorMetrica}>12h</Text>
              <Text style={styles.rotuloMetrica}>Foco (Timer)</Text>
            </View>
            <View style={styles.caixaMetrica}>
              <Text style={styles.valorMetrica}>{porcentagemConcluida}%</Text>
              <Text style={styles.rotuloMetrica}>Tarefas OK</Text>
            </View>
          </View>

          <View style={styles.opcaoConfiguracaoCustomizada}>
            <Text style={styles.textoConfiguracao}>Notificações Ativas</Text>
            <Switch 
              value={notificacoesAtivas} 
              onValueChange={setNotificacoesAtivas}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={notificacoesAtivas ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaPrincipal}>
        {renderizarConteudoDaTela()}
      </View>

      <View style={styles.barraMenu}>
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTelaAtual('Home')}>
          <Text style={telaAtual === 'Home' ? styles.textoMenuAtivo : styles.textoMenu}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTelaAtual('Horario')}>
          <Text style={telaAtual === 'Horario' ? styles.textoMenuAtivo : styles.textoMenu}>Horário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTelaAtual('Timer')}>
          <Text style={telaAtual === 'Timer' ? styles.textoMenuAtivo : styles.textoMenu}>Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTelaAtual('Tarefas')}>
          <Text style={telaAtual === 'Tarefas' ? styles.textoMenuAtivo : styles.textoMenu}>Tarefas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTelaAtual('Perfil')}>
          <Text style={telaAtual === 'Perfil' ? styles.textoMenuAtivo : styles.textoMenu}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  areaPrincipal: {
    flex: 1,
    padding: 20,
  },
  areaConteudo: {
    width: '100%',
  },
  cartaoBoasVindas: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  saudacao: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitulo: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  cartaoAviso: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tituloAviso: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  textoAviso: {
    fontSize: 14,
    color: '#666666',
  },
  tituloSecundario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  cartaoMateria: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF', 
  },
  diaSemana: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#888888',
    textTransform: 'uppercase',
  },
  nomeMateria: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginTop: 2,
  },
  horarioMateria: {
    fontSize: 13,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: 'bold',
  },
  cartaoTimer: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 20,
  },
  contadorTexto: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtituloTimer: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
  },
  cartaoTarefaItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tituloTarefa: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
  },
  statusTarefaPendente: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 5,
    fontWeight: 'bold',
  },
  statusTarefaConcluida: {
    fontSize: 12,
    color: '#34C759',
    marginTop: 5,
    fontWeight: 'bold',
  },
  cartaoUsuario: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  avatarSimulado: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nomeUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  registroUsuario: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
  },
  subtituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 10,
  },
  containerEstatistica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  caixaMetrica: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  valorMetrica: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  rotuloMetrica: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  textoConfiguracao: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  barraMenu: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  botaoMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoMenu: {
    fontSize: 12,
    color: '#888888',
  },
  textoMenuAtivo: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  formularioComplemento: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputCampocomplemento: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  botaoComplemento: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotaoComplemento: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  opcaoConfiguracaoCustomizada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});