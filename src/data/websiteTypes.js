export const websiteTypes = {
  corporate: {
    name: 'Corporativa',
    baseHours: 40,
    icon: '🏢',
    description: 'Ideal para empresas que buscan presencia profesional en línea',
    options: [
      { id: 'pages', name: 'Páginas adicionales', hours: 4, type: 'number', icon: '📄' },
      { id: 'languages', name: 'Idiomas adicionales', hours: 10, type: 'number', icon: '🌐' },
      { id: 'blog', name: 'Blog corporativo', hours: 15, type: 'boolean', icon: '📝' },
      { id: 'newsletter', name: 'Newsletter', hours: 8, type: 'boolean', icon: '📧' }
    ]
  },
  ecommerce: {
    name: 'E-commerce',
    baseHours: 80,
    icon: '🛍️',
    description: 'Plataforma completa para vender productos en línea',
    options: [
      { id: 'products', name: 'Productos', hours: 0.5, type: 'number', icon: '📦' },
      { id: 'payment', name: 'Pasarela de pago', hours: 16, type: 'boolean', icon: '💳' },
      { id: 'inventory', name: 'Sistema de inventario', hours: 20, type: 'boolean', icon: '📦' },
      { id: 'multivendor', name: 'Multi-vendedor', hours: 40, type: 'boolean', icon: '👥' }
    ]
  },
  blog: {
    name: 'Blog',
    baseHours: 30,
    icon: '✍️',
    description: 'Plataforma para compartir contenido y artículos',
    options: [
      { id: 'categories', name: 'Categorías', hours: 2, type: 'number', icon: '🏷️' },
      { id: 'comments', name: 'Sistema de comentarios', hours: 8, type: 'boolean', icon: '💭' },
      { id: 'subscription', name: 'Sistema de suscripción', hours: 12, type: 'boolean', icon: '📮' }
    ]
  },
  intranet: {
    name: 'Intranet',
    baseHours: 100,
    icon: '🔒',
    description: 'Sistema interno para gestión empresarial',
    options: [
      { id: 'users', name: 'Usuarios', hours: 1, type: 'number', icon: '👤' },
      { id: 'modules', name: 'Módulos personalizados', hours: 20, type: 'number', icon: '🧩' },
      { id: 'integration', name: 'Integración con sistemas', hours: 30, type: 'boolean', icon: '🔄' }
    ]
  },
  onepage: {
    name: 'One Page',
    baseHours: 20,
    icon: '📱',
    description: 'Sitio web de una sola página, ideal para presentaciones',
    options: [
      { id: 'sections', name: 'Secciones', hours: 4, type: 'number', icon: '📑' },
      { id: 'animations', name: 'Animaciones', hours: 10, type: 'boolean', icon: '✨' },
      { id: 'form', name: 'Formulario de contacto', hours: 6, type: 'boolean', icon: '📝' }
    ]
  }
}