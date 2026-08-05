export const regex = {
  name: /^[A-Za-zÀ-ÿ\s'-]{2,60}$/,

  company: /^[A-Za-z0-9À-ÿ\s.,&()'-]{2,100}$/,

  address: /^[A-Za-z0-9À-ÿ\s,.'#/()-]{5,200}$/,

  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,

  phone: /^\+?[0-9\s()-]{7,20}$/,

  subject: /^.{3,100}$/,

  message: /^.{10,1000}$/,

  // Allows country names like:
  // India, United States, Côte d'Ivoire, Bosnia and Herzegovina
  country: /^[A-Za-zÀ-ÿ\s.'-]{2,60}$/
};