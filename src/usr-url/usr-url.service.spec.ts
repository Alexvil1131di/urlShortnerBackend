import { Test, TestingModule } from '@nestjs/testing';
import { UsrUrlService } from './usr-url.service';

describe('UsrUrlService', () => {
  let service: UsrUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsrUrlService],
    }).compile();

    service = module.get<UsrUrlService>(UsrUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
