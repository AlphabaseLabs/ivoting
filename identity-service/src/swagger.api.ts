import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const APP_NAME = process.env.npm_package_name;
const APP_VERSION = process.env.npm_package_version;

class swaggerApi {
  public init(_app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(`The ${APP_NAME} API description`)
      .setVersion(APP_VERSION)
      .build();

    const document = SwaggerModule.createDocument(_app, options);

    SwaggerModule.setup('api', _app, document);
  }
}
const SwaggerApi = new swaggerApi();
export { SwaggerApi };
