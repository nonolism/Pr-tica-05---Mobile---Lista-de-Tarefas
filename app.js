import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
export default function App() {
const [texto, setTexto] = useState('');
const [tarefas, setTarefas] = useState([]);
function adicionarTarefa() {
  if (texto.trim() === '') return;
  const nova = {
  id: Date.now().toString(),
  titulo: texto.trim(),
  concluida: false,
};
setTarefas([...tarefas, nova]);
setTexto('');
}
function alternarTarefa(id) {
setTarefas(
tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
);
  }
  function removerTarefa(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Tarefas</Text>
      <Text style={styles.subtitulo}>Organize o seu dia</Text>
      <View style={styles.linhaEntrada}>
        <TextInput
          style={styles.campo}
          placeholder="Nova tarefa"
          placeholderTextColor="#757575"
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={adicionarTarefa} // adiciona pelo teclado
          returnKeyType="done"
        />
        <Pressable
          style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotao}>Adicionar</Text>
        </Pressable>
      </View>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={styles.areaTexto} onPress={() => alternarTarefa(item.id)}>
              <Text style={[styles.textoItem, item.concluida && styles.textoConcluido]}>
                {item.titulo}
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.botaoRemover, pressed && styles.pressionado]}
              onPress={() => removerTarefa(item.id)}
              accessibilityLabel={`Remover ${item.titulo}`}
            >
              <Text style={styles.textoBotao}>✕</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma tarefa ainda. Adicione a primeira acima!</Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 60,
    paddingHorizontal: 20,
      },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
  },
  subtitulo: {
    fontSize: 16,
    color: '#C115BB', //contraste 5.13:1
    marginBottom: 20,
  },
  linhaEntrada: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  campo: {
    flex: 1,
    minWidth: 0, // deixa o campo encolher para o botão caber na tela
    minHeight: 48, // área mínima de toque
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  botao: {
    minHeight: 48,
    backgroundColor: '#C115BB', // contraste ≈ 5.13:1 com o texto branco
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginLeft: 8,
  },
  pressionado: {
    opacity: 0.6, // feedback visual: clareia enquanto o botão está pressionado
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingLeft: 16,
    paddingVertical: 8,
    paddingRight: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  areaTexto: {
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
  },
  textoItem: {
    fontSize: 16,
    color: '#212121',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
color: '#616161', // cinza escuro: continua legível
},
botaoRemover: {
minWidth: 48, // área mínima de toque
minHeight: 48,
backgroundColor: '#C62828', // contraste ≈ 5,6 : 1 com o texto branco
borderRadius: 8,
justifyContent: 'center',
alignItems: 'center',
marginLeft: 8,
},
vazio: {
textAlign: 'center',
fontSize: 16,
color: '#616161',
marginTop: 40,
},
});
