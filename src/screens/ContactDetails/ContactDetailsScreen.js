import React, {useMemo} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, Alert} from 'react-native';
import {useContacts} from '../../utils/ContactContext';
import CustomButton from '../../components/common/CustomButton';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

export default function ContactDetailsScreen({route, navigation}) {
  const {contactId} = route.params;
  const {contacts, deleteContact} = useContacts();
  const contact = useMemo(() => contacts.find(c => c.id === contactId), [contacts, contactId]);
  if (!contact) return <SafeAreaView style={[GlobalStyles.container, GlobalStyles.centered]}><Text>Contact not found.</Text></SafeAreaView>;

  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure?', [
      {text:'Cancel', style:'cancel'},
      {text:'Delete', style:'destructive', onPress: async () => { await deleteContact(contact.id); navigation.goBack(); }},
    ]);
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={[GlobalStyles.card, {alignItems:'center'}]}>
        {contact.avatar ? (
          <Image source={{uri: contact.avatar}} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]} />
        )}
        <Text style={styles.name}>{contact.firstName} {contact.lastName}</Text>
        <Text style={styles.line}>{contact.email}</Text>
        <Text style={styles.line}>{contact.phone}</Text>
        <Text style={styles.line}>{contact.company || 'No company'}</Text>
      </View>
      <View style={{padding: Spacing.md}}>
        <CustomButton title="Edit Contact" onPress={() => navigation.navigate('AddContact', {contact})} />
        <View style={{height: Spacing.sm}} />
        <CustomButton title="Delete Contact" onPress={handleDelete} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: Spacing.md, backgroundColor: Colors.background },
  placeholder: { backgroundColor: Colors.primary },
  name: { fontSize: Fonts.large, fontWeight: 'bold', color: Colors.text.primary, marginBottom: Spacing.sm },
  line: { fontSize: Fonts.medium, color: Colors.text.secondary, marginBottom: 4 },
});