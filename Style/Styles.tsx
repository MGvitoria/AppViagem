import { StyleSheet } from 'react-native';

// Definindo a nova paleta de cores
export const colors = { // Exportação como 'colors'
  primary: '#8A2BE2', // Roxo BlueViolet
  primaryDark: '#6A1BA9', // Roxo mais escuro
  secondary: '#FF8C00', // Laranja DarkOrange
  secondaryLight: '#FFA07A', // Laranja claro (LightSalmon)
  background: '#F0F2F5', // Cinza claro para o fundo
  cardBackground: '#FFFFFF', // Branco para cartões e modais
  text: '#333333', // Cor de texto principal
  textLight: '#666666', // Cor de texto secundário
  placeholder: '#AAAAAA', // Cor de placeholder
  border: '#DDDDDD', // Cor de borda
  success: '#28a745', // Verde para sucesso
  error: '#dc3545', // Vermelho para erro
  warning: '#ffc107', // Amarelo para aviso
};

// 2. Definição dos Estilos Globais (para serem importados em todas as telas)
export const commonStyles = StyleSheet.create({ // Exportação como 'commonStyles'
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: colors.text,
  },
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.cardBackground,
    fontSize: 16,
    color: colors.text,
  },
  areaTexto: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  containerBotao: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  link: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  // Estilos de listagem
  tituloCard: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  detalheCard: {
    fontSize: 14,
    color: colors.textLight,
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    gap: 10,
  },
  botaoAcao: {
    paddingHorizontal: 5,
  },
  textoAcao: {
    fontSize: 14,
    fontWeight: '600',
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textLight,
  },
  containerDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
  },
  textoData: {
    fontSize: 16,
    color: colors.text,
  },
  // Estilos da Home
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  homeTitulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primaryDark,
  },
  homeSubtitulo: {
    fontSize: 18,
    marginBottom: 40,
    color: colors.textLight,
    textAlign: 'center',
  },
  botaoPrincipal: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10,
  },
  textoBotaoPrincipal: {
    color: colors.cardBackground,
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerBotaoSair: {
    width: '80%',
    marginTop: 50,
    borderRadius: 10,
    overflow: 'hidden',
  }
});
