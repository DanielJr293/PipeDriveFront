*ID JIRA:* US-4.1
*Funcionalidad Relacionada:* [Gestión de Usuario y Notificaciones Globales](#)

*Como* Usuario
*Quiero* Ver mi información de usuario (correo) al iniciar la aplicación
*Para* Confirmar que estoy autenticado correctamente.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-US-4.1

Escenario: Carga y visualización exitosa del correo del usuario
  @escenario-1
  Dado que la aplicación se carga
  Cuando el componente `Sidebar.jsx` realiza una `POST /usuario` a la API de backend con mi `userId`
  Entonces el sistema debe mostrar mi correo electrónico en la barra lateral.
  Y Debe haber un indicador visual de carga en la `Sidebar` mientras se espera la respuesta de la API.

Escenario: Manejo de errores al cargar la información del usuario
  @escenario-2
  Dado que la API responde con un error
  Cuando el componente `Sidebar.jsx` falla al obtener la información del usuario
  Entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo en el `NotificationSystem.jsx`.
```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "Sidebar.jsx"
    descripción: "Barra lateral con información de usuario y navegación."
    responsabilidad: "Realizar la llamada a la API `/usuario` al cargar y mostrar el correo electrónico del usuario."
  - nombre: "NotificationSystem.jsx"
    descripción: "Sistema de notificaciones globales."
    responsabilidad: "Mostrar mensajes de error en caso de fallo de la API."
```

*Endpoints de API*
```yaml
api:
  - método: "POST"
    ruta: "/usuario"
    propósito: "Obtener la información del usuario autenticado."
    payload:
      userId: "string"
    response_payload:
      email: "string"
      name: "string"
```

*Cambios en el Modelo de Datos*
```sql
-- No se requieren cambios en el modelo de datos de backend para esta HU.
-- El frontend necesitará un estado para almacenar la información del usuario (ej. email).
```

*Consideraciones UI/UX*
- [x] El correo electrónico del usuario debe mostrarse de forma destacada en la barra lateral.
- [x] Un spinner o esqueleto de carga debe ser visible en la barra lateral mientras se obtienen los datos del usuario.

*Mockups / Diseños*

![Mockup de Sidebar con información de usuario](link-a-mockup-hu-4.1)

*Pruebas Requeridas*

- [x] *Pruebas Unitarias*
  ```typescript
  describe('Sidebar', () => {
    it('should display user email on successful API call', async () => {
      // Test case
    });
    it('should display loading indicator while fetching user info', () => {
      // Test case
    });
    it('should display error notification on API failure', async () => {
      // Test case
    });
  });
  ```
- [ ] *Pruebas de Integración*
- [ ] *Pruebas de UI*
- [ ] *Pruebas de Rendimiento*
- [ ] *Pruebas de Seguridad*
- [ ] *Pruebas de Accesibilidad*

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| NS-4.2 | HU | Sistema Global de Notificaciones | Pendiente |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 3 |
| Tiempo Estimado | 5h |

*Notas Adicionales*

*Consideraciones Especiales*
- Asegurar que el `userId` se obtenga de forma segura (ej. de un token de autenticación).

*Referencias*
- [Requisitos del Proyecto - PRD-PDF-001](.raise/project_requirements.md)
- [Diseño Técnico - TEC-PDF-001](.raise/tech_design.md)
- [Contratos API - CON-PDF-001](.raise/contracts.md)
