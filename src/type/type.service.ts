import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Type } from "./models/type.model";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type) private typeModel: typeof Type) {}

  create(createTypeDto: CreateTypeDto) {
    return this.typeModel.create(createTypeDto);
  }

  findAll(): Promise<Type[]> {
    return this.typeModel.findAll();
  }

  findOne(id: number): Promise<Type | null> {
    return this.typeModel.findByPk(id);
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type | null> {
    const updated = await this.typeModel.update(updateTypeDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.typeModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "ochira olmading, tinchgina chiqib ket endi.";
  }
}
