import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'Hola mundo es lo que retorno',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float, { name: 'ramdomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'From to zero to argument TO (default 6)',
  })
  getRandomFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) to = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
