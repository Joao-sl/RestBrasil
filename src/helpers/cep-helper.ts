export function cepMask(value: string) {
  return value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

export function formatCep(value: string) {
  if (value.length > 9) value = value.slice(0, 9);

  const cleanValue = value.replace(/\D/g, '');
  const cep = cepMask(cleanValue);
  return cep;
}
