import { Test, TestingModule } from '@nestjs/testing';
import { UsrUrlController } from './usr-url.controller';
import { UsrUrlService } from './usr-url.service';

describe('UsrUrlController', () => {
  let controller: UsrUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsrUrlController],
      providers: [UsrUrlService],
    }).compile();

    controller = module.get<UsrUrlController>(UsrUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
