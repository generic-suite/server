import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppListService } from './app-list.service';
import { CreateAppListDto } from './dto/create-app-list.dto';
import { UpdateAppListDto } from './dto/update-app-list.dto';

@Controller('app-list')
export class AppListController {
  constructor(private readonly appListService: AppListService) {}

  @Post()
  create(@Body() createAppListDto: CreateAppListDto) {
    return this.appListService.create(createAppListDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.appListService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppListDto: UpdateAppListDto) {
    return this.appListService.update(+id, updateAppListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appListService.remove(+id);
  }
}
