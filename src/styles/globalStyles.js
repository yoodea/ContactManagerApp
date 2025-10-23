import {StyleSheet} from 'react-native';

export const Colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  accent: '#e74c3c',
  background: '#f8f9fa',
  surface: '#ffffff',
  text: { primary: '#2c3e50', secondary: '#7f8c8d', light: '#ecf0f1' },
  border: '#dee2e6',
};

export const Fonts = { small: 12, medium: 16, large: 20, xlarge: 24 };
export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

export const GlobalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md,
    marginVertical: Spacing.sm, marginHorizontal: Spacing.md, elevation: 2,
    shadowColor: '#000', shadowOffset: {width:0,height:2}, shadowOpacity: 0.1, shadowRadius: 4,
  },
  button: {
    backgroundColor: Colors.primary, paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg, borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: Colors.text.light, fontSize: Fonts.medium, fontWeight: 'bold' },
  errorText: { color: Colors.accent, fontSize: Fonts.small, marginTop: Spacing.xs, marginLeft: Spacing.sm },
});