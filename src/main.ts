import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle("Skidkachi project")
      .setDescription("skidkachi REST API")
      .setVersion("1.0")
      .addTag("NestJS", "Swagger")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
    app.use(cookieParser());
    await app.listen(PORT, () => {
      console.log(`Server start at: http://localhost${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
