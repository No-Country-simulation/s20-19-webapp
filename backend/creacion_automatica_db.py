from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
import os
from dotenv import load_dotenv

load_dotenv()

def check_and_create_database():
    db_name = os.getenv('DB_NAME')
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT')

    engine = None
    
    try:
        # Establish a connection to the PostgreSQL server
        engine = create_engine(
            f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}',
            connect_args={'options': '-c search_path=public'}
        )
        
        # Check if the database exists
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        
        print(f"The database {db_name} already exists.")
    
    except OperationalError as e:
        if "database does not exist" in str(e).lower():
            print(f"The database {db_name} does not exist. Creating it...")
            
            # Create the database
            with engine.connect() as conn:
                conn.execute(f"CREATE DATABASE {db_name}")
            
            print(f"The database {db_name} has been created successfully.")
        else:
            print(f"Error making the db")
    
    finally:
        if engine is not None:
            engine.dispose()

# Run the database check and creation
check_and_create_database()