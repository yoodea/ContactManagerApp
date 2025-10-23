import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sampleContacts} from '../data/contactsData';

const ContactContext = createContext(null);
export const useContacts = () => {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContacts must be used within ContactProvider');
  return ctx;
};

export const ContactProvider = ({children}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => {
    try {
      const saved = await AsyncStorage.getItem('contacts');
      if (saved) setContacts(JSON.parse(saved));
      else {
        setContacts(sampleContacts);
        await AsyncStorage.setItem('contacts', JSON.stringify(sampleContacts));
      }
    } catch (e) {
      setContacts(sampleContacts);
    } finally { setLoading(false); }
  };

  const persist = async (list) => AsyncStorage.setItem('contacts', JSON.stringify(list));

  const addContact = async (data) => {
    const c = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString(), favorite:false };
    const list = [...contacts, c]; setContacts(list); await persist(list); return c;
  };
  const updateContact = async (id, data) => {
    const list = contacts.map(c => c.id===id ? {...c, ...data} : c);
    setContacts(list); await persist(list);
  };
  const deleteContact = async (id) => {
    const list = contacts.filter(c => c.id!==id);
    setContacts(list); await persist(list);
  };
  const toggleFavorite = async (id) => {
    const list = contacts.map(c => c.id===id ? {...c, favorite: !c.favorite} : c);
    setContacts(list); await persist(list);
  };

  return (
    <ContactContext.Provider value={{contacts, loading, addContact, updateContact, deleteContact, toggleFavorite, refreshContacts: load}}>
      {children}
    </ContactContext.Provider>
  );
};