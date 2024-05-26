
# Calculadora

Esta es una calculadora simple implementada con React y Next.js, utilizando TailwindCSS para los estilos. La calculadora permite realizar operaciones básicas como suma, resta, multiplicación, y división. También incluye funciones para manejar números decimales, cambiar el signo de un número y mostrar errores para resultados fuera del rango permitido.

## Características

- **Operaciones básicas**: Suma, resta, multiplicación y división.
- **Punto decimal**: Manejo de números decimales.
- **Cambio de signo**: Función "+/-" para cambiar el signo del número.
- **Validación de resultados**: Muestra "ERROR" para resultados fuera del rango permitido (más de 9 caracteres, incluyendo el punto decimal).
- **Ingreso por teclado**: Permite ingresar números y operaciones mediante el teclado, resaltando el botón correspondiente en la calculadora.
- **Cobertura de código**: Genera un reporte de cobertura de código utilizando Jest.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

### 1. Clona el repositorio:

```bash
  git clone https://github.com/Diegoval-Dev/CalculadoraTesting.git calculadora
  cd calculadora
```
### 2. Scripts Disponibles
En el directorio del proyecto, puedes ejecutar:

| Script         | Descripción                                                                                   |
|----------------|----------------------------------------------------------------------------------------------|
| npm run dev    | Inicia la aplicación en modo de desarrollo. Abre http://localhost:3000.                      |
| npm run build  | Construye la aplicación para producción en la carpeta build.                                  |
| npm run start  | Inicia el servidor en modo de producción. Asegúrate de haber ejecutado npm run build primero. |
| npm test       | Lanza el corredor de pruebas en modo interactivo de vigilancia.                               |
| npm run coverage | Ejecuta las pruebas y genera un reporte de cobertura de código en la carpeta coverage.       |

## Produccion

Tambien se puede acceder a la calculadora en produccion mediante el siguiente link: [caluladora](calculadora.diegovalenzuela.me)

## Author
Este proyecto fue creado por: [Diego Valenzuela](https://github.com/Diegoval-Dev).
