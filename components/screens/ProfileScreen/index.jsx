import React, { useState } from 'react';
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

export const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/150');

  // Function to request camera permissions and take a photo
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to allow camera access to take a photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Function to pick an image from the gallery
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Function to save updated details
  const handleSave = () => {
    setModalVisible(false);
    Alert.alert('Profile Updated', 'Your details have been successfully updated.');
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image source={{ uri: profileImage }} style={styles.profileImage} />

      {/* Name & Email */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Icon name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            {/* Profile Image Update */}
            <TouchableOpacity onPress={handleTakePhoto}>
              <Image source={{ uri: profileImage }} style={styles.modalImage} />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.galleryButton} onPress={handlePickImage}>
              <Icon name="photo-library" size={20} color="#fff" />
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            {/* Save & Cancel Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Icon name="save" size={20} color="#fff" />
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Icon name="close" size={20} color="#fff" />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#4CAF50',
    fontSize: 14,
    marginBottom: 10,
  },
  galleryButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E53935',
  },
});

