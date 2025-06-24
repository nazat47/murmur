import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as cors from "cors";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ミドルウェアの設定
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix("api/v1");

  app.use(helmet());
  app.use(cors());
  await app.listen(3001);
  console.log("Example app listening on port 3001!");
}
bootstrap();
