import { StyleSheet } from "react-native";

// Novas cores para o tema Viagem (Light Cyan/Sky & Royal Blue/Sea)
const PRIMARY_COLOR = '#2A52BE';
const SECONDARY_COLOR = '#F5F5DC';
const ACCENT_COLOR = '#ADD8E6';
const LIGHT_BG = '#F0F8FF';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  containerHome: {
    flex: 1,
    backgroundColor: ACCENT_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  titulo: {
    fontSize: 20,
    fontWeight: 700,
    color: PRIMARY_COLOR,
    marginTop: 80,  
    marginBottom: 40
  },
  inputView: {
    width: '80%',
    marginBottom: 40
  },
  input: {
    backgroundColor: LIGHT_BG,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1
  },
  buttonView: {
    width: '80%'
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 15
  },
  buttonSec: {
    backgroundColor: SECONDARY_COLOR,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2
  },
  buttonSecText: {
    color: PRIMARY_COLOR
  },
  picker: {
    backgroundColor: LIGHT_BG,
    borderRadius: 10,
    marginBottom: 8,
    paddingLeft: 5,
    borderColor: '#ccc',
    borderWidth: 1
  },
  pickerTexto: {
    fontSize: 15,
  },
  flatItem: {
    backgroundColor: SECONDARY_COLOR,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    marginTop: 10,
    padding: 10,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 10
  },
  flatTexto: {
    fontSize: 16,
    color: PRIMARY_COLOR
  }
});