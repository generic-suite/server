import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { User } from '../user/entities/user.entity';
import { SystemConfig } from '../system-config/entities/system-config.entity';
import { makeSalt, encryptPassword } from '../utils/cryptogram';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('InitData');
  logger.log('Starting initialization...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    const systemConfigRepository = app.get<Repository<SystemConfig>>(getRepositoryToken(SystemConfig));

    // Init System Config
    // We check for id 1 as the service seems to rely on it
    const config = await systemConfigRepository.findOne({ where: { id: 1 } });
    if (!config) {
      logger.log('Initializing System Config...');
      const newConfig = new SystemConfig();
      // ID is usually auto-generated, but if we want to enforce ID 1 for the first record,
      // we might depend on the DB being empty or explicitly setting it if the DB allows.
      // For auto-increment, we can usually just save.
      newConfig.app_name = 'System Name'; 
      
      // Defaults are defined in the entity, so we only set what we want to override or what is required.
      await systemConfigRepository.save(newConfig);
      logger.log('System Config initialized.');
    } else {
      logger.log('System Config already exists.');
    }

    // Init Admin User
    const adminUsername = 'admin';
    const adminUser = await userRepository.findOne({ where: { username: adminUsername } });
    if (!adminUser) {
      logger.log(`Initializing Admin User (${adminUsername})...`);
      const salt = makeSalt();
      const password = '000000';
      const hashedPassword = encryptPassword(password, salt);

      const newAdmin = new User();
      newAdmin.username = adminUsername;
      newAdmin.realname = 'Super Admin';
      newAdmin.password = hashedPassword;
      newAdmin.passwordSalt = salt;
      newAdmin.role = 0; // Super Admin
      newAdmin.userStatus = 1; // Active
      newAdmin.createTime = new Date();
      newAdmin.updateTime = new Date();
      
      await userRepository.save(newAdmin);
      logger.log(`Admin User initialized. Password: ${password}`);
    } else {
      logger.log('Admin User already exists.');
    }
  } catch (error) {
    logger.error('Initialization failed', error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

