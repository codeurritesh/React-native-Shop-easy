import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, FlatList, 
  Dimensions, TouchableOpacity 
} from 'react-native';

const { width } = Dimensions.get('window');

export const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params; 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  }

  if (!product) {
    return <Text style={styles.errorText}>Product not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image Carousel: Shows multiple images */}
      <FlatList
        data={product.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.carouselImage} />
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
      />

      {/* Product Details */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        {/* Custom Star Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{renderStars(product.rating)} ({product.rating})</Text>
        </View>

        {/* Category */}
        <Text style={styles.category}>Category: {product.category}</Text>

        {/* Description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Function to render stars based on rating
const renderStars = (rating) => {
  const filledStars = '★'.repeat(Math.floor(rating)); 
  const emptyStars = '☆'.repeat(5 - Math.floor(rating)); 
  return filledStars + emptyStars;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20, // Added space from the top
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  carouselImage: {
    width: width - 40,
    height: 250,
    resizeMode: 'cover',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProductDetailScreen;
