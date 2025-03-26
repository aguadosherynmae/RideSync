import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './articles.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];
  private idCounter = 1;

  create(createArticleDto: CreateArticleDto): Article {
    const newArticle: Article = {
      id: this.idCounter++,
      title: createArticleDto.title,
      description: createArticleDto.description,
      createdAt: new Date(),
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  findAll(): Article[] {
    return this.articles;
  }

  findOne(id: number): Article {
    const article = this.articles.find((art) => art.id === id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  update(id: number, updateArticleDto: UpdateArticleDto): Article {
    const article = this.findOne(id);
    if (updateArticleDto.title) {
      article.title = updateArticleDto.title;
    }
    if (updateArticleDto.description) {
      article.description = updateArticleDto.description;
    }
    return article;
  }

  remove(id: number): void {
    const index = this.articles.findIndex((art) => art.id === id);
    if (index === -1) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    this.articles.splice(index, 1);
  }
}
