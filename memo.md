## NestJS API

#### http://localhost:3000

- 데코레이터는 하나의 클래스를 하나의 모듈로서 표시한다.

#### movie.entity.ts

- 데이터베이스가 존재한다면 그 데이터베이스에 존재하는 모델에 대한 타입을 정의해주기 위한 클래스를 가지고 있는 파일이다.

#### Dto

- Dto는 우리가 받을 데이터가 어떤 종류의 데이터이고 어떤 타입을 가진 데이터인지 정의해주기 위한 클래스이다.

#### create-movie.dto.ts

- movie.controller.ts와 movie.service.ts에 movieData에 대한 타입을 정의해주기 위한 클래스를 가지고 있는 파일이다.

#### update-movie.dto

- movie.controller.ts와 movie.service.ts에 updateData에 대한 타입을 정의해주기 위한 클래스를 가지고 있는 파일이다.
- extends를 사용해서 다른 dto를 가져와서 확장해서 사용할 수 있다. 
- PartialType는 가져온 dto의 데이터 필드들이 필수가 아닌 선택적이게 변경한다.

#### Pipes

- 파이프는 요청하는 쿼리에 대한 타입과 유효성을 검사해주는 일종의 validator(유효성 검사기)이다.
- NestApplication인 app에 useGlobalPipes메서드를 사용해서 사용할 파이프를 지정해준다.
- new ValidationPipe()을 통해 ValidationPipe를 생성하고 여러 설정들을 해준다.
- whitelist는 지정한 필드가 아닌 없는 필드를 request했을 때 없는 필드를 제외하고 request한다.
- forbidNonWhitelisted은 지정한 필드가 아닌 없는 필드를 request했을 때 HTTP 오류를 띄운다.
- transform은 사용자가 지정한 데이터 타입으로 자동으로 변환시켜서 전달해준다. (문자->숫자)
  
```javascript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

#### Dependency Injection

- movie.service.ts같이 Service파일은 @Injectable() 데코레이터를 사용한다.
- 이 movie.service를 movie.module처럼 module파일 안의 provider에 inject(주입)해주게 되면 파일 가장 상단에 import를 통해 movie.service를 가져오지 않아도 movie.service가 가지고 있는 메서드들을 가져와서 사용할 수 있게 된다.
- @Injectable() 데코레이터는 클래스를 프로바이더로 표시하는 데코레이터이며, 생성자 매개변수를 통해 다른 클래스에 주입할 수 있다.

#### Jest 

- Jest는 자바스크립트를 아주 쉽게 테스팅하는 패키지이다.
- .spec은 해당 파일을 테스팅을 하기 위한 파일이다.
- Jest는 .spec파일들을 기본적으로 찾아볼 수 있도록 설정되어있다.
- test:cov: 코드가 얼마나 테스팅 됐는지 확인할 수 있다.
- test:watch: Jest가 모든 테스팅 파일들을 찾아서 지켜보도록 한다.

#### Unit Testing

- 유닛 테스팅은 모든 함수들을 따로따로 테스트하는 것을 말한다.
- 서비스에서 분리된 유닛을 테스트하는 것을 말한다.
- 예를들면 유닛 테스팅은 handleGetAllMovies라는 하나의 함수만 테스트하고 싶을 때 사용한다.

#### End to End Testing

- 엔투엔 테스팅은 전체 시스템을 테스팅하는 것을 말한다.
- 사용자가 취할만한 모든 액션들을 처음부터 끝까지 테스트한다.

#### movie.service.spec.ts

```javascript
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [MovieService],
  }).compile();

  service = module.get<MovieService>(MovieService);
  // beforeEach훅은 우리가 테스트를 실행하기 전에 실행되는 부분으로, 여기서 service.handleCreateMovie({})를 통해 영화를 미리 생성해주면 매번 테스트할 때마다 it구문 안에서 영화를 생성하지 않아도 된다.
  service.handleCreateMovie({
    title: 'Test Movie',
    year: 2021,
    rating: 8,
    genres: ['Action'],
  });
});
```