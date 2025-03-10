import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Dimensions, 
  TextInput, TouchableOpacity, ScrollView
} from 'react-native';

const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      
      // Assuming the response is an array of objects with {slug, name, url}
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch products (all or by category)
  const fetchProducts = async (categoryUrl = '') => {
    setLoading(true);
    let url = categoryUrl || 'https://dummyjson.com/products';

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.slug);
    fetchProducts(category.url);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput 
        placeholder="Search Items..." 
        style={styles.searchInput} 
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Categories List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleCategoryClick({ slug: null, url: '' })}>
          <Text style={[styles.categoryItem, !selectedCategory && styles.selectedCategory]}>All</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity key={category.slug} onPress={() => handleCategoryClick(category)}>
            <Text style={[styles.categoryItem, selectedCategory === category.slug && styles.selectedCategory]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#eee',
    borderRadius: 16,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
      marginBottom: 10,
    height:50
  },
  categoryItem: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
    fontSize: 14,
      color: '#333',
    height:35
  },
  selectedCategory: {
    backgroundColor: '#4CAF50', 
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    width: width / 2 - 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 5,
  },
  category: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});

export default HomeScreen;
