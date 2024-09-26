import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { Child } from './child.entity';
import { Response } from 'express';
import { pipeline } from 'stream';
import { SearchChildDto } from 'src/ChildCares/dto/search-child.dto';

@Controller('child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post()
  async addChild(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createChildDto: CreateChildDto,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new Error('Missing X-Auth header');
    }
    await this.childService.addChild(createChildDto, username);
  }

  @Get()
  async findAll(): Promise<Child[]> {
    return this.childService.findAll();
  }

  @Delete('/:childCareId/child/:childId')
  async removeChildFromChildCare(
    @Param('childCareId', ParseIntPipe) childCareId: number,
    @Param('childId', ParseIntPipe) childId: number,
    @Headers('X-Auth') username: string,
  ): Promise<void> {
    if (!username) {
      throw new UnauthorizedException('Missing X-Auth header');
    }
    await this.childService.removeChildFromChildCare(
      childCareId,
      childId,
      username,
    );
  }

  @Get('search')
  async searchByName(
    @Query(ValidationPipe) searchChildDto: SearchChildDto,
  ): Promise<Child[]> {
    if (!searchChildDto) {
      throw new UnauthorizedException('Veuillez indiquer un nom');
    }
    return this.childService.searchByName(searchChildDto);
  }

  @Post('/:childId/associate/:childCareId')
  async associateChildWithChildCare(
    @Param('childId', ParseIntPipe) childId: number,
    @Param('childCareId', ParseIntPipe) childCareId: number,
  ): Promise<void> {
    await this.childService.associateChildWithChildCare(childId, childCareId);
  }

  @Get('/child-care/:id/children')
  async getChildrenByChildCare(@Param('id', ParseIntPipe) childCareId: number) {
    return this.childService.getChildrenByChildCare(childCareId);
  }

  @Get('export.csv')
  async exportChildren(
    @Res() res: Response,
    @Query('childCareId', new ParseIntPipe({ optional: true }))
    childCareId?: number,
  ) {
    try {
      const csvStream =
        await this.childService.getChildrenCsvStream(childCareId);
      const fileName = childCareId ? 'children' : 'childCares';
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${fileName}.csv`,
      );

      pipeline(csvStream, res, (err) => {
        if (err) {
          if (!res.headersSent) {
            res.status(500).json({
              message: "Une erreur est survenue lors de l'exportation du CSV.",
            });
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la préparation de l'exportation.",
      });
    }
  }
}
