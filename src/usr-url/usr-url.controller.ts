import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UsrUrlService } from './usr-url.service';
import { AddUrlDto, CreateUsrUrlDto } from './dto/create-usr-url.dto';
import { UpdateUsrUrlDto } from './dto/update-usr-url.dto';
import crypto from 'crypto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('url')
export class UsrUrlController {
  constructor(private readonly usrUrlService: UsrUrlService) {}

  @Post()
  async create(@Body() createUsrUrlDto: CreateUsrUrlDto) {
    const shortUrl = await this.usrUrlService.findOneByKey(createUsrUrlDto.longUrl);
    if (shortUrl) throw new HttpException('URL already exists', 400);
    return this.usrUrlService.create(createUsrUrlDto);
  }

  @Get()
  findAll() {
    return this.usrUrlService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const url = await this.usrUrlService.findOne(id);
    if (!url) throw new HttpException('URL not found', 404); 
    return url
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsrUrlDto: UpdateUsrUrlDto) {
    const url = await this.usrUrlService.findOne(id);
    if (!url) throw new HttpException('URL not found', 404); 
    return this.usrUrlService.update(id, updateUsrUrlDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const url = await this.usrUrlService.findOne(id);
    if (!url) throw new HttpException('URL not found', 404); 
    return this.usrUrlService.remove(id);
  }
  
  @Public()
  @Get('open/:key')
  async redirect(@Param('key') key: string) {
    const url = await this.usrUrlService.findOneByKey(key);
    if (!url) throw new HttpException('URL not found', 404);
    return { url: url.longUrl };
  }

  @Post('addUrl')  
  async addUrl(@Body() addUrl: AddUrlDto) {
    const shortUrl = await this.usrUrlService.findOneByLongUrl(addUrl.longUrl);
    if (shortUrl) throw new HttpException('URL already exists', 400);
    const urlKey = crypto.randomBytes(4).toString('hex');
    return this.usrUrlService.create({...addUrl, key: urlKey});
  }
}
