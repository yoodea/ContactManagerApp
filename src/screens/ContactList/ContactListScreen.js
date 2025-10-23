import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactListItem from '../../components/common/ContactListItem';
import { GlobalStyles, Colors, Spacing, Fonts } from '../../styles/globalStyles';
import { useContacts } from '../../utils/ContactContext';
import { searchContacts } from '../../data/contactsData';

export default function ContactListScreen({ navigation }) {
  const { contacts, loading, toggleFavorite, refreshContacts } = useContacts();
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const data = useMemo(() => searchContacts(contacts, query), [contacts, query]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshContacts();
    setRefreshing(false);
  }, [refreshContacts]);

  const handleOpen = useCallback(
    (contact) => navigation.navigate('ContactDetails', { contactId: contact.id }),
    [navigation]
  );

  const handleFavorite = useCallback((id) => toggleFavorite(id), [toggleFavorite]);
  const handleCall = useCallback((phone) => {/* integrate Linking.openURL(`tel:${phone}`) if desired */}, []);
  const handleMsg  = useCallback((phone) => {/* Linking.openURL(`sms:${phone}`) */}, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ContactListItem
        contact={item}
        onPress={handleOpen}
        onFavoritePress={handleFavorite}
        onCallPress={handleCall}
        onMessagePress={handleMsg}
      />
    ),
    [handleOpen, handleFavorite, handleCall, handleMsg]
  );

  const keyExtractor = useCallback((item) => item.id, []);
  const getItemLayout = useCallback((_, index) => ({ length: 84, offset: 84 * index, index }), []);

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.searchRow}>
        <Icon name="search" size={20} color={Colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, email, company..."
          placeholderTextColor={Colors.text.secondary}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Search contacts"
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing || loading} onRefresh={onRefresh} />}
        contentContainerStyle={data.length === 0 && styles.emptyListContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Loading contacts…' : query ? 'No matches found.' : 'No contacts yet.'}
          </Text>
        }
        keyboardShouldPersistTaps="handled"
        initialNumToRender={12}
        windowSize={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews
        getItemLayout={getItemLayout}
      />

      {/* Floating action button */}
      <View style={styles.fab} accessible accessibilityRole="button" accessibilityLabel="Add new contact">
        <Icon
          name="add"
          size={28}
          color="#fff"
          onPress={() => navigation.navigate('AddContact')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Fonts.medium,
    color: Colors.text.primary,
  },
  emptyListContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: Colors.text.secondary, fontSize: Fonts.medium },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});