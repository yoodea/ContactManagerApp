export const sampleContacts = [
    { id:'1', firstName:'John', lastName:'Doe', email:'john.doe@example.com',
      phone:'+1-555-123-4567', company:'Tech Corp',
      avatar:'https://randomuser.me/api/portraits/men/1.jpg',
      notes:'Met at tech conference 2025', favorite:true,
      createdAt: new Date('2025-09-01').toISOString() },
    { id:'2', firstName:'Jane', lastName:'Smith', email:'jane.smith@example.com',
      phone:'+1-555-987-6543', company:'Design Studio',
      avatar:'https://randomuser.me/api/portraits/women/2.jpg',
      notes:'Graphic designer, potential collaboration', favorite:false,
      createdAt: new Date('2025-09-05').toISOString() },
  ];
  
  export const validateContact = (c) => {
    const errors = {};
    if (!c.firstName?.trim()) errors.firstName = 'First name is required';
    if (!c.lastName?.trim())  errors.lastName  = 'Last name is required';
    if (!c.email?.trim())     errors.email     = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(c.email)) errors.email = 'Email format is invalid';
    if (!c.phone?.trim())     errors.phone     = 'Phone number is required';
    else if (!/^\+?[\d\s\-\(\)]+$/.test(c.phone)) errors.phone = 'Phone number format is invalid';
    return { isValid: Object.keys(errors).length === 0, errors };
  };
  
  export const formatContactName = (c) => `${c.firstName} ${c.lastName}`.trim();
  
  export const searchContacts = (contacts, term) => {
    if (!term.trim()) return contacts;
    const t = term.toLowerCase();
    return contacts.filter(c =>
      c.firstName.toLowerCase().includes(t) ||
      c.lastName.toLowerCase().includes(t)  ||
      (c.email||'').toLowerCase().includes(t) ||
      (c.company||'').toLowerCase().includes(t)
    );
  };