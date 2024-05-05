import React, { createContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionContext = createContext(null);

export default function Főoldal() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [deleteImageVisible, setDeleteImageVisible] = useState(false);

  useEffect(() => {
    loadItemsFromStorage();
  }, []);

  useEffect(() => {
    saveItemsToStorage();
  }, [items]);

  const loadItemsFromStorage = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Hiba az adatok betöltése közben:', error);
    }
  };

  const saveItemsToStorage = async () => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.error('Hiba az adatok mentése közben:', error);
    }
  };

  const handleAddItem = () => {
    if (!productName.trim() || !quantity.trim()) {
      Alert.alert('Hiba', 'Kérem, töltse ki mindkét mezőt!');
      return;
    }

    const newItem = { name: productName, quantity: quantity };
    setItems([...items, newItem]);
    setProductName('');
    setQuantity('');
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  useEffect(() => {
     setDeleteImageVisible(items.length > 0);
  }, [items]);

  return (
    <SessionContext.Provider value={null}>
      <View style={styles.container}>
        <Text style={styles.title}>Mit kell venni?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Termék neve"
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mennyiség"
            value={quantity}
            onChangeText={setQuantity}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddItem}
          >
            <Text style={styles.addButtonText}>Hozzáadás</Text>
          </TouchableOpacity>
        </View>
        <FlatList style={styles.lista}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text></Text>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
              {deleteImageVisible && (
                <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                  {/* The delete button image */}
                  <Image
                    source={require('./assets/delete.png')}
                    style={styles.image}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </SessionContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b6e8a',
  },
  title: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  lista:{
    alignContent: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#0a70ff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '85%',
  },
  itemName: {
    fontSize: 20,
    color: 'white',
  },
  itemQuantity: {
    fontSize: 20,
    color: 'white',
  },
  torles:{
    justifyContent: 'center',
  },
  image: {
    marginLeft: 10,
    height:26,
    width:24,
  },
});
