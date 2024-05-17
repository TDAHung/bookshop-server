import { Test, TestingModule } from '@nestjs/testing';
import { AdminHomeController } from './home.controller';

describe('AdminHomeController', () => {
  let controller: AdminHomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminHomeController],
    }).compile();

    controller = module.get<AdminHomeController>(AdminHomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
