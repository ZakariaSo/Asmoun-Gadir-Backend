import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  }
);

export const connectionDb = async()=>{
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Database connected and synced successfully');
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export default sequelize;