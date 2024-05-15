import { Test, TestingModule } from '@nestjs/testing';
import { AdminBookController } from './book.controller';

describe('AdminBookController', () => {
  let controller: AdminBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminBookController],
    }).compile();

    controller = module.get<AdminBookController>(AdminBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
