# Importación De Librerias
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

# Cargando Variables De Entorno
load_dotenv()

# Creación De Nuestra Instancia De Flask.
app = Flask(__name__)

CORS(app)  # Esto permite peticiones desde cualquier origen


# Creación De Nuestra Ruta POST, Para Una Consulta Simple.
@app.route('/usuario', methods=['POST'])
def obtener_usuario():
    data = request.get_json()                                   # Datos Que Llegan A Nuestra Ruta.
    user_id = data.get('userId')                                # Verificar Que Venga El userId.

    if not user_id:
        return jsonify({'error': 'Falta el userId'}), 400       # De No Venir El userId, Retornamos El Error.

    # Conexión a la base de datos siguiendo tu estilo
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        database=os.getenv("DB_NAME")
    )
    cursor = conn.cursor(dictionary=True)

    try:
        # Consulta SELECT ejemplo (puedes modificar la tabla y campos)
        query = """
        SELECT nombre, correo
        FROM IdUserCompany
        WHERE userId = %s
        """
        cursor.execute(query, (user_id,))
        resultados = cursor.fetchall()  # Devuelve lista de diccionarios

        if not resultados:
            return jsonify({'mensaje': 'No se encontró el usuario'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()  # Cerramos siempre la conexión

    return jsonify({'usuario': resultados[0]})  # Retorna el primer resultado

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
