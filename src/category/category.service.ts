import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./models/category.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  findOne(id: number): Promise<Category | null> {
    return this.categoryModel.findByPk(id);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category | null> {
    const updated = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.categoryModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "o'chira olmading, tinchgina chiqib ket endi.";
  }
}
