import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Res,
} from '@nestjs/common';
import { UsrUrlService } from './usr-url.service';
import { AddUrlDto, CreateUsrUrlDto } from './dto/create-usr-url.dto';
import { UpdateUsrUrlDto } from './dto/update-usr-url.dto';
import * as crypto from 'crypto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUsrUrlDto } from './dto/reponse-usr-url.dto';

@Controller('url')
@ApiTags('url')
export class UsrUrlController {
  constructor(private readonly usrUrlService: UsrUrlService) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Urls retrieved successfully',
    type: [ResponseUsrUrlDto],
  })
  findAll() {
    return this.usrUrlService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Url retrieved successfully',
    type: ResponseUsrUrlDto,
  })
  async findOne(@Param('id') id: string) {
    const url = await this.usrUrlService.findOne(id);
    if (!url) throw new HttpException('URL not found', 404);
    return url;
  }

  @Public()
  @Get('open/:key')
  @ApiResponse({
    status: 201,
    description: 'Url successfully found',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://longurl.com/example' },
      },
    },
  })
  async redirect(@Param('key') key: string) {
    const url = await this.usrUrlService.findOneByKey(key);
    if (!url) throw new HttpException('URL not found', 404);
    return { url: url.longUrl };
  }

  @Public()
  @Get('getByUserId/:userId')
  @ApiResponse({
    status: 201,
    description: 'Url successfully found',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://longurl.com/example' },
      },
    },
  })
  async getUrlByUserId(@Param('userId') userId: string) {
    const url = await this.usrUrlService.findAllByUserId(userId);
    if (!url) throw new HttpException('userId not found', 404);
    return url;
  }

  @Post('addUrl')
  @ApiBearerAuth()
  @Public()
  @ApiResponse({
    status: 201,
    description: 'Url successfully added',
    type: ResponseUsrUrlDto,
  })
  async addUrl(@Body() addUrl: AddUrlDto) {
    const shortUrl = await this.usrUrlService.findOneByLongUrl(
      addUrl.longUrl,
      addUrl.userId,
    );

    if (shortUrl) throw new HttpException('URL already exists', 400);
    const urlKey = crypto.randomBytes(4).toString('hex');
    return this.usrUrlService.create({ ...addUrl, key: urlKey });
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Url successfully created',
    type: ResponseUsrUrlDto,
  })
  async create(@Body() createUsrUrlDto: CreateUsrUrlDto) {
    const shortUrl = await this.usrUrlService.findOneByKey(
      createUsrUrlDto.longUrl,
    );
    if (shortUrl) throw new HttpException('URL already exists', 400);
    return this.usrUrlService.create(createUsrUrlDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Url successfully updated',
    type: ResponseUsrUrlDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUsrUrlDto: UpdateUsrUrlDto,
  ) {
    const url = await this.usrUrlService.findOne(id);
    if (!url) throw new HttpException('URL not found', 404);
    return this.usrUrlService.update(id, updateUsrUrlDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Url successfully deleted',
    type: ResponseUsrUrlDto,
  })
  async remove(@Param('id') id: string) {
    const url = await this.usrUrlService.findOne(id);
    if (!url) throw new HttpException('URL not found', 404);
    return this.usrUrlService.remove(id);
  }
}
