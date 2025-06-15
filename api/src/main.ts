import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["fatal", "error", "warn", "log"],
  });
  app.enableCors({
    origin: "*",
  });

  const config = new DocumentBuilder()
    .setTitle("gomoking bff API")
    .setDescription("BFF")
    .setVersion("0.0.0")
    .addTag("bff")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
